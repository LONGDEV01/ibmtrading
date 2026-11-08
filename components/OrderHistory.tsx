import React from 'react';
import { useTrade } from '../context/TradeContext';

export const OrderHistory = () => {
  const { orders } = useTrade();

  // Sort orders by timestamp descending
  const sortedOrders = [...orders].sort((a, b) => b.timestamp - a.timestamp);

  if (sortedOrders.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center p-8 gap-4 min-h-[200px]">
            <img src="https://static.goldlbma-trade.com/assets/images/empty.svg" alt="Không có dữ liệu" className="w-24 h-24 opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-base text-[#737373]">Không có dữ liệu</span>
        </div>
    );
  }

  return (
    <div className="w-full bg-[#0b0e11]">
        <div className="flex text-xs text-[#888] px-4 py-3 border-b border-[#1B1C21] bg-[#121212]">
            <div className="flex-[1.5]">Cặp/Thời gian</div>
            <div className="flex-1 text-right">Giá khớp</div>
            <div className="flex-1 text-right">Số lượng</div>
            <div className="flex-1 text-right">Trạng thái</div>
        </div>
        <div className="overflow-y-auto max-h-[300px]">
            {sortedOrders.map((order) => (
                <div key={order.id} className="flex items-center px-4 py-3 border-b border-[#1B1C21] text-sm hover:bg-[#1C1C1E] transition-colors">
                    <div className="flex-[1.5] flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className={`font-bold ${order.type === 'BUY' ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                                {order.type === 'BUY' ? 'Mua' : 'Bán'}
                            </span>
                            <span className="text-white font-medium">{order.symbol.toUpperCase()}</span>
                        </div>
                        <span className="text-[10px] text-[#888]">
                            {new Date(order.timestamp).toLocaleString()}
                        </span>
                    </div>
                    <div className="flex-1 text-right text-white font-mono">
                        {order.price.toLocaleString()}
                    </div>
                    <div className="flex-1 text-right text-white font-mono">
                        {order.amount}
                    </div>
                    <div className="flex-1 text-right">
                         <span className="px-2 py-0.5 rounded text-[10px] bg-[#3D5AFE]/20 text-[#3D5AFE]">
                             {order.status === 'FILLED' ? 'Thành công' : order.status}
                         </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};