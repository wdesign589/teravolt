import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function EarnPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Slim Page Header */}
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Passive Income</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Earn <span className="text-emerald-400">Up to 12% APY</span>
            </h1>
            <p className="text-lg text-slate-300">
              Grow your crypto holdings through staking, savings, and liquidity provision.
            </p>
          </div>
        </div>
      </section>

      {/* Earning Options - White Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Multiple Ways to Earn
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from flexible earning options that match your investment goals and risk tolerance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Flexible Staking',
                apy: 'Up to 8%',
                desc: 'Stake your crypto and earn rewards with no lock-up period. Withdraw anytime without penalties. Perfect for beginners who want flexibility.',
                features: ['No minimum', 'Daily rewards', 'Instant withdrawal'],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Locked Staking',
                apy: 'Up to 12%',
                desc: 'Lock your assets for higher returns. Choose 30, 60, or 90-day terms. Your funds are secure and earn guaranteed interest.',
                features: ['Higher APY', 'Guaranteed returns', 'Auto-compound option'],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                title: 'DeFi Lending',
                apy: 'Up to 10%',
                desc: 'Lend your crypto to borrowers and earn interest. Fully collateralized loans ensure your capital is protected.',
                features: ['Auto-matching', 'Collateral protection', 'Weekly payouts'],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: 'Liquidity Pools',
                apy: 'Up to 15%',
                desc: 'Provide liquidity to trading pairs and earn a share of trading fees plus additional token rewards. Advanced earning strategy.',
                features: ['High APY potential', 'Trading fee share', 'Bonus rewards'],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Savings Account',
                apy: 'Up to 5%',
                desc: 'Low-risk savings with stable returns. Perfect for holding stablecoins and earning passive income without volatility.',
                features: ['Low risk', 'Stablecoin support', 'Compounding interest'],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: 'Referral Rewards',
                apy: 'Unlimited',
                desc: 'Earn commission by referring friends. Get 30% of their trading fees for life. The more you refer, the more you earn.',
                features: ['Lifetime commissions', '30% fee share', 'No limits'],
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
            ].map((option, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {option.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-500">{option.apy}</div>
                    <div className="text-xs text-slate-500">APY</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {option.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className="block text-center px-6 py-2 bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 rounded-full font-semibold transition-all"
                >
                  Start Earning
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Off-White Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Start Earning Passive Income Today
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Put your crypto to work and watch your portfolio grow. No active trading required.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
