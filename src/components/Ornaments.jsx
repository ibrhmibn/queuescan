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