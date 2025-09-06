import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Market } from '../types/trading';

interface MarketModalProps {
  isOpen: boolean;
  onClose: () => void;
  markets: Market[];
  onSelectMarket: (market: Market) => void;
}

export const MarketModal = ({ isOpen, onClose, markets, onSelectMarket }: MarketModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMarkets = markets.filter(market =>
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-trading-bg text-foreground w-full max-w-md flex flex-col rounded-lg border border-trading-border" style={{ height: '60vh' }}>
        <div className="p-4 border-b border-trading-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Markets</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search coin"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-success border border-trading-border rounded"
            />
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {filteredMarkets.map((market) => (
            <div
              key={market.symbol}
              onClick={() => {
                onSelectMarket(market);
                onClose();
              }}
              className="flex items-center p-3 hover:bg-trading-hover cursor-pointer border-b border-trading-border/50 last:border-b-0"
            >
              <img src={market.icon} alt={market.base} className="w-8 h-8 mr-3 rounded-full" />
              <div>
                <div className="font-medium text-foreground">{market.name}</div>
                <div className="text-xs text-muted-foreground">{market.base}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};