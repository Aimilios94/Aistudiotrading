
import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, Target, ShieldAlert, ChevronRight, Loader2 } from 'lucide-react';
import { TickerData, AISuggestion } from '../types';
import { getTradingSuggestion } from '../services/geminiService';

interface AISuggestionsPanelProps {
  ticker: TickerData;
}

const AISuggestionsPanel: React.FC<AISuggestionsPanelProps> = ({ ticker }) => {
  const [suggestion, setSuggestion] = useState<AISuggestion | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      setLoading(true);
      const res = await getTradingSuggestion(ticker);
      setSuggestion(res);
      setLoading(false);
    };
    fetchAI();
  }, [ticker.symbol]);

  if (loading) {
    return (
      <div className="glass-card p-8 rounded-[40px] border border-zinc-800/50 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-zinc-400 animate-pulse font-medium">Gemini analyzing market patterns for {ticker.symbol}...</p>
      </div>
    );
  }

  if (!suggestion) return null;

  const isBullish = suggestion.signal === 'BULLISH';
  const isBearish = suggestion.signal === 'BEARISH';

  return (
    <div className="glass-card rounded-[40px] border border-zinc-800/50 overflow-hidden group">
      <div className="bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-transparent p-8 border-b border-zinc-800/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">AI Intelligence Insight</h3>
              <p className="text-[10px] text-blue-400/80 uppercase font-bold tracking-widest">Powered by Gemini 2.5</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Confidence Score</p>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-1000" 
                    style={{ width: `${suggestion.confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-blue-400">{suggestion.confidence}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold border ${
          isBullish ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
          isBearish ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
          'bg-zinc-800 text-zinc-400 border-zinc-700'
        }`}>
          <BrainCircuit className="w-4 h-4" />
          {suggestion.signal} Signal Detected
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div>
          <h4 className="text-xs text-zinc-500 font-bold uppercase mb-4 tracking-wider flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-blue-500" /> Technical Reasoning
          </h4>
          <p className="text-sm text-zinc-300 leading-relaxed font-medium bg-zinc-900/30 p-5 rounded-3xl border border-zinc-800/50">
            {suggestion.reasoning}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 group-hover:border-blue-500/20 transition-all">
            <div className="flex items-center gap-3 mb-2 text-emerald-500">
              <Target className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Take Profit Target</span>
            </div>
            <p className="text-2xl font-bold">${suggestion.targetPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            <p className="text-[10px] text-emerald-500/60 font-bold mt-1">
              +{(((suggestion.targetPrice - ticker.price) / ticker.price) * 100).toFixed(2)}% Upside
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 group-hover:border-rose-500/20 transition-all">
            <div className="flex items-center gap-3 mb-2 text-rose-500">
              <ShieldAlert className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Stop Loss Buffer</span>
            </div>
            <p className="text-2xl font-bold">${suggestion.stopLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
            <p className="text-[10px] text-rose-500/60 font-bold mt-1">
              {(((suggestion.stopLoss - ticker.price) / ticker.price) * 100).toFixed(2)}% Risk
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800/50">
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2">
            Open Trade with This Setup
            <ChevronRight className="w-4 h-4" />
          </button>
          <p className="text-[10px] text-zinc-600 text-center mt-4 uppercase font-bold tracking-widest">
            Trading involves risk. Always do your own research.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionsPanel;
