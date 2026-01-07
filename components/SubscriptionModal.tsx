
import React from 'react';
import { X, Check, Star, Zap, ShieldCheck } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      desc: 'For casual observers',
      features: ['3 Watchlists', '10 Scans / day', 'Basic AI Insights', '15m Delayed Data'],
      button: 'Current Plan',
      highlight: false
    },
    {
      name: 'Pro',
      price: '$19',
      desc: 'For serious traders',
      features: ['Unlimited Watchlists', '100 Scans / day', 'Deep Technical AI', '5m Delayed Data', 'Backtesting (50/mo)'],
      button: 'Upgrade to Pro',
      highlight: true
    },
    {
      name: 'Premium',
      price: '$49',
      desc: 'Institutional grade',
      features: ['Everything in Pro', 'Unlimited Scans', 'Real-time WebSockets', 'Priority Gemini API', 'Portfolio Auditing'],
      button: 'Go Premium',
      highlight: false
    }
  ];

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-[48px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-12 pb-0 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-white mb-2">Elevate Your Strategy</h2>
            <p className="text-zinc-500 font-medium">Choose the intelligence tier that fits your trading volume.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-zinc-900 rounded-2xl text-zinc-500 transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`p-8 rounded-[40px] border transition-all flex flex-col ${
                tier.highlight 
                  ? 'bg-blue-600/10 border-blue-500/50 shadow-2xl shadow-blue-900/20 ring-1 ring-blue-500/50' 
                  : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">{tier.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{tier.price}</span>
                  <span className="text-zinc-500 font-bold">/mo</span>
                </div>
                <p className="text-sm text-zinc-400 mt-2 font-medium">{tier.desc}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-bold text-zinc-300">{f}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                  tier.name === 'Free' 
                    ? 'bg-zinc-800 text-zinc-500 cursor-default' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/40 active:scale-95'
                }`}
              >
                {tier.button}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900/50 p-6 text-center border-t border-zinc-800">
           <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center justify-center gap-4">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure Stripe Checkout</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Instant Activation</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3" /> 7-Day Free Trial</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
