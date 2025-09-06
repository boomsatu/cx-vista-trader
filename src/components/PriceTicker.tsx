import { ChevronDown } from 'lucide-react';
import { Market } from '../types/trading';

interface PriceTickerProps {
  currentMarket: Market;
  currentPrice: number;
  onMarketSelect: () => void;
}

export const PriceTicker = ({ currentMarket, currentPrice, onMarketSelect }: PriceTickerProps) => {
  return (
    <div className="flex-shrink-0 bg-trading-bg border-b border-trading-border flex items-center px-4 py-2 space-x-6 overflow-x-auto">
      <button 
        onClick={onMarketSelect}
        className="flex items-center space-x-2 flex-shrink-0 group hover:bg-trading-hover rounded p-1 -m-1"
      >
        <img 
          src={currentMarket.icon} 
          alt={currentMarket.base} 
          className="w-6 h-6"
        />
        <h1 className="text-lg font-bold text-foreground group-hover:text-success">
          {currentMarket.name}
        </h1>
        <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
      </button>
      
      <div className="flex-shrink-0">
        <div className="text-lg text-success font-semibold">
          {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-muted-foreground">
          Mark Price {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <div className="text-muted-foreground text-xs">24h Change</div>
        <div className="text-danger text-sm">-54.57 (-1.51%)</div>
      </div>
      
      <div className="flex-shrink-0">
        <div className="text-muted-foreground text-xs">24h High</div>
        <div className="text-foreground text-sm">4,430.84</div>
      </div>
      
      <div className="flex-shrink-0">
        <div className="text-muted-foreground text-xs">24h Low</div>
        <div className="text-foreground text-sm">4,263.85</div>
      </div>
      
      <div className="flex-shrink-0">
        <div className="text-muted-foreground text-xs">24h Volume ({currentMarket.base})</div>
        <div className="text-foreground text-sm">66.39K</div>
      </div>
      
      <div className="flex-shrink-0">
        <div className="text-muted-foreground text-xs">24h Volume ({currentMarket.quote})</div>
        <div className="text-foreground text-sm">299.91M</div>
      </div>
    </div>
  );
};