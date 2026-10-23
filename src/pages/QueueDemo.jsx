import { useState } from 'react';
import { Ticket, Users, ArrowLeft, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { Star } from '../components/Ornaments';

export default function QueueDemo() {
  const [currentQueue, setCurrentQueue] = useState(0);
  const [myTicket, setMyTicket] = useState(null);

  const handleTakeTicket = () => {
    const nextNumber = currentQueue + 1;
    setMyTicket(nextNumber);
  };

  const handleCallNext = () => {
    if (currentQueue < myTicket || myTicket === null) {
      setCurrentQueue((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentQueue(0);
    setMyTicket(null);
  };

  return (
    <div className="min-h-screen bg-brutal-cream relative overflow-hidden flex flex-col items-center py-10 px-4">
      {/* Ornamen Background */}
      <Star className="left-[5%] top-[10%] opacity-20" size={120} fill="#FF8FAB" />
      <Star className="right-[5%] bottom-[10%] opacity-20" size={150} fill="#3B6FE8" />

      <div className="w-full max-w-4xl mb-8 relative z-10">
        <Link to="/">
          <BrutalButton color="white" size="sm">
            <ArrowLeft size={16} strokeWidth={3} /> Kembali
          </BrutalButton>
        </Link>
      </div>

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl md:text-6xl text-brutal-black text-stroke bg-brutal-white px-4 py-2 border-4 border-brutal-black shadow-brutal -rotate-1 inline-block">
          Simulasi Antrian
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
        {/* KARTU CUSTOMER */}
        <BrutalCard color="white" className="flex flex-col items-center justify-between p-8 min-h-[400px]">
          <div className="text-center space-y-2">
            <h2 className="text-3xl bg-brutal-yellow inline-block px-3 border-3 border-brutal-black -rotate-2">Layar Lu (Customer)</h2>
            <p className="font-medium text-gray-600">Klik tombol di bawah buat ambil nomor.</p>
          </div>
          
          <div className="flex-grow flex items-center justify-center w-full my-6">
            <AnimatePresence mode="wait">
              {myTicket ? (
                <motion.div 
                  key="ticket-ada"
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: -2, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="border-4 border-brutal-black bg-brutal-pink p-6 shadow-brutal w-full max-w-[250px] text-center"
                >
                  <p className="font-heading uppercase text-sm border-b-3 border-brutal-black pb-2 mb-2">Tiket Antrian</p>
                  <p className="font-heading text-8xl text-brutal-white text-stroke leading-none">
                    {myTicket}
                  </p>
                  <p className="mt-4 text-sm font-bold bg-brutal-white border-2 border-brutal-black px-2 py-1">
                    Mohon Tunggu
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="ticket-kosong"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-4 border-dashed border-brutal-black p-8 text-center text-gray-500 font-bold bg-gray-50 w-full"
                >
                  Belum ada tiket nih, bro.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <BrutalButton 
            color="yellow" 
            size="lg" 
            onClick={handleTakeTicket} 
            disabled={myTicket !== null}
            className="w-full"
          >
            <Ticket size={24} strokeWidth={3} /> Ambil Nomor
          </BrutalButton>
        </BrutalCard>

        {/* KARTU ADMIN */}
        <BrutalCard color="blue" className="flex flex-col items-center justify-between p-8 min-h-[400px]">
          <div className="text-center space-y-2">
            <h2 className="text-3xl bg-brutal-white text-brutal-black inline-block px-3 border-3 border-brutal-black rotate-2">Layar Admin (Loket)</h2>
            <p className="font-medium text-brutal-white">Panggil antrian berikutnya.</p>
          </div>
          
          <div className="flex-grow flex items-center justify-center w-full my-6">
            <div className="bg-brutal-white text-brutal-black border-4 border-brutal-black p-6 shadow-brutal rotate-2 w-full max-w-[250px] text-center">
              <p className="font-heading uppercase text-sm tracking-widest border-b-3 border-brutal-black pb-2 mb-2">Sedang Dilayani</p>
              <motion.p 
                key={currentQueue}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-heading text-8xl leading-none"
              >
                {currentQueue === 0 ? "-" : currentQueue}
              </motion.p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-4">
            <BrutalButton color="green" size="lg" onClick={handleCallNext} disabled={myTicket === null} className="w-full">
              <Users size={24} strokeWidth={3} /> Panggil Berikutnya
            </BrutalButton>
            <BrutalButton color="white" size="sm" onClick={handleReset} className="w-full">
              <RotateCcw size={16} strokeWidth={3} /> Reset (Ganti Hari)
            </BrutalButton>
          </div>
        </BrutalCard>
      </div>
    </div>
  );
}