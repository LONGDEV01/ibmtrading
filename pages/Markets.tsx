import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinService, FinancialService } from '../services/api';
import { CoinData } from '../types';

// CryptoCompare Symbols
const COMMODITY_SYMBOLS = ['XAU', 'XAG']; 
const FOREX_SYMBOLS = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'NZD'];

export const Markets = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'commodity' | 'crypto' | 'forex'>('commodity');
  
  const [cryptoCoins, setCryptoCoins] = useState<CoinData[]>([]);
  const [commodityCoins, setCommodityCoins] = useState<CoinData[]>([]);
  const [forexCoins, setForexCoins] = useState<CoinData[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Commodities (Real Financial Data)
        const commodities = await FinancialService.getMarketData(COMMODITY_SYMBOLS, 'commodity');
        setCommodityCoins(commodities);
        
        // 2. Fetch Forex (Real Financial Data)
        const forex = await FinancialService.getMarketData(FOREX_SYMBOLS, 'forex');
        setForexCoins(forex);

        // 3. Fetch Crypto (CoinGecko)
        const crypto = await CoinService.getTopCoins(50);
        setCryptoCoins(crypto);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data", error);
        setLoading(false);
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderList = () => {
    let data: CoinData[] = [];

    if (activeTab === 'commodity') {
        data = commodityCoins;
    } else if (activeTab === 'forex') {
        data = forexCoins;
    } else {
        data = cryptoCoins;
    }

    if (loading && data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 gap-4">
                <div className="w-8 h-8 border-2 border-[#3D5AFE] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-500">Loading market data...</span>
            </div>
        );
    }

    if (!loading && data.length === 0) {
        return <div className="p-12 text-center text-gray-500">No data available. Check connection.</div>;
    }

    return (
        <div className="pb-24">
            {/* Table Header Row */}
            <div className="flex justify-between items-center px-4 py-3 text-[13px] text-gray-400 bg-black sticky top-[53px] z-10 border-b border-[#1B1C21]">
                <div className="w-[40%] text-left">Trading Pairs / Vol</div>
                <div className="w-[30%] text-right">Price</div>
                <div className="w-[30%] text-right">24h Change</div>
            </div>

            {/* List Items */}
            {data.map((item) => {
                // Safety Checks for Null/Undefined values
                const currentPrice = Number(item.current_price || 0);
                const priceChange = Number(item.price_change_percentage_24h || 0);
                const totalVolume = Number(item.total_volume || 0);
                const isForex = activeTab === 'forex';
                const isCommodity = activeTab === 'commodity';

                // Display name logic
                let displayName = item.symbol.toUpperCase();
                let subName = '/ USDT';
                
                if (isForex) {
                    subName = '/ USD';
                } else if (isCommodity) {
                    subName = '/ USD';
                }

                return (
                    <div 
                        key={item.id} 
                        onClick={() => navigate(`/trade/${item.id}`)}
                        className="flex justify-between items-center px-4 py-4 border-b border-[#1B1C21] hover:bg-[#110F15] cursor-pointer active:bg-[#1c1c1e] transition-colors"
                    >
                        {/* Left: Symbol & Volume */}
                        <div className="w-[40%] flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2">
                                <img 
                                    src={item.image} 
                                    alt={item.symbol} 
                                    className={`w-5 h-5 ${isForex ? 'rounded-[2px]' : 'rounded-full'} object-cover`}
                                />
                                <div className="flex items-baseline gap-1">
                                    <span className="text-white font-bold text-[15px]">{displayName}</span>
                                    <span className="text-gray-500 text-[11px] font-normal">{subName}</span>
                                </div>
                            </div>
                            <span className="text-gray-500 text-[11px]">
                                Vol: {totalVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </span>
                        </div>

                        {/* Middle: Price */}
                        <div className="w-[30%] flex flex-col items-end gap-1">
                            <span className={`text-[15px] font-bold text-white`}>
                                {currentPrice.toLocaleString(undefined, { maximumFractionDigits: isForex ? 4 : 2, minimumFractionDigits: isForex ? 4 : 2 })}
                            </span>
                            <span className="text-gray-500 text-[11px]">
                                ${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </span>
                        </div>

                        {/* Right: Change % Button */}
                        <div className="w-[30%] flex justify-end">
                            <div className={`
                                w-[85px] py-2 rounded-[4px] flex items-center justify-center font-bold text-[13px] text-white transition-opacity
                                ${priceChange >= 0 ? 'bg-[#0ecb81]' : 'bg-[#f6465d]'}
                            `}>
                                {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
  };

  return (
    <div className="bg-black min-h-screen font-sans">
      {/* Fixed Top Tab Navigation */}
      <div className="fixed top-0 left-0 w-full z-40 bg-[#110F15] flex items-center border-b border-[#1B1C21]">
         <div 
            onClick={() => setActiveTab('commodity')}
            className={`flex-1 py-4 text-center cursor-pointer text-sm font-semibold border-b-2 transition-colors ${activeTab === 'commodity' ? 'border-[#3D5AFE] text-[#3D5AFE]' : 'border-transparent text-[#888888]'}`}
         >
            Commodities
         </div>
         <div 
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 py-4 text-center cursor-pointer text-sm font-semibold border-b-2 transition-colors ${activeTab === 'crypto' ? 'border-[#3D5AFE] text-[#3D5AFE]' : 'border-transparent text-[#888888]'}`}
         >
            Crypto
         </div>
         <div 
            onClick={() => setActiveTab('forex')}
            className={`flex-1 py-4 text-center cursor-pointer text-sm font-semibold border-b-2 transition-colors ${activeTab === 'forex' ? 'border-[#3D5AFE] text-[#3D5AFE]' : 'border-transparent text-[#888888]'}`}
         >
            Forex
         </div>
      </div>

      {/* Spacer to push content below fixed header */}
      <div className="pt-[54px]">
          {renderList()}
      </div>
    </div>
  );
};