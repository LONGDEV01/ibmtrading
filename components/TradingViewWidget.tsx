import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
}

export const TradingViewWidget: React.FC<TradingViewWidgetProps> = memo(({ symbol }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up previous script to avoid duplicates
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // Robust Symbol Parsing
    let tvSymbol = symbol;

    // Only apply default formatting if no prefix is present (e.g. no colon like "BINANCE:" or "OANDA:")
    if (!tvSymbol.includes(':')) {
        let rawSymbol = tvSymbol.toUpperCase();
        // Remove 'BINANCE:' prefix if it exists in a raw form accidentally
        rawSymbol = rawSymbol.replace('BINANCE:', '');
        
        // Ensure USDT suffix exists for crypto defaults
        if (!rawSymbol.includes('USDT') && !rawSymbol.includes('USD') && !rawSymbol.includes('BTC') && !rawSymbol.includes('ETH')) {
            rawSymbol += 'USDT';
        }

        // Re-add prefix default to Binance
        tvSymbol = `BINANCE:${rawSymbol}`;
    }
    // If symbol has colon (e.g. "OANDA:XAUUSD"), use it as is.

    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": tvSymbol,
      "interval": "D",
      "timezone": "Asia/Ho_Chi_Minh",
      "theme": "dark",
      "style": "1",
      "locale": "vi_VN",
      "enable_publishing": false,
      "backgroundColor": "rgba(0, 0, 0, 1)",
      "gridColor": "rgba(43, 49, 57, 0.2)",
      "hide_top_toolbar": false,
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "save_image": true,
      "calendar": false,
      "hide_volume": false,
      "withdateranges": true,
      "support_host": "https://www.tradingview.com"
    });

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: "100%", width: "100%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
});

export default TradingViewWidget;