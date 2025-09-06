import { useState } from 'react';
import { Market } from '../types/trading';

interface TradingPanelProps {
  currentMarket: Market;
  currentPrice: number;
}

export const TradingPanel = ({ currentMarket, currentPrice }: TradingPanelProps) => {
  const [isBuyMode, setIsBuyMode] = useState(true);
  const [orderType, setOrderType] = useState<'limit' | 'market' | 'tpsl'>('limit');
  const [price, setPrice] = useState(currentPrice.toFixed(2));
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');

  const handlePercentageClick = (percentage: number) => {
    // Simulate setting amount based on percentage of balance
    const mockBalance = 1000; // Mock balance in quote currency
    const calculatedAmount = (mockBalance * percentage / 100 / currentPrice).toFixed(5);
    setAmount(calculatedAmount);
    setTotal((parseFloat(calculatedAmount) * currentPrice).toFixed(2));
  };

  return (
    <div className="w-full lg:w-1/5 flex flex-col p-3 bg-trading-bg">
      {/* Buy/Sell Toggle */}
      <div className="flex border border-trading-border mb-4 rounded">
        <button
          onClick={() => setIsBuyMode(true)}
          className={`flex-1 py-2 text-center text-sm font-medium rounded-l transition-colors ${
            isBuyMode
              ? 'text-success bg-success-light'
              : 'text-muted-foreground hover:bg-trading-hover'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setIsBuyMode(false)}
          className={`flex-1 py-2 text-center text-sm font-medium rounded-r transition-colors ${
            !isBuyMode
              ? 'text-danger bg-danger-light'
              : 'text-muted-foreground hover:bg-trading-hover'
          }`}
        >
          Sell
        </button>
      </div>

      {/* Order Type */}
      <div className="flex space-x-4 mb-4 text-sm">
        <button
          onClick={() => setOrderType('limit')}
          className={`${
            orderType === 'limit' ? 'text-foreground font-medium' : 'text-muted-foreground'
          }`}
        >
          Limit
        </button>
        <button
          onClick={() => setOrderType('market')}
          className={`${
            orderType === 'market' ? 'text-foreground font-medium' : 'text-muted-foreground'
          }`}
        >
          Market
        </button>
        <button
          onClick={() => setOrderType('tpsl')}
          className={`${
            orderType === 'tpsl' ? 'text-foreground font-medium' : 'text-muted-foreground'
          }`}
        >
          TP/SL
        </button>
      </div>

      {/* Order Form */}
      <div className="space-y-3">
        {/* Price Input */}
        <div className="relative">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-input border border-trading-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-success rounded"
            disabled={orderType === 'market'}
          />
          <span className="absolute right-3 top-2.5 text-muted-foreground text-xs">
            {currentMarket.quote}
          </span>
        </div>

        {/* Amount Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-input border border-trading-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-success rounded"
          />
          <span className="absolute right-3 top-2.5 text-muted-foreground text-xs">
            {currentMarket.base}
          </span>
        </div>

        {/* Percentage Slider */}
        <div className="space-y-2">
          <input
            type="range"
            className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer"
            min="0"
            max="100"
            step="25"
            onChange={(e) => handlePercentageClick(parseInt(e.target.value))}
          />
          <div className="flex justify-between text-muted-foreground text-xs">
            {[0, 25, 50, 75, 100].map((percent) => (
              <button
                key={percent}
                onClick={() => handlePercentageClick(percent)}
                className="hover:text-foreground"
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Total Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Total"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full bg-input border border-trading-border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-success rounded"
          />
          <span className="absolute right-3 top-2.5 text-muted-foreground text-xs">
            {currentMarket.quote}
          </span>
        </div>

        {/* Action Button */}
        <button
          className={`w-full font-bold py-2.5 text-sm rounded transition-colors ${
            isBuyMode
              ? 'bg-success hover:bg-success/90 text-success-foreground'
              : 'bg-danger hover:bg-danger/90 text-danger-foreground'
          }`}
        >
          {isBuyMode ? `Buy ${currentMarket.base}` : `Sell ${currentMarket.base}`}
        </button>
      </div>

      {/* Balance Info */}
      <div className="mt-4 pt-4 border-t border-trading-border space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{currentMarket.quote} Balance</span>
          <span className="text-foreground">1,250.75</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{currentMarket.base} Balance</span>
          <span className="text-foreground">5.251</span>
        </div>
      </div>
    </div>
  );
};