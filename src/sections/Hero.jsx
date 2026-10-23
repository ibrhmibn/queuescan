import { Play, ArrowDown, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrutalButton from '../components/BrutalButton';
import BrutalCard from '../components/BrutalCard';
import { Cloud, Star } from '../components/Ornaments';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brutal-yellow border-b-4 border-brutal-black">
      {/* Ornamen background */}
      <Cloud className="left-[-30px] top-10 opacity-90" scale={0.9} />
      <Cloud className="right-[-20px] bottom-8 hidden md:block" scale={1.2} />
      <Cloud className="left-1/3 bottom-[-20px] hidden lg:block" scale={0.7} />
      <Star className="left-[8%] bottom-[18%] hidden sm:block" size={44} fill="#FF8FAB" />
      <Star className="right-[12%] top-[10%]" size={56} fill="#3B6FE8" />
      <Star className="left-[46%] top-[8%] hidden md:block" size={32} fill="#FFFFFF" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:gap-8 md:px-6 md:py-24">
        
        {/* Kolom Kiri: Copywriting & Tombol */}
        <div className="space-y-6">
          <h1 className="text-5xl leading-[1.05] text-brutal-white text-stroke-lg sm:text-6xl lg:text-7xl">
            Antri tanpa drama. Scan, tunggu, dipanggil!
          </h1>

          <p className="max-w-lg text-lg font-medium md:text-xl">
            QueueScan bikin pengunjung ambil nomor lewat scan QR, pantau
            giliran dari HP, dan nggak perlu berdiri berjam-jam di depan loket.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {/* Tombol Scan QR (Customer) */}
            <Link to="/scan">
              <BrutalButton color="pink" size="lg">
                <QrCode size={22} strokeWidth={3} />
                Ngantri Dulu, Brok!
              </BrutalButton>
            </Link>

            {/* Tombol Layar Antrian */}
            <Link to="/live">
              <BrutalButton color="white" size="lg">
                <Play size={22} strokeWidth={3} fill="#000" />
                Layar Antrian
              </BrutalButton>
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Mockup Tiket Antrian */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <BrutalCard
              color="white"
              shadow="lg"
              className="w-72 rotate-3 space-y-3 p-0 text-center sm:w-80"
            >
              {/* Header tiket */}
              <div className="border-b-4 border-brutal-black bg-brutal-blue px-4 py-2">
                <p className="font-heading text-sm uppercase tracking-widest text-brutal-white">
                  ★ QueueScan Ticket ★
                </p>
              </div>

              <div className="space-y-1 px-5 pt-2">
                <p className="font-heading text-sm uppercase tracking-widest">
                  Nomor Antrian
                </p>
                <p className="font-heading text-7xl leading-none text-brutal-blue text-stroke sm:text-8xl">
                  A-012
                </p>
              </div>

              {/* Garis sobekan tiket */}
              <div className="border-t-4 border-dashed border-brutal-black" />

              <div className="px-5 pb-5">
                <span className="inline-block border-3 border-brutal-black bg-brutal-green px-3 py-1 font-bold shadow-brutal-sm">
                  Loket 3 - Pendaftaran
                </span>
              </div>
            </BrutalCard>

            {/* Stiker kecil di pojok tiket */}
            <div className="absolute -right-4 -top-5 rotate-12 border-4 border-brutal-black bg-brutal-pink px-3 py-1 font-heading text-sm uppercase shadow-brutal-sm">
              Giliran 3 lagi!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}