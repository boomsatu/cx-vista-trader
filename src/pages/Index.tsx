import { useState, useEffect } from 'react';
import { TradingHeader } from '../components/TradingHeader';
import { PriceTicker } from '../components/PriceTicker';
import { TradingChart } from '../components/TradingChart';
import { OrderBook } from '../components/OrderBook';
import { TradingPanel } from '../components/TradingPanel';
import { BottomPanel } from '../components/BottomPanel';
import { MarketModal } from '../components/MarketModal';
import { Market } from '../types/trading';

// Import crypto icons
import btcIcon from '../assets/btc-icon.png';
import ethIcon from '../assets/eth-icon.png';
import solIcon from '../assets/sol-icon.png';
import usdtIcon from '../assets/usdt-icon.png';

const Index = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(4392.93);
  const [currentMarket, setCurrentMarket] = useState<Market>({
    name: 'ETH/USDT',
    symbol: 'BINANCE:ETHUSDT',
    base: 'ETH',
    quote: 'USDT',
    icon: ethIcon
  });

  const markets: Market[] = [
    { name: 'BTC/USDT', symbol: 'BINANCE:BTCUSDT', base: 'BTC', quote: 'USDT', icon: btcIcon },
    { name: 'ETH/USDT', symbol: 'BINANCE:ETHUSDT', base: 'ETH', quote: 'USDT', icon: ethIcon },
    { name: 'SOL/USDT', symbol: 'BINANCE:SOLUSDT', base: 'SOL', quote: 'USDT', icon: solIcon },
    { name: 'USDT/USD', symbol: 'BINANCE:USDTUSD', base: 'USDT', quote: 'USD', icon: usdtIcon },
  ];

  // Header show/hide logic
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 80) {
        setIsHeaderVisible(true);
        clearTimeout(hideTimeout);
      } else {
        hideTimeout = setTimeout(() => {
          setIsHeaderVisible(false);
        }, 300);
      }
    };

    // Hide header after 2 seconds initially
    const initialHideTimeout = setTimeout(() => {
      setIsHeaderVisible(false);
    }, 2000);

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideTimeout);
      clearTimeout(initialHideTimeout);
    };
  }, []);

  // Price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() * 2 - 1);
      setCurrentPrice(prev => prev + change);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TradingHeader isVisible={isHeaderVisible} />
      
      <div 
        className={`flex flex-col h-screen transition-smooth ${
          isHeaderVisible ? 'pt-12 md:pt-14' : 'pt-0'
        }`}
      >
        <PriceTicker
          currentMarket={currentMarket}
          currentPrice={currentPrice}
          onMarketSelect={() => setIsMarketModalOpen(true)}
        />

        <main className="flex-grow flex flex-col xl:flex-row overflow-hidden bg-trading-bg">
          <div className="flex-grow flex flex-col w-full xl:w-3/5 min-h-0">
            <TradingChart />
            <BottomPanel currentMarket={currentMarket} currentPrice={currentPrice} />
          </div>

          <div className="flex flex-col lg:flex-row xl:flex-col xl:w-2/5">
            <OrderBook currentMarket={currentMarket} currentPrice={currentPrice} />
            <TradingPanel currentMarket={currentMarket} currentPrice={currentPrice} />
          </div>
        </main>

        <footer className="flex-shrink-0 bg-trading-bg border-t border-trading-border px-3 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div>© 2025 CEX. All rights reserved.</div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-foreground">About Us</a>
            <a href="#" className="hover:text-foreground">Support</a>
            <a href="#" className="hover:text-foreground">Terms & Conditions</a>
          </div>
        </footer>
      </div>

      <MarketModal
        isOpen={isMarketModalOpen}
        onClose={() => setIsMarketModalOpen(false)}
        markets={markets}
        onSelectMarket={setCurrentMarket}
      />
    </div>
  );
};

export default Index;
