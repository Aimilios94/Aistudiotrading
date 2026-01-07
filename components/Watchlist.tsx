
import React from 'react';
import { MOCK_TICKERS } from '../constants';
import { AssetType, TickerData } from '../types';
import { usePriceFeed } from '../hooks/usePriceFeed';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistProps {
  onTickerSelect?: (ticker: TickerData) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ onTickerSelect }) => {
  const { prices } = usePriceFeed();

  return (
    <div className="glass-card rounded-[40px] border border-zinc-800/50 h-full p-8 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-xl font-bold">Smart Watchlist</h2>
           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              Real-time Feed
           </p>
        </div>
        <button className="text-xs font-bold text-blue-500 hover:text-blue-400">Add Assets</button>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {MOCK_TICKERS.map((item) => {
          const live = prices[item.symbol];
          return (
            <div 
              key={item.symbol} 
              onClick={() => onTickerSelect?.(item)}
              className="flex items-center justify-between p-4 rounded-3xl bg-zinc-900/30 border border-zinc-800/30 hover:border-blue-500/30 hover:bg-zinc-800/40 transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Flash effect for price changes */}
              <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none opacity-0 ${
                live.direction === 'up' ? 'bg-emerald-500/5 opacity-100' : 
                live.direction === 'down' ? 'bg-rose-500/5 opacity-100' : ''
              }`}></div>

              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-transform group-hover:scale-105 ${item.type === AssetType.CRYPTO ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {item.symbol[0]}
                </div>
                <div>
                  <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">{item.symbol}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-semibold">{item.name}</p>
                </div>
              </div>
              
              <div className="text-right relative z-10">
                <p className={`text-sm font-black transition-colors duration-300 ${
                  live.direction === 'up' ? 'text-emerald-500' : 
                  live.direction === 'down' ? 'text-rose-500' : 'text-zinc-100'
                }`}>
                  ${live.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div className={`flex items-center justify-end gap-1 text-[10px] font-bold ${item.changePercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {item.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{item.changePercent >= 0 ? '+' : ''}{item.changePercent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-br from-indigo-900/40 to-blue-900/40 rounded-3xl border border-blue-500/20 relative overflow-hidden group">
        <h4 className="text-sm font-bold text-white mb-2">Portfolio Protection</h4>
        <p className="text-xs text-blue-200 mb-4 leading-relaxed">Upgrade to Premium for real-time alerts and deeper asset correlation maps.</p>
        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Watchlist;
