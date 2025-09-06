import { ChevronDown } from 'lucide-react';
import { Market } from '../types/trading';

interface PriceTickerProps {
  currentMarket: Market;
  currentPrice: number;
  onMarketSelect: () => void;
}

export const PriceTicker = ({ currentMarket, currentPrice, onMarketSelect }: PriceTickerProps) => {
  return (
    <div className="flex-shrink-0 bg-trading-bg border-b border-trading-border flex items-center px-2 md:px-4 py-2 space-x-3 md:space-x-6 overflow-x-auto">
      <button 
        onClick={onMarketSelect}
        className="flex items-center space-x-2 flex-shrink-0 group hover:bg-trading-hover rounded p-1 -m-1 mobile-touch"
      >
        <img 
          src={currentMarket.icon} 
          alt={currentMarket.base} 
          className="w-5 h-5 md:w-6 md:h-6"
        />
        <h1 className="text-base md:text-lg font-bold text-foreground group-hover:text-success">
          {currentMarket.name}
        </h1>
        <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground group-hover:text-foreground" />
      </button>
      
      <div className="flex-shrink-0 min-w-0">
        <div className="text-sm md:text-lg text-success font-semibold truncate">
          {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-muted-foreground hidden md:block">
          Mark Price {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      
      <div className="flex-shrink-0 min-w-0 hidden sm:block">
        <div className="text-muted-foreground text-xs">24h Change</div>
        <div className="text-danger text-xs md:text-sm">-54.57 (-1.51%)</div>
      </div>
      
      <div className="flex-shrink-0 min-w-0 hidden md:block">
        <div className="text-muted-foreground text-xs">24h High</div>
        <div className="text-foreground text-xs md:text-sm">4,430.84</div>
      </div>
      
      <div className="flex-shrink-0 min-w-0 hidden md:block">
        <div className="text-muted-foreground text-xs">24h Low</div>
        <div className="text-foreground text-xs md:text-sm">4,263.85</div>
      </div>
      
      <div className="flex-shrink-0 min-w-0 hidden lg:block">
        <div className="text-muted-foreground text-xs">24h Volume ({currentMarket.base})</div>
        <div className="text-foreground text-xs md:text-sm">66.39K</div>
      </div>
      
      <div className="flex-shrink-0 min-w-0 hidden lg:block">
        <div className="text-muted-foreground text-xs">24h Volume ({currentMarket.quote})</div>
        <div className="text-foreground text-xs md:text-sm">299.91M</div>
      </div>
    </div>
  );
};