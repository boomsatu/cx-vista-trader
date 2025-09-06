import { useState, useEffect } from 'react';
import { Search, Sun } from 'lucide-react';

interface TradingHeaderProps {
  isVisible: boolean;
}

export const TradingHeader = ({ isVisible }: TradingHeaderProps) => {
  return (
    <header 
      className={`fixed top-0 w-full z-50 bg-trading-bg border-b border-trading-border flex items-center justify-between px-4 h-14 transition-smooth ${
        isVisible ? 'translate-y-0' : 'header-hidden'
      }`}
    >
      <div className="flex items-center space-x-8">
        <div className="text-foreground font-bold text-xl">CEX</div>
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#" className="text-foreground hover:text-success font-medium">Buy Crypto</a>
          <a href="#" className="text-muted-foreground hover:text-success">Markets</a>
          <a href="#" className="text-foreground hover:text-success font-medium">Trade</a>
          <a href="#" className="text-muted-foreground hover:text-success">Derivatives</a>
          <a href="#" className="text-muted-foreground hover:text-success">Earn</a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-success hover:bg-success/90 text-success-foreground px-4 py-1.5 text-sm font-semibold rounded">
          Sign Up
        </button>
        <button className="text-muted-foreground hover:bg-trading-hover px-4 py-1.5 text-sm rounded">
          Log In
        </button>
        <Search className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
        <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
      </div>
    </header>
  );
};