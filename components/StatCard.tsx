
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: number;
  icon?: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon, color = "blue" }) => {
  const isPositive = trend && trend > 0;
  
  return (
    <div className="glass-card p-6 rounded-3xl border border-zinc-800/50 flex flex-col justify-between h-full hover:border-zinc-700 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-500 font-medium">{label}</p>
        <div className={`p-2.5 rounded-xl bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
      
      <div>
        <h3 className="text-3xl font-bold tracking-tight mb-2">{value}</h3>
        {trend !== undefined && (
          <div className={`flex items-center gap-1.5 text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{isPositive ? '+' : ''}{trend}%</span>
            <span className="text-zinc-600 font-normal">vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
