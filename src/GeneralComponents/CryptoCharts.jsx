import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const TradingViewMiniChart = ({ symbol, theme = "light" }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      width: "100%",
      height: "200",
      locale: "en",
      dateRange: "1D",
      colorTheme: theme,
      trendLineColor: "#3b82f6",
      underLineColor: theme === "dark" ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.15)",
      isTransparent: false,
      autosize: true
    });

    ref.current.appendChild(script);
  }, [symbol, theme]);

  return <div className="tradingview-widget-container" ref={ref}></div>;
};

const CryptoCharts = () => {
  const [prices, setPrices] = useState({});

  const ids = [
    'bitcoin', 'ethereum', 'binancecoin', 'solana', 'ripple',
    'dogecoin', 'cardano', 'avalanche-2', 'tron', 'shiba-inu',
    'toncoin', 'polkadot'
  ];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`
        );
        setPrices(res.data);
      } catch (err) {
        console.error("Error fetching prices", err);
      }
    };

    fetchPrices();
  }, []);

  const topCryptos = [
    { name: "Bitcoin", symbol: "BINANCE:BTCUSDT", id: "bitcoin" },
    { name: "Ethereum", symbol: "BINANCE:ETHUSDT", id: "ethereum" },
    { name: "BNB", symbol: "BINANCE:BNBUSDT", id: "binancecoin" },
    { name: "Solana", symbol: "BINANCE:SOLUSDT", id: "solana" },
    { name: "XRP", symbol: "BINANCE:XRPUSDT", id: "ripple" },
    { name: "Dogecoin", symbol: "BINANCE:DOGEUSDT", id: "dogecoin" },
    { name: "Cardano", symbol: "BINANCE:ADAUSDT", id: "cardano" },
    { name: "Avalanche", symbol: "BINANCE:AVAXUSDT", id: "avalanche-2" },
    { name: "TRON", symbol: "BINANCE:TRXUSDT", id: "tron" },
    { name: "Shiba Inu", symbol: "BINANCE:SHIBUSDT", id: "shiba-inu" },
    { name: "Toncoin", symbol: "BINANCE:TONUSDT", id: "toncoin" },
    { name: "Polkadot", symbol: "BINANCE:DOTUSDT", id: "polkadot" },
  ];

  return (
    <div className="w-full py-10 px-4 bg-[#192633]">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Top Cryptocurrencies</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {topCryptos.map((coin, index) => {
          const price = prices[coin.id]?.usd;
          const change = prices[coin.id]?.usd_24h_change;

          return (
            <div
              key={index}
              className="rounded-xl shadow-md border border-gray-200 dark:border-gray-600 p-4 bg-white dark:bg-[#1B2530] hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-1 text-gray-700 dark:text-white">{coin.name}</h3>
              <p className="text-sm mb-1 text-gray-500 dark:text-gray-300">
                ${price?.toLocaleString() || '...'}
              </p>
              <p className={`text-xs mb-2 ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {change ? `${change.toFixed(2)}%` : '...'} (24h)
              </p>
              <TradingViewMiniChart symbol={coin.symbol} theme="light" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CryptoCharts;
