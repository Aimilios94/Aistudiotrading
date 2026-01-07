
import React from 'react';
import { Trophy, Medal, Crown, TrendingUp, UserPlus, Star } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const leaders = [
    { rank: 1, name: 'Alex Rivera', roi: '+452.3%', trades: 142, winRate: '78%', avatar: 'AR', profit: '$1.2M' },
    { rank: 2, name: 'Sarah Chen', roi: '+312.8%', trades: 89, winRate: '72%', avatar: 'SC', profit: '$642k' },
    { rank: 3, name: 'Michael Sun', roi: '+285.1%', trades: 215, winRate: '68%', avatar: 'MS', profit: '$510k' },
    { rank: 4, name: 'Emma Watson', roi: '+198.4%', trades: 56, winRate: '65%', avatar: 'EW', profit: '$210k' },
    { rank: 5, name: 'David Kim', roi: '+152.0%', trades: 104, winRate: '61%', avatar: 'DK', profit: '$185k' },
  ];

  return (
    <div className="p-8 h-full max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-yellow-900/30">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <Star className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 fill-yellow-500 animate-pulse" />
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-3">Global Leaderboard</h1>
        <p className="text-zinc-500 max-w-md font-medium">The top performing quantitative and manual traders in the TradeNexus ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {leaders.slice(0, 3).map((l) => (
          <div key={l.rank} className={`glass-card p-8 rounded-[40px] border relative overflow-hidden flex flex-col items-center ${
            l.rank === 1 ? 'border-yellow-500/30 bg-yellow-500/5 scale-105 z-10' : 'border-zinc-800/50'
          }`}>
            {l.rank === 1 && <Crown className="absolute top-4 right-4 w-6 h-6 text-yellow-500" />}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mb-4 shadow-xl ${
              l.rank === 1 ? 'bg-yellow-500 text-black' : 
              l.rank === 2 ? 'bg-zinc-200 text-black' : 
              'bg-amber-700 text-white'
            }`}>
              {l.avatar}
            </div>
            <h3 className="text-lg font-bold mb-1">{l.name}</h3>
            <p className="text-2xl font-black text-emerald-500 mb-4">{l.roi}</p>
            <div className="flex gap-4 w-full">
              <div className="flex-1 text-center py-3 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Profit</p>
                <p className="text-sm font-bold">{l.profit}</p>
              </div>
              <div className="flex-1 text-center py-3 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Win Rate</p>
                <p className="text-sm font-bold">{l.winRate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-[40px] border border-zinc-800/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-900/40 border-b border-zinc-800">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Rank</th>
              <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Trader</th>
              <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">ROI</th>
              <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Trades</th>
              <th className="px-8 py-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {leaders.map((l) => (
              <tr key={l.rank} className="hover:bg-zinc-800/20 transition-colors group">
                <td className="px-8 py-6 font-bold text-zinc-400">#{l.rank}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center font-bold text-sm">{l.avatar}</div>
                    <span className="font-bold group-hover:text-blue-400 transition-colors">{l.name}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right font-black text-emerald-500">{l.roi}</td>
                <td className="px-8 py-6 text-right font-bold text-zinc-300">{l.trades}</td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all">
                    <UserPlus className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
