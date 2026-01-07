
const API_KEY = 'd5f6go9r01qtf8impat0d5f6go9r01qtf8impatg';
const BASE_URL = 'https://finnhub.io/api/v1';

// Simple rate limiter state
let requestCount = 0;
let lastReset = Date.now();

const checkRateLimit = () => {
  const now = Date.now();
  if (now - lastReset > 60000) {
    requestCount = 0;
    lastReset = now;
  }
  
  if (requestCount >= 50) {
    return false;
  }
  return true;
};

const throttledFetch = async (endpoint: string, params: Record<string, string> = {}) => {
  if (!checkRateLimit()) {
    console.warn('Finnhub Rate limit reached (50 req/min). Throttling request.');
    // In a real app, you might queue these or return cached data
    throw new Error('Rate limit exceeded. Max 50 requests per minute.');
  }

  requestCount++;
  const queryParams = new URLSearchParams({ ...params, token: API_KEY }).toString();
  const url = `${BASE_URL}${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url);
    if (response.status === 429) {
      throw new Error('Finnhub API: Too many requests (429).');
    }
    if (!response.ok) {
      throw new Error(`Finnhub API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Finnhub Fetch Error:', error);
    throw error;
  }
};

export const finnhubService = {
  getQuote: (symbol: string) => throttledFetch('/quote', { symbol }),
  getCompanyProfile: (symbol: string) => throttledFetch('/stock/profile2', { symbol }),
  getBasicFinancials: (symbol: string) => throttledFetch('/stock/metric', { symbol, metric: 'all' }),
  getMarketNews: (category: string = 'general') => throttledFetch('/news', { category }),
  getSymbolLookup: (q: string) => throttledFetch('/search', { q }),
};

export const FINNHUB_WS_URL = `wss://ws.finnhub.io?token=${API_KEY}`;
