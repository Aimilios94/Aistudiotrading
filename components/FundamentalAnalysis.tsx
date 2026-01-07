
import React, { useState, useEffect } from 'react';
import { Landmark, Activity, BarChart3, PieChart, Coins, Info, Loader2, AlertTriangle } from 'lucide-react';
import { TickerData } from '../types';
import MetricModal from './MetricModal';
import { finnhubService } from '../services/finnhubService';

interface FundamentalAnalysisProps {
  ticker: TickerData;
}

const FundamentalAnalysis: React.FC<FundamentalAnalysisProps> = ({ ticker }) => {
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [financials, setFinancials] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinancials = async () => {
      try {
        setLoading(true);
        setError(null);
        // Only fetch if it looks like a standard stock symbol (Finnhub doesn't have financials for binance symbols)
        if (ticker.symbol.includes(':')) {
          setFinancials(null);
          setLoading(false);
          return;
        }
        const data = await finnhubService.getBasicFinancials(ticker.symbol);
        setFinancials(data.metric);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch financials');
      } finally {
        setLoading(false);
      }
    };
    fetchFinancials();
  }, [ticker.symbol]);

  const metrics = [
    { 
      label: 'Market Cap', 
      value: financials?.marketCapitalization ? `$${(financials.marketCapitalization / 1000).toFixed(2)}B` : ticker.marketCap, 
      icon: <Landmark className="w-4 h-4" />,
      formula: "Current Share Price × Total Shares Outstanding",
      description: "Market capitalization refers to the total dollar market value of a company's outstanding shares of stock."
    },
    { 
      label: 'P/E Ratio', 
      value: financials?.peNormalizedAnnual?.toFixed(2) || 'N/A', 
      icon: <Activity className="w-4 h-4" />,
      formula: "Market Value per Share / Earnings per Share (EPS)",
      description: "The price-to-earnings ratio is a tool that investors use to determine the relative value of a company's shares."
    },
    { 
      label: '52-Week High', 
      value: financials?.['52WeekHigh'] ? `$${financials['52WeekHigh'].toFixed(2)}` : 'N/A', 
      icon: <BarChart3 className="w-4 h-4" />,
      formula: "Highest trading price in the last 52 weeks",
      description: "The highest price at which a stock has traded during the previous 52 weeks."
    },
    { 
      label: 'Div Yield', 
      value: financials?.dividendYield5Y ? `${financials.dividendYield5Y.toFixed(2)}%` : '0.00%', 
      icon: <PieChart className="w-4 h-4" />,
      formula: "(Annual Dividends per Share / Price per Share) × 100",
      description: "Dividend yield shows how much a company pays out in dividends each year relative to its stock price."
    },
    { 
      label: 'EPS (TTM)', 
      value: financials?.epsTTM ? `$${financials.epsTTM.toFixed(2)}` : 'N/A', 
      icon: <Coins className="w-4 h-4" />,
      formula: "(Net Income - Preferred Dividends) / Average Outstanding Shares",
      description: "Earnings per share is the amount of profit allocated to each outstanding share of common stock."
    },
    { 
      label: 'ROE', 
      value: financials?.roeTTM ? `${financials.roeTTM.toFixed(2)}%` : 'N/A', 
      icon: <Activity className="w-4 h-4" />,
      formula: "Net Income / Shareholders' Equity",
      description: "Return on equity measures a corporation's profitability by revealing how much profit a company generates with the money shareholders have invested."
    },
  ];

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-3 p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-rose-500">
      <AlertTriangle className="w-5 h-5 shrink-0" />
      <p className="text-sm font-medium">{error}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((m, i) => (
        <button 
          key={i} 
          onClick={() => setSelectedMetric(m)}
          className="text-left bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-3xl hover:border-blue-500/30 hover:bg-zinc-900 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-3 mb-2 text-zinc-500">
            <div className="p-2 bg-zinc-800 rounded-xl group-hover:text-blue-500 transition-colors">{m.icon}</div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{m.label}</span>
          </div>
          <p className="text-xl font-bold text-zinc-100">{m.value}</p>
        </button>
      ))}

      <MetricModal 
        isOpen={!!selectedMetric}
        onClose={() => setSelectedMetric(null)}
        title={selectedMetric?.label || ""}
        formula={selectedMetric?.formula || ""}
        description={selectedMetric?.description || ""}
      />
    </div>
  );
};

export default FundamentalAnalysis;
