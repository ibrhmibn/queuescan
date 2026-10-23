const colors = {
  yellow: 'bg-brutal-yellow',
  blue: 'bg-brutal-blue text-brutal-white',
  pink: 'bg-brutal-pink',
  green: 'bg-brutal-green',
  white: 'bg-brutal-white',
  black: 'bg-brutal-black text-brutal-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-4 text-xl',
};

export default function BrutalButton({
  children,
  color = 'yellow',
  size = 'md',
  rounded = false,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'font-heading uppercase tracking-wide',
        'border-4 border-brutal-black shadow-brutal',
        'transition-all duration-100 ease-out',
        // hover: bergeser sebagian, shadow mengecil
        'hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-brutal-sm',
        // klik: "tertekan" penuh, shadow hilang
        'active:translate-x-[6px] active:translate-y-[6px] active:shadow-none',
        'disabled:opacity-50 disabled:pointer-events-none',
        colors[color],
        sizes[size],
        rounded ? 'rounded-retro' : 'rounded-none',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}