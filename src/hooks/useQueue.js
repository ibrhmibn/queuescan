import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useQueue() {
  const [queue, setQueue] = useState([]);
  const [currentServing, setCurrentServing] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fungsi buat ngambil data
  const fetchData = async () => {
    const { data: queueData } = await supabase
      .from('queues')
      .select('*')
      .eq('status', 'waiting')
      .order('number', { ascending: true });
    
    const { data: stateData } = await supabase
      .from('queue_state')
      .select('current_serving')
      .single();

    if (queueData) setQueue(queueData);
    if (stateData) setCurrentServing(stateData.current_serving);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // Setup Realtime Subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public' },
        (payload) => {
          console.log('Realtime update!', payload);
          fetchData(); // Ambil data baru tiap ada perubahan
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addQueue = async (name) => {
    // Ambil nomor terakhir
    const { data: lastQueue } = await supabase
      .from('queues')
      .select('number')
      .order('number', { ascending: false })
      .limit(1);

    const nextNumber = lastQueue && lastQueue.length > 0 ? lastQueue[0].number + 1 : 1;

    const { data, error } = await supabase
      .from('queues')
      .insert([{ number: nextNumber, name: name || 'Anonim', status: 'waiting' }])
      .select()
      .single();

    if (error) console.error('Error addQueue:', error);
    return data;
  };

  const callNext = async () => {
    const nextNumber = currentServing + 1;
    
    // Update state current_serving
    const { error: stateError } = await supabase
      .from('queue_state')
      .update({ current_serving: nextNumber })
      .eq('id', 1);

    if (stateError) console.error('Error update state:', stateError);

    // Update status antrian yang dipanggil
    await supabase
      .from('queues')
      .update({ status: 'served' })
      .eq('number', nextNumber);
  };

  const resetQueue = async () => {
    await supabase.from('queues').delete().neq('id', 0); // Hapus semua
    await supabase.from('queue_state').update({ current_serving: 0 }).eq('id', 1);
  };

  return { queue, currentServing, addQueue, callNext, resetQueue, loading };
}