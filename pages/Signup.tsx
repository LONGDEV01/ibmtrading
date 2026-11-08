import React, { useState } from 'react';
import { useTrade } from '../context/TradeContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';

export const Signup = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useTrade();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = activeTab === 'email' ? email : phone;
    // Simple validation simulation
    if((email || phone) && password && username) {
      login(email || username); 
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black font-sans text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button onClick={() => navigate(-1)} className="text-white">
            <ChevronLeft size={28} />
        </button>
        <Link to="/login" className="text-[#3D5AFE] text-sm font-medium">Đăng nhập</Link>
      </div>

      <div className="px-4 mt-2">
        <h1 className="text-[28px] font-normal mb-8 text-white">Đăng ký ngay lập tức</h1>
        
        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b border-[#2C2C2E]">
            <button 
                onClick={() => setActiveTab('email')}
                className={`text-sm font-medium pb-2 relative transition-colors ${activeTab === 'email' ? 'text-[#3D5AFE]' : 'text-[#888888]'}`}
            >
                E-mail
                {activeTab === 'email' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3D5AFE]"></div>}
            </button>
            <button 
                onClick={() => setActiveTab('phone')}
                className={`text-sm font-medium pb-2 relative transition-colors ${activeTab === 'phone' ? 'text-[#3D5AFE]' : 'text-[#888888]'}`}
            >
                Số điện thoại
                {activeTab === 'phone' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3D5AFE]"></div>}
            </button>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {/* Username */}
            <div className="bg-[#1C1C1E] rounded px-4 py-3.5 border border-transparent focus-within:border-[#3D5AFE]">
                <input 
                    type="text" 
                    placeholder="Tên tài khoản"
                    className="w-full bg-transparent text-white outline-none placeholder-[#555] text-[15px]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            {/* Email or Phone */}
            {activeTab === 'email' ? (
                <div className="bg-[#1C1C1E] rounded px-4 py-3.5 border border-transparent focus-within:border-[#3D5AFE]">
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        className="w-full bg-transparent text-white outline-none placeholder-[#555] text-[15px]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            ) : (
                <div className="flex gap-3">
                     <div className="bg-[#1C1C1E] rounded px-3 py-3.5 w-[80px] flex items-center justify-center text-[#3D5AFE] text-[15px] border border-transparent focus-within:border-[#3D5AFE]">
                        +84
                     </div>
                     <div className="bg-[#1C1C1E] rounded px-4 py-3.5 flex-1 border border-transparent focus-within:border-[#3D5AFE]">
                        <input 
                            type="tel" 
                            placeholder="Số điện thoại"
                            className="w-full bg-transparent text-white outline-none placeholder-[#555] text-[15px]"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Password */}
            <div className="bg-[#1C1C1E] rounded px-4 py-3.5 border border-transparent focus-within:border-[#3D5AFE] flex items-center justify-between">
                <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Đặt mật khẩu"
                    className="w-full bg-transparent text-white outline-none placeholder-[#555] text-[15px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                 <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#555] hover:text-[#888]"
                 >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                 </button>
            </div>

            {/* Invite Code */}
            <div className="bg-[#1C1C1E] rounded px-4 py-3.5 border border-transparent focus-within:border-[#3D5AFE]">
                <input 
                    type="text" 
                    placeholder="Mã mời"
                    className="w-full bg-transparent text-white outline-none placeholder-[#555] text-[15px]"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                />
            </div>

            <button 
                type="submit" 
                className="mt-6 w-full bg-[#3D5AFE] text-white font-bold py-3.5 rounded text-[15px] hover:bg-[#2a3eb1] transition-colors uppercase"
            >
                ĐĂNG KÝ
            </button>
        </form>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center gap-4">
            <div className="bg-white px-4 py-2 flex items-center justify-center rounded-[2px] shadow-lg">
                 <img src="https://static.goldlbma-trade.com/assets/images/lbma-logo.jpeg" alt="LBMA" className="h-6 object-contain" />
                 <span className="text-black font-bold ml-2 text-lg">LBMA</span>
            </div>
             <a href="#" className="flex items-center gap-2 cursor-pointer rounded hover:bg-[#19181d] px-2 py-1 mt-2">
                <img className="w-[24px] rounded-sm" src="https://static.goldlbma-trade.com/assets/images/flags/vn.svg" alt="VN"/>
                <span className="text-[14px] text-white">Tiếng Việt</span>
            </a>
        </div>
      </div>
    </div>
  );
};
