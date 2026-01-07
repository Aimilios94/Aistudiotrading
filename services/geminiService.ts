
import { GoogleGenAI, Type } from "@google/genai";
import { AISuggestion, TickerData } from "../types";
import { finnhubService } from "./finnhubService";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTradingSuggestion = async (ticker: TickerData): Promise<AISuggestion> => {
  let realTimePrice = ticker.price;
  let quoteInfo = "";

  try {
    // Attempt to get the very latest quote for the AI prompt
    const quote = await finnhubService.getQuote(ticker.symbol);
    if (quote && quote.c) {
      realTimePrice = quote.c;
      quoteInfo = `\nReal-time Data: High: ${quote.h}, Low: ${quote.l}, Open: ${quote.o}, Prev Close: ${quote.pc}`;
    }
  } catch (e) {
    console.warn("Could not fetch real-time quote for Gemini prompt, using local state.");
  }

  const prompt = `Analyze the following trading data for ${ticker.symbol} (${ticker.name}):
  Current Price: $${realTimePrice}
  24h Change: ${ticker.changePercent}%
  Volume: ${ticker.volume}
  Market Cap: ${ticker.marketCap}${quoteInfo}
  
  Provide a professional trading suggestion including signal (BULLISH, BEARISH, or NEUTRAL), confidence score (0-100), reasoning, target price, and stop loss. Ensure the target and stop loss are realistic relative to the current price of $${realTimePrice}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            symbol: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            signal: { type: Type.STRING, description: "BULLISH, BEARISH, or NEUTRAL" },
            reasoning: { type: Type.STRING },
            targetPrice: { type: Type.NUMBER },
            stopLoss: { type: Type.NUMBER },
          },
          required: ["symbol", "confidence", "signal", "reasoning", "targetPrice", "stopLoss"],
        },
      },
    });

    return JSON.parse(response.text.trim()) as AISuggestion;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      symbol: ticker.symbol,
      confidence: 0,
      signal: 'NEUTRAL',
      reasoning: "Unable to generate AI analysis at this time due to processing constraints.",
      targetPrice: realTimePrice,
      stopLoss: realTimePrice * 0.95
    };
  }
};

export interface MarketNews {
  title: string;
  snippet: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  time: string;
}

export const getMarketNews = async (query: string = "major financial market news"): Promise<MarketNews[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find the most impactful market-moving news for: ${query}. Focus on events from the last 24 hours.`,
      config: {
        tools: [{ googleSearch: {} }]
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const text = response.text || "";
    const lines = text.split('\n').filter(l => l.length > 20).slice(0, 5);
    
    return lines.map((line, i) => {
      const chunk = groundingChunks[i];
      return {
        title: line.split(':')[0]?.replace(/[*#]/g, '').trim() || "Market Intelligence Update",
        snippet: line.trim(),
        url: chunk?.web?.uri || "https://finance.yahoo.com",
        sentiment: line.toLowerCase().includes('surge') || line.toLowerCase().includes('gain') ? 'positive' : 
                   line.toLowerCase().includes('drop') || line.toLowerCase().includes('fall') ? 'negative' : 'neutral',
        time: "Just now"
      };
    });
  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
};

export const deepScanTicker = async (symbol: string): Promise<MarketNews[]> => {
  return getMarketNews(`latest SEC filings and institutional news for ${symbol}`);
};
