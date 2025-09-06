export interface Market {
  name: string;
  symbol: string;
  base: string;
  quote: string;
  icon: string;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

export interface Trade {
  price: number;
  amount: number;
  total: number;
  time: string;
  isBuy: boolean;
}