const colors = {
  white: 'bg-brutal-white',
  yellow: 'bg-brutal-yellow',
  blue: 'bg-brutal-blue text-brutal-white',
  pink: 'bg-brutal-pink',
  green: 'bg-brutal-green',
  cream: 'bg-brutal-cream',
};

const shadows = {
  sm: 'shadow-brutal-sm',
  md: 'shadow-brutal',
  lg: 'shadow-brutal-lg',
  none: 'shadow-none',
};

export default function BrutalCard({
  children,
  color = 'white',
  shadow = 'md',
  rounded = false,
  className = '',
  as: Tag = 'div',
  ...props
}) {
  return (
    <Tag
      className={[
        'border-4 border-brutal-black p-5',
        colors[color],
        shadows[shadow],
        rounded ? 'rounded-retro' : 'rounded-none',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}