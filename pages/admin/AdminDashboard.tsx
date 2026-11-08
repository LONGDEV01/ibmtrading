import React, { useState } from 'react';
import { useTrade } from '../../context/TradeContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { 
    Users, 
    ArrowUpRight, 
    LogOut, 
    ShieldCheck, 
    Clock, 
    CheckCircle, 
    XCircle,
    Activity
} from 'lucide-react';

export const AdminDashboard = () => {
  const { admin, adminLogout, allUsers, withdrawals, processWithdrawal } = useTrade();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'users' | 'withdrawals' | 'transactions'>('withdrawals');

  if (!admin) {
      return <Navigate to="/admin" />;
  }

  const handleLogout = () => {
      adminLogout();
      navigate('/admin');
  };

  const PendingWithdrawals = withdrawals.filter(w => w.status === 'PENDING');
  const HistoryWithdrawals = withdrawals.filter(w => w.status !== 'PENDING');

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white flex">
       {/* Sidebar */}
       <aside className="w-64 bg-[#1c1c1e] border-r border-[#2b3139] flex flex-col fixed h-full">
           <div className="p-6 border-b border-[#2b3139] flex items-center gap-3">
               <ShieldCheck className="text-[#3D5AFE]" size={32} />
               <div>
                   <h2 className="font-bold text-lg leading-tight">Admin</h2>
                   <span className="text-xs text-green-500">Online</span>
               </div>
           </div>

           <nav className="flex-1 p-4 space-y-2">
               <SidebarItem 
                   icon={<Users size={20} />} 
                   label="Users Management" 
                   active={activeTab === 'users'} 
                   onClick={() => setActiveTab('users')}
               />
               <SidebarItem 
                   icon={<ArrowUpRight size={20} />} 
                   label="Withdrawals" 
                   active={activeTab === 'withdrawals'} 
                   badge={PendingWithdrawals.length > 0 ? PendingWithdrawals.length : undefined}
                   onClick={() => setActiveTab('withdrawals')}
               />
               <SidebarItem 
                   icon={<Activity size={20} />} 
                   label="System Logs" 
                   active={activeTab === 'transactions'} 
                   onClick={() => setActiveTab('transactions')}
               />
           </nav>

           <div className="p-4 border-t border-[#2b3139]">
               <button 
                   onClick={handleLogout}
                   className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-[#2b3139]/50 rounded transition-colors"
               >
                   <LogOut size={20} />
                   <span>Sign Out</span>
               </button>
           </div>
       </aside>

       {/* Main Content */}
       <main className="flex-1 ml-64 p-8">
           
           <header className="mb-8 flex justify-between items-center">
               <h1 className="text-2xl font-bold">
                   {activeTab === 'users' && 'User Management'}
                   {activeTab === 'withdrawals' && 'Withdrawal Requests'}
                   {activeTab === 'transactions' && 'System Transaction Logs'}
               </h1>
               <div className="text-gray-400 text-sm">
                   Last Login: {new Date().toLocaleString()}
               </div>
           </header>

           {/* CONTENT: WITHDRAWALS */}
           {activeTab === 'withdrawals' && (
               <div className="space-y-8">
                   {/* Pending Section */}
                   <div className="bg-[#1c1c1e] rounded-lg border border-[#2b3139] overflow-hidden">
                       <div className="p-4 bg-[#232429] border-b border-[#2b3139] flex justify-between items-center">
                           <h3 className="font-semibold text-yellow-500 flex items-center gap-2">
                               <Clock size={18} /> Pending Requests
                           </h3>
                           <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">
                               {PendingWithdrawals.length} Pending
                           </span>
                       </div>
                       
                       {PendingWithdrawals.length === 0 ? (
                           <div className="p-8 text-center text-gray-500">No pending requests</div>
                       ) : (
                           <table className="w-full text-left text-sm">
                               <thead className="bg-[#111] text-gray-400">
                                   <tr>
                                       <th className="p-4">Request ID</th>
                                       <th className="p-4">User</th>
                                       <th className="p-4">Amount</th>
                                       <th className="p-4">Bank Details</th>
                                       <th className="p-4 text-center">Actions</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-[#2b3139]">
                                   {PendingWithdrawals.map((w) => (
                                       <tr key={w.id} className="hover:bg-[#2b3139]/30">
                                           <td className="p-4 font-mono text-xs">{w.id}</td>
                                           <td className="p-4">
                                               <div className="font-medium">{w.userName}</div>
                                               <div className="text-xs text-gray-500">ID: {w.userId}</div>
                                           </td>
                                           <td className="p-4 font-bold text-lg">
                                               ${w.amount.toLocaleString()}
                                           </td>
                                           <td className="p-4">
                                               <div className="text-xs text-gray-400">Bank: <span className="text-white">{w.bankName}</span></div>
                                               <div className="text-xs text-gray-400">Acc: <span className="text-white">{w.accountNumber}</span></div>
                                               <div className="text-xs text-gray-400">Name: <span className="text-white">{w.accountHolder}</span></div>
                                           </td>
                                           <td className="p-4">
                                               <div className="flex justify-center gap-2">
                                                   <button 
                                                       onClick={() => processWithdrawal(w.id, 'APPROVED')}
                                                       className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
                                                   >
                                                       APPROVE
                                                   </button>
                                                   <button 
                                                        onClick={() => processWithdrawal(w.id, 'REJECTED')}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors"
                                                   >
                                                       REJECT
                                                   </button>
                                               </div>
                                           </td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       )}
                   </div>

                   {/* History Section */}
                   <div className="bg-[#1c1c1e] rounded-lg border border-[#2b3139] overflow-hidden opacity-75">
                       <div className="p-4 bg-[#232429] border-b border-[#2b3139]">
                           <h3 className="font-semibold text-gray-300">History</h3>
                       </div>
                       <table className="w-full text-left text-sm">
                           <thead className="bg-[#111] text-gray-400">
                               <tr>
                                   <th className="p-4">Date</th>
                                   <th className="p-4">User</th>
                                   <th className="p-4">Amount</th>
                                   <th className="p-4">Status</th>
                               </tr>
                           </thead>
                           <tbody className="divide-y divide-[#2b3139]">
                               {HistoryWithdrawals.map((w) => (
                                   <tr key={w.id}>
                                       <td className="p-4 text-gray-400">{new Date(w.timestamp).toLocaleString()}</td>
                                       <td className="p-4">{w.userName}</td>
                                       <td className="p-4">${w.amount.toLocaleString()}</td>
                                       <td className="p-4">
                                           <span className={`px-2 py-1 rounded text-xs font-bold ${
                                               w.status === 'APPROVED' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                                           }`}>
                                               {w.status}
                                           </span>
                                       </td>
                                   </tr>
                               ))}
                           </tbody>
                       </table>
                   </div>
               </div>
           )}

           {/* CONTENT: USERS */}
           {activeTab === 'users' && (
               <div className="bg-[#1c1c1e] rounded-lg border border-[#2b3139] overflow-hidden">
                   <table className="w-full text-left text-sm">
                       <thead className="bg-[#232429] text-gray-400 uppercase text-xs font-bold">
                           <tr>
                               <th className="p-4">User ID</th>
                               <th className="p-4">Username</th>
                               <th className="p-4">Email</th>
                               <th className="p-4">Joined</th>
                               <th className="p-4">Balance (Est)</th>
                               <th className="p-4">Status</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-[#2b3139]">
                           {allUsers.map((u) => (
                               <tr key={u.id} className="hover:bg-[#2b3139]/30">
                                   <td className="p-4 font-mono text-gray-500">{u.id}</td>
                                   <td className="p-4 font-medium">{u.name}</td>
                                   <td className="p-4 text-gray-400">{u.email}</td>
                                   <td className="p-4 text-gray-500">{u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : 'N/A'}</td>
                                   <td className="p-4 font-bold text-green-400">${u.balance?.toLocaleString()}</td>
                                   <td className="p-4">
                                       {u.isVerified ? (
                                           <span className="flex items-center gap-1 text-green-500 text-xs font-bold"><CheckCircle size={14}/> Verified</span>
                                       ) : (
                                           <span className="flex items-center gap-1 text-yellow-500 text-xs font-bold"><XCircle size={14}/> Unverified</span>
                                       )}
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
           )}

            {/* CONTENT: SYSTEM LOGS */}
            {activeTab === 'transactions' && (
               <div className="flex flex-col items-center justify-center h-96 text-gray-500 bg-[#1c1c1e] rounded border border-[#2b3139]">
                   <Activity size={48} className="mb-4 opacity-50"/>
                   <h3 className="text-xl font-semibold">System Logs</h3>
                   <p>No recent system alerts or critical errors.</p>
               </div>
           )}
       </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, badge }: any) => (
    <div 
        onClick={onClick}
        className={`
            flex items-center justify-between px-4 py-3 rounded cursor-pointer transition-colors
            ${active ? 'bg-[#3D5AFE] text-white shadow-lg' : 'text-gray-400 hover:bg-[#2b3139] hover:text-white'}
        `}
    >
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </div>
        {badge > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {badge}
            </span>
        )}
    </div>
);
