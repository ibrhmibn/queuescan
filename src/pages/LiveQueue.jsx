import { Link } from 'react-router-dom';
import { ArrowLeft, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { useQueue } from '../hooks/useQueue';

export default function LiveQueue() {
  const { currentServing, queue } = useQueue();
  
  // Ngitung sisa antrian yang lagi nunggu
  const waitingCount = queue.filter(q => q.status === 'waiting').length;

  return (
    <div className="min-h-screen bg-brutal-blue flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mb-6">
        <Link to="/scan">
          <BrutalButton color="white" size="sm">
            <ArrowLeft size={16} strokeWidth={3} /> Kembali
          </BrutalButton>
        </Link>
      </div>

      <BrutalCard color="white" className="w-full max-w-3xl text-center space-y-8 py-12">
        <div className="flex items-center justify-center gap-3">
          <MonitorSmartphone size={48} className="text-brutal-blue" />
          <h1 className="text-4xl md:text-5xl text-brutal-black">Layar Antrian</h1>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-bold uppercase tracking-widest text-gray-500">Sedang Dilayani</p>
          
          <motion.div 
            key={currentServing}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="border-8 border-brutal-black bg-brutal-yellow p-10 inline-block shadow-brutal-lg -rotate-2"
          >
            <p className="font-heading text-[10rem] leading-none text-brutal-black">
              {currentServing === 0 ? "-" : currentServing}
            </p>
          </motion.div>
        </div>

        <div className="border-t-4 border-dashed border-brutal-black pt-6">
          <p className="text-2xl font-bold">Sisa Antrian: <span className="bg-brutal-pink px-2 border-2 border-brutal-black">{waitingCount}</span></p>
          <p className="text-gray-500 font-medium mt-2">Mohon tunggu di ruang tunggu. Nomor akan dipanggil otomatis.</p>
        </div>
      </BrutalCard>
    </div>
  );
}