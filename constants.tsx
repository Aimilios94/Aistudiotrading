
import React from 'react';
import { LayoutDashboard, TrendingUp, Search, Bell, Settings, LogOut, Wallet, LineChart, Newspaper, Trophy, Zap, History } from 'lucide-react';
import { TickerData, AssetType } from './types';

export const NAV_ITEMS = [
  { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, id: 'dashboard' },
  { name: 'Scanner', icon: <Zap className="w-5 h-5" />, id: 'scanner' },
  { name: 'Trading', icon: <TrendingUp className="w-5 h-5" />, id: 'trading' },
  { name: 'Backtesting', icon: <History className="w-5 h-5" />, id: 'backtest' },
  { name: 'Leaderboard', icon: <Trophy className="w-5 h-5" />, id: 'leaderboard' },
  { name: 'News Feed', icon: <Newspaper className="w-5 h-5" />, id: 'news' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, id: 'settings' },
];

export const MOCK_TICKERS: TickerData[] = [
  {
    symbol: 'BINANCE:BTCUSDT',
    name: 'Bitcoin',
    price: 94520.42,
    change: 1205.3,
    changePercent: 1.28,
    volume: '34.2B',
    marketCap: '1.85T',
    type: AssetType.CRYPTO,
    history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 93000 + Math.random() * 2000 }))
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 192.53,
    change: -1.2,
    changePercent: -0.62,
    volume: '52M',
    marketCap: '3.01T',
    type: AssetType.STOCK,
    history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 190 + Math.random() * 5 }))
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    price: 824.12,
    change: 45.2,
    changePercent: 5.8,
    volume: '88M',
    marketCap: '2.04T',
    type: AssetType.STOCK,
    history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 780 + Math.random() * 60 }))
  },
  {
    symbol: 'BINANCE:ETHUSDT',
    name: 'Ethereum',
    price: 3842.12,
    change: -12.4,
    changePercent: -0.32,
    volume: '15.1B',
    marketCap: '462B',
    type: AssetType.CRYPTO,
    history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 3800 + Math.random() * 100 }))
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 175.43,
    change: 4.2,
    changePercent: 2.45,
    volume: '110M',
    marketCap: '550B',
    type: AssetType.STOCK,
    history: Array.from({ length: 20 }, (_, i) => ({ time: `${i}:00`, value: 170 + Math.random() * 10 }))
  }
];
