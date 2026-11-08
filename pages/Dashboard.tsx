import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CoinService } from '../services/api';
import { CoinData } from '../types';
import { useTrade } from '../context/TradeContext';

const MenuButton = ({ label, link, children }: { label: string, link: string, children: React.ReactNode }) => (
    <div className="flex item-center justify-center pt-2 cursor-pointer">
        <Link className="p-2 rounded hover:bg-[#1c1c1e] flex flex-col items-center justify-start gap-1 w-full" to={link}>
            {children}
            <span className="text-[#fff] font-medium text-center text-[11px] sm:text-xs mt-1 leading-tight">{label}</span>
        </Link>
    </div>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const [cryptoCoins, setCryptoCoins] = useState<CoinData[]>([]);
  const { user } = useTrade();

  useEffect(() => {
    const fetch = async () => {
      const data = await CoinService.getTopCoins(10);
      setCryptoCoins(data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-black pb-24 text-white font-sans">
        {/* Header - Fixed Top with Black Background */}
        <div className="fixed top-0 left-0 w-full z-50 px-4 py-4 flex justify-between bg-[#100F14]">
            {/* Profile Icon */}
            <div className="flex items-center gap-2">
                <Link to="/profile">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40px">
                        <circle fill="#3D5AFE" cx="24" cy="24" r="24"></circle>
                        <path fill="#637AFE" fillRule="evenodd" clipRule="evenodd" d="M4.15466 37.501C5.3845 27.6348 13.8007 20.0001 24 20.0001C34.1994 20.0001 42.6155 27.6348 43.8454 37.5009C39.5254 43.8388 32.2487 48.0001 24 48.0001C15.7514 48.0001 8.47467 43.8388 4.15466 37.501Z"></path>
                        <circle fill="#fff" cx="24" cy="16" r="9"></circle>
                    </svg>
                </Link>
            </div>
            
            {/* Right Side: Notification & Language */}
            <div className="flex items-center gap-3">
                <div className="cursor-pointer">
                    <svg width="25" height="24" viewBox="0 0 24 24">
                        <path fill="#fff" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2m6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5z"></path>
                    </svg>
                </div>
                
                {/* Language Flag */}
                <a className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-[#19181d]" href="#">
                   <img className="w-[20px]" src="https://static.goldlbma-trade.com/assets/images/flags/vn.svg" alt="VN" />
                   <span className="text-[14px] text-white">Tiếng Việt</span>
                </a>
            </div>
        </div>

        {/* Banner - Adjusted padding top for fixed header */}
        <div className="w-full md:h-[35vh] overflow-hidden pt-[72px] bg-[#100F14]">
             <img className="w-full h-full object-cover" src="https://static.goldlbma-trade.com/assets/images/lbma-banner.jpeg" alt="LBMA banner"/>
        </div>

        {/* Action Buttons: Deposit & Service */}
        <div className="flex gap-4 p-4 -mt-6 relative z-20">
            <Link className="flex-1 flex items-center justify-between px-4 py-3 rounded bg-[#202125] hover:bg-[#121212] transition-colors" to="/wallet">
                <div className="flex items-center gap-3">
                    <svg className="w-10 h-10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="11.9999" width="20" height="14" rx="1" stroke="#fff"></rect>
                        <path stroke="#fff" d="M6 18.5l-1.777-7.998a1 1 0 01.785-1.198L21.07 6.181a1 1 0 011.161.74L23.5 12"></path>
                        <path fill="#3D5AFE" d="M18.998 18.524l-.652-.758-.827.71.78.763.699-.715zm9.387 1a1 1 0 100-2v2zm-7.336 2.406a1 1 0 101.399-1.43l-1.4 1.43zm1.35-5.009a1 1 0 00-1.302-1.517L22.4 16.92zm-3.401 2.603h9.387v-2h-9.387v2zm-.7-.285l2.75 2.69 1.4-1.429-2.751-2.69-1.398 1.43zm1.351.044l2.75-2.362-1.302-1.517-2.75 2.362 1.302 1.517z"></path>
                    </svg>
                    <span className="text-[#fff] font-medium">Deposit</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
            </Link>
            
            <a className="flex-1 flex items-center justify-between px-4 py-3 rounded bg-[#3D5AFE] hover:bg-[#2a3eb1] transition-colors" href="#">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-10 h-10">
                            <path fill="#fff" stroke="#3D5AFE" d="M17.37 6.73c.9 0 1.63.73 1.63 1.63v3.26c0 .9-.73 1.63-1.63 1.63h-.87a6.532 6.532 0 01-6.48 5.71v-1.63c2.7 0 4.89-2.19 4.89-4.89V7.55c0-3.77-4.08-6.12-7.34-4.24a4.901 4.901 0 00-2.45 4.24v5.71H2.69c-.9 0-1.63-.73-1.63-1.63V8.37c0-.9.73-1.63 1.63-1.63h.87c.62-4.99 6.41-7.43 10.41-4.39a6.517 6.517 0 012.53 4.38h.87z"></path>
                            <path stroke="#3D5AFE" fill="#fff" d="M6.57 13.08l.86-1.38a4.905 4.905 0 005.18 0l.86 1.38c-1.04.65-2.24.99-3.46.99-1.22 0-2.42-.34-3.46-.99z"></path>
                        </svg>
                    </div>
                    <span className="text-[#fff] font-medium">Service</span>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
            </a>
        </div>

        {/* Popular Pairs */}
        <div className="flex flex-col gap-2 p-4">
            <h5 className="text-[24px] text-white font-normal mb-2">Popular transaction pair</h5>
            <div className="flex gap-1 overflow-x-auto pb-3 scrollbar-hide">
                {cryptoCoins.length === 0 ? (
                     [1,2,3,4,5].map(i => (
                        <div key={i} className="flex flex-col gap-3 min-w-[120px] min-h-[130px] p-2 rounded-lg bg-[#1c1c1e] justify-center items-center">
                            <div className="w-4 h-4">
                               <svg className="animate-spin text-white w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                               </svg>
                            </div>
                        </div>
                     ))
                ) : (
                    cryptoCoins.map((coin) => {
                        const priceChange = coin.price_change_percentage_24h || 0;
                        return (
                            <div key={coin.id} onClick={() => navigate(`/trade/${coin.id}`)} className="flex flex-col justify-between min-w-[120px] p-3 rounded-lg bg-[#1c1c1e] cursor-pointer active:scale-95 transition-transform">
                                 <div className="flex items-center gap-2 mb-2">
                                     <img src={coin.image} alt={coin.symbol} className="w-6 h-6 rounded-full" />
                                     <span className="font-bold text-sm uppercase">{coin.symbol}</span>
                                 </div>
                                 <div className={`text-lg font-bold ${priceChange >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                                     ${coin.current_price.toLocaleString(undefined, { maximumSignificantDigits: 5 })}
                                 </div>
                                 <div className={`text-xs ${priceChange >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                                     {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
                                 </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>

        {/* Notice Bar */}
        <div className="flex justify-between items-center px-4 mb-4">
            <svg aria-hidden="true" width="25" height="24" viewBox="0 0 24 24">
                <path fill="#fff" d="M18 11v2h4v-2zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61M20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4M4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34"></path>
            </svg>
            <div className="flex-1 mx-2 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap text-sm text-gray-300">
                    LBMA Group announces new partnership with global gold suppliers for secure futures trading.
                </div>
            </div>
            <a href="#">
                <svg aria-hidden="true" width="25" height="24" viewBox="0 0 24 24">
                    <path fill="#fff" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"></path>
                </svg>
            </a>
        </div>

        {/* Grid Menu */}
        <div className="grid grid-cols-4 gap-y-8 bg-[#121212] pb-8 px-2">
            <MenuButton label="Study" link="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24"><path stroke="#121212" fill="#fff" d="M21 18H6c-.6 0-1 .4-1 1s.4 1 1 1h15v2H6c-1.7 0-3-1.3-3-3V4c0-1.1.9-2 2-2h16v16zM5 16h14V4H5v12z"></path><path fill="#3D5AFE" d="M8 7H16V9H8z"></path></svg>
            </MenuButton>

            <MenuButton label="Help Center" link="#">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24"><path stroke="#121212" fill="#fff" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path><path fill="#3D5AFE" d="M11 16h2v2h-2zm1-10c-2.2 0-4 1.8-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.8-3 5h2c0-2.2 3-2.5 3-5 0-2.2-1.8-4-4-4z"></path></svg>
            </MenuButton>

            <MenuButton label="VIP" link="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24"><path stroke="#121212" fill="#fff" d="M17.4 3.8c.7 0 1.3.3 1.6.9l.1.1 3.3 5.8c.4.7.3 1.6-.2 2.3l-.1.1-9.3 9.3c-.5.5-1.2.5-1.7.1l-.1-.1L1.7 13c-.6-.6-.8-1.5-.4-2.3l.1-.1 3.3-5.8c.3-.6.9-.9 1.6-1h11.1zm0 2H6.6l-3.3 5.8 8.8 8.8 8.8-8.8-3.5-5.8z"></path><path fill="#3D5AFE" d="M7.3 10.1c.4-.4.9-.4 1.3-.1l.1.1 3.3 3.3 3.3-3.3c.4-.4 1-.4 1.4 0 .4.4.4.9.1 1.3l-.1.1-3.8 3.8c-.5.5-1.2.5-1.7.1l-.1-.1-3.8-3.8c-.4-.3-.4-1 0-1.4z"></path></svg>
            </MenuButton>

            <MenuButton label="Leaderboard" link="#">
                <svg viewBox="0 0 24 24" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#fff" d="M15 21H9v-8.4c0-.3.3-.6.6-.6h4.8c.3 0 .6.3.6.6V21zm5.4 0H15v-2.9c0-.3.3-.6.6-.6h4.8c.3 0 .6.3.6.6v2.3c0 .3-.3.6-.6.6zM9 21v-4.9c0-.3-.3-.6-.6-.6H3.6c-.3 0-.6.3-.6.6v4.3c0 .3.3.6.6.6H9z"></path><path stroke="#3D5AFE" d="M10.8 5.1l.9-1.9c.1-.2.5-.2.6 0l.9 1.9 2 .3c.3 0 .4.4.2.6l-1.5 1.5.3 2.1c0 .3-.2.5-.5.4L12 9l-1.8 1c-.2.1-.5-.1-.5-.4l.3-2.1L8.6 6c-.2-.2-.1-.5.2-.6l2-.3z"></path></svg>
            </MenuButton>

            <MenuButton label="Invite friends" link="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24"><g className="stroke-current"><path stroke="#fff" d="M14.811 16.405L9.3 13.223m5.511-5.632L9.3 10.773"></path><circle stroke="#3D5AFE" cx="6.15" cy="11.994" r="2.4"></circle><circle stroke="#fff" r="2.4" transform="matrix(1 0 0 -1 17.85 17.995)"></circle><circle stroke="#fff" cx="17.85" cy="6" r="2.4"></circle></g></svg>
            </MenuButton>

            <MenuButton label="Savings interest" link="#">
                <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#3D5AFE" d="M15.822 9v1.828h-2.811v1.194c2.277.103 3.989.544 3.989 1.073 0 .529-1.713.97-3.99 1.072V18h-2.003v-3.832C8.721 14.068 7 13.625 7 13.095c0-.53 1.721-.973 4.007-1.073v-1.194H8.195V9h7.627Zm-2.811 4.71c1.797-.082 3.128-.374 3.128-.723s-1.331-.642-3.13-.723v1.104a19.322 19.322 0 0 1-2.004.001v-1.108c-1.806.08-3.146.374-3.146.724s1.34.644 3.146.724l.12.005c.12.005.242.008.365.011h.011l.104.002h.03l.087.002h.557l.088-.002h.031l.112-.002h.005l.246-.007h.012l.109-.004h.012l.117-.005Z"></path><circle stroke="#fff" fill="none" cx="12" cy="12" r="9"></circle><path stroke="#3D5AFE" d="M15 6h6m-3-3v6"></path></svg>
            </MenuButton>

            <MenuButton label="Trading robot" link="#">
                <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path stroke="#fff" className="stroke-current" d="M12 3v4"></path><rect stroke="#fff" fill="none" x="3" y="7" width="18" height="14" rx="2" className="stroke-current fill-none"></rect><path stroke="#fff" d="M9 17h6" className="stroke-current"></path><circle fill="#3D5AFE" cx="9" cy="13" r="1"></circle><circle fill="#3D5AFE" cx="15" cy="13" r="1"></circle><circle fill="#3D5AFE" cx="12" cy="2.5" r="1.5"></circle></svg>
            </MenuButton>

            <MenuButton label="Mining" link="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24"><path stroke="#3D5AFE" d="M9 9H15V15H9z"></path><rect stroke="#fff" width="16" height="16" x="4" y="4" rx="2" ry="2" className="stroke-current"></rect><path stroke="#fff" d="M9 1v3m6-3v3M9 20v3m6-3v3m5-14h3m-3 5h3M1 9h3m-3 5h3"></path></svg>
            </MenuButton>
        </div>
    </div>
  );
};