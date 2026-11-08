// CoinGecko API Types
export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface ChartDataPoint {
  time: number;
  price: number;
}

// User & Wallet Types
export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean; // KYC simulation
  balance?: number; // For admin view
  joinedAt?: number;
}

export interface Asset {
  coinId: string;
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
}

export interface Wallet {
  fiatBalance: number; // USDT/USD
  assets: Asset[];
}

export interface Order {
  id: string;
  type: 'BUY' | 'SELL';
  coinId: string;
  symbol: string;
  price: number;
  amount: number; // Quantity of coin
  total: number; // Total USDT value
  timestamp: number;
  status: 'FILLED' | 'CANCELLED';
}

// Admin Types
export interface Withdrawal {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp: number;
}

export interface TradeContextState {
  user: User | null;
  admin: User | null; // Admin User state
  wallet: Wallet;
  orders: Order[];
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  
  // Admin Data
  allUsers: User[];
  withdrawals: Withdrawal[];
  
  // Actions
  login: (email: string) => void;
  adminLogin: (email: string, pass: string) => boolean;
  logout: () => void;
  adminLogout: () => void;
  executeOrder: (type: 'BUY' | 'SELL', coin: CoinData, price: number, quantity: number) => Promise<{ success: boolean; message: string }>;
  deposit: (amount: number) => void;
  requestWithdrawal: (amount: number, bankDetails: any) => void;
  processWithdrawal: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}