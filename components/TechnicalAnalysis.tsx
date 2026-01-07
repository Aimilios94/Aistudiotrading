
import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';
import MetricModal from './MetricModal';

const TechnicalAnalysis: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<any>(null);

  const indicators = [
    { 
      name: 'RSI (14)', 
      value: '62.4', 
      status: 'Neutral', 
      color: 'zinc',
      formula: "100 - [100 / (1 + (Average Gain / Average Loss))]",
      description: "The Relative Strength Index is a momentum oscillator that measures the speed and change of price movements. It ranges from 0 to 100. Over 70 is overbought, under 30 is oversold."
    },
    { 
      name: 'MACD', 
      value: 'Bullish Cross', 
      status: 'Buy', 
      color: 'emerald',
      formula: "12-Period EMA - 26-Period EMA",
      description: "Moving Average Convergence Divergence is a trend-following momentum indicator that shows the relationship between two moving averages of a security’s price."
    },
    { 
      name: 'SMA (50)', 
      value: '$184.20', 
      status: 'Above', 
      color: 'emerald',
      formula: "Sum of Prices for N periods / N",
      description: "A Simple Moving Average calculates the average price of a security over a specific number of periods. It is used to identify trend direction."
    },
    { 
      name: 'Bollinger Bands', 
      value: 'Squeeze', 
      status: 'Volatile', 
      color: 'orange',
      formula: "SMA(20) ± (Standard Deviation × 2)",
      description: "Bollinger Bands are a type of price envelope or corridor, which are plotted standard deviation levels above and below a simple moving average."
    },
    { 
      name: 'Stochastic', 
      value: '82.0', 
      status: 'Overbought', 
      color: 'rose',
      formula: "((Current Close - Low N) / (High N - Low N)) × 100",
      description: "The Stochastic Oscillator is a momentum indicator comparing a particular closing price of a security to a range of its prices over a certain period of time."
    },
    { 
      name: 'On-Balance Vol', 
      value: '124M', 
      status: 'Accumulation', 
      color: 'emerald',
      formula: "OBV_prev + (If Close > Close_prev: Volume, Else: -Volume)",
      description: "On-Balance Volume uses volume flow to predict changes in stock price. It shows whether smart money is accumulating or distributing the asset."
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {indicators.map((ind, i) => (
        <button 
          key={i} 
          onClick={() => setSelectedMetric(ind)}
          className="text-left bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-3xl hover:border-blue-500/30 hover:bg-zinc-900 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-zinc-500">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{ind.name}</span>
            </div>
            <div className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase border flex items-center gap-1 ${
              ind.color === 'emerald' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' :
              ind.color === 'rose' ? 'border-rose-500/20 bg-rose-500/10 text-rose-500' :
              ind.color === 'orange' ? 'border-orange-500/20 bg-orange-500/10 text-orange-500' :
              'border-zinc-500/20 bg-zinc-500/10 text-zinc-500'
            }`}>
              {ind.status}
            </div>
          </div>
          <p className="text-xl font-bold text-zinc-100">{ind.value}</p>
        </button>
      ))}

      <MetricModal 
        isOpen={!!selectedMetric}
        onClose={() => setSelectedMetric(null)}
        title={selectedMetric?.name || ""}
        formula={selectedMetric?.formula || ""}
        description={selectedMetric?.description || ""}
      />
    </div>
  );
};

export default TechnicalAnalysis;
