
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ComposedChart,
  Cell,
  ReferenceLine,
  Scatter
} from 'recharts';
import { Loader2, Wifi, WifiOff } from 'lucide-react';
import { ConnectionStatus } from '../hooks/usePriceFeed';

interface MainChartProps {
  data?: { time: string; value: number }[];
  title?: string;
  subtitle?: string;
  status?: ConnectionStatus;
}

const CANDLE_GREEN = '#0ea5e9'; // Blue-ish cyan like the photo
const CANDLE_RED = '#f43f5e';
const GRID_COLOR = '#161618';

const CandlestickShape = (props: any) => {
  const { x, y, width, height, low, high, open, close, index } = props;
  const isUp = close >= open;
  const color = isUp ? CANDLE_GREEN : CANDLE_RED;
  
  const bodyHeight = Math.max(Math.abs(height), 2);
  const wickX = x + width / 2;
  
  // Mapping price to pixels for the wick
  const priceToPixels = bodyHeight / (Math.abs(open - close) || 0.01);
  const wickTop = y - (high - Math.max(open, close)) * priceToPixels;
  const wickBottom = y + bodyHeight + (Math.min(open, close) - low) * priceToPixels;

  return (
    <g key={`candle-${index}`}>
      <line x1={wickX} y1={wickTop} x2={wickX} y2={wickBottom} stroke={color} strokeWidth={1} />
      <rect x={x} y={y} width={width} height={bodyHeight} fill={color} />
    </g>
  );
};

const SignalAnnotation = (props: any) => {
  const { x, y, signal, signalType } = props;
  if (!signal) return null;

  const isLong = signalType === 'long';
  const color = isLong ? '#2dd4bf' : '#f43f5e';
  const yOffset = isLong ? 25 : -15;

  return (
    <g>
      <path 
        d={isLong ? "M-3,6 L3,6 L0,0 Z" : "M-3,-6 L3,-6 L0,0 Z"} 
        transform={`translate(${x}, ${y + (isLong ? 8 : -8)})`} 
        fill={color} 
      />
      <text x={x} y={y + yOffset} textAnchor="middle" fill={color} fontSize="7" fontWeight="900" className="uppercase tracking-tighter">
        {signal}
      </text>
    </g>
  );
};

const MainChart: React.FC<MainChartProps> = ({ 
  data = [], 
  title = "Market Overview", 
  subtitle = "Performance analysis",
  status = 'disconnected'
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState('1H');
  const [isChanging, setIsChanging] = useState(false);

  const displayData = useMemo(() => {
    if (data.length === 0) return [];
    return data.map((d, i) => {
      const close = d.value;
      const volatility = close * 0.005;
      const open = i === 0 ? close * 0.998 : data[i-1].value;
      const high = Math.max(open, close) + Math.random() * volatility;
      const low = Math.min(open, close) - Math.random() * volatility;
      const volume = Math.floor(Math.random() * 1000000) + 100000;
      
      let signal = null;
      let signalType = null;
      if (i === 4) { signal = 'Engulfing'; signalType = 'short'; }
      if (i === 10) { signal = 'Long'; signalType = 'long'; }
      if (i === 15) { signal = 'Risk Exit'; signalType = 'short'; }

      return { ...d, open, high, low, close, volume, signal, signalType, signalY: signalType === 'long' ? low : high };
    });
  }, [activeTimeframe, data]);

  useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 300);
    return () => clearTimeout(timer);
  }, [activeTimeframe]);

  const currentPrice = displayData[displayData.length - 1]?.close || 0;

  return (
    <div className="glass-card p-4 rounded-[24px] border border-zinc-800/50 min-h-[500px] h-full relative overflow-hidden flex flex-col bg-[#050505]">
      <div className="flex items-center justify-between mb-4 px-2 pt-2">
        <div>
          <h2 className="text-sm font-black text-zinc-400 tracking-widest uppercase mb-1">{title}</h2>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white">${currentPrice.toLocaleString()}</span>
            <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${status === 'connected' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
              {status}
            </div>
          </div>
        </div>
        <div className="flex gap-1 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
          {['15m', '1H', '4H', '1D'].map(tf => (
            <button key={tf} onClick={() => setActiveTimeframe(tf)} className={`px-2 py-1 rounded text-[9px] font-black transition-all uppercase ${activeTimeframe === tf ? 'bg-zinc-800 text-sky-400 border border-zinc-700' : 'text-zinc-600'}`}>{tf}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={displayData} margin={{ top: 20, right: 60, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={GRID_COLOR} strokeDasharray="1 1" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#3f3f46', fontSize: 8, fontWeight: 900 }} dy={10} interval="preserveStartEnd" />
            <YAxis yAxisId="price" axisLine={false} tickLine={false} orientation="right" tick={{ fill: '#71717a', fontSize: 9, fontWeight: 800 }} domain={['auto', 'auto']} />
            <YAxis yAxisId="volume" hide domain={[0, (data: any) => Math.max(...displayData.map(d => d.volume)) * 8]} />
            
            <Bar yAxisId="volume" dataKey="volume">
              {displayData.map((e, i) => <Cell key={i} fill={e.close >= e.open ? CANDLE_GREEN : CANDLE_RED} fillOpacity={0.15} />)}
            </Bar>

            <Bar yAxisId="price" dataKey="close" shape={<CandlestickShape />} isAnimationActive={!isChanging} />
            <Scatter yAxisId="price" data={displayData.filter(d => d.signal)} dataKey="signalY" shape={<SignalAnnotation />} />

            <ReferenceLine yAxisId="price" y={currentPrice} stroke="#f43f5e" strokeDasharray="2 2" label={{ position: 'right', value: currentPrice.toFixed(2), fill: '#fff', fontSize: 8, fontWeight: '900', className: "bg-rose-600 px-1 py-0.5 rounded-sm" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;
