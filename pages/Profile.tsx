import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrade } from '../context/TradeContext';
import { User, Mail, Phone, Lock, Shield, CreditCard, FileCheck } from 'lucide-react';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useTrade();

  if (!user) {
    // Not Logged In View
    return (
        <div className="bg-black min-h-screen font-sans">
          {/* Header */}
          <div className="flex items-center gap-2 bg-[#110F15] p-4 sticky top-0 z-10">
            <div className="cursor-pointer" onClick={() => navigate(-1)}>
              <svg viewBox="0 0 24 24" fill="#fff" width="24px">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
              </svg>
            </div>
            <div className="text-white text-xl font-semibold">Personal center</div>
          </div>
          
          {/* Welcome Card */}
          <div>
            <div className="bg-[#1C1C1E] mt-2 rounded-sm p-4">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40px">
                  <circle fill="#3D5AFE" cx="24" cy="24" r="24"></circle>
                  <path fill="#637AFE" fillRule="evenodd" clipRule="evenodd" d="M4.15466 37.501C5.3845 27.6348 13.8007 20.0001 24 20.0001C34.1994 20.0001 42.6155 27.6348 43.8454 37.5009C39.5254 43.8388 32.2487 48.0001 24 48.0001C15.7514 48.0001 8.47467 43.8388 4.15466 37.501Z"></path>
                  <circle fill="#fff" cx="24" cy="16" r="9"></circle>
                </svg>
                <div className="text-white">
                  <div className="text-[32px] font-normal">Welcome to</div>
                  <div className="text-gray-500 text-sm">Please log in to your account or signup a account</div>
                </div>
              </div>
              <div className="flex justify-between gap-4 items-center mt-8">
                <button 
                    onClick={() => navigate('/login')}
                    className="border border-[#3D5AFE] text-[#3D5AFE] w-1/2 rounded-md py-1.5 text-sm hover:bg-[#3D5AFE] hover:text-white transition-colors"
                >
                    Log in
                </button>
                <button 
                    onClick={() => navigate('/signup')} 
                    className="text-white bg-[#3D5AFE] w-1/2 rounded-md py-1.5 text-sm hover:bg-[#2a3eb1] transition-colors"
                >
                    Signup
                </button>
              </div>
            </div>
          </div>
          
          {/* Menu List */}
          <div className="bg-[#1C1C1E] mt-2 rounded-sm">
            {/* Language */}
            <div className="flex justify-between items-center text-white p-4 focus:bg-[#303032] cursor-pointer hover:bg-[#303032] border-b border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 5h7"></path>
                  <path d="M7 4c0 4.846 0 7 .5 8"></path>
                  <path d="M10 8.5c0 2.286 -2 4.5 -3.5 4.5s-2.5 -1.135 -2.5 -2c0 -2 1 -3 3 -3s5 .57 5 2.857c0 1.524 -.667 2.571 -2 3.143"></path>
                  <path d="M12 20l4 -9l4 9"></path>
                  <path stroke="#3D5AFE" fill="#3D5AFE" d="M19.1 18h-6.2"></path>
                </svg>
                <span className="text-[13px]">Language</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-[12px] text-gray-400">English</div>
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" width="24px" fill="#9098A3">
                  <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
              </div>
            </div>
            
            {/* Colors */}
            <div className="flex justify-between items-center text-white p-4 focus:bg-[#303032] cursor-pointer hover:bg-[#303032] border-b border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <polyline stroke="#3D5AFE" fill="#3D5AFE" points="16 3 21 3 21 8"></polyline>
                  <line stroke="#3D5AFE" fill="#3D5AFE" x1="4" y1="20" x2="21" y2="3"></line>
                  <polyline points="21 16 21 21 16 21"></polyline>
                  <line x1="15" y1="15" x2="21" y2="21"></line>
                  <line x1="4" y1="4" x2="9" y2="9"></line>
                </svg>
                <span className="text-[13px]">Colors of ups and downs</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-[12px] text-gray-400">Green rise and red</div>
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" width="24px" fill="#9098A3">
                  <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
              </div>
            </div>
            
            {/* Currency */}
            <div className="flex justify-between items-center text-white p-4 focus:bg-[#303032] cursor-pointer hover:bg-[#303032] border-b border-[#2c2c2e]">
              <div className="flex items-center gap-2">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                  <path stroke="#3D5AFE" fill="#3D5AFE" d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
                  <path stroke="#3D5AFE" fill="#3D5AFE" d="M12 17v1m0 -8v1"></path>
                </svg>
                <span className="text-[13px]">Display currency</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="text-[12px] text-gray-400">USD</div>
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" width="24px" fill="#9098A3">
                  <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
              </div>
            </div>

            {/* About Us */}
            <div className="flex justify-between items-center text-white p-4 focus:bg-[#303032] cursor-pointer hover:bg-[#303032]">
              <div className="flex items-center gap-2">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line stroke="#3D5AFE" fill="#3D5AFE" x1="12" y1="8" x2="12" y2="12"></line>
                  <line stroke="#3D5AFE" fill="#3D5AFE" x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span className="text-[13px]">About Us</span>
              </div>
              <div className="flex items-center gap-1">
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" width="24px" fill="#9098A3">
                  <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Logged In View
  return (
    <div className="bg-black min-h-screen font-sans pb-8">
        {/* Header */}
        <div className="flex items-center gap-2 bg-[#110F15] p-4 sticky top-0 z-10">
            <div className="cursor-pointer" onClick={() => navigate(-1)}>
                <svg viewBox="0 0 24 24" fill="#fff" width="24px">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
                </svg>
            </div>
            <div className="text-white text-xl font-semibold">Trung tâm cá nhân</div>
        </div>

        {/* Section 1: Account Info */}
        <div className="bg-[#1C1C1E] mt-2">
            <ProfileItem 
                icon={<User size={20} className="text-[#3D5AFE]" />} 
                label="Tên người dùng" 
                value={user.name} 
                showArrow={false}
            />
            <ProfileItem 
                icon={<Mail size={20} className="text-[#3D5AFE]" />} 
                label="Hộp thư" 
                value={user.email} 
                showArrow={false}
            />
            <ProfileItem 
                icon={<Phone size={20} className="text-[#3D5AFE]" />} 
                label="Số điện thoại" 
                value="+8409*****50"
                showArrow={false}
            />
             <ProfileItem 
                icon={<Lock size={20} className="text-[#3D5AFE]" />} 
                label="Một khẩu đăng nhập" 
                onClick={() => {}}
            />
            <ProfileItem 
                icon={<Shield size={20} className="text-[#3D5AFE]" />} 
                label="Mã bảo mật" 
                onClick={() => {}}
            />
        </div>

        {/* Section 2: Finance & Identity */}
        <div className="bg-[#1C1C1E] mt-2">
            <ProfileItem 
                icon={<CreditCard size={20} className="text-[#3D5AFE]" />} 
                label="Tài khoản rút tiền" 
                onClick={() => {}}
            />
            <ProfileItem 
                icon={<FileCheck size={20} className="text-[#3D5AFE]" />} 
                label="Xác thực danh tính" 
                value={<span className="text-[#888]">Lv.1</span>}
                onClick={() => {}}
            />
        </div>

        {/* Section 3: Settings */}
        <div className="bg-[#1C1C1E] mt-2">
            <ProfileItem 
                icon={
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 5h7"></path>
                        <path d="M7 4c0 4.846 0 7 .5 8"></path>
                        <path d="M10 8.5c0 2.286 -2 4.5 -3.5 4.5s-2.5 -1.135 -2.5 -2c0 -2 1 -3 3 -3s5 .57 5 2.857c0 1.524 -.667 2.571 -2 3.143"></path>
                        <path d="M12 20l4 -9l4 9"></path>
                        <path stroke="#3D5AFE" fill="#3D5AFE" d="M19.1 18h-6.2"></path>
                    </svg>
                }
                label="Ngôn ngữ" 
                value="English"
                onClick={() => {}}
            />
            <ProfileItem 
                icon={
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <polyline stroke="#3D5AFE" fill="#3D5AFE" points="16 3 21 3 21 8"></polyline>
                        <line stroke="#3D5AFE" fill="#3D5AFE" x1="4" y1="20" x2="21" y2="3"></line>
                        <polyline points="21 16 21 21 16 21"></polyline>
                        <line x1="15" y1="15" x2="21" y2="21"></line>
                        <line x1="4" y1="4" x2="9" y2="9"></line>
                    </svg>
                }
                label="Màu biến động" 
                value="Xanh lên, đỏ xuống"
                onClick={() => {}}
            />
            <ProfileItem 
                icon={
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                        <path stroke="#3D5AFE" fill="#3D5AFE" d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
                        <path stroke="#3D5AFE" fill="#3D5AFE" d="M12 17v1m0 -8v1"></path>
                    </svg>
                }
                label="Tiền tệ hiển thị" 
                value="USD"
                onClick={() => {}}
            />
            <ProfileItem 
                icon={
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line stroke="#3D5AFE" fill="#3D5AFE" x1="12" y1="8" x2="12" y2="12"></line>
                        <line stroke="#3D5AFE" fill="#3D5AFE" x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                }
                label="Về chúng tôi" 
                onClick={() => {}}
            />
        </div>

        {/* Logout Button */}
        <div className="p-4 mt-4">
            <button 
                onClick={() => {
                    logout();
                    navigate('/');
                }}
                className="w-full bg-[#ff0000] text-white font-bold py-3 rounded text-base hover:bg-red-700 transition-colors"
            >
                Đăng xuất
            </button>
        </div>
    </div>
  );
};

interface ProfileItemProps {
    icon: React.ReactNode;
    label: string;
    value?: React.ReactNode;
    onClick?: () => void;
    showArrow?: boolean;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, value, onClick, showArrow = true }) => {
    return (
        <div 
            onClick={onClick}
            className={`flex justify-between items-center text-white p-4 border-b border-[#2c2c2e] last:border-0 ${onClick ? 'cursor-pointer hover:bg-[#303032] active:bg-[#252527]' : ''}`}
        >
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-[#3D5AFE]">
                    {icon}
                </div>
                <span className="text-[13px]">{label}</span>
            </div>
            
            <div className="flex items-center gap-1">
                {value && <div className="text-[12px] text-gray-400">{value}</div>}
                {showArrow && (
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24px" fill="#9098A3">
                        <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                    </svg>
                )}
            </div>
        </div>
    );
}