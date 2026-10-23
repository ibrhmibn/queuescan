import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useQueue() {
  const [queue, setQueue] = useState([]);
  const [currentServing, setCurrentServing] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: queueData, error: qError } = await supabase
        .from('queues')
        .select('*')
        .eq('status', 'waiting')
        .order('number', { ascending: true });
      
      const { data: stateData, error: sError } = await supabase
        .from('queue_state')
        .select('current_serving')
        .single();

      if (qError) console.error('Error fetch queue:', qError);
      if (sError) console.error('Error fetch state:', sError);

      if (queueData) setQueue(queueData);
      if (stateData) setCurrentServing(stateData.current_serving);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addQueue = async (name) => {
    try {
      // 1. Cek nomor terakhir
      const { data: lastQueue, error: lastQError } = await supabase
        .from('queues')
        .select('number')
        .order('number', { ascending: false })
        .limit(1);

      if (lastQError) throw lastQError;

      const nextNumber = lastQueue && lastQueue.length > 0 ? lastQueue[0].number + 1 : 1;

      // 2. Insert data baru
      const { data, error } = await supabase
        .from('queues')
        .insert([{ number: nextNumber, name: name || 'Anonim', status: 'waiting' }])
        .select()
        .single();

      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error addQueue:', error.message);
      throw new Error(error.message); // Lempar error biar ditangkep UI
    }
  };

  const callNext = async () => {
    try {
      const nextNumber = currentServing + 1;
      
      const { error: stateError } = await supabase
        .from('queue_state')
        .update({ current_serving: nextNumber })
        .eq('id', 1);

      if (stateError) throw stateError;

      await supabase
        .from('queues')
        .update({ status: 'served' })
        .eq('number', nextNumber);
    } catch (error) {
      console.error('Error callNext:', error.message);
    }
  };

  const resetQueue = async () => {
    try {
      await supabase.from('queues').delete().neq('id', 0);
      await supabase.from('queue_state').update({ current_serving: 0 }).eq('id', 1);
    } catch (error) {
      console.error('Error resetQueue:', error.message);
    }
  };

  return { queue, currentServing, addQueue, callNext, resetQueue, loading };
}