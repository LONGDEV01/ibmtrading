import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Wallet, Order, TradeContextState, CoinData, Withdrawal } from '../types';

const TradeContext = createContext<TradeContextState | undefined>(undefined);

// Initial Mock Data
const INITIAL_WALLET: Wallet = {
  fiatBalance: 50000, // Start with $50k USDT simulation
  assets: []
};

// Mock Users for Admin
const MOCK_USERS: User[] = [
  { id: 'user_123', name: 'demo_user', email: 'user@lbma.com', isVerified: true, balance: 50000, joinedAt: Date.now() - 10000000 },
  { id: 'user_456', name: 'john_doe', email: 'john@gmail.com', isVerified: false, balance: 1200, joinedAt: Date.now() - 5000000 },
  { id: 'user_789', name: 'alice_w', email: 'alice@yahoo.com', isVerified: true, balance: 8500, joinedAt: Date.now() - 2000000 },
];

// Mock Withdrawals
const MOCK_WITHDRAWALS: Withdrawal[] = [
  { id: 'w_1', userId: 'user_456', userName: 'john_doe', amount: 500, bankName: 'Vietcombank', accountNumber: '0123456789', accountHolder: 'JOHN DOE', status: 'PENDING', timestamp: Date.now() - 3600000 },
  { id: 'w_2', userId: 'user_789', userName: 'alice_w', amount: 2000, bankName: 'Techcombank', accountNumber: '9876543210', accountHolder: 'ALICE W', status: 'APPROVED', timestamp: Date.now() - 86400000 },
];

export const TradeProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<User | null>(null);
  const [wallet, setWallet] = useState<Wallet>(INITIAL_WALLET);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Admin Data States
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(MOCK_WITHDRAWALS);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('gl_user');
    const storedAdmin = localStorage.getItem('gl_admin');
    const storedWallet = localStorage.getItem('gl_wallet');
    const storedOrders = localStorage.getItem('gl_orders');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    if (storedWallet) setWallet(JSON.parse(storedWallet));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
  }, []);

  // Persist updates
  useEffect(() => {
    if (user) localStorage.setItem('gl_user', JSON.stringify(user));
    else localStorage.removeItem('gl_user');
  }, [user]);

  useEffect(() => {
    if (admin) localStorage.setItem('gl_admin', JSON.stringify(admin));
    else localStorage.removeItem('gl_admin');
  }, [admin]);

  useEffect(() => {
    localStorage.setItem('gl_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('gl_orders', JSON.stringify(orders));
  }, [orders]);

  // User Actions
  const login = (identifier: string) => {
    // Determine if email or username or phone
    const name = identifier.includes('@') ? identifier.split('@')[0] : identifier;
    
    setUser({
      id: 'user_123', // Static ID for demo
      name: name,
      email: identifier.includes('@') ? identifier : `${identifier}@lbma.demo`,
      isVerified: true,
      balance: wallet.fiatBalance
    });
  };

  const logout = () => {
    setUser(null);
  };

  // Admin Actions
  const adminLogin = (email: string, pass: string): boolean => {
    // Hardcoded admin credentials
    if (email === 'admin' && pass === 'admin123') {
        setAdmin({
            id: 'admin_001',
            name: 'Administrator',
            email: 'admin@lbma.com',
            isVerified: true
        });
        return true;
    }
    return false;
  };

  const adminLogout = () => {
      setAdmin(null);
  };

  const deposit = (amount: number) => {
    setWallet(prev => ({ ...prev, fiatBalance: prev.fiatBalance + amount }));
  };

  const requestWithdrawal = (amount: number, bankDetails: any) => {
      if (!user) return;
      if (wallet.fiatBalance < amount) return;

      // Deduct immediately (pending state)
      setWallet(prev => ({ ...prev, fiatBalance: prev.fiatBalance - amount }));

      const newWithdrawal: Withdrawal = {
          id: `w_${Date.now()}`,
          userId: user.id,
          userName: user.name,
          amount: amount,
          bankName: bankDetails.bankName,
          accountNumber: bankDetails.accountNumber,
          accountHolder: bankDetails.holderName,
          status: 'PENDING',
          timestamp: Date.now()
      };

      setWithdrawals(prev => [newWithdrawal, ...prev]);
  };

  const processWithdrawal = (id: string, status: 'APPROVED' | 'REJECTED') => {
      setWithdrawals(prev => prev.map(w => {
          if (w.id === id) {
              if (status === 'REJECTED' && w.status === 'PENDING') {
                  // Refund user wallet logic would go here if we were tracking specific user wallets in `allUsers` array deeply
                  // For this demo, we assume the main `wallet` state is the logged in user.
                  // If we were the admin approving the current logged in user's request:
                  if (user && w.userId === user.id) {
                       setWallet(prev => ({...prev, fiatBalance: prev.fiatBalance + w.amount}));
                  }
              }
              return { ...w, status };
          }
          return w;
      }));
  };

  const executeOrder = async (type: 'BUY' | 'SELL', coin: CoinData, price: number, quantity: number): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      // Simulate API latency
      setTimeout(() => {
        const totalCost = price * quantity;

        if (type === 'BUY') {
          if (wallet.fiatBalance < totalCost) {
            resolve({ success: false, message: 'Insufficient USDT balance' });
            return;
          }

          // Update Wallet
          const newFiat = wallet.fiatBalance - totalCost;
          
          // Update Assets
          const existingAsset = wallet.assets.find(a => a.coinId === coin.id);
          let newAssets = [...wallet.assets];
          
          if (existingAsset) {
            newAssets = newAssets.map(a => a.coinId === coin.id ? {
              ...a,
              quantity: a.quantity + quantity,
              avgBuyPrice: ((a.avgBuyPrice * a.quantity) + totalCost) / (a.quantity + quantity)
            } : a);
          } else {
            newAssets.push({
              coinId: coin.id,
              symbol: coin.symbol,
              name: coin.name,
              quantity: quantity,
              avgBuyPrice: price
            });
          }

          setWallet({ fiatBalance: newFiat, assets: newAssets });
        } else {
          // SELL Logic
          const existingAsset = wallet.assets.find(a => a.coinId === coin.id);
          
          if (!existingAsset || existingAsset.quantity < quantity) {
            resolve({ success: false, message: `Insufficient ${coin.symbol.toUpperCase()} balance` });
            return;
          }

          const newFiat = wallet.fiatBalance + totalCost;
          const newAssets = wallet.assets.map(a => a.coinId === coin.id ? {
            ...a,
            quantity: a.quantity - quantity
          } : a).filter(a => a.quantity > 0.00000001); // Filter out dust

          setWallet({ fiatBalance: newFiat, assets: newAssets });
        }

        // Create Order Record
        const newOrder: Order = {
          id: Date.now().toString(),
          type,
          coinId: coin.id,
          symbol: coin.symbol,
          price,
          amount: quantity,
          total: totalCost,
          timestamp: Date.now(),
          status: 'FILLED'
        };

        setOrders(prev => [newOrder, ...prev]);
        resolve({ success: true, message: 'Order executed successfully' });
      }, 500);
    });
  };

  return (
    <TradeContext.Provider value={{
      user,
      admin,
      wallet,
      orders,
      isAuthenticated: !!user,
      isAdminAuthenticated: !!admin,
      allUsers,
      withdrawals,
      login,
      adminLogin,
      logout,
      adminLogout,
      executeOrder,
      deposit,
      requestWithdrawal,
      processWithdrawal
    }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) throw new Error("useTrade must be used within a TradeProvider");
  return context;
};