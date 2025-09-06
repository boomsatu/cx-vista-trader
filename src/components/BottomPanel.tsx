import { useState, useEffect } from 'react';
import { Market } from '../types/trading';

interface BottomPanelProps {
  currentMarket: Market;
  currentPrice: number;
}

interface Trade {
  price: number;
  amount: number;
  total: number;
  time: string;
  isBuy: boolean;
}

export const BottomPanel = ({ currentMarket, currentPrice }: BottomPanelProps) => {
  const [activeTab, setActiveTab] = useState('market-trades');
  const [marketTrades, setMarketTrades] = useState<Trade[]>([]);

  const addMarketTrade = () => {
    const isBuy = Math.random() > 0.5;
    const price = parseFloat((currentPrice + (Math.random() - 0.5)).toFixed(2));
    const amount = parseFloat((Math.random() * 0.5).toFixed(4));
    const total = parseFloat((price * amount).toFixed(4));
    const time = new Date().toLocaleTimeString();

    const newTrade: Trade = { price, amount, total, time, isBuy };
    
    setMarketTrades(prev => [newTrade, ...prev.slice(0, 19)]);
  };

  useEffect(() => {
    const interval = setInterval(addMarketTrade, 1500);
    return () => clearInterval(interval);
  }, [currentPrice]);

  const tabs = [
    { id: 'market-trades', label: 'Market Trades' },
    { id: 'open-orders', label: 'Open Orders (4)' },
    { id: 'order-history', label: 'Order History' },
    { id: 'trade-history', label: 'Trade History' },
  ];

  const mockOpenOrders = [
    { pair: 'ETH/USDT', type: 'Limit Buy', price: '4350.00', amount: '0.50', total: '2175.00 USDT', action: 'Cancel' },
    { pair: 'BTC/USDT', type: 'Limit Sell', price: '68000.00', amount: '0.10', total: '6800.00 USDT', action: 'Cancel' },
    { pair: 'SOL/USDT', type: 'Limit Buy', price: '162.50', amount: '10.0', total: '1625.00 USDT', action: 'Cancel' },
    { pair: 'ADA/USDT', type: 'Limit Sell', price: '0.485', amount: '5000', total: '2425.00 USDT', action: 'Cancel' },
  ];

  return (
    <div className="flex-shrink-0 h-48 flex flex-col bg-trading-bg">
      {/* Tabs */}
      <div className="flex items-center border-b border-trading-border text-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-foreground border-success'
                : 'text-muted-foreground hover:text-foreground border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-grow overflow-y-auto custom-scrollbar p-2">
        {activeTab === 'market-trades' && (
          <table className="w-full">
            <thead className="text-muted-foreground">
              <tr>
                <th className="text-left font-normal pb-2 text-xs">Price</th>
                <th className="text-right font-normal pb-2 text-xs">Amount</th>
                <th className="text-right font-normal pb-2 text-xs">Total</th>
                <th className="text-right font-normal pb-2 text-xs">Time</th>
              </tr>
            </thead>
            <tbody>
              {marketTrades.map((trade, index) => (
                <tr key={index} className="hover:bg-trading-hover cursor-pointer text-xs">
                  <td className={trade.isBuy ? 'text-success' : 'text-danger'}>
                    {trade.price.toFixed(2)}
                  </td>
                  <td className="text-right text-foreground">{trade.amount.toFixed(4)}</td>
                  <td className="text-right text-muted-foreground">{trade.total.toFixed(4)}</td>
                  <td className="text-right text-muted-foreground">{trade.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'open-orders' && (
          <table className="w-full">
            <thead className="text-muted-foreground">
              <tr>
                <th className="text-left font-normal pb-2 text-xs">Pair</th>
                <th className="text-left font-normal pb-2 text-xs">Type</th>
                <th className="text-left font-normal pb-2 text-xs">Price</th>
                <th className="text-left font-normal pb-2 text-xs">Amount</th>
                <th className="text-left font-normal pb-2 text-xs">Total</th>
                <th className="text-right font-normal pb-2 text-xs">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockOpenOrders.map((order, index) => (
                <tr key={index} className="hover:bg-trading-hover cursor-pointer text-xs">
                  <td>{order.pair}</td>
                  <td className={order.type.includes('Buy') ? 'text-success' : 'text-danger'}>
                    {order.type}
                  </td>
                  <td>{order.price}</td>
                  <td>{order.amount}</td>
                  <td>{order.total}</td>
                  <td className="text-right">
                    <button className="text-danger hover:underline">{order.action}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {(activeTab === 'order-history' || activeTab === 'trade-history') && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-2xl mb-2">📊</div>
            <p>No {activeTab.replace('-', ' ')} to display</p>
          </div>
        )}
      </div>
    </div>
  );
};