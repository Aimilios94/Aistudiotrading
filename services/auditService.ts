
export interface AuditLog {
  id: string;
  action: string;
  module: 'scanner' | 'backtest' | 'trading' | 'account';
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

class AuditService {
  private logs: AuditLog[] = [];
  private listeners: ((logs: AuditLog[]) => void)[] = [];

  log(action: string, module: AuditLog['module'], details: string, status: AuditLog['status'] = 'success') {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      action,
      module,
      details,
      status,
      timestamp: new Date().toISOString()
    };
    
    this.logs = [newLog, ...this.logs].slice(0, 50); // Keep last 50
    this.notify();
  }

  getLogs() {
    return this.logs;
  }

  subscribe(listener: (logs: AuditLog[]) => void) {
    this.listeners.push(listener);
    listener(this.logs);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.logs));
  }
}

export const auditService = new AuditService();
