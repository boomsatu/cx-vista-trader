import { useEffect, useState } from 'react';
import { Market } from '../types/trading';

interface OrderBookProps {
  currentMarket: Market;
  currentPrice: number;
}

interface Order {
  price: number;
  amount: number;
  total: number;
}

export const OrderBook = ({ currentMarket, currentPrice }: OrderBookProps) => {
  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBids] = useState<Order[]>([]);

  const generateOrders = (startPrice: number, count: number, isBid: boolean): Order[] => {
    const orders: Order[] = [];
    let price = startPrice;
    
    for (let i = 0; i < count; i++) {
      const amount = parseFloat((Math.random() * 2).toFixed(5));
      price += (Math.random() * 5 - 2.5) * (isBid ? -1 : 1);
      const total = parseFloat((price * amount).toFixed(2));
      orders.push({ price: parseFloat(price.toFixed(2)), amount, total });
    }
    
    return orders;
  };

  useEffect(() => {
    const updateOrderBook = () => {
      const newAsks = generateOrders(currentPrice + 0.5, 15, false)
        .sort((a, b) => b.price - a.price);
      const newBids = generateOrders(currentPrice - 0.5, 15, true)
        .sort((a, b) => b.price - a.price);
      
      setAsks(newAsks);
      setBids(newBids);
    };

    updateOrderBook();
    const interval = setInterval(updateOrderBook, 3000);
    
    return () => clearInterval(interval);
  }, [currentPrice]);

  const maxAskTotal = Math.max(...asks.map(o => o.total));
  const maxBidTotal = Math.max(...bids.map(o => o.total));

  return (
    <div className="w-full lg:w-1/5 flex flex-col border-r border-trading-border pb-3">
      <div className="p-2 flex items-center justify-between border-b border-trading-border flex-shrink-0">
        <h2 className="text-sm font-semibold text-foreground">Order Book</h2>
        <div className="flex space-x-1">
          <div className="w-4 h-4 bg-muted rounded-sm"></div>
          <div className="w-4 h-4 bg-muted rounded-sm"></div>
          <div className="w-4 h-4 bg-muted rounded-sm"></div>
        </div>
      </div>
      
      <div className="flex-grow overflow-hidden flex flex-col">
        <div className="grid grid-cols-3 gap-4 p-2 text-muted-foreground text-xs">
          <div>Price({currentMarket.quote})</div>
          <div className="text-right">Amount({currentMarket.base})</div>
          <div className="text-right">Total({currentMarket.quote})</div>
        </div>
        
        <div className="flex-grow overflow-y-auto custom-scrollbar flex flex-col-reverse">
          {asks.map((ask, index) => (
            <div
              key={`ask-${index}`}
              className="grid grid-cols-3 gap-4 p-1.5 text-xs relative ask-progress cursor-pointer hover:bg-trading-hover"
              style={{ '--progress': `${(ask.total / maxAskTotal) * 100}%` } as React.CSSProperties}
            >
              <span className="text-danger">{ask.price.toFixed(2)}</span>
              <span className="text-right text-foreground">{ask.amount.toFixed(5)}</span>
              <span className="text-right text-muted-foreground">{ask.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="py-2 text-lg text-success font-semibold text-center border-t border-b border-trading-border">
          {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          {bids.map((bid, index) => (
            <div
              key={`bid-${index}`}
              className="grid grid-cols-3 gap-4 p-1.5 text-xs relative bid-progress cursor-pointer hover:bg-trading-hover"
              style={{ '--progress': `${(bid.total / maxBidTotal) * 100}%` } as React.CSSProperties}
            >
              <span className="text-success">{bid.price.toFixed(2)}</span>
              <span className="text-right text-foreground">{bid.amount.toFixed(5)}</span>
              <span className="text-right text-muted-foreground">{bid.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};