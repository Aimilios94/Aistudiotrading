
import React, { useState } from 'react';
import { Zap, Search, Filter, ArrowUpRight, ChevronRight, Activity, FlaskConical, BarChart3, Loader2, Sparkles } from 'lucide-react';
import { TickerData, AssetType } from '../types';
import { MOCK_TICKERS } from '../constants';
import { auditService } from '../services/auditService';

interface ScannerProps {
  onTickerSelect: (ticker: TickerData) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onTickerSelect }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [activePreset, setActivePreset] = useState('momentum');

  const presets = [
    { id: 'momentum', label: 'Momentum Plays', icon: <Zap className="w-4 h-4" />, desc: 'Assets up >5% with high volume' },
    { id: 'oversold', label: 'RSI Oversold', icon: <Activity className="w-4 h-4" />, desc: 'Potential reversal candidates' },
    { id: 'breakout', label: 'Volume Breakouts', icon: <BarChart3 className="w-4 h-4" />, desc: 'Volume surge >200% average' },
    { id: 'fundamentals', label: 'Value Score', icon: <FlaskConical className="w-4 h-4" />, desc: 'Low P/E with strong growth' },
  ];

  const runScan = () => {
    setIsScanning(true);
    auditService.log(`Executed ${activePreset} scan`, 'scanner', `Applied logic filters for current market session`);
    setTimeout(() => setIsScanning(false), 1200);
  };

  return (
    <div className="p-8 h-full max-w-[1400px] mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-900/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">Smart Scanner</h1>
          </div>
          <p className="text-zinc-500 font-medium">Quant-grade asset filtering powered by Gemini AI.</p>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-zinc-800 transition-all">
            <Filter className="w-4 h-4" /> Custom Filters
          </button>
          <button 
            onClick={runScan}
            disabled={isScanning}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/40 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {isScanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isScanning ? 'Scanning...' : 'Run Analysis'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Presets */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-2">Intelligence Presets</h3>
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePreset(p.id)}
              className={`w-full text-left p-6 rounded-[32px] border transition-all group ${
                activePreset === p.id 
                  ? 'bg-blue-600/10 border-blue-500/50 shadow-inner' 
                  : 'bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                activePreset === p.id ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-500 group-hover:text-zinc-300'
              }`}>
                {p.icon}
              </div>
              <p className={`font-bold mb-1 ${activePreset === p.id ? 'text-white' : 'text-zinc-300'}`}>{p.label}</p>
              <p className="text-[10px] text-zinc-500 font-medium">{p.desc}</p>
            </button>
          ))}
          
          <div className="p-6 bg-zinc-950 border border-zinc-800 border-dashed rounded-[32px] text-center">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-2">Usage Quota</p>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-blue-600 h-full w-[68%]"></div>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium">68/100 scans used today</p>
          </div>
        </div>

        {/* Results Table */}
        <div className="lg:col-span-3">
          <div className="glass-card rounded-[40px] border border-zinc-800/50 overflow-hidden min-h-[600px] flex flex-col">
            <div className="p-8 border-b border-zinc-800 bg-zinc-900/20 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-3">
                Scan Results <span className="text-xs font-bold text-zinc-600 bg-zinc-900 px-3 py-1 rounded-full">{MOCK_TICKERS.length} found</span>
              </h3>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 bg-zinc-900 rounded-lg text-[10px] font-bold text-zinc-400 border border-zinc-800 uppercase tracking-widest">
                  Market Updated
                </div>
              </div>
            </div>

            {isScanning ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
                <p className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">Processing Multi-Market Data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-zinc-900/40 border-b border-zinc-800">
                    <tr>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Asset</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Price</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">24h Change</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Score</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/30">
                    {MOCK_TICKERS.map((t) => (
                      <tr key={t.symbol} className="hover:bg-zinc-800/20 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                              t.type === AssetType.CRYPTO ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
                            }`}>
                              {t.symbol[0]}
                            </div>
                            <div>
                              <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">{t.symbol}</p>
                              <p className="text-[10px] text-zinc-600 uppercase font-semibold">{t.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-zinc-200">
                          ${t.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-sm font-bold ${t.changePercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {t.changePercent >= 0 ? '+' : ''}{t.changePercent}%
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 max-w-[60px] bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full w-[85%]"></div>
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 uppercase">Strong</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            onClick={() => onTickerSelect(t)}
                            className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all group/btn"
                          >
                            <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
