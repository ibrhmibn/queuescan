import { useState, useEffect } from 'react';

export function useQueue() {
  const [queue, setQueue] = useState([]);
  const [currentServing, setCurrentServing] = useState(0);

  // Load data dari localStorage pas pertama kali buka
  useEffect(() => {
    const savedQueue = localStorage.getItem('queuescan_data');
    if (savedQueue) {
      const data = JSON.parse(savedQueue);
      setQueue(data.queue || []);
      setCurrentServing(data.currentServing || 0);
    }
  }, []);

  // Simpan ke localStorage tiap ada perubahan
  useEffect(() => {
    localStorage.setItem('queuescan_data', JSON.stringify({ queue, currentServing }));
  }, [queue, currentServing]);

  const addQueue = (name) => {
    const newTicket = {
      id: Date.now(),
      number: queue.length > 0 ? Math.max(...queue.map(q => q.number)) + 1 : 1,
      name: name || 'Anonim',
      status: 'waiting'
    };
    setQueue([...queue, newTicket]);
    return newTicket;
  };

  const callNext = () => {
    const nextNumber = currentServing + 1;
    setCurrentServing(nextNumber);
    
    // Update status antrian yang dipanggil
    setQueue(queue.map(q => 
      q.number === nextNumber ? { ...q, status: 'served' } : q
    ));
  };

  const resetQueue = () => {
    setQueue([]);
    setCurrentServing(0);
    localStorage.removeItem('queuescan_data');
  };

  return { queue, currentServing, addQueue, callNext, resetQueue };
}