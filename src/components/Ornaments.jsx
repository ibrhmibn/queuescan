import { Star as StarIcon } from 'lucide-react';

const puffs = [
  [0, 0, 56],
  [36, 0, 80],
  [86, 0, 64],
  [50, 28, 64],
];

export function Cloud({ className = '', scale = 1 }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ width: 160, height: 100, transform: `scale(${scale})` }}
    >
      {puffs.map(([l, b, s], i) => (
        <div
          key={`o-${i}`}
          className="absolute rounded-full bg-brutal-black"
          style={{ left: l - 4, bottom: b - 4, width: s + 8, height: s + 8 }}
        />
      ))}
      {puffs.map(([l, b, s], i) => (
        <div
          key={`f-${i}`}
          className="absolute rounded-full bg-brutal-white"
          style={{ left: l, bottom: b, width: s, height: s }}
        />
      ))}
    </div>
  );
}

export function Star({ className = '', size = 48, fill = '#FFFFFF' }) {
  return (
    <StarIcon
      aria-hidden="true"
      size={size}
      strokeWidth={3}
      fill={fill}
      color="#000"
      className={`absolute pointer-events-none select-none ${className}`}
    />
  );
}

// 1. Sunburst Retro (Gaya Sinar Matahari Tahun 70-an)
export function Sunburst({ className = '', size = 300, color = '#FFD400' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity: 0.15 }} 
    >
      <path 
        d="M50 50 L100 0 L100 100 Z M50 50 L0 100 L0 0 Z M50 50 L0 0 L100 0 Z M50 50 L100 100 L0 100 Z" 
        fill={color} 
      />
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
      <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
  );
}

// 2. Daisy Flower (Gaya Flower Power)
export function RetroFlower({ className = '', size = 80, color = '#FF8FAB' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={`absolute pointer-events-none select-none ${className}`}
      fill={color} 
      stroke="#000" 
      strokeWidth="1.5"
    >
      <path d="M12 2C10 2 9 4 9 6C9 7.5 10 8 10 8C10 8 7 7 5 8C3 9 3 11 4 12.5C5 14 7 13 8 12C8 12 6 14 6 16C6 18 8 19 9.5 18C11 17 11 15 11 15C11 15 12 17 13.5 18C15 19 17 18 17 16C17 14 15 12 15 12C15 12 17 14 19 12.5C20 11 20 9 18 8C16 7 13 8 13 8C13 8 14 7.5 14 6C14 4 13 2 12 2Z" />
      <circle cx="12" cy="11" r="2" fill="#FFD400" stroke="#000" />
    </svg>
  );
}

// 3. Retro Stripes (Garis Melengkung ala Pelangi 70-an)
export function RetroStripes({ className = '', width = 200, color1 = '#3B6FE8', color2 = '#FF8FAB' }) {
  return (
    <svg 
      width={width} 
      height={width} 
      viewBox="0 0 100 100" 
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity: 0.2 }}
    >
      <path d="M0 0 Q 50 0 100 100" fill="none" stroke={color1} strokeWidth="15" />
      <path d="M0 20 Q 50 20 100 120" fill="none" stroke={color2} strokeWidth="15" />
      <path d="M0 40 Q 50 40 100 140" fill="none" stroke="#FFD400" strokeWidth="15" />
    </svg>
  );
}