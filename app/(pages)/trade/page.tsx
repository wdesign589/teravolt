import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TradePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Slim Page Header */}
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Trading Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Trade Crypto Like a <span className="text-emerald-400">Pro</span>
            </h1>
            <p className="text-lg text-slate-300">
              Advanced trading tools, lightning-fast execution, and institutional-grade liquidity for serious traders.
            </p>
          </div>
        </div>
      </section>

      {/* Performance Stats - White Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Lightning-Fast Order Execution
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Our proprietary matching engine processes orders in under 50 milliseconds, ensuring you never miss market opportunities. With direct market access and deep liquidity from top-tier exchanges, you get the best possible prices with minimal slippage.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Whether you\'re a day trader executing dozens of trades daily or a long-term investor building your portfolio, our platform delivers the speed and reliability professional traders demand.
              </p>
              <div className="space-y-4">
                {[
                  'Sub-50ms order execution',
                  'Real-time market data feeds',
                  'Advanced order types (limit, stop-loss, OCO)',
                  'API access for algorithmic trading',
                  'Deep liquidity from 20+ exchanges',
                  '99.99% uptime guarantee'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Platform Performance</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-slate-600 font-semibold">Trading Fee</span>
                    <span className="text-4xl font-bold text-emerald-500">0.1%</span>
                  </div>
                  <p className="text-sm text-slate-500">Starts at 0.1%, decreases with volume</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-slate-600 font-semibold">Execution Speed</span>
                    <span className="text-4xl font-bold text-emerald-500">&lt;50ms</span>
                  </div>
                  <p className="text-sm text-slate-500">Average order matching time</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-slate-600 font-semibold">Trading Pairs</span>
                    <span className="text-4xl font-bold text-emerald-500">500+</span>
                  </div>
                  <p className="text-sm text-slate-500">All major crypto pairs available</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-slate-600 font-semibold">Daily Volume</span>
                    <span className="text-4xl font-bold text-emerald-500">$2B+</span>
                  </div>
                  <p className="text-sm text-slate-500">Deep liquidity for all trades</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trading Features - Off-White Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Professional Trading Tools
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to trade like a pro, from basic market orders to advanced algorithmic strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Spot Trading',
                desc: 'Buy and sell cryptocurrencies instantly at current market prices. Perfect for quick trades and taking advantage of market opportunities. Trade over 500 pairs with deep liquidity and tight spreads.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Limit Orders',
                desc: 'Set your target price and let the order execute automatically when the market reaches your level. Great for patient traders who want to buy dips or sell peaks without watching charts 24/7.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: 'Stop-Loss Orders',
                desc: 'Protect your investments from significant losses by automatically selling when prices drop to your specified level. Essential risk management tool for every serious trader.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: 'Margin Trading',
                desc: 'Amplify your trading power with up to 10x leverage. Trade larger positions with less capital, but remember—leverage magnifies both gains and losses. Use responsibly.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                )
              },
              {
                title: 'API Trading',
                desc: 'Connect your trading bots and algorithmic strategies via our REST and WebSocket APIs. Full market data access, order management, and portfolio tracking for quantitative traders.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )
              },
              {
                title: 'Advanced Charts',
                desc: 'TradingView integration with 100+ technical indicators, drawing tools, and customizable layouts. Analyze markets like a professional with institutional-grade charting tools.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
            ].map((option, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all group">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {option.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - White Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-2xl p-12 border border-slate-200 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Start Trading in Minutes
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join over 100,000 traders who trust Terravolt for fast, secure, and low-cost cryptocurrency trading. Create your account and start trading in less than 5 minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
              >
                Create Free Account
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 rounded-full font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Learn How to Trade
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
