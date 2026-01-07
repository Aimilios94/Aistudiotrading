
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { LogOut, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-72 h-screen flex flex-col glass-card border-r border-zinc-800/50 p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">TradeNexus</h1>
          <p className="text-[10px] text-zinc-500 uppercase font-semibold tracking-widest">Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-zinc-800/50 text-white border border-zinc-700/50' 
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`${activeTab === item.id ? 'text-blue-500' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-4 h-4 text-blue-500" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-zinc-800/50 space-y-4">
        <div className="bg-zinc-800/40 p-4 rounded-xl border border-zinc-700/30">
          <p className="text-xs text-zinc-400 mb-2">PRO Plan Active</p>
          <div className="w-full bg-zinc-700/50 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-2/3"></div>
          </div>
          <p className="text-[10px] text-zinc-500 mt-2">68/100 scans used</p>
        </div>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
