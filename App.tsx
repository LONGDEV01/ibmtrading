import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TradeProvider } from './context/TradeContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Markets } from './pages/Markets';
import { Trade } from './pages/Trade';
import { WalletPage } from './pages/Wallet';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Welcome } from './pages/Welcome';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <TradeProvider>
      <HashRouter>
        <Layout>
          <Routes>
            {/* Public/User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/trade/:id" element={<Trade />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </TradeProvider>
  );
};

export default App;