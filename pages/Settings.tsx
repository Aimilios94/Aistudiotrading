
import React, { useState, useEffect } from 'react';
import { User, Bell, Lock, Shield, CreditCard, Mail, Palette, History, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { auditService, AuditLog } from '../services/auditService';
import SubscriptionModal from '../components/SubscriptionModal';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  useEffect(() => {
    return auditService.subscribe(setLogs);
  }, []);

  const sections = [
    { id: 'profile', label: 'Profile Information', icon: <User className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing & Quotas', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'audit', label: 'Activity Log', icon: <History className="w-4 h-4" /> },
    { id: 'notifications', label: 'Alert Settings', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="p-8 h-full max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Account Control</h1>
        <p className="text-zinc-500 font-medium">Unified management for your TradeNexus intelligence suite.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-1">
          {sections.map(s => (
            <button 
              key={s.id} 
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${
                activeSection === s.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/30' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-8">
          {activeSection === 'profile' && (
            <div className="glass-card p-10 rounded-[48px] border border-zinc-800/50 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-xl font-bold mb-8">Personal Intelligence</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Display Name</label>
                  <input type="text" defaultValue="James Carter" className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global ID</label>
                  <input type="text" readOnly value="TRDN-9942-X" className="w-full bg-zinc-900/50 border border-zinc-800/50 rounded-2xl px-5 py-4 text-sm font-bold text-zinc-500 cursor-not-allowed" />
                </div>
              </div>
              <div className="mt-12 flex justify-end gap-4">
                <button className="px-8 py-3 bg-zinc-900 text-white font-bold rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all">Cancel</button>
                <button className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-blue-900/40 transition-all">Update Profile</button>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="glass-card p-10 rounded-[48px] border border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-center text-blue-500 shadow-2xl">
                    <Shield className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white">PRO Subscription</h4>
                    <p className="text-sm text-zinc-500 font-medium">Billed annually • Renews May 2025</p>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[9px] font-black uppercase border border-emerald-500/20 tracking-tighter">Active</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSubModalOpen(true)}
                  className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-800 transition-all active:scale-95"
                >
                  Manage Plans
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="glass-card p-8 rounded-[40px] border border-zinc-800/50">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-6">Scanning Quota</p>
                    <div className="flex items-end justify-between mb-4">
                       <span className="text-3xl font-black text-white">68<span className="text-sm text-zinc-600">/100</span></span>
                       <span className="text-xs font-bold text-zinc-500">Resetting in 14h</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                       <div className="bg-blue-600 h-full w-[68%]"></div>
                    </div>
                 </div>
                 <div className="glass-card p-8 rounded-[40px] border border-zinc-800/50">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-6">Backtest Quota</p>
                    <div className="flex items-end justify-between mb-4">
                       <span className="text-3xl font-black text-white">12<span className="text-sm text-zinc-600">/50</span></span>
                       <span className="text-xs font-bold text-zinc-500">Monthly cycle</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                       <div className="bg-emerald-600 h-full w-[24%]"></div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeSection === 'audit' && (
            <div className="glass-card p-0 rounded-[48px] border border-zinc-800/50 overflow-hidden animate-in fade-in slide-in-from-right-4 min-h-[500px]">
              <div className="p-8 border-b border-zinc-800 bg-zinc-900/20">
                <h3 className="text-xl font-bold">Activity Audit Trail</h3>
                <p className="text-sm text-zinc-500 font-medium">Immutable record of system interaction.</p>
              </div>
              <div className="p-2 space-y-1">
                {logs.length > 0 ? logs.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-5 hover:bg-zinc-900/40 rounded-3xl transition-all group">
                    <div className="flex items-center gap-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        log.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                        log.status === 'warning' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                        'bg-rose-500/10 border-rose-500/20 text-rose-500'
                      }`}>
                        {log.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-100">{log.action}</p>
                        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">{log.module} • {log.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5 text-zinc-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-tighter">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-20">
                     <History className="w-12 h-12 mb-4" />
                     <p className="text-sm font-bold uppercase tracking-widest">No Activity Recorded</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />
    </div>
  );
};

export default Settings;
