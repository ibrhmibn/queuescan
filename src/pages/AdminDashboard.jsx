import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, RotateCcw, User, QrCode, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { useQueue } from '../hooks/useQueue';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { queue, currentServing, callNext, resetQueue } = useQueue();
  
  // PROTEKSI: Cek apakah admin udah login
  useEffect(() => {
    const isLogged = sessionStorage.getItem('isAdminLoggedIn');
    if (!isLogged) {
      navigate('/login'); // Tendang ke halaman login kalau belum
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/');
  };

  const waitingQueue = queue.filter(q => q.status === 'waiting');

  return (
    <div className="min-h-screen bg-brutal-cream flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl flex justify-between mb-6">
        <Link to="/">
          <BrutalButton color="white" size="sm">
            <ArrowLeft size={16} strokeWidth={3} /> Ke Home
          </BrutalButton>
        </Link>
        <div className="flex gap-2">
          <Link to="/display-qr">
            <BrutalButton color="yellow" size="sm">
              <QrCode size={16} strokeWidth={3} /> Tampilkan QR
            </BrutalButton>
          </Link>
          <BrutalButton color="pink" size="sm" onClick={handleLogout}>
            <LogOut size={16} strokeWidth={3} /> Logout
          </BrutalButton>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl bg-brutal-blue text-brutal-white text-stroke px-4 py-2 border-4 border-brutal-black shadow-brutal -rotate-1 inline-block">
          Dashboard Admin
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* ... (kode kartu sedang dilayani sama persis kayak sebelumnya) ... */}
        <div className="md:col-span-1 space-y-6">
          <BrutalCard color="yellow" className="text-center space-y-4">
            <h2 className="text-xl bg-brutal-white border-3 border-brutal-black px-2 py-1 inline-block">Sedang Dilayani</h2>
            <motion.p 
              key={currentServing}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-heading text-8xl leading-none"
            >
              {currentServing === 0 ? "-" : currentServing}
            </motion.p>
            <BrutalButton 
              color="green" 
              size="lg" 
              onClick={callNext} 
              className="w-full"
              disabled={waitingQueue.length === 0 && currentServing === 0}
            >
              <PlayCircle size={24} /> Panggil
            </BrutalButton>
            <BrutalButton color="white" size="sm" onClick={resetQueue} className="w-full">
              <RotateCcw size={16} /> Reset Harian
            </BrutalButton>
          </BrutalCard>
        </div>

        <div className="md:col-span-2">
          <BrutalCard color="white" className="h-full space-y-4">
            <div className="flex justify-between items-center border-b-4 border-brutal-black pb-2">
              <h2 className="text-2xl">Daftar Antrian ({waitingQueue.length})</h2>
              <span className="bg-brutal-pink border-2 border-brutal-black px-2 py-1 font-bold text-sm">Waiting List</span>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {waitingQueue.length === 0 ? (
                <div className="text-center py-10 text-gray-500 font-bold italic">
                  Belum ada antrian yang masuk nih.
                </div>
              ) : (
                waitingQueue.map((ticket) => (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    key={ticket.id} 
                    className="flex items-center justify-between border-3 border-brutal-black p-3 bg-brutal-cream shadow-brutal-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-brutal-blue text-brutal-white font-heading text-2xl h-12 w-12 flex items-center justify-center border-3 border-brutal-black">
                        {ticket.number}
                      </div>
                      <div>
                        <p className="font-bold uppercase flex items-center gap-1"><User size={14} /> {ticket.name}</p>
                        <p className="text-xs text-gray-600">ID: {ticket.id.toString().slice(-4)}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-brutal-yellow border-2 border-brutal-black px-2 py-1">
                      Menunggu
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </BrutalCard>
        </div>
      </div>
    </div>
  );
}