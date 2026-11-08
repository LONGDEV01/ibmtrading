import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrade } from '../../context/TradeContext';
import { Lock, User } from 'lucide-react';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useTrade();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1c1c1e] rounded-lg shadow-2xl p-8 border border-[#2b3139]">
        <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#3D5AFE] rounded-full flex items-center justify-center mb-4">
                <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Admin Portal</h1>
            <p className="text-gray-500 text-sm mt-1">Restricted Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0b0e11] border border-[#2b3139] rounded px-10 py-3 text-white focus:border-[#3D5AFE] focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0b0e11] border border-[#2b3139] rounded px-10 py-3 text-white focus:border-[#3D5AFE] focus:outline-none transition-colors"
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button
            type="submit"
            className="w-full bg-[#3D5AFE] hover:bg-[#2a3eb1] text-white font-bold py-3 rounded transition-colors"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-600">
            Secure System • Authorized Personnel Only
        </div>
      </div>
    </div>
  );
};