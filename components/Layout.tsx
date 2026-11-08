import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTrade } from '../context/TradeContext';
import { Wallet, LogOut, Menu, X, User, Sun } from 'lucide-react';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { user, logout } = useTrade();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === '/';
  const isWelcomePage = location.pathname === '/welcome';
  const isDashboard = location.pathname === '/dashboard';
  const isProfilePage = location.pathname === '/profile';
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Pages that should show the App Header/Footer style
  const isAppPage = ['/dashboard', '/markets', '/wallet'].includes(location.pathname) || location.pathname.startsWith('/trade');

  const isActive = (path: string) => location.pathname === path ? 'text-trade-primary' : 'text-trade-muted hover:text-trade-text';

  // Bottom Navigation Component for App Pages
  const BottomNav = () => {
    const navItems = [
      { 
        label: 'Trang chủ', 
        path: '/dashboard',
        icon: (active: boolean) => (
            <svg width="25" height="24" viewBox="0 0 24 24" aria-hidden="true" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv">
                <path fill={active ? "#3D5AFE" : "#888888"} d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
            </svg>
        )
      },
      { 
        label: 'Thị trường', 
        path: '/markets',
        icon: (active: boolean) => (
            <svg aria-hidden="true" width="25" height="24" viewBox="0 0 24 24" data-testid="CandlestickChartIcon">
                <path fill={active ? "#3D5AFE" : "#888888"} d="M9 4H7v2H5v12h2v2h2v-2h2V6H9zm10 4h-2V4h-2v4h-2v7h2v5h2v-5h2z"></path>
            </svg>
        )
      },
      { 
        label: 'Giao dịch', 
        path: '/trade/bitcoin',
        icon: (active: boolean) => (
            <svg focusable="false" aria-hidden="true" width="25" height="24" viewBox="0 0 24 24" data-testid="ReceiptLongIcon">
                <path fill={active ? "#3D5AFE" : "#888888"} d="M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2zM19 19c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11z"></path>
                <path fill={active ? "#3D5AFE" : "#888888"} d="M9 7h6v2H9zm7 0h2v2h-2zm-7 3h6v2H9zm7 0h2v2h-2z"></path>
            </svg>
        )
      },
      { 
        label: 'Tài sản', 
        path: '/wallet',
        icon: (active: boolean) => (
            <svg aria-hidden="true" width="25" height="24" viewBox="0 0 24 24" data-testid="AccountBalanceWalletIcon">
                <path fill={active ? "#3D5AFE" : "#888888"} d="M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 00-2 2v8a2 2 0 002 2zm-9-2h10V8H12zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"></path>
            </svg>
        )
      },
    ];

    return (
      <div id="menu-bar" className="fixed w-full bottom-0 left-0 z-50">
        <div className="w-full flex items-center bg-[#1B1C21]">
        {navItems.map((item) => {
          const active = location.pathname === item.path || (item.path.includes('/trade') && location.pathname.startsWith('/trade'));
          return (
            <Link 
                key={item.label} 
                to={item.path} 
                className={`flex-1 flex flex-col items-center justify-center text-center py-2 cursor-pointer border-b-2 ${active ? 'border-b-[#3D5AFE]' : 'border-b-transparent'}`}
            >
               {item.icon(active)}
              {/* Using text-[12px] to ensure fit on mobile, slightly smaller than the 14px in snippet to prevent wrapping */}
              <span className={`text-[12px] font-semibold ${active ? 'text-[#3D5AFE]' : 'text-[#888888]'}`}>{item.label}</span>
            </Link>
          );
        })}
        </div>
      </div>
    );
  };

  // If Welcome Page, minimal layout
  if (isWelcomePage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-trade-bg text-trade-text flex flex-col font-sans">
      {/* Navbar - Hidden on App Pages, Profile, Login, Signup AND Admin pages */}
      {!isAppPage && !isProfilePage && !isLoginPage && !isSignupPage && !isAdminPage && (
        <nav 
          className={`
            px-6 py-3 flex items-center justify-between z-50
            ${isLandingPage ? 'fixed top-0 left-0 w-full bg-[#13111a]' : 'sticky top-0 h-20 bg-trade-card border-b border-trade-hover'}
          `}
        >
          
          {/* Left Side: Logo + App Nav */}
          <div className="flex items-center gap-8 relative z-10">
            <Link to={isLandingPage ? "/" : "/dashboard"} className="flex items-center gap-2">
               <div className="flex items-center justify-center">
                 <img src="https://static.goldlbma-trade.com/assets/images/lbma-logo.jpeg" alt="LBMA" className="h-[52px] w-auto rounded" onError={(e) => {
                   e.currentTarget.style.display = 'none';
                   e.currentTarget.nextElementSibling?.classList.remove('hidden');
                 }}/>
                 <div className="hidden flex items-center gap-2">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black">
                      <Sun className="text-yellow-500" fill="currentColor" size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white uppercase">LBMA</span>
                 </div>
              </div>
            </Link>
            
            {/* Desktop App Nav - Hidden if we are using bottom nav everywhere, or keep it for non-dashboard pages */}
            {isAppPage && !isDashboard && (
              <div className="hidden md:flex items-center gap-6">
                 <Link to="/dashboard" className={`text-sm font-medium ${isActive('/dashboard')}`}>Home</Link>
                 <Link to="/markets" className={`text-sm font-medium ${isActive('/markets')}`}>Markets</Link>
                 <Link to="/trade/bitcoin" className={`text-sm font-medium ${isActive('/trade/bitcoin')}`}>Trade</Link>
              </div>
            )}
          </div>

          {/* Center: Landing Page Nav Links (Absolute Centered) */}
          {isLandingPage && (
            <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              {['Home', 'Features', 'About', 'Review', 'Help'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Home' ? '#' : `#${item.toLowerCase()}`}
                  className="py-4 px-5 font-semibold text-[#fff] hover:text-trade-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          )}

          {/* Right Side: User Actions */}
          <div className="flex items-center gap-4 relative z-10">
            {isLandingPage ? (
               <div className="hidden md:block">
                  <Link to="/welcome" className="relative group flex items-center justify-center cursor-pointer">
                     <div className="absolute top-0 left-0 group-hover:top-[3px] group-hover:left-[3px] bg-[#fff] duration-300 ease-in-out w-full h-full rounded-[2px]"></div>
                     <div className="relative text-[#000] bg-[#f7a600] px-8 py-[10px] font-bold rounded-[2px]">
                        Get started
                     </div>
                  </Link>
               </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <>
                    <Link to="/wallet" className={`flex items-center gap-2 text-sm ${isActive('/wallet')}`}>
                      <Wallet size={16} /> Wallet
                    </Link>
                    <div className="h-4 w-px bg-trade-muted opacity-30"></div>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span className="text-sm">{user.name}</span>
                    </div>
                    <button onClick={() => { logout(); navigate('/'); }} className="text-trade-muted hover:text-trade-sell">
                      <LogOut size={18} />
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-trade-primary hover:bg-yellow-500 text-black px-4 py-1.5 rounded text-sm font-semibold transition-colors">
                     Log In
                   </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            {!isAppPage && (
              <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Mobile Menu Overlay (Landing Page Only) */}
      {mobileMenuOpen && !isAppPage && !isAdminPage && (
        <div className="lg:hidden fixed inset-0 top-[76px] bg-[#13111a] z-40 p-6 flex flex-col gap-6 overflow-y-auto">
             <>
                {['Home', 'Features', 'About', 'Review', 'Help'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-xl font-semibold text-white">{item}</a>
                ))}
                <Link to="/welcome" onClick={() => setMobileMenuOpen(false)} className="bg-[#f7a600] text-center text-black font-bold py-3 rounded-lg mt-4">Get started</Link>
             </>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-x-hidden ${isAppPage ? 'pb-24' : ''}`}>
        {children}
      </main>

      {/* Bottom Nav for App Pages */}
      {isAppPage && <BottomNav />}

      {/* Footer (Only on Landing Page) */}
      {isLandingPage && (
        <footer className="bg-[#0b0e11] pt-12 pb-6 px-4 md:px-8 border-t border-trade-hover/20">
            {/* Footer Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                   <div className="flex items-center gap-2 mb-4">
                      <img src="https://static.goldlbma-trade.com/assets/images/lbma-logo.jpeg" alt="LBMA" className="h-8 w-auto rounded" />
                      <span className="text-xl font-bold text-white uppercase ml-2">LBMA</span>
                   </div>
                   <p className="text-trade-muted text-sm">
                       Copyright 2014, All Rights Reserved by EUREX
                   </p>
                </div>
                {/* ... other footer columns ... */}
            </div>
        </footer>
      )}
    </div>
  );
};