import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrutalCard from '../components/BrutalCard';
import BrutalButton from '../components/BrutalButton';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Password hardcode buat demo portofolio. Di real app pake backend!
    if (password === 'admin123') {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin');
    } else {
      setError('Password salah, bro! (Hint: admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-brutal-pink flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-6">
        <Link to="/">
          <BrutalButton color="white" size="sm">
            <ArrowLeft size={16} strokeWidth={3} /> Kembali
          </BrutalButton>
        </Link>
      </div>

      <BrutalCard color="white" className="w-full max-w-md space-y-6 text-center">
        <div className="bg-brutal-black text-brutal-white p-4 border-4 border-brutal-black inline-block mx-auto shadow-brutal">
          <Lock size={48} />
        </div>
        <h1 className="text-4xl">Admin Only</h1>
        <p className="font-medium text-gray-600">Masukin password buat akses Dashboard.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Password..." 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="w-full border-4 border-brutal-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-brutal-blue shadow-brutal-sm"
          />
          {error && <p className="text-red-500 font-bold text-sm bg-red-100 p-2 border-2 border-red-500">{error}</p>}
          
          <BrutalButton type="submit" color="blue" className="w-full" size="lg">
            Masuk Dashboard
          </BrutalButton>
        </form>
      </BrutalCard>
    </div>
  );
}