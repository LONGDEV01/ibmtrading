import React, { useState } from 'react';
import { useTrade } from '../context/TradeContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ChevronLeft } from 'lucide-react';

export const Login = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'phone' | 'username'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useTrade();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = activeTab === 'email' ? email : activeTab === 'phone' ? phone : username;
    if(identifier && password) {
      login(identifier);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen overflow-auto bg-[#000000] font-sans text-white">
      {/* Header */}
      <div className="sticky top-0 left-0 w-full px-4 py-4 flex items-center justify-between gap-2 bg-[#000000] z-10">
        <button className="text-white p-1 -ml-1" onClick={handleBack}>
          <ChevronLeft size={28} />
        </button>
        <Link to="/signup">
          <span className="text-[#3D5AFE] text-base font-medium">Đăng ký</span>
        </Link>
      </div>

      <div className="p-4 pt-2">
        <h4 className="text-[28px] text-[#fff] font-normal mb-8">Đăng nhập ngay</h4>
        
        {/* Tabs */}
        <div className="flex relative border-b border-[#2c2c2e] mb-6">
          <button 
            className={`px-4 py-3 text-sm font-medium transition-colors outline-none ${activeTab === 'email' ? 'text-[#3D5AFE]' : 'text-[#888888]'}`}
            onClick={() => setActiveTab('email')}
          >
            E-mail
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium transition-colors outline-none ${activeTab === 'phone' ? 'text-[#3D5AFE]' : 'text-[#888888]'}`}
            onClick={() => setActiveTab('phone')}
          >
            Số điện thoại
          </button>
          <button 
            className={`px-4 py-3 text-sm font-medium transition-colors outline-none ${activeTab === 'username' ? 'text-[#3D5AFE]' : 'text-[#888888]'}`}
            onClick={() => setActiveTab('username')}
          >
            Tên tài khoản
          </button>
          
          {/* Active Indicator Line */}
          <div 
            className="absolute bottom-0 h-[2px] bg-[#3D5AFE] transition-all duration-300"
            style={{
              width: '33.33%',
              left: activeTab === 'email' ? '0%' : activeTab === 'phone' ? '33.33%' : '66.66%'
            }}
          ></div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
          {/* Identifier Input */}
          <div className="bg-[#1D1C22] rounded-t px-4 pt-5 pb-2 relative border-b border-[#888888] focus-within:border-[#3D5AFE] transition-colors group">
             <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                (activeTab === 'email' ? email : activeTab === 'phone' ? phone : username) 
                ? 'top-1 text-xs text-[#3D5AFE]' 
                : 'top-4 text-base text-[#888888] group-focus-within:top-1 group-focus-within:text-xs group-focus-within:text-[#3D5AFE]'
             }`}>
                {activeTab === 'email' ? 'E-mail' : activeTab === 'phone' ? 'Số điện thoại' : 'Tên tài khoản'}
             </label>
             <input 
                type={activeTab === 'email' ? 'email' : 'text'}
                className="w-full bg-transparent text-white outline-none text-base pt-1"
                value={activeTab === 'email' ? email : activeTab === 'phone' ? phone : username}
                onChange={(e) => {
                    if (activeTab === 'email') setEmail(e.target.value);
                    else if (activeTab === 'phone') setPhone(e.target.value);
                    else setUsername(e.target.value);
                }}
             />
          </div>

          {/* Password Input */}
          <div className="bg-[#1D1C22] rounded-t px-4 pt-5 pb-2 relative border-b border-[#888888] focus-within:border-[#3D5AFE] transition-colors group">
             <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                password 
                ? 'top-1 text-xs text-[#3D5AFE]' 
                : 'top-4 text-base text-[#888888] group-focus-within:top-1 group-focus-within:text-xs group-focus-within:text-[#3D5AFE]'
             }`}>
                Mật khẩu đăng nhập
             </label>
             <input 
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent text-white outline-none text-base pt-1 pr-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
             />
             <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
             >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
             </button>
          </div>

          <button 
            type="submit" 
            className="mt-6 w-full bg-[#3D5AFE] hover:bg-[#2a3eb1] text-white font-bold py-3.5 rounded text-base transition-colors uppercase"
          >
            Đăng nhập
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex flex-col items-center justify-center mt-12 gap-4">
           <Link to="/" className="opacity-100 hover:opacity-80 transition-opacity">
              <img className="w-auto h-[52px] rounded" src="https://static.goldlbma-trade.com/assets/images/lbma-logo.jpeg" alt="LBMA"/>
           </Link>
           <a href="#" className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-[#19181d] transition-colors">
              <img className="w-[20px]" src="https://static.goldlbma-trade.com/assets/images/flags/vn.svg" alt="VN"/>
              <span className="text-[14px] text-white">Tiếng Việt</span>
           </a>
           
           {/* Temporary Admin Link - Made visible */}
           <Link to="/admin" className="text-xs text-gray-500 hover:text-white mt-8 border border-gray-700 px-3 py-1 rounded">
              Admin Access (Temp)
           </Link>
        </div>
      </div>
    </div>
  );
};
