import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/7cc5ccf2-8255-4b23-8d42-dcd493b99b10.webp"
            alt="Trading Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-blue-400 font-medium tracking-wide uppercase text-sm mb-4">Trading Services</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              CFDs & commodities<br />
              <span className="font-medium">trading</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Access global financial markets through regulated trading platforms. Trade precious metals, energy commodities, and CFDs with professional tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded transition-all"
              >
                Start Trading
              </Link>
              <Link
                href="#instruments"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded transition-all border border-white/30"
              >
                View Instruments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Market-Based <span className="text-blue-500">Instruments</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              TerraVolt facilitates access to regulated trading platforms offering market-based instruments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Precious Metals */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200">
              <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Precious Metals</h3>
              <p className="text-slate-600 mb-6">
                Trade gold, silver, and other precious metals through approved trading channels with competitive spreads.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold text-sm">Au</span>
                  <span>Gold (XAU/USD)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 font-bold text-sm">Ag</span>
                  <span>Silver (XAG/USD)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 font-bold text-sm">Pt</span>
                  <span>Platinum (XPT/USD)</span>
                </div>
              </div>
            </div>

            {/* Energy Commodities */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200">
              <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Energy Commodities</h3>
              <p className="text-slate-600 mb-6">
                Participate in energy markets including crude oil and natural gas with real-time pricing.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-xs">OIL</span>
                  <span>Crude Oil (WTI/Brent)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">NG</span>
                  <span>Natural Gas</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-xs">HO</span>
                  <span>Heating Oil</span>
                </div>
              </div>
            </div>

            {/* CFDs */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Contracts for Difference</h3>
              <p className="text-slate-600 mb-6">
                Trade CFDs on various asset classes without direct ownership of the underlying assets.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs">IDX</span>
                  <span>Stock Indices</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold text-xs">FX</span>
                  <span>Forex Pairs</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold text-xs">STK</span>
                  <span>Individual Stocks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What are CFDs */}
      <section id="instruments" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                What are <span className="text-blue-500">CFDs</span>?
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Contracts for Difference (CFDs) are financial derivatives that allow you to speculate on price movements of various assets without owning the underlying asset.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                When you trade a CFD, you enter into a contract with a broker to exchange the difference in the price of an asset from when the contract is opened to when it is closed.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Long & Short Positions', desc: 'Profit from both rising and falling markets' },
                  { title: 'Leverage Available', desc: 'Control larger positions with smaller capital' },
                  { title: 'No Ownership Required', desc: 'Trade without owning the underlying asset' },
                  { title: 'Diverse Markets', desc: 'Access stocks, indices, commodities, and forex' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="font-semibold text-slate-900">{item.title}:</span>
                      <span className="text-slate-600 ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6">How CFD Trading Works</h3>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Choose Your Market', desc: 'Select from stocks, indices, commodities, or forex' },
                  { step: '2', title: 'Decide Direction', desc: 'Go long (buy) if you expect prices to rise, or short (sell) if you expect them to fall' },
                  { step: '3', title: 'Set Position Size', desc: 'Determine your trade size and apply leverage if desired' },
                  { step: '4', title: 'Manage Risk', desc: 'Set stop-loss and take-profit levels to manage your risk' },
                  { step: '5', title: 'Close Position', desc: 'Close your trade to realize profit or loss based on price movement' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Gold */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl p-8 border border-yellow-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Gold Trading Benefits</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Safe Haven', value: 'Asset' },
                    { label: 'High', value: 'Liquidity' },
                    { label: '24/5', value: 'Trading' },
                    { label: 'Inflation', value: 'Hedge' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">{item.value}</div>
                      <div className="text-sm text-slate-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Trading <span className="text-yellow-500">Gold</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Gold has been a store of value for thousands of years. Today, it remains one of the most traded commodities globally, offering opportunities for both short-term trading and long-term investment.
              </p>
              <p className="text-lg text-slate-600 mb-8">
                Trade gold CFDs to gain exposure to gold price movements without the need to physically store the metal. Benefit from tight spreads and professional execution.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition-all"
              >
                Start Trading Gold
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trading Oil */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Trading <span className="text-blue-400">Crude Oil</span>
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Crude oil is one of the world's most actively traded commodities. Price movements are influenced by global supply and demand, geopolitical events, and economic indicators.
              </p>
              <p className="text-lg text-slate-300 mb-8">
                Trade both WTI (West Texas Intermediate) and Brent crude oil CFDs with competitive spreads and leverage options.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: 'WTI Crude', desc: 'US benchmark' },
                  { label: 'Brent Crude', desc: 'Global benchmark' },
                  { label: 'Tight Spreads', desc: 'Competitive pricing' },
                  { label: 'Leverage', desc: 'Up to 100:1' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-4">
                    <div className="font-semibold text-white">{item.label}</div>
                    <div className="text-sm text-slate-400">{item.desc}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-all"
              >
                Start Trading Oil
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6">Oil Price Factors</h3>
              <div className="space-y-4">
                {[
                  { factor: 'OPEC Decisions', impact: 'Supply adjustments affect global prices' },
                  { factor: 'Economic Growth', impact: 'Demand correlates with economic activity' },
                  { factor: 'Geopolitical Events', impact: 'Conflicts in oil-producing regions' },
                  { factor: 'USD Strength', impact: 'Oil is priced in US dollars globally' },
                  { factor: 'Inventory Data', impact: 'Weekly US inventory reports' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-white">{item.factor}:</span>
                      <span className="text-slate-400 ml-1">{item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trading Platform Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Access professional-grade tools through our partner trading platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Advanced Charts', desc: 'TradingView integration with 100+ indicators' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Fast Execution', desc: 'Sub-millisecond order execution' },
              { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', title: 'Mobile Trading', desc: 'Trade on iOS and Android devices' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Risk Management', desc: 'Stop-loss, take-profit, and trailing stops' },
              { icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', title: 'Real-Time Data', desc: 'Live prices and market depth' },
              { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: 'Education', desc: 'Tutorials, webinars, and guides' },
              { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', title: '24/7 Support', desc: 'Round-the-clock customer service' },
              { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Segregated Funds', desc: 'Client funds held separately' },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:border-blue-500 transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Warning */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Important Risk Warning
            </h3>
            <p className="text-sm text-red-700 mb-3">
              <strong>CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage.</strong> Between 70-80% of retail investor accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.
            </p>
            <p className="text-sm text-red-700">
              Trading commodities and CFDs involves significant risk and is not suitable for all investors. Past performance is not indicative of future results. TerraVolt facilitates access to regulated trading platforms but does not provide investment advice. Please ensure you fully understand the risks involved and seek independent advice if necessary.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start <span className="text-blue-400">Trading</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Access global markets through our regulated trading platform partners. Open a demo account to practice risk-free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-500/30"
            >
              Open Live Account →
            </Link>
            <Link
              href="/sign-up"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all border border-white/20"
            >
              Try Demo Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
