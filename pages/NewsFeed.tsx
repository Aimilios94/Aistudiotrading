
import React, { useState, useEffect } from 'react';
import { Newspaper, Search, TrendingUp, TrendingDown, Loader2, RefreshCw, MessageSquare, Clock, ArrowUpRight, Cpu } from 'lucide-react';
import { getMarketNews, deepScanTicker, MarketNews } from '../services/geminiService';

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<MarketNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = async (query?: string) => {
    setLoading(true);
    const data = query ? await deepScanTicker(query) : await getMarketNews();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchNews(searchQuery);
  };

  return (
    <div className="p-8 h-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-[24px] flex items-center justify-center shadow-2xl shadow-blue-500/10">
            <Newspaper className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white mb-1">Intelligence Pulse</h1>
            <p className="text-zinc-500 font-semibold uppercase text-[10px] tracking-[0.2em]">Real-time Scanning Active</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Deep scan ticker or event..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-white"
          />
        </form>

        <button 
          onClick={() => fetchNews()}
          className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all active:scale-95"
        >
          <RefreshCw className={`w-5 h-5 text-zinc-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 bg-zinc-900/10 rounded-[40px] border border-zinc-800 border-dashed">
          <Loader2 className="w-14 h-14 text-blue-500 animate-spin mb-6" />
          <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">Scanning Global Networks...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {news.length > 0 ? news.map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-[40px] border border-zinc-800/50 hover:border-blue-500/30 hover:bg-zinc-900/40 transition-all group">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 ${
                      item.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      item.sentiment === 'negative' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                      'bg-zinc-800/50 text-zinc-400 border-zinc-700'
                    }`}>
                      {item.sentiment === 'positive' ? <TrendingUp className="w-3.5 h-3.5" /> : 
                       item.sentiment === 'negative' ? <TrendingDown className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                      {item.sentiment} Signal
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      <Clock className="w-3 h-3" /> {item.time}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-blue-400 transition-colors leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                    {item.snippet}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Verified Intelligence</span>
                  </div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-[0.1em] transition-all group/link"
                  >
                    Deep Coverage 
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-zinc-900/20 rounded-[40px] border border-zinc-800 border-dashed">
              <p className="text-zinc-500 font-medium">No results found for your scan. Try another query.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
