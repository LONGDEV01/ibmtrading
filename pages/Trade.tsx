import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CoinService, FinancialService } from '../services/api';
import { CoinData } from '../types';
import { useTrade } from '../context/TradeContext';
import { TradingViewWidget } from '../components/TradingViewWidget';
import { OrderHistory } from '../components/OrderHistory';
import { X, RefreshCw, Heart } from 'lucide-react';

// Helper for smart price formatting
const formatPrice = (price: number) => {
    if (!price) return '0.00';
    if (price < 0.01) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    if (price < 50) return price.toFixed(3);
    return price.toFixed(2);
};

const formatAmount = (amount: number) => {
    if (amount > 1000) return amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return amount.toFixed(4);
};

export const Trade = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { wallet, executeOrder } = useTrade();
  
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chart' | 'trade'>('chart');
  const [subTab, setSubTab] = useState<'positions' | 'orders'>('positions');
  
  // Binary Option State
  const [selectedTime, setSelectedTime] = useState(0); 
  const [amount, setAmount] = useState<string>('10');
  const [sliderValue, setSliderValue] = useState(0);
  const [showConfirm, setShowConfirm] = useState<'UP' | 'DOWN' | null>(null);
  
  // Live Ticker State for Order Book
  const [ticker, setTicker] = useState<{ price: number, asks: any[], bids: any[] } | null>(null);

  const coinId = id || 'bitcoin';

  const timeOptions = [
    { label: '1 Phút', profit: 5, value: 1 },
    { label: '2 Phút', profit: 10, value: 2 },
    { label: '4 Phút', profit: 20, value: 4 },
    { label: '6 Phút', profit: 30, value: 6 },
    { label: '8 Phút', profit: 40, value: 8 },
    { label: '12 Phút', profit: 100, value: 12 },
  ];

  const fetchData = async () => {
      setError(false);
      setCoin(null);
      try {
        let foundCoin: CoinData | null | undefined;

        // 1. Try Financial Assets first (Commodities/Forex)
        foundCoin = await FinancialService.getAssetDetails(coinId);

        // 2. If not found, try specific crypto fetch
        if (!foundCoin) {
            try {
                const specificData = await CoinService.getCoinsByIds([coinId]);
                if (specificData && specificData.length > 0) {
                    foundCoin = specificData[0];
                }
            } catch (e) {}
        }
        
        // 3. Fallback to top coins list
        if (!foundCoin) {
           const marketData = await CoinService.getTopCoins(100);
           foundCoin = marketData.find(c => c.id === coinId);
        }

        if (foundCoin) {
            setCoin(foundCoin);
        } else {
            setError(true);
        }
      } catch (error) {
        console.error("Failed to fetch trade data", error);
        setError(true);
      }
    };

  useEffect(() => {
    fetchData();
  }, [coinId]);

  // Live Order Book Generation
  useEffect(() => {
    if (!coin) return;

    // Initialize ticker with current coin price
    let currentPrice = coin.current_price;

    const generateOrderBook = () => {
        // Simulating live price movement (Random walk)
        const volatility = currentPrice * 0.0005; // 0.05% volatility
        const movement = (Math.random() - 0.5) * volatility;
        currentPrice = currentPrice + movement;

        const generateRow = (basePrice: number, type: 'ask' | 'bid') => {
            const rows = [];
            for (let i = 0; i < 7; i++) {
                 // Spread increases as we go further from center
                 const spread = basePrice * (0.0002 + (i * 0.0005)); 
                 const noise = basePrice * (Math.random() * 0.0002);
                 
                 let rowPrice;
                 if (type === 'ask') {
                     // Asks are above current price
                     rowPrice = basePrice + spread + noise;
                 } else {
                     // Bids are below current price
                     rowPrice = basePrice - spread - noise;
                 }
                 
                 // Randomize volume based on price
                 const amt = (Math.random() * 10000 / rowPrice) + (Math.random() * 100);
                 const width = Math.min(Math.floor((amt / (10000 / rowPrice)) * 100), 100); 
                 
                 rows.push({ price: rowPrice, amount: amt, width: Math.max(5, width) });
            }
            // Sort Descending (High -> Low)
            // For Asks (Green Top): High values at top, Low values (closest to spread) at bottom
            // For Bids (Red Bottom): High values (closest to spread) at top, Low values at bottom
            return rows.sort((a, b) => b.price - a.price);
        };

        setTicker({
            price: currentPrice,
            asks: generateRow(currentPrice, 'ask'),
            bids: generateRow(currentPrice, 'bid')
        });
    };

    generateOrderBook(); // Run immediately
    const interval = setInterval(generateOrderBook, 1500); // Update every 1.5s
    return () => clearInterval(interval);

  }, [coin]);

  if (error) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
            <span className="text-red-500">Failed to load asset data.</span>
            <button 
                onClick={fetchData} 
                className="flex items-center gap-2 px-4 py-2 bg-[#3D5AFE] rounded hover:bg-[#2a3eb1] transition-colors"
            >
                <RefreshCw size={18} /> Retry
            </button>
            <button onClick={() => navigate('/markets')} className="text-[#888] text-sm hover:text-white">Back to Markets</button>
        </div>
      );
  }

  if (!coin) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-[#3D5AFE]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3D5AFE]"></div>
        </div>
    );
  }

  const currentOption = timeOptions[selectedTime];
  const profitAmount = (parseFloat(amount || '0') * currentOption.profit) / 100;
  // Use simulated price for calculations if available, else static
  const activePrice = ticker ? ticker.price : coin.current_price;

  const handleTrade = async () => {
    if (!showConfirm) return;
    await executeOrder(showConfirm === 'UP' ? 'BUY' : 'SELL', coin, activePrice, parseFloat(amount));
    setShowConfirm(null);
    setSubTab('orders'); 
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value);
      setSliderValue(val);
      if (wallet.fiatBalance > 0) {
          const newAmount = (wallet.fiatBalance * val) / 100;
          setAmount(newAmount.toFixed(2));
      }
  };

  // Determine Symbol for TradingView
  let tvSymbol = `BINANCE:${coin.symbol.toUpperCase()}USDT`;
  if (['XAU', 'XAG', 'XPT', 'PA', 'GOLD', 'SILVER'].includes(coin.symbol.toUpperCase())) {
     tvSymbol = `TVC:${coin.name.toUpperCase()}`; 
     if (coin.symbol === 'XAU') tvSymbol = 'OANDA:XAUUSD';
     if (coin.symbol === 'XAG') tvSymbol = 'OANDA:XAGUSD';
  } else if (['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'NZD'].includes(coin.symbol.toUpperCase())) {
     tvSymbol = `FX_IDC:${coin.symbol.toUpperCase()}USD`;
  }

  return (
    <div className="flex flex-col bg-black text-white font-sans relative">
      
      {/* Tabs */}
      <div className="w-full bg-[#000000] z-[30] border-b border-[#1B1C21]">
        <div className="flex relative">
            <button 
                onClick={() => setActiveTab('chart')} 
                className={`flex-1 tab-button font-medium px-4 py-3 rounded-[0px] normal-case text-base transition-colors ${activeTab === 'chart' ? 'text-[#3D5AFE]' : 'text-[#999]'}`}
            >
                Biểu đồ
            </button>
            <button 
                onClick={() => setActiveTab('trade')} 
                className={`flex-1 tab-button font-medium px-4 py-3 rounded-[0px] normal-case text-base transition-colors ${activeTab === 'trade' ? 'text-[#3D5AFE]' : 'text-[#999]'}`}
            >
                Giao dịch
            </button>
            <div 
                className="absolute bottom-0 left-0 h-[2px] bg-[#3D5AFE] transition-all duration-300" 
                style={{ width: '50%', transform: `translateX(${activeTab === 'chart' ? '0%' : '100%'})` }}
            ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto bg-black pb-4" id="box">
         
         {/* CHART VIEW */}
         <div style={{ display: activeTab === 'chart' ? 'block' : 'none' }}>
             <div className="h-[70vh] w-full bg-[#131722]">
                 <div className="relative h-full w-full">
                    <TradingViewWidget symbol={tvSymbol} />
                 </div>
             </div>
             <div className="mb-20">
                 <div className="relative mt-2">
                     <div className="last:ml-4 w-full overflow-x-hidden">
                        <div className="flex relative items-center">
                            <button onClick={() => setSubTab('positions')} className={`px-0 mx-2 py-2 bg-transparent font-medium normal-case transition-colors ${subTab === 'positions' ? 'text-[#3D5AFE]' : 'text-[#999]'}`}>Vị thế</button>
                            <button onClick={() => setSubTab('orders')} className={`px-0 mx-2 py-2 bg-transparent font-medium normal-case transition-colors ${subTab === 'orders' ? 'text-[#3D5AFE]' : 'text-[#999]'}`}>Đơn hàng</button>
                             <div className="absolute bottom-0 left-0 h-[2px] bg-[#3D5AFE] transition-all duration-300" style={{ width: '60px', transform: `translateX(${subTab === 'positions' ? '8px' : '70px'})` }}></div>
                        </div>
                     </div>
                     <button onClick={() => setSubTab('orders')} className="text-[#3D5AFE] absolute top-1 right-4 text-sm font-medium">Tất cả đơn hàng</button>
                 </div>
                 <div>
                     {subTab === 'positions' && (
                         <div className="flex flex-col items-center justify-center p-8 gap-4 min-h-[200px]">
                            <img src="https://static.goldlbma-trade.com/assets/images/empty.svg" alt="Không có dữ liệu" className="w-24 h-24 opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <span className="text-base text-[#737373]">Không có dữ liệu</span>
                        </div>
                     )}
                     {subTab === 'orders' && <OrderHistory />}
                 </div>
             </div>

             {/* FIXED BOTTOM BUTTONS for Chart View */}
             <div id="tradeBtn" className="fixed left-0 right-0 flex items-center gap-3 px-4 py-2 z-40 bg-[#000000]" style={{ bottom: '63px' }}>
                <button onClick={() => setActiveTab('trade')} className="w-full overflow-hidden rounded shadow-sm"><div className="w-full bg-[#0ecb81] py-[6px] px-4 text-white font-medium text-center">Mua lên</div></button>
                <button onClick={() => setActiveTab('trade')} className="w-full overflow-hidden rounded shadow-sm"><div className="w-full bg-[#f6465d] py-[6px] px-4 text-white font-medium text-center">Mua xuống</div></button>
            </div>
         </div>

         {/* TRADE VIEW - UPDATED LAYOUT */}
         <div style={{ display: activeTab === 'trade' ? 'block' : 'none' }} className="w-full">
            <div className="py-3 px-4">
                <div className="flex flex-row space-x-1 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img className="w-8 h-8 rounded-full" src={coin.image} alt={coin.symbol} />
                        <div className="text-[16px] flex gap-1 font-bold items-center">
                            <span className="text-white">{coin.symbol.toUpperCase()} / USDT</span>
                            <span className={`px-2 py-1 flex items-center rounded ml-1 text-[12px] font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-[#0ecb81] bg-[#0ecb8133]' : 'text-[#f6465d] bg-[#f6465d33]'}`}>
                                {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                    <div>
                        <Heart className="text-[#999]" size={24} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 p-4 gap-4">
                {/* Left Column: Inputs */}
                <div className="col-span-7">
                    {/* Time Options Grid */}
                    <div className="grid grid-cols-3 gap-2 pb-3">
                        {timeOptions.map((opt, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => setSelectedTime(idx)} 
                                className={`flex flex-col items-center rounded-lg bg-[#1c1c1e] border-2 cursor-pointer ${selectedTime === idx ? 'border-[#3D5AFE]' : 'border-transparent'}`}
                            >
                                <span className="text-[12px] text-[#fff] whitespace-nowrap mt-1">Lợi nhuận</span>
                                <h6 className="text-[20px] font-bold mx-2 my-0 text-[#fff]">{opt.profit}%</h6>
                                <div className={`text-[12px] w-full text-center rounded-b-lg text-[#fff] whitespace-nowrap py-0.5 ${selectedTime === idx ? 'bg-[#3D5AFE]' : 'bg-[#2C2C2E]'}`}>
                                    {opt.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Balance & Slider */}
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-[12px] text-[#888888]">Số dư</span>
                        <span className="text-[12px] text-[#fff]">{wallet.fiatBalance.toLocaleString('en-US')} USDT</span>
                    </div>
                    <div className="px-1 mt-2 mb-4">
                         <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={sliderValue} 
                            onChange={handleSliderChange}
                            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#3D5AFE]"
                         />
                         <div className="text-center text-xs text-[#3D5AFE] mt-1">{sliderValue}%</div>
                    </div>

                    {/* Amount Input */}
                    <div className="mt-2 flex flex-col">
                        <div className="bg-[#1D1C22] relative rounded border border-transparent focus-within:border-[#3D5AFE]">
                            <input 
                                className="w-full text-white text-lg rounded-sm p-2 bg-transparent border-none outline-none" 
                                placeholder="0.00" 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <div className="text-gray-400 font-thin absolute right-2 top-1/2 -translate-y-1/2 text-sm">USDT</div>
                        </div>
                        <span className="text-[#fff] mt-2 text-xs">≈ 0 USD</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mt-4">
                        <button onClick={() => setShowConfirm('UP')} className="w-full overflow-hidden rounded shadow-sm">
                            <div className="w-full bg-[#0ecb81] py-2 px-4 text-white font-medium text-center">Mua lên</div>
                        </button>
                        <button onClick={() => setShowConfirm('DOWN')} className="w-full overflow-hidden rounded shadow-sm">
                            <div className="w-full bg-[#f6465d] py-2 px-4 text-white font-medium text-center">Mua xuống</div>
                        </button>
                    </div>
                </div>

                {/* Right Column: Order Book (Live Data) */}
                <div className="col-span-5 pl-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-[#fff] opacity-30">Giá</span>
                        <span className="text-[10px] text-[#fff] opacity-30">Số tiền</span>
                    </div>
                    
                    {/* Top Rows: Asks (Green text per screenshot) */}
                    <div className="flex flex-col gap-1">
                        {ticker?.asks.map((ask, i) => (
                            <div key={`ask-${i}`} className="flex relative justify-between h-[20px] items-center overflow-hidden">
                                <span className="text-[#0ecb81] text-[12px] z-10">{formatPrice(ask.price)}</span>
                                <span className="text-[#fff] text-[12px] z-10">{formatAmount(ask.amount)}</span>
                                <div 
                                    className="absolute top-0 right-0 h-full transition-all duration-500 ease-out" 
                                    style={{ 
                                        width: `${ask.width}%`,
                                        backgroundColor: 'rgba(14, 203, 129, 0.15)' 
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* Current Price Middle - LEFT ALIGNED */}
                    <div className="flex flex-col my-1 items-start">
                        <span className="text-[#0ecb81] font-bold text-[16px]">{formatPrice(activePrice)}</span>
                        <span className="text-[#fff] text-[12px]">≈ {formatPrice(activePrice)} USDT</span>
                    </div>

                    {/* Bottom Rows: Bids (Red text per screenshot) */}
                    <div className="flex flex-col gap-1">
                         {ticker?.bids.map((bid, i) => (
                            <div key={`bid-${i}`} className="flex relative justify-between h-[20px] items-center overflow-hidden">
                                <span className="text-[#f6465d] text-[12px] z-10">{formatPrice(bid.price)}</span>
                                <span className="text-[#fff] text-[12px] z-10">{formatAmount(bid.amount)}</span>
                                <div 
                                    className="absolute top-0 right-0 h-full transition-all duration-500 ease-out" 
                                    style={{ 
                                        width: `${bid.width}%`,
                                        backgroundColor: 'rgba(246, 70, 93, 0.15)'
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Positions / Order History for Trade View */}
             <div className="mb-20 border-t border-[#1B1C21]">
                 <div className="relative mt-2">
                     <div className="last:ml-4 w-full overflow-x-hidden">
                        <div className="flex relative items-center">
                            <button onClick={() => setSubTab('positions')} className={`px-0 mx-2 py-2 bg-transparent font-medium normal-case transition-colors ${subTab === 'positions' ? 'text-[#3D5AFE]' : 'text-[#999]'}`}>Vị thế</button>
                            <button onClick={() => setSubTab('orders')} className={`px-0 mx-2 py-2 bg-transparent font-medium normal-case transition-colors ${subTab === 'orders' ? 'text-[#3D5AFE]' : 'text-[#999]'}`}>Đơn hàng</button>
                             <div className="absolute bottom-0 left-0 h-[2px] bg-[#3D5AFE] transition-all duration-300" style={{ width: '60px', transform: `translateX(${subTab === 'positions' ? '8px' : '70px'})` }}></div>
                        </div>
                     </div>
                     <button onClick={() => setSubTab('orders')} className="text-[#3D5AFE] absolute top-1 right-4 text-sm font-medium">Tất cả đơn hàng</button>
                 </div>
                 <div>
                     {subTab === 'positions' && (
                         <div className="flex flex-col items-center justify-center p-8 gap-4 min-h-[200px]">
                            <img src="https://static.goldlbma-trade.com/assets/images/empty.svg" alt="Không có dữ liệu" className="w-24 h-24 opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
                            <span className="text-base text-[#737373]">Không có dữ liệu</span>
                        </div>
                     )}
                     {subTab === 'orders' && <OrderHistory />}
                 </div>
             </div>
         </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full sm:w-[400px] bg-[#1C1C1E] rounded-xl overflow-hidden animate-slide-up border border-[#2C2C2E] shadow-2xl">
                <div className="flex justify-between items-center p-4 border-b border-[#2C2C2E]">
                    <h3 className="text-white font-bold text-lg">Xác nhận giao dịch</h3>
                    <button onClick={() => setShowConfirm(null)} className="text-[#888888] hover:text-white"><X size={24} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[#888888]">Tài sản</span>
                        <div className="flex items-center gap-2">
                             <img src={coin.image} alt="" className="w-5 h-5 rounded-full" onError={(e) => e.currentTarget.style.display = 'none'} />
                             <span className="text-white font-bold">{coin.symbol.toUpperCase()}/USDT</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[#888888]">Hướng</span>
                        <span className={`font-bold ${showConfirm === 'UP' ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>{showConfirm === 'UP' ? 'Mua lên (Long)' : 'Mua xuống (Short)'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[#888888]">Thời gian</span>
                        <span className="text-white font-bold">{currentOption.label}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[#888888]">Số tiền đầu tư</span>
                        <span className="text-white font-bold">{parseFloat(amount).toFixed(2)} USDT</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-2 border-t border-[#2C2C2E]">
                         <span className="text-[#888888]">Lợi nhuận</span>
                         <span className="text-[#0ecb81] font-bold">+{profitAmount.toFixed(2)} USDT</span>
                    </div>
                </div>
                <div className="p-4 pt-0">
                    <button onClick={handleTrade} className={`w-full py-3 rounded font-bold text-lg text-white ${showConfirm === 'UP' ? 'bg-[#0ecb81]' : 'bg-[#f6465d]'}`}>
                        {showConfirm === 'UP' ? 'Xác nhận Mua' : 'Xác nhận Bán'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
