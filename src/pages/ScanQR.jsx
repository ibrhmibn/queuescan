import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { useQueue } from '../hooks/useQueue';
import { Sunburst, RetroFlower } from '../components/Ornaments';

export default function ScanQR() {
  const [name, setName] = useState('');
  const [ticket, setTicket] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addQueue } = useQueue();

  const handleScan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const newTicket = await addQueue(name);
      setTicket(newTicket);
    } catch (err) {
      setErrorMsg(err.message || 'Gagal ngambil antrian. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-yellow relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Background Ornaments */}
      <Sunburst className="-top-20 -left-20 rotate-45" size={400} color="#FF8FAB" />
      <RetroFlower className="bottom-10 right-5 rotate-12" size={120} color="#3B6FE8" />
      <RetroFlower className="top-20 right-10 -rotate-12" size={80} color="#5DB77B" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <Link to="/">
          <BrutalButton color="white" size="sm">
            <ArrowLeft size={16} strokeWidth={3} /> Kembali
          </BrutalButton>
        </Link>

        <BrutalCard color="white" className="text-center space-y-6">
          {!ticket ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-brutal-black text-brutal-white p-4 border-4 border-brutal-black inline-block shadow-brutal">
                <QrCode size={64} />
              </div>
              <h1 className="text-3xl">Scan Berhasil!</h1>
              <p className="font-medium text-gray-600">Masukin nama lu (opsional) buat ambil antrian.</p>
              
              {errorMsg && (
                <div className="bg-red-100 border-4 border-red-500 p-4 text-red-700 font-bold text-sm flex items-center justify-center gap-2">
                  <AlertTriangle size={20} />
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleScan} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nama Lu..." 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-4 border-brutal-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-brutal-blue shadow-brutal-sm"
                />
                <BrutalButton type="submit" color="pink" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? 'Memproses...' : 'Ambil Nomor Antrian'}
                </BrutalButton>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 2 }} className="space-y-6">
              <CheckCircle2 size={64} className="mx-auto text-brutal-green" />
              <h1 className="text-3xl text-brutal-green">Tiket Didapat!</h1>
              
              <div className="border-4 border-brutal-black bg-brutal-blue p-6 shadow-brutal">
                <p className="text-brutal-white font-bold uppercase tracking-widest text-sm mb-2">Nomor Antrian</p>
                <p className="font-heading text-8xl text-brutal-white text-stroke leading-none">
                  {ticket?.number || '-'}
                </p>
                <p className="text-brutal-white font-bold mt-4 bg-brutal-black/20 inline-block px-2 py-1">
                  A/N: {ticket?.name || 'Anonim'}
                </p>
              </div>
              
              <Link to="/live">
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