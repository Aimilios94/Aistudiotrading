# TradeNexus Intelligence - Context Transfer

## 🚀 Project Overview
TradeNexus is a high-performance, professional-grade SaaS trading intelligence dashboard. It leverages the **Gemini API** for automated technical analysis and market sentiment grounding, paired with a high-fidelity React frontend.

## 🛠 Tech Stack
- **Framework**: React 19 (ESM) with Tailwind CSS.
- **Charts**: Recharts with custom-built high-fidelity Candlestick shapes and AI signal annotations.
- **AI**: Google GenAI SDK (Gemini 3 Flash/Pro) for trading suggestions and Search Grounding.
- **Data**: Finnhub.io (REST/WebSockets) with a dynamic "Simulation Mode" fallback for local development and free-tier handling.

## 📐 UI/UX Standards
- **Color Palette**: `#09090b` (Background), `#3b82f6` (Primary Blue), `#10b981` (Success), `#f43f5e` (Danger).
- **Aesthetic**: Glassmorphism, professional thin borders (`zinc-800/50`), and high-contrast typography (Geist/Inter).
- **Charts**: Must use thin-wick candlesticks with professional volume overlays and red-dashed current price markers.

## 🧱 Architectural Rules
1. **Security**: API keys are managed via `process.env.API_KEY`. Never hardcode.
2. **Hybrid Data**: Use WebSockets for Crypto/Forex; use REST Polling for US Stocks due to Finnhub Free Tier limits.
3. **Resilience**: If WebSocket fails, context provider must automatically engage "Simulation Mode" to keep the UI dynamic.
4. **AI Logic**: Use `responseSchema` for structured trading suggestions to ensure the UI doesn't break on malformed strings.

## 📡 Current Limitations (The "Real-time" Issue)
- **Finnhub Free Tier**: Does NOT support real-time US Stock WebSockets. It only supports Crypto (Binance) and Forex.
- **Polling**: Stocks currently update via `getQuote` or simulation intervals.

## 🗺 Roadmap & Next Steps

### Phase 1: Data Enrichment (Immediate)
- [ ] **Multi-Source Feed**: Integrate **Binance Public API** for unrestricted real-time crypto without needing an API key for the socket.
- [ ] **Alpha Vantage Integration**: Implement historical OHLC data fetching for longer timeframe backtesting.
- [ ] **Polygon.io Fallback**: Add as a secondary source for US Stock quotes to increase rate limit resiliency.

### Phase 2: User Persistence (Infrastructure)
- [ ] **Supabase Integration**: Connect PostgreSQL for storing user watchlists, custom strategies, and audit logs.
- [ ] **Auth**: Implement "Sign in with Google" for a seamless SaaS experience.
- [ ] **Vault**: Create a "Strategy Vault" to save AI-generated setups.

### Phase 3: Advanced Intelligence (AI)
- [ ] **Multimodal Scanning**: Allow users to upload a screenshot of a chart for Gemini to analyze patterns.
- [ ] **Live Audio Interaction**: Use Gemini Live API for voice-activated market queries ("Hey TradeNexus, what's the sentiment on NVDA right now?").
- [ ] **Search Grounding 2.0**: Better extraction of specific URLs from `groundingChunks` to display as "Source Citations" in the News Feed.

### Phase 4: Pro Charting (Visuals)
- [ ] **Lightweight Charts**: Transition from Recharts to TradingView's `lightweight-charts` for handling 10,000+ data points with zero lag.
- [ ] **Framer Motion**: Add micro-interactions for price "flashes" and sidebar transitions.

## 💡 AI Instructions for Cursor
When asked to modify this app, maintain the **"Professional Quantitative"** aesthetic. Ensure every chart is a Candlestick chart with the thin-wick style defined in `MainChart.tsx`. Always check `PriceFeedContext` before adding new data-dependent components.
