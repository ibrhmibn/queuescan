import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { useQueue } from '../hooks/useQueue';

export default function ScanQR() {
  const [name, setName] = useState('');
  const [ticket, setTicket] = useState(null);
  const { addQueue } = useQueue();

  const handleScan = (e) => {
    e.preventDefault();
    const newTicket = addQueue(name);
    setTicket(newTicket);
  };

  return (
    <div className="min-h-screen bg-brutal-yellow flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Link to="/">
          <BrutalButton color="white" size="sm">
            <ArrowLeft size={16} strokeWidth={3} /> Kembali
          </BrutalButton>
        </Link>

        <BrutalCard color="white" className="text-center space-y-6">
          {!ticket ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="space-y-6"
            >
              <div className="bg-brutal-black text-brutal-white p-4 border-4 border-brutal-black inline-block shadow-brutal">
                <QrCode size={64} />
              </div>
              <h1 className="text-3xl">Scan Berhasil!</h1>
              <p className="font-medium text-gray-600">Masukin nama lu (opsional) buat ambil antrian.</p>
              
              <form onSubmit={handleScan} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nama Lu..." 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-4 border-brutal-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-brutal-blue shadow-brutal-sm"
                />
                <BrutalButton type="submit" color="pink" className="w-full" size="lg">
                  Ambil Nomor Antrian
                </BrutalButton>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 2 }} 
              className="space-y-6"
            >
              <CheckCircle2 size={64} className="mx-auto text-brutal-green" />
              <h1 className="text-3xl text-brutal-green">Tiket Didapat!</h1>
              
              <div className="border-4 border-brutal-black bg-brutal-blue p-6 shadow-brutal">
                <p className="text-brutal-white font-bold uppercase tracking-widest text-sm mb-2">Nomor Antrian</p>
                <p className="font-heading text-8xl text-brutal-white text-stroke leading-none">{ticket.number}</p>
                <p className="text-brutal-white font-bold mt-4 bg-brutal-black/20 inline-block px-2 py-1">A/N: {ticket.name}</p>
              </div>
              
              <Link to="/demo">
                <BrutalButton color="yellow" className="w-full">
                  Lihat Layar Antrian
                </BrutalButton>
              </Link>
            </motion.div>
          )}
        </BrutalCard>
      </div>
    </div>
  );
}