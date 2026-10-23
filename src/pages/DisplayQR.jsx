import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone } from 'lucide-react';
import QRCode from 'react-qr-code';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';

export default function DisplayQR() {
  // Ganti URL ini nanti pas lu udah deploy ke Vercel (misal: https://queuescan-lu.vercel.app/scan)
  // Untuk sekarang pake localhost dulu
  const scanUrl = `${window.location.origin}/scan`;

  return (
    <div className="min-h-screen bg-brutal-blue flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mb-6">
        <Link to="/admin">
          <BrutalButton color="white" size="sm">
            <ArrowLeft size={16} strokeWidth={3} /> Balik ke Admin
          </BrutalButton>
        </Link>
      </div>

      <BrutalCard color="white" className="text-center space-y-8 p-10 max-w-2xl w-full">
        <div>
          <h1 className="text-4xl md:text-6xl text-brutal-black mb-2">Scan Buat Antri!</h1>
          <p className="text-lg font-medium text-gray-600">Buka kamera HP lu, arahin ke QR Code di bawah ini.</p>
        </div>

        <div className="bg-brutal-white p-6 border-4 border-brutal-black shadow-brutal inline-block mx-auto">
          {/* Render QR Code */}
          <QRCode 
            value={scanUrl} 
            size={256}
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="H"
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-brutal-blue font-bold text-lg border-t-4 border-dashed border-brutal-black pt-6">
          <Smartphone size={24} />
          <span>Tanpa perlu download aplikasi!</span>
        </div>
      </BrutalCard>
    </div>
  );
}