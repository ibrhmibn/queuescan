import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrutalButton from './BrutalButton';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brutal-white border-b-4 border-brutal-black">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="font-heading text-2xl uppercase tracking-tight md:text-3xl">
          Queue<span className="bg-brutal-yellow border-3 border-brutal-black px-1 ml-0.5">Scan</span>
        </Link>
        <Link to="/login">
          <BrutalButton color="blue" size="sm">
            <LogIn size={16} strokeWidth={3} />
            Login Admin
          </BrutalButton>
        </Link>
      </nav>
    </header>
  );
}