import React, { useState } from 'react';
import { useTrade } from '../context/TradeContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { EyeOff } from 'lucide-react';

export const WalletPage = () => {
  const { user, wallet } = useTrade();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);

  if (!user) return <Navigate to="/login" />;

  // Calculations
  const usdtBalance = wallet.fiatBalance;
  const vndRate = 26159; 
  const vndBalance = usdtBalance * vndRate;
  
  // Daily profit mock data matching screenshot
  const profitVnd = 264206;
  const profitPercent = 0;

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white pb-32 font-sans">
      {/* Header */}
      <div className="px-4 py-4 bg-[#0b0e11] sticky top-0 z-10">
          <h1 className="text-[18px] font-bold">Tài sản của tôi</h1>
      </div>

      <div className="px-4 space-y-4">
          {/* Main Asset Card - User Specified Structure */}
          <div className="p-4 bg-[#1c1c1e] rounded">
              <span className="text-sm text-[#888]">Tổng tài sản</span>
              <div className="flex items-center gap-3 mt-2 mb-1">
                  <span className="text-white text-[32px]">
                      {showBalance ? usdtBalance.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1}) : '******'}
                  </span>
                  <span className="self-end text-white text-base">USD</span>
                  <button onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? (
                      <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" height="24" width="24" data-testid="VisibilityIcon">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3" fill="#fff"></path>
                      </svg>
                    ) : (
                      <EyeOff size={24} color="#fff" />
                    )}
                  </button>
              </div>
              <div className="relative inline-block text-right">
                  <a className="text-[#888] text-base flex items-center" href="#">
                      ≈{showBalance ? vndBalance.toLocaleString('en-US') : '******'} VND
                      <svg className="-mr-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"></path>
                      </svg>
                  </a>
              </div>
              <div className="text-base text-white pt-2">
                  Lợi nhuận ngày nay: &nbsp;<span className="text-green-500">{profitVnd.toLocaleString()}({profitPercent}%)</span>&nbsp; VND
              </div>
              <img src="https://static.goldlbma-trade.com/assets/images/line_image.svg" alt="Line" height="100" width="100" className="w-full h-full mt-2" />
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-4 gap-3">
              <ActionButton 
                icon={
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11V16" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 13L12 10L9 13" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                } 
                label="Nạp tiền" 
                onClick={() => {}} 
              />
              <ActionButton 
                icon={
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 12V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="4" y="5" width="16" height="4" rx="1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9V17" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 14L12 17L15 14" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                } 
                label="Rút" 
                onClick={() => {}} 
              />
              <ActionButton 
                icon={
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 2H15C15 3.65685 13.6569 5 12 5C10.3431 5 9 3.65685 9 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 11H16" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 16H16" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                } 
                label="Đặt hàng" 
                onClick={() => navigate('/trade/bitcoin')} 
              />
              <ActionButton 
                icon={
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                         <path d="M14 2V8H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                         <path d="M12 18V11" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         <path d="M10 13H12.5C13.8807 13 15 13.5 15 14.5C15 15.5 13.8807 16 12.5 16H10" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         <path d="M10 13H10.5C11.5 13 12 12.5 12 12" stroke="#3D5AFE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                } 
                label="Hóa đơn" 
                onClick={() => {}} 
              />
          </div>

          {/* Account Sections */}
          <div className="pt-2">
              <div className="mb-3 text-[16px] font-bold text-white">Tài khoản của tôi</div>
              
              <div className="flex flex-col gap-3">
                  <AccountItem 
                    label="Tiền" 
                    balance={`${showBalance ? usdtBalance.toLocaleString('en-US', {minimumFractionDigits: 1, maximumFractionDigits: 1}) : '******'} USDT`} 
                  />
                  <AccountItem label="Quản lý tài chính" balance={`${showBalance ? "0.00" : "******"} USDT`} />
                  <AccountItem label="Robot giao dịch" balance={`${showBalance ? "0.00" : "******"} USDT`} />
                  <AccountItem label="Đang lành lại" balance={`${showBalance ? "0.00" : "******"} USDT`} />
              </div>
          </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-3 bg-[#1E2026] py-4 rounded active:scale-95 transition-transform hover:bg-[#25272e]">
        <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
        <span className="text-[12px] font-medium text-white">{label}</span>
    </button>
);

const AccountItem = ({ label, balance }: { label: string, balance: string }) => (
    <div className="bg-[#1E2026] p-4 rounded flex flex-col gap-1 cursor-pointer hover:bg-[#25272e] transition-colors">
        <div className="text-[#888888] text-[12px]">{label}</div>
        <div className="text-white font-bold text-[15px]">{balance}</div>
    </div>
);
