import Link from 'next/link';

type ButtonProps = {
  text: string;
  href: string;
  style?: string;
  rel?: string;
};

const Button = ({ text, href }: ButtonProps) => {
  return (
    <Link
      href={href}
      target={href.startsWith('http') ? `_blank` : ''}
      className="bg-primary-500 group dark:bg-card relative inline-flex items-center justify-center overflow-hidden rounded-md px-4 py-1.5 text-xs font-normal transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
      style={{ textDecoration: 'none' }}
    >
      <span className="relative z-50 text-lg">{text}</span>
      <div className="absolute inset-0 flex h-full w-full [transform:skew(-13deg)_translateX(-100%)] justify-center group-hover:[transform:skew(-13deg)_translateX(100%)] group-hover:duration-1000">
        <div className="relative h-full w-8 bg-white/20" />
      </div>
    </Link>
  );
};

export default Button;
