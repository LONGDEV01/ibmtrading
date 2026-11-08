import { CoinData, ChartDataPoint } from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';
const CRYPTOCOMPARE_BASE_URL = 'https://min-api.cryptocompare.com/data';

// Simple in-memory cache to avoid hitting rate limits too hard
const cache: {
  coins: { data: CoinData[]; timestamp: number } | null;
  history: Record<string, { data: ChartDataPoint[]; timestamp: number }>;
  specific: Record<string, { data: CoinData[]; timestamp: number }>;
  forex: { data: CoinData[]; timestamp: number } | null;
  commodities: { data: CoinData[]; timestamp: number } | null;
} = {
  coins: null,
  history: {},
  specific: {},
  forex: null,
  commodities: null
};

const CACHE_DURATION = 60 * 1000; // 1 minute

// Track in-flight requests to deduplicate simultaneous calls (React StrictMode, etc)
const inflightRequests: Record<string, Promise<any>> = {};

// Helper for retrying requests with backoff and deduplication
const fetchJsonWithRetry = async (url: string, retries = 3, backoff = 1000): Promise<any> => {
  // Return existing promise if request is already in flight
  if (inflightRequests[url]) {
    return inflightRequests[url];
  }

  const requestPromise = (async () => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: { 'Accept': 'application/json' }
        });
        
        // Rate Limit Handling
        if (response.status === 429) {
          const waitTime = backoff * Math.pow(2, i); // Exponential backoff
          console.warn(`Rate limit hit. Retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }

        if (!response.ok) {
          // Don't retry 404s
          if (response.status === 404) {
             throw new Error('Resource not found (404)');
          }
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        // Don't retry if it's the last attempt
        if (i === retries - 1) throw error;
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, backoff));
      }
    }
    throw new Error('Max retries exceeded');
  })();

  inflightRequests[url] = requestPromise;

  try {
    return await requestPromise;
  } finally {
    // Remove from inflight map when done
    delete inflightRequests[url];
  }
};

export const CoinService = {
  getTopCoins: async (limit = 50): Promise<CoinData[]> => {
    // Check cache
    if (cache.coins && Date.now() - cache.coins.timestamp < CACHE_DURATION) {
      return cache.coins.data;
    }

    try {
      const data = await fetchJsonWithRetry(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`
      );
      
      cache.coins = {
        data: data,
        timestamp: Date.now()
      };

      return data;
    } catch (error) {
      console.warn("Failed to fetch top coins (using cache if available):", error);
      // Return cached data even if expired if fetch fails
      return cache.coins?.data || [];
    }
  },

  getCoinsByIds: async (ids: string[]): Promise<CoinData[]> => {
    if (ids.length === 0) return [];

    const cacheKey = ids.sort().join(',');
    
    if (cache.specific[cacheKey] && Date.now() - cache.specific[cacheKey].timestamp < CACHE_DURATION) {
      return cache.specific[cacheKey].data;
    }

    try {
      const data = await fetchJsonWithRetry(
        `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`
      );

      cache.specific[cacheKey] = {
        data: data,
        timestamp: Date.now()
      };

      return data;
    } catch (error) {
      console.warn("Failed to fetch specific coins:", error);
      return cache.specific[cacheKey]?.data || [];
    }
  },

  getCoinHistory: async (coinId: string, days = '1'): Promise<ChartDataPoint[]> => {
    const cacheKey = `${coinId}-${days}`;
    if (cache.history[cacheKey] && Date.now() - cache.history[cacheKey].timestamp < CACHE_DURATION) {
      return cache.history[cacheKey].data;
    }

    try {
      const data = await fetchJsonWithRetry(
        `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      );
      
      const formattedData = data.prices.map((item: [number, number]) => ({
        time: item[0],
        price: item[1]
      }));

      cache.history[cacheKey] = {
        data: formattedData,
        timestamp: Date.now()
      };

      return formattedData;
    } catch (error) {
      console.warn("Failed to fetch history:", error);
      return cache.history[cacheKey]?.data || [];
    }
  }
};

export const FinancialService = {
  // Fetch Forex & Commodity data using CryptoCompare API
  // Note: 'fsyms' are the assets we want, 'tsyms' is the target currency (USD)
  getMarketData: async (symbols: string[], type: 'forex' | 'commodity'): Promise<CoinData[]> => {
    const cacheKey = type === 'forex' ? 'forex' : 'commodities';
    
    if (cache[cacheKey] && Date.now() - cache[cacheKey]!.timestamp < CACHE_DURATION) {
      return cache[cacheKey]!.data;
    }

    try {
      const symString = symbols.join(',');
      const url = `${CRYPTOCOMPARE_BASE_URL}/pricemultifull?fsyms=${symString}&tsyms=USD`;
      const response = await fetchJsonWithRetry(url);
      
      const raw = response.RAW;
      const display = response.DISPLAY;

      if (!raw) return [];

      const result: CoinData[] = symbols.map(sym => {
        const data = raw[sym]?.USD;
        // Construct a CoinData object from the financial API response
        // Using static images or mapping based on symbol for flags
        let imageUrl = '';
        let name = '';

        if (type === 'forex') {
           // Flag CDN for currencies
           const countryCode = sym.substring(0, 2).toLowerCase(); // EUR -> eu, GBP -> gb
           imageUrl = `https://flagcdn.com/w80/${countryCode === 'eu' ? 'eu' : countryCode}.png`;
           // Adjust specific codes
           if (sym === 'JPY') imageUrl = 'https://flagcdn.com/w80/jp.png';
           if (sym === 'CNY') imageUrl = 'https://flagcdn.com/w80/cn.png';
           if (sym === 'CHF') imageUrl = 'https://flagcdn.com/w80/ch.png';
           
           name = `${sym} / USD`;
        } else {
           // Commodities
           if (sym === 'XAU') { imageUrl = 'https://assets.coingecko.com/coins/images/9519/large/paxg.png'; name = 'Gold (Ounce)'; }
           else if (sym === 'XAG') { imageUrl = 'https://assets.coingecko.com/coins/images/11090/large/icon-silver-logo-only.png'; name = 'Silver (Ounce)'; }
           else { imageUrl = 'https://static.goldlbma-trade.com/assets/images/lbma-logo.jpeg'; name = sym; }
        }

        return {
          id: sym.toLowerCase(), // e.g., 'eur', 'xau'
          symbol: sym,
          name: name,
          image: imageUrl,
          current_price: data?.PRICE || 0,
          market_cap: data?.MKTCAP || 0,
          market_cap_rank: 0,
          total_volume: data?.VOLUME24HOURTO || 0,
          high_24h: data?.HIGH24HOUR || 0,
          low_24h: data?.LOW24HOUR || 0,
          price_change_percentage_24h: data?.CHANGEPCT24HOUR || 0,
        };
      });

      cache[cacheKey] = {
        data: result,
        timestamp: Date.now()
      };

      return result;
    } catch (error) {
      console.warn(`Failed to fetch ${type} data:`, error);
      return cache[cacheKey]?.data || [];
    }
  },

  // Added missing method
  getAssetDetails: async (id: string): Promise<CoinData | null> => {
    const symbol = id.toUpperCase();
    const forexSymbols = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'NZD'];
    const commoditySymbols = ['XAU', 'XAG', 'XPT', 'PA', 'GOLD', 'SILVER', 'WTI', 'OIL', 'NG'];

    if (forexSymbols.includes(symbol)) {
      const data = await FinancialService.getMarketData([symbol], 'forex');
      return data.length > 0 ? data[0] : null;
    }

    if (commoditySymbols.includes(symbol)) {
        const data = await FinancialService.getMarketData([symbol], 'commodity');
        return data.length > 0 ? data[0] : null;
    }

    return null;
  }
};