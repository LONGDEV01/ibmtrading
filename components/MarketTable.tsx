import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinData } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  coins: CoinData[];
}

export const MarketTable: React.FC<Props> = ({ coins }) => {
  const navigate = useNavigate();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-trade-muted text-sm border-b border-trade-hover">
            <th className="py-4 px-4 font-medium">Name</th>
            <th className="py-4 px-4 font-medium text-right">Price</th>
            <th className="py-4 px-4 font-medium text-right">24h Change</th>
            <th className="py-4 px-4 font-medium text-right hidden md:table-cell">Market Cap</th>
            <th className="py-4 px-4 font-medium text-right hidden lg:table-cell">Volume (24h)</th>
            <th className="py-4 px-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {coins.map((coin) => {
            const priceChange = coin.price_change_percentage_24h || 0;
            return (
                <tr 
                key={coin.id} 
                className="hover:bg-trade-hover transition-colors cursor-pointer border-b border-trade-hover last:border-0"
                onClick={() => navigate(`/trade/${coin.id}`)}
                >
                <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                    <div>
                        <span className="font-semibold text-trade-text mr-2">{coin.symbol.toUpperCase()}</span>
                        <span className="text-trade-muted text-xs hidden sm:inline">{coin.name}</span>
                    </div>
                    </div>
                </td>
                <td className="py-4 px-4 text-right font-medium text-trade-text">
                    {formatCurrency(coin.current_price)}
                </td>
                <td className={`py-4 px-4 text-right font-medium ${priceChange >= 0 ? 'text-trade-buy' : 'text-trade-sell'}`}>
                    <div className="flex items-center justify-end gap-1">
                    {priceChange >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(priceChange).toFixed(2)}%
                    </div>
                </td>
                <td className="py-4 px-4 text-right text-trade-text hidden md:table-cell">
                    {formatCurrency(coin.market_cap)}
                </td>
                <td className="py-4 px-4 text-right text-trade-text hidden lg:table-cell">
                    {formatCurrency(coin.total_volume)}
                </td>
                <td className="py-4 px-4 text-right">
                    <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/trade/${coin.id}`);
                    }}
                    className="text-trade-primary hover:text-white text-xs font-semibold px-3 py-1 border border-trade-primary rounded hover:bg-trade-primary hover:bg-opacity-10"
                    >
                    Trade
                    </button>
                </td>
                </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};