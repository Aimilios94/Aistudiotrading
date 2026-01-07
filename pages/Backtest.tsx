
import React, { useState } from 'react';
import { History, Play, Plus, Target, ShieldAlert, LineChart, TrendingUp, Wallet, ArrowRight, CheckCircle2, FlaskConical, Loader2, BarChart4 } from 'lucide-react';
import { auditService } from '../services/auditService';
import MainChart from '../components/MainChart';
import { MOCK_TICKERS } from '../constants';

const Backtest: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const startSimulation = () => {
    setIsSimulating(true);
    auditService.log('Ran strategy backtest', 'backtest', 'Simulated technical cross strategy on BTC historical data');
    setTimeout(() => {
      setIsSimulating(false);
      nextStep();
    }, 2000);
  };

  return (
    <div className="p-8 h-full max-w-[1200px] mx-auto animate-in fade-in duration-700">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 bg-emerald-600/10 border border-emerald-500/20 rounded-[24px] flex items-center justify-center shadow-2xl shadow-emerald-500/10">
          <History className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-1">Strategy Backtest</h1>
          <p className="text-zinc-500 font-semibold uppercase text-[10px] tracking-[0.2em]">Validated Historical Simulation</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-16 max-w-2xl mx-auto relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 z-0"></div>
        {[
          { num: 1, label: 'Entry' },
          { num: 2, label: 'Exit' },
          { num: 3, label: 'Risk' },
          { num: 4, label: 'Results' },
        ].map(s => (
          <div key={s.num} className="relative z-10 flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
              step >= s.num ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30' : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
            }`}>
              {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.num ? 'text-zinc-100' : 'text-zinc-600'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="glass-card p-10 rounded-[48px] border border-zinc-800/50 min-h-[500px] flex flex-col">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
              <FlaskConical className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">Define Entry Logic</h3>
                <p className="text-zinc-500 text-sm">When should the system execute a BUY order?</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-900/40 rounded-[32px] border border-zinc-800/50 hover:border-blue-500/30 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold mb-2">Technical Indicators</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">Entry based on RSI, Moving Averages, or MACD crossovers.</p>
              </div>
              <div className="p-8 bg-zinc-900/40 rounded-[32px] border border-zinc-800/50 hover:border-blue-500/30 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Plus className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold mb-2">Price Action</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">Breakouts above support/resistance or specific candlestick patterns.</p>
              </div>
            </div>

            <div className="pt-10 flex justify-end">
              <button onClick={nextStep} className="px-10 py-4 bg-zinc-100 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all flex items-center gap-3">
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
              <Target className="w-8 h-8 text-emerald-500" />
              <div>
                <h3 className="text-2xl font-bold">Define Exit Targets</h3>
                <p className="text-zinc-500 text-sm">Set your profit and survival parameters.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-4">
                  <TrendingUp className="text-emerald-500" />
                  <span className="font-bold">Take Profit Percentage</span>
                </div>
                <input type="number" defaultValue={10} className="w-24 bg-black border border-zinc-800 rounded-xl px-4 py-2 text-center font-bold text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div className="flex items-center justify-between p-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-4">
                  <ShieldAlert className="text-rose-500" />
                  <span className="font-bold">Hard Stop Loss</span>
                </div>
                <input type="number" defaultValue={5} className="w-24 bg-black border border-zinc-800 rounded-xl px-4 py-2 text-center font-bold text-white focus:outline-none focus:border-rose-500" />
              </div>
            </div>

            <div className="pt-10 flex justify-between">
              <button onClick={prevStep} className="px-10 py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 font-black uppercase tracking-widest text-xs rounded-2xl hover:text-white transition-all">
                Back
              </button>
              <button onClick={nextStep} className="px-10 py-4 bg-zinc-100 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all flex items-center gap-3">
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
              <Wallet className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="text-2xl font-bold">Capital Allocation</h3>
                <p className="text-zinc-500 text-sm">How much are you risking per trade?</p>
              </div>
            </div>

            <div className="p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800">
               <div className="flex items-center justify-between mb-8">
                  <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Initial Capital</span>
                  <span className="text-2xl font-black text-white">$10,000</span>
               </div>
               <div className="space-y-4">
                  <p className="text-sm font-bold text-zinc-500 mb-2">Position Sizing</p>
                  <div className="grid grid-cols-2 gap-4">
                     <button className="p-4 bg-emerald-600/10 border border-emerald-500/50 rounded-2xl text-emerald-500 font-bold">2% per trade</button>
                     <button className="p-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-zinc-400 font-bold hover:text-white transition-all">Fixed Amount</button>
                  </div>
               </div>
            </div>

            <div className="pt-10 flex justify-between">
              <button onClick={prevStep} className="px-10 py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 font-black uppercase tracking-widest text-xs rounded-2xl hover:text-white transition-all">
                Back
              </button>
              <button 
                onClick={startSimulation}
                className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-emerald-900/30 transition-all flex items-center gap-3 active:scale-95"
              >
                {isSimulating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {isSimulating ? 'Simulating...' : 'Execute Backtest'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] text-center">
                   <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Total Return</p>
                   <p className="text-4xl font-black text-emerald-500">+42.8%</p>
                </div>
                <div className="p-8 bg-zinc-900/40 border border-zinc-800/50 rounded-[32px] text-center">
                   <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Win Rate</p>
                   <p className="text-4xl font-black text-white">68.2%</p>
                </div>
                <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-[32px] text-center">
                   <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Max Drawdown</p>
                   <p className="text-4xl font-black text-rose-500">-12.4%</p>
                </div>
             </div>

             <div className="h-[400px]">
                <MainChart 
                  data={MOCK_TICKERS[0].history} 
                  title="Strategy Performance History" 
                  subtitle="Backtested simulation of entry/exit points"
                  status="connected"
                />
             </div>

             <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="px-10 py-4 bg-zinc-900 border border-zinc-800 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-800 transition-all"
                >
                  New Strategy
                </button>
                <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-blue-900/30 transition-all">
                  Save to My Vault
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Backtest;
