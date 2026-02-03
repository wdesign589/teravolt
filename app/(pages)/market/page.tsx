import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Live Data</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Market <span className="text-emerald-400">Data</span>
            </h1>
            <p className="text-lg text-slate-300">
              Real-time cryptocurrency prices, charts, and market analytics.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            Top Cryptocurrencies
          </h2>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Price</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">24h %</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: 'Bitcoin', symbol: 'BTC', price: '$43,250', change: '+2.34%', cap: '$845B', positive: true },
                  { rank: 2, name: 'Ethereum', symbol: 'ETH', price: '$2,280', change: '+1.82%', cap: '$274B', positive: true },
                  { rank: 3, name: 'Solana', symbol: 'SOL', price: '$98.50', change: '+5.12%', cap: '$42B', positive: true },
                  { rank: 4, name: 'Cardano', symbol: 'ADA', price: '$0.58', change: '-0.45%', cap: '$20B', positive: false },
                  { rank: 5, name: 'Polkadot', symbol: 'DOT', price: '$7.25', change: '+3.21%', cap: '$9.5B', positive: true },
                ].map((coin) => (
                  <tr key={coin.rank} className="border-b border-slate-200 last:border-none hover:bg-slate-100 transition-colors">
                    <td className="px-6 py-4 text-slate-700">{coin.rank}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{coin.name}</div>
                      <div className="text-sm text-slate-500">{coin.symbol}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">{coin.price}</td>
                    <td className={`px-6 py-4 text-right font-semibold ${coin.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {coin.change}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700">{coin.cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
