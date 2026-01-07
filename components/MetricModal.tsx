
import React from 'react';
import { X, FunctionSquare, Sigma, Equal } from 'lucide-react';

interface MetricModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formula: string;
  description: string;
}

const MetricModal: React.FC<MetricModalProps> = ({ isOpen, onClose, title, formula, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-inner">
                <Sigma className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Financial Logic Theorem</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2.5 hover:bg-zinc-900 rounded-xl text-zinc-500 hover:text-white transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-zinc-900/40 border border-zinc-800/50 rounded-[32px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                <FunctionSquare className="w-32 h-32" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6">
                Mathematical Component
              </div>
              <div className="flex items-start gap-4 bg-black/50 p-6 rounded-2xl border border-white/5 shadow-2xl">
                <div className="text-blue-500 mt-1"><Equal className="w-6 h-6" /></div>
                <div className="text-xl font-serif italic text-zinc-100 leading-relaxed tracking-tight">
                  {formula.split(' ').map((word, i) => (
                    <span key={i} className={['×', '/', '+', '-', '÷', '=', '(', ')'].includes(word) ? 'text-blue-500 font-bold px-1' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 px-2">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] border-b border-zinc-800 pb-3">Analytical Context</h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                {description}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.15em] text-xs rounded-2xl shadow-xl shadow-blue-900/30 transition-all active:scale-[0.97]"
          >
            Acknowledge Logic
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetricModal;
