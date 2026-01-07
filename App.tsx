
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Trading from './pages/Trading';
import NewsFeed from './pages/NewsFeed';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Scanner from './pages/Scanner';
import Backtest from './pages/Backtest';
import { MOCK_TICKERS } from './constants';
import { TickerData } from './types';
import { PriceFeedProvider } from './contexts/PriceFeedContext';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTicker, setSelectedTicker] = useState<TickerData>(MOCK_TICKERS[0]);

  const handleTickerSelect = (ticker: TickerData) => {
    setSelectedTicker(ticker);
    setActiveTab('trading');
  };

  return (
    <PriceFeedProvider>
      <div className="flex min-h-screen bg-[#09090b] text-zinc-50 selection:bg-blue-500/30">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 flex flex-col h-screen overflow-y-auto">
          <Header />
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === 'dashboard' && <Dashboard onTickerSelect={handleTickerSelect} />}
            {activeTab === 'trading' && <Trading ticker={selectedTicker} onTickerSelect={handleTickerSelect} />}
            {activeTab === 'scanner' && <Scanner onTickerSelect={handleTickerSelect} />}
            {activeTab === 'backtest' && <Backtest />}
            {activeTab === 'news' && <NewsFeed />}
            {activeTab === 'leaderboard' && <Leaderboard />}
            {activeTab === 'settings' && <Settings />}
            
            {['account'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-full p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-24 h-24 bg-zinc-900 rounded-[32px] flex items-center justify-center mb-8 border border-zinc-800 shadow-2xl shadow-blue-900/10">
                  <span className="text-4xl">💼</span>
                </div>
                <h2 className="text-3xl font-bold mb-3 capitalize">{activeTab} Hub</h2>
                <p className="text-zinc-500 max-w-sm text-lg">We are finalizing the advanced features for the {activeTab} module.</p>
                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl transition-all border border-zinc-700"
                  >
                    Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </PriceFeedProvider>
  );
};

export default App;
