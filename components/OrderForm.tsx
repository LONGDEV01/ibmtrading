import React, { useState, useEffect } from 'react';
import { useTrade } from '../context/TradeContext';
import { CoinData } from '../types';
import { useNavigate } from 'react-router-dom';

interface Props {
  coin: CoinData;
}

export const OrderForm: React.FC<Props> = ({ coin }) => {
  const { user, wallet, executeOrder } = useTrade();
  const navigate = useNavigate();
  const [type, setType] = useState<'BUY' | 'SELL'>('BUY');
  const [price, setPrice] = useState<string>(coin.current_price.toString());
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    setPrice(coin.current_price.toString());
  }, [coin.current_price]);

  // Asset holdings for this coin
  const asset = wallet.assets.find(a => a.coinId === coin.id);
  const availableCoin = asset ? asset.quantity : 0;
  const availableUSDT = wallet.fiatBalance;

  const total = parseFloat(price) * (parseFloat(amount) || 0);

  const handlePercentage = (percent: number) => {
    if (type === 'BUY') {
      const maxBuy = availableUSDT / parseFloat(price);
      setAmount((maxBuy * percent).toFixed(6));
    } else {
      setAmount((availableCoin * percent).toFixed(6));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    setMsg(null);
    setIsLoading(true);

    try {
      const result = await executeOrder(
        type,
        coin,
        parseFloat(price),
        parseFloat(amount)
      );

      setMsg({ type: result.success ? 'success' : 'error', text: result.message });
      if (result.success) {
        setAmount('');
      }
    } catch (error) {
      setMsg({ type: 'error', text: 'Transaction failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-trade-card rounded-lg p-4 border border-trade-hover h-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setType('BUY')}
          className={`flex-1 py-2 rounded font-semibold text-sm transition-colors ${type === 'BUY' ? 'bg-trade-buy text-white' : 'bg-trade-hover text-trade-muted'}`}
        >
          Buy
        </button>
        <button 
          onClick={() => setType('SELL')}
          className={`flex-1 py-2 rounded font-semibold text-sm transition-colors ${type === 'SELL' ? 'bg-trade-sell text-white' : 'bg-trade-hover text-trade-muted'}`}
        >
          Sell
        </button>
      </div>

      <div className="flex justify-between text-xs text-trade-muted mb-2">
        <span>Available</span>
        <span className="text-trade-text">
          {type === 'BUY' 
            ? `${availableUSDT.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` 
            : `${availableCoin.toFixed(6)} ${coin.symbol.toUpperCase()}`
          }
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Price Input */}
        <div className="relative">
          <label className="text-xs text-trade-muted mb-1 block">Price (USDT)</label>
          <div className="flex bg-trade-bg border border-trade-hover rounded hover:border-trade-primary focus-within:border-trade-primary transition-colors">
            <input 
              type="number" 
              step="any"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-transparent text-trade-text p-2 outline-none text-right font-mono"
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="relative">
          <label className="text-xs text-trade-muted mb-1 block">Amount ({coin.symbol.toUpperCase()})</label>
          <div className="flex bg-trade-bg border border-trade-hover rounded hover:border-trade-primary focus-within:border-trade-primary transition-colors">
            <input 
              type="number" 
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent text-trade-text p-2 outline-none text-right font-mono"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Percentage Slider / Buttons */}
        <div className="flex justify-between gap-1">
          {[0.25, 0.5, 0.75, 1].map((pct) => (
            <button 
              key={pct}
              type="button"
              onClick={() => handlePercentage(pct)}
              className="bg-trade-hover text-trade-muted text-xs py-1 px-2 rounded hover:bg-trade-primary hover:text-black transition-colors flex-1"
            >
              {pct * 100}%
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="bg-trade-bg p-3 rounded flex justify-between items-center border border-trade-hover border-dashed">
          <span className="text-sm text-trade-muted">Total</span>
          <span className="text-lg font-mono text-trade-text">{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>

        {/* Action Button */}
        <button 
          type="submit"
          disabled={isLoading || parseFloat(amount) <= 0}
          className={`w-full py-3 rounded font-bold text-base mt-2 transition-transform active:scale-95 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          } ${
            type === 'BUY' 
              ? 'bg-trade-buy hover:bg-green-600 text-white' 
              : 'bg-trade-sell hover:bg-red-600 text-white'
          }`}
        >
          {user ? (isLoading ? 'Processing...' : `${type} ${coin.symbol.toUpperCase()}`) : 'Log In to Trade'}
        </button>

        {msg && (
          <div className={`text-xs text-center p-2 rounded ${msg.type === 'success' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
            {msg.text}
          </div>
        )}
      </form>
    </div>
  );
};