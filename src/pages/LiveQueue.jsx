import { Link } from 'react-router-dom';
import { ArrowLeft, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';
import { useQueue } from '../hooks/useQueue';
import { Sunburst, RetroStripes } from '../components/Ornaments';

export default function LiveQueue() {
  const { currentServing, queue } = useQueue();
  
  const waitingCount = queue.filter(q => q.status === 'waiting').length;

  return (
    <div className="min-h-screen bg-brutal-blue relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Background Ornaments */}
      <Sunburst className="-top-32 -left-32 rotate-90" size={600} color="#FFD400" />
      <RetroStripes className="-bottom-10 -right-10 rotate-180" width={400} />

      <div className="w-full max-w-3xl mb-6 relative z-10">
        <Link to="/scan">
          <BrutalButton color="white" size="sm">
            <ArrowLeft size={16} strokeWidth={3} /> Kembali
          </BrutalButton>
        </Link>
      </div>

      <BrutalCard color="white" className="w-full max-w-3xl text-center space-y-8 py-12 relative z-10">
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