
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, TrendingUp, Cpu, Bitcoin, ChevronDown, ShieldCheck, LogOut, Settings as SettingsIcon, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMarketMenu, setShowMarketMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const marketMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsSearchFocused(false);
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setShowUserMenu(false);
      if (marketMenuRef.current && !marketMenuRef.current.contains(event.target as Node)) setShowMarketMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = [
    { symbol: 'TSLA', name: 'TESLA, INC.', type: 'Stock', icon: <TrendingUp className="w-4 h-4 text-emerald-500" /> },
    { symbol: 'BTC', name: 'BITCOIN', type: 'Crypto', icon: <Bitcoin className="w-4 h-4 text-orange-500" /> },
    { symbol: 'AAPL', name: 'APPLE INC.', type: 'Stock', icon: <Cpu className="w-4 h-4 text-blue-500" /> },
    { symbol: 'SOL', name: 'SOLANA', type: 'Crypto', icon: <TrendingUp className="w-4 h-4 text-purple-500" /> },
  ];

  return (
    <header className="h-20 flex items-center justify-between px-8 glass-card border-b border-zinc-800/50 z-[100] sticky top-0 bg-[#09090b]/80 backdrop-blur-xl">
      {/* Search Bar Container - Made more prominent and "pressable" */}
      <div className="flex items-center w-full max-w-xl relative" ref={dropdownRef}>
        <div 
          className={`relative w-full group cursor-text transition-all duration-300 ${isSearchFocused ? 'max-w-md' : 'max-w-[320px]'}`}
          onClick={() => dropdownRef.current?.querySelector('input')?.focus()}
        >
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors z-20 ${isSearchFocused ? 'text-blue-500' : 'text-zinc-500 group-hover:text-zinc-400'}`} />
          <input 
            type="text" 
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Quick search..." 
            className="w-full bg-zinc-900/50 border border-zinc-800/80 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all focus:bg-zinc-950 text-white placeholder:text-zinc-500"
          />
        </div>

        {isSearchFocused && (
          <div className="absolute top-full left-0 mt-3 w-full max-w-md bg-[#0c0c0e] rounded-2xl border border-zinc-800 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-[110]">
            <div className="p-4 border-b border-zinc-800/50 bg-zinc-900/20">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Trending Suggestions</span>
            </div>
            <div className="p-2">
              {suggestions.map((s) => (
                <button 
                  key={s.symbol}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-zinc-800/40 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:bg-zinc-800 transition-colors">
                      {s.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-zinc-100">{s.symbol}</p>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">{s.name}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-2.5 py-1 bg-zinc-900 rounded-lg text-zinc-400 border border-zinc-800 uppercase">{s.type}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Market Status */}
        <div className="relative" ref={marketMenuRef}>
          <button 
            onClick={() => setShowMarketMenu(!showMarketMenu)}
            className="hidden lg:flex flex-col items-end group cursor-pointer"
          >
            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-0.5">Market Status</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center gap-1 tracking-wider">Open <ChevronDown className={`w-3 h-3 transition-transform ${showMarketMenu ? 'rotate-180' : ''}`} /></span>
            </div>
          </button>

          {showMarketMenu && (
            <div className="absolute top-full right-0 mt-4 w-56 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-[110] animate-in fade-in slide-in-from-top-2">
              {[
                { label: 'NYSE', status: 'Open', color: 'emerald' },
                { label: 'NASDAQ', status: 'Open', color: 'emerald' },
                { label: 'Crypto', status: 'Live', color: 'blue' },
                { label: 'Futures', status: 'Closed', color: 'rose' },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900 transition-colors">
                  <span className="text-xs font-bold text-zinc-400">{m.label}</span>
                  <span className={`text-[10px] font-black uppercase text-${m.color}-500`}>{m.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="relative p-2.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl hover:bg-zinc-800 hover:text-blue-500 transition-all group">
          <Bell className="w-5 h-5 text-zinc-500 group-hover:text-blue-400" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4 pl-6 border-l border-zinc-800 relative" ref={userMenuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3.5 group text-left"
          >
            <div className="hidden sm:block">
              <p className="text-sm font-black text-zinc-100 group-hover:text-blue-400 transition-colors">James Carter</p>
              <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest text-right">Premium</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px]">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-zinc-100" />
              </div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute top-full right-0 mt-4 w-64 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-[110] animate-in fade-in slide-in-from-top-2">
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1.5">Account Status</p>
                <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-black uppercase tracking-tight">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Premium User
                </div>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 text-[11px] font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-all">
                  <SettingsIcon className="w-4 h-4" /> Settings
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 text-[11px] font-black uppercase tracking-wider text-zinc-400 hover:text-white transition-all">
                  <Globe className="w-4 h-4" /> Global Log
                </button>
                <div className="h-px bg-zinc-800 my-2 mx-2"></div>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-500/10 text-[11px] font-black uppercase tracking-wider text-rose-500 transition-all">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
