
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { MOCK_TICKERS } from '../constants';
import { FINNHUB_WS_URL } from '../services/finnhubService';
import { PriceUpdate, ConnectionStatus } from '../hooks/usePriceFeed';

interface PriceFeedContextType {
  prices: Record<string, PriceUpdate>;
  status: ConnectionStatus;
  lastUpdate: string | null;
  subscribeToSymbol: (symbol: string) => void;
}

const PriceFeedContext = createContext<PriceFeedContextType | undefined>(undefined);

export const PriceFeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<Record<string, PriceUpdate>>(() => {
    const initial: Record<string, PriceUpdate> = {};
    MOCK_TICKERS.forEach(t => {
      initial[t.symbol] = {
        symbol: t.symbol,
        price: t.price,
        change: t.change,
        changePercent: t.changePercent,
        direction: 'neutral'
      };
    });
    return initial;
  });

  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const simulationIntervalRef = useRef<number | null>(null);
  const subscribedSymbols = useRef<Set<string>>(new Set(MOCK_TICKERS.map(t => t.symbol)));

  // Fallback Simulation Mode: Finnhub Free tier has strict limits on real-time stocks.
  // This ensures the dashboard stays "alive" for presentation purposes.
  const startSimulation = useCallback(() => {
    if (simulationIntervalRef.current) return;
    simulationIntervalRef.current = window.setInterval(() => {
      setPrices(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(symbol => {
          const current = next[symbol];
          const vol = current.price * 0.0002;
          const change = (Math.random() - 0.5) * vol;
          const newPrice = current.price + change;
          
          next[symbol] = {
            ...current,
            price: newPrice,
            direction: newPrice > current.price ? 'up' : 'down'
          };
        });
        return next;
      });
      setLastUpdate(new Date().toLocaleTimeString());
    }, 2000);
  }, []);

  const stopSimulation = useCallback(() => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    setStatus('connecting');
    const socket = new WebSocket(FINNHUB_WS_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Price Feed: Connected to Finnhub');
      setStatus('connected');
      stopSimulation(); // Real data preferred
      subscribedSymbols.current.forEach(symbol => {
        socket.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'trade') {
        setPrices(prev => {
          const next = { ...prev };
          msg.data.forEach((trade: any) => {
            const symbol = trade.s;
            if (!next[symbol]) return;
            const oldPrice = next[symbol].price;
            next[symbol] = {
              ...next[symbol],
              price: trade.p,
              direction: trade.p > oldPrice ? 'up' : trade.p < oldPrice ? 'down' : 'neutral'
            };
          });
          return next;
        });
        setLastUpdate(new Date().toLocaleTimeString());
      }
    };

    socket.onclose = () => {
      setStatus('disconnected');
      startSimulation(); // Fallback to simulation if server closes/rejects
      setTimeout(connect, 10000);
    };

    socket.onerror = () => {
      setStatus('disconnected');
      startSimulation();
    };
  }, [startSimulation, stopSimulation]);

  useEffect(() => {
    connect();
    // Start simulation immediately in case the connection is slow or fails
    startSimulation();
    return () => {
      stopSimulation();
      socketRef.current?.close();
    };
  }, [connect, startSimulation, stopSimulation]);

  const subscribeToSymbol = (symbol: string) => {
    if (!subscribedSymbols.current.has(symbol)) {
      subscribedSymbols.current.add(symbol);
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'subscribe', symbol }));
      }
    }
  };

  return (
    <PriceFeedContext.Provider value={{ prices, status, lastUpdate, subscribeToSymbol }}>
      {children}
    </PriceFeedContext.Provider>
  );
};

export const usePriceFeedContext = () => {
  const context = useContext(PriceFeedContext);
  if (!context) throw new Error('usePriceFeedContext must be used within a PriceFeedProvider');
  return context;
};
