
import React from 'react';
import StatCard from '../components/StatCard';
import MainChart from '../components/MainChart';
import Watchlist from '../components/Watchlist';
import { DollarSign, Percent, TrendingUp, ShieldCheck } from 'lucide-react';
import { TickerData } from '../types';
import { usePriceFeed } from '../hooks/usePriceFeed';

interface DashboardProps {
  onTickerSelect: (ticker: TickerData) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onTickerSelect }) => {
  const { status } = usePriceFeed();

  return (
    <div className="p-8 h-full space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Balance" 
          value="$38,154.00" 
          trend={12.5} 
          icon={<DollarSign className="w-5 h-5" />} 
          color="blue"
        />
        <StatCard 
          label="Daily Profit" 
          value="$987.47" 
          trend={5.2} 
          icon={<TrendingUp className="w-5 h-5" />} 
          color="emerald"
        />
        <StatCard 
          label="Win Ratio" 
          value="66%" 
          trend={2.1} 
          icon={<Percent className="w-5 h-5" />} 
          color="purple"
        />
        <StatCard 
          label="Risk Reward" 
          value="1:2.4" 
          icon={<ShieldCheck className="w-5 h-5" />} 
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <MainChart status={status} title="Portfolio Performance" subtitle="Aggregated real-time market data" />
          
          <div className="glass-card p-8 rounded-[40px] border border-zinc-800/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Trading Activity</h3>
              <div className="flex gap-4">
                <button className="text-sm font-bold text-zinc-500 hover:text-white">Active Orders</button>
                <button className="text-sm font-bold text-white border-b-2 border-blue-600 pb-1">Order History</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-xs text-zinc-500 font-bold uppercase tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="pb-4 font-semibold">Instrument</th>
                    <th className="pb-4 font-semibold">Type</th>
                    <th className="pb-4 font-semibold">Price</th>
                    <th className="pb-4 font-semibold">Size</th>
                    <th className="pb-4 font-semibold">Profit/Loss</th>
                    <th className="pb-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {[
                    { pair: 'BTC/USD', type: 'Buy', price: '94,200', size: '0.5 BTC', pl: '+$1,200', status: 'Completed', color: 'emerald' },
                    { pair: 'ETH/USD', type: 'Sell', price: '3,842', size: '10 ETH', pl: '-$420', status: 'Completed', color: 'rose' },
                    { pair: 'AAPL/USD', type: 'Buy', price: '192.53', size: '50 AAPL', pl: '+$85', status: 'Completed', color: 'emerald' },
                  ].map((order, i) => (
                    <tr key={i} className="group hover:bg-zinc-800/20 transition-colors cursor-pointer">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold transition-transform group-hover:scale-110">{order.pair.split('/')[0]}</div>
                          <span className="text-sm font-bold">{order.pair}</span>
                        </div>
                      </td>
                      <td className="py-4 text-xs font-bold text-zinc-300">{order.type}</td>
                      <td className="py-4 text-sm font-bold text-zinc-300">${order.price}</td>
                      <td className="py-4 text-sm font-bold text-zinc-400">{order.size}</td>
                      <td className={`py-4 text-sm font-bold text-${order.color}-500`}>{order.pl}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-[10px] font-bold uppercase tracking-tight">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1">
          <Watchlist onTickerSelect={onTickerSelect} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
