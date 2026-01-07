
import React, { useState, useRef, useEffect } from 'react';
import MainChart from '../components/MainChart';
import Watchlist from '../components/Watchlist';
import AISuggestionsPanel from '../components/AISuggestionsPanel';
import FundamentalAnalysis from '../components/FundamentalAnalysis';
import TechnicalAnalysis from '../components/TechnicalAnalysis';
import { TickerData, AssetType } from '../types';
import { MOCK_TICKERS } from '../constants';
import { TrendingUp, TrendingDown, Landmark, Activity, FlaskConical, LayoutGrid, BarChart4, Search, Filter, Cpu, Bitcoin, LineChart, ArrowUpRight, Wifi, WifiOff } from 'lucide-react';
import { usePriceFeed } from '../hooks/usePriceFeed';

interface TradingProps {
  ticker: TickerData;
  onTickerSelect: (ticker: TickerData) => void;
}

const Trading: React.FC<TradingProps> = ({ ticker, onTickerSelect }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'fundamental' | 'technical' | 'combined'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Connect to the refined live price feed hook
  const { prices, status, isConnected } = usePriceFeed(ticker.symbol);
  
  // Use the live price from the hook if available, otherwise fall back to initial ticker price
  const liveTicker = prices[ticker.symbol] || { 
    price: ticker.price, 
    direction: 'neutral' as const,
    changePercent: ticker.changePercent 
  };
  
  const isPositive = liveTicker.changePercent >= 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTickers = MOCK_TICKERS.filter(t => 
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAssetIcon = (type: AssetType) => {
    switch (type) {
      case AssetType.CRYPTO: return <Bitcoin className="w-4 h-4 text-orange-500" />;
      case AssetType.STOCK: return <Cpu className="w-4 h-4 text-blue-500" />;
      case AssetType.INDEX: return <LineChart className="w-4 h-4 text-emerald-500" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 h-full space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      {/* Dynamic Unified Search */}
      <div className="relative group max-w-2xl mx-auto z-50" ref={searchContainerRef}>
        <div className={`absolute inset-0 bg-blue-600/10 blur-3xl rounded-full transition-opacity duration-500 ${isSearchFocused ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="relative glass-card p-2 rounded-2xl border border-zinc-800 shadow-2xl flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-20 ${isSearchFocused ? 'text-blue-500' : 'text-zinc-500'}`} />
            <input 
              type="text" 
              onFocus={() => setIsSearchFocused(true)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Deep search assets (e.g. BTC, NVDA, SPX)..."
              className="w-full bg-zinc-950 border border-zinc-800/50 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all text-white placeholder:text-zinc-600"
            />
            
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-3 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-3 border-b border-zinc-800 bg-zinc-900/50">
                   <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Market Intelligence</span>
                </div>
                <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {filteredTickers.length > 0 ? filteredTickers.map(t => (
                    <button 
                      key={t.symbol}
                      onClick={() => { onTickerSelect(t); setSearchQuery(''); setIsSearchFocused(false); }}
                      className="w-full flex items-center justify-between p-3.5 hover:bg-zinc-900 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:bg-zinc-800 transition-colors">
                          {getAssetIcon(t.type)}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">{t.symbol}</p>
                          <p className="text-[10px] text-zinc-500 uppercase font-semibold">{t.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-bold text-zinc-100">${t.price.toLocaleString()}</p>
                          <p className={`text-[10px] font-bold ${t.changePercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{t.changePercent >= 0 ? '+' : ''}{t.changePercent}%</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </button>
                  )) : (
                    <div className="p-8 text-center">
                      <p className="text-xs text-zinc-500 font-medium italic">No assets found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-blue-500 hover:border-blue-500/50 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Primary Asset Identity */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 glass-card p-8 rounded-[40px] border border-zinc-800/50 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-zinc-900 pointer-events-none group-hover:text-zinc-800/5 transition-colors">
          <Landmark className="w-32 h-32" />
        </div>
        <div className="flex items-center gap-6 relative z-10">
          <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-2xl font-bold shadow-2xl transition-all group-hover:scale-105 ${
            ticker.type === AssetType.CRYPTO ? 'bg-orange-500/20 text-orange-500 border border-orange-500/20' : 
            ticker.type === AssetType.STOCK ? 'bg-blue-500/20 text-blue-500 border border-blue-500/20' : 
            'bg-emerald-500/20 text-emerald-500 border border-emerald-500/20'
          }`}>
            {ticker.symbol[0]}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight text-white">{ticker.name}</h1>
              <span className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-lg text-xs font-bold uppercase tracking-widest">{ticker.symbol}</span>
              <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-black uppercase border transition-colors duration-500 ${status === 'connected' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : status === 'connecting' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                {status === 'connected' ? <Wifi className="w-2 h-2" /> : <WifiOff className="w-2 h-2" />}
                {status === 'connected' ? 'Live' : status === 'connecting' ? 'Retrying' : 'Offline'}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="text-zinc-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-bold"><Landmark className="w-3 h-3" /> {ticker.type} Market</span>
              <span className="text-zinc-500 flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-bold"><Activity className="w-3 h-3" /> High Liquidity</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-10 relative z-10">
          <div className="text-right">
            <p className={`text-4xl font-black tracking-tighter mb-1 transition-colors duration-300 ${
              liveTicker.direction === 'up' ? 'text-emerald-400' : 
              liveTicker.direction === 'down' ? 'text-rose-400' : 'text-white'
            }`}>
              ${liveTicker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <div className={`flex items-center justify-end gap-1.5 font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{isPositive ? '+' : ''}{liveTicker.changePercent}%</span>
            </div>
          </div>
          <div className="hidden sm:flex gap-4">
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/40 active:scale-95 transition-all">Buy</button>
            <button className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-900/40 active:scale-95 transition-all">Sell</button>
          </div>
        </div>
      </div>

      {/* Intelligence Tabs */}
      <div className="flex gap-2 p-1.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl w-fit">
        {[
          { id: 'overview', label: 'Market Feed', icon: <LayoutGrid className="w-4 h-4" /> },
          { id: 'fundamental', label: 'Fundamentals', icon: <Landmark className="w-4 h-4" /> },
          { id: 'technical', label: 'Technicals', icon: <FlaskConical className="w-4 h-4" /> },
          { id: 'combined', label: 'Unified Analysis', icon: <BarChart4 className="w-4 h-4" /> },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8 min-h-[600px]">
          {(activeTab === 'overview' || activeTab === 'combined') && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 h-[480px]">
              <MainChart 
                data={ticker.history} 
                title={`${ticker.symbol} Analysis`} 
                subtitle={`Real-time ${ticker.type.toLowerCase()} performance`}
                status={status}
              />
            </div>
          )}
          
          <div className="glass-card p-8 rounded-[40px] border border-zinc-800/50 bg-zinc-950/40">
            {activeTab === 'fundamental' && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-white"><Landmark className="text-blue-500" /> Fundamental Indicators</h3>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">Click for formula</span>
                </div>
                <FundamentalAnalysis ticker={ticker} />
              </div>
            )}

            {activeTab === 'technical' && (
              <div className="animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-white"><FlaskConical className="text-blue-500" /> Technical Data</h3>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">Click for logic</span>
                </div>
                <TechnicalAnalysis />
              </div>
            )}

            {activeTab === 'combined' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white"><Landmark className="text-blue-500" /> Fundamental Data</h3>
                  <FundamentalAnalysis ticker={ticker} />
                </div>
                <div className="pt-8 border-t border-zinc-800/50">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-white"><FlaskConical className="text-blue-500" /> Technical Indicators</h3>
                  <TechnicalAnalysis />
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-zinc-900/60 p-6 rounded-[32px] border border-zinc-800/50">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Volume</p>
                  <p className="text-xl font-bold text-white">{ticker.volume}</p>
                </div>
                <div className="bg-zinc-900/60 p-6 rounded-[32px] border border-zinc-800/50">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Market Cap</p>
                  <p className="text-xl font-bold text-white">{ticker.marketCap}</p>
                </div>
                <div className="bg-zinc-900/60 p-6 rounded-[32px] border border-zinc-800/50">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">High Range</p>
                  <p className="text-xl font-bold text-emerald-500">${(liveTicker.price * 1.05).toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>

          <AISuggestionsPanel ticker={ticker} />
        </div>

        <div className="xl:col-span-1 space-y-8">
          <Watchlist onTickerSelect={onTickerSelect} />
        </div>
      </div>
    </div>
  );
};

export default Trading;
