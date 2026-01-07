
export enum AssetType {
  STOCK = 'STOCK',
  CRYPTO = 'CRYPTO',
  INDEX = 'INDEX'
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM'
}

export interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  type: AssetType;
  history: { time: string; value: number }[];
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  tier: SubscriptionTier;
  avatarUrl: string;
}

export interface AISuggestion {
  symbol: string;
  confidence: number;
  signal: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  reasoning: string;
  targetPrice: number;
  stopLoss: number;
}
