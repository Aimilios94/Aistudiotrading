
import { useEffect } from 'react';
import { usePriceFeedContext } from '../contexts/PriceFeedContext';

export interface PriceUpdate {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  direction: 'up' | 'down' | 'neutral';
}

export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';

/**
 * usePriceFeed Hook
 * 
 * Provides access to the global real-time price state.
 * If an activeSymbol is provided, it ensures the underlying feed is 
 * subscribed to that specific asset.
 */
export const usePriceFeed = (activeSymbol?: string) => {
  const { prices, status, lastUpdate, subscribeToSymbol } = usePriceFeedContext();

  useEffect(() => {
    if (activeSymbol) {
      // Dynamic subscription for the asset being currently viewed/traded.
      subscribeToSymbol(activeSymbol);
    }
  }, [activeSymbol, subscribeToSymbol]);

  return { 
    prices, 
    status, 
    lastUpdate, 
    isConnected: status === 'connected' 
  };
};
