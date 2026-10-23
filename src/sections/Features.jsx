import { QrCode, Radio, RefreshCcw } from 'lucide-react';
import BrutalCard from '../components/BrutalCard';
import { Star } from '../components/Ornaments';

const features = [
  { icon: QrCode, title: 'Scan Tanpa App', desc: 'Cukup scan QR di loket pakai kamera HP. Nggak perlu download aplikasi apa pun.', color: 'yellow' },
  { icon: Radio, title: 'Real-time', desc: 'Status antrian update langsung. Kamu tahu persis kapan giliranmu dipanggil.', color: 'blue' },
  { icon: RefreshCcw, title: 'Reset Otomatis', desc: 'Nomor antrian kembali ke awal tiap hari, jadi admin nggak perlu repot reset manual.', color: 'white' },
];

export default function Features() {
  return (
    <section id="fitur" className="relative overflow-hidden bg-brutal-pink border-b-4 border-brutal-black">
      <Star className="left-[5%] top-12 hidden sm:block" size={40} fill="#FFD400" />
      <Star className="right-[6%] bottom-12 hidden sm:block" size={52} fill="#FFFFFF" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="inline-block -rotate-1 border-4 border-brutal-black bg-brutal-white px-4 py-2 text-3xl shadow-brutal md:text-5xl">
            Kenapa pilih QueueScan?
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, desc, color }, i) => (
            <BrutalCard key={title} color={color} className={`space-y-4 ${i === 1 ? 'md:-translate-y-4' : ''}`}>
              <div className="inline-flex border-4 border-brutal-black bg-brutal-white p-3 shadow-brutal-sm text-brutal-black">
                <Icon size={32} strokeWidth={3} />
              </div>
              <h3 className="text-2xl">{title}</h3>
              <p className="font-medium leading-relaxed">{desc}</p>
            </BrutalCard>
          ))}
        </div>
      </div>
    </section>
  );
}