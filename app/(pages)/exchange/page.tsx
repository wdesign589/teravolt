import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ExchangePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Advanced Trading</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Pro <span className="text-emerald-400">Exchange</span>
            </h1>
            <p className="text-lg text-slate-300">
              Advanced trading platform with professional tools for serious traders.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            Professional Trading Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Advanced Charts', desc: 'TradingView integration with 100+ indicators and drawing tools.' },
              { title: 'Order Types', desc: 'Market, limit, stop-loss, OCO, and iceberg orders.' },
              { title: 'Margin Trading', desc: 'Up to 10x leverage on major trading pairs.' },
              { title: 'API Access', desc: 'REST and WebSocket APIs for algorithmic trading.' },
              { title: 'Portfolio Analytics', desc: 'Real-time P&L tracking and performance metrics.' },
              { title: 'Dark Pool', desc: 'Large order execution with minimal market impact.' },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
