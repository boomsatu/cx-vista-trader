import { useState, useEffect } from 'react';
import { Search, Sun } from 'lucide-react';

interface TradingHeaderProps {
  isVisible: boolean;
}

export const TradingHeader = ({ isVisible }: TradingHeaderProps) => {
  return (
    <header 
      className={`fixed top-0 w-full z-50 bg-trading-bg border-b border-trading-border flex items-center justify-between px-2 md:px-4 h-12 md:h-14 transition-smooth ${
        isVisible ? 'translate-y-0' : 'header-hidden'
      }`}
    >
      <div className="flex items-center space-x-4 md:space-x-8">
        <div className="text-foreground font-bold text-lg md:text-xl">CEX</div>
        <nav className="hidden lg:flex items-center space-x-6 text-sm">
          <a href="#" className="text-foreground hover:text-success font-medium">Buy Crypto</a>
          <a href="#" className="text-muted-foreground hover:text-success">Markets</a>
          <a href="#" className="text-foreground hover:text-success font-medium">Trade</a>
          <a href="#" className="text-muted-foreground hover:text-success">Derivatives</a>
          <a href="#" className="text-muted-foreground hover:text-success">Earn</a>
        </nav>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="bg-success hover:bg-success/90 text-success-foreground px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-semibold rounded mobile-touch">
          Sign Up
        </button>
        <button className="text-muted-foreground hover:bg-trading-hover px-2 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded mobile-touch">
          Log In
        </button>
        <div className="hidden md:flex items-center space-x-4">
          <Search className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
          <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
        </div>
      </div>
    </header>
  );
};