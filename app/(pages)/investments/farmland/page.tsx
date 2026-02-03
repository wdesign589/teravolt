import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function FarmlandInvestmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/DJI_20240107162404_0073_D-Edit-1.webp"
            alt="Farmland Investment"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Agricultural Investment</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Farmland<br />
              <span className="font-medium">investment</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Invest in productive agricultural land with long-term appreciation potential. Access land acquisition, leasing, and development projects across prime farming regions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded transition-all"
              >
                Start Investing
              </Link>
              <Link
                href="#why-farmland"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded transition-all border border-white/30"
              >
                Why Farmland?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Asset Class Performance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Farmland: A Proven <span className="text-emerald-500">Asset Class</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Historical performance data shows farmland consistently outperforms many traditional investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: '40+ Years', value: 'Positive Returns', desc: 'Farmland has delivered positive returns in 40+ of the last 50 years' },
              { label: '11.5%', value: 'Avg. Annual Return', desc: 'Historical average annual return since 1992' },
              { label: 'Low', value: 'Volatility', desc: 'Lower volatility compared to stocks and REITs' },
              { label: 'Negative', value: 'Correlation', desc: 'Negative correlation with traditional markets' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
                <div className="text-3xl font-bold text-emerald-500 mb-1">{stat.label}</div>
                <div className="text-lg font-semibold text-slate-900 mb-2">{stat.value}</div>
                <p className="text-sm text-slate-600">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison Chart */}
          <div className="bg-slate-900 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Asset Class Comparison (20-Year Performance)</h3>
            <div className="space-y-4">
              {[
                { asset: 'Farmland', return: '11.5%', width: '100%', color: 'bg-emerald-500' },
                { asset: 'S&P 500', return: '9.8%', width: '85%', color: 'bg-blue-500' },
                { asset: 'Commercial Real Estate', return: '8.4%', width: '73%', color: 'bg-purple-500' },
                { asset: 'Gold', return: '7.2%', width: '63%', color: 'bg-yellow-500' },
                { asset: 'Bonds', return: '4.1%', width: '36%', color: 'bg-slate-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-40 text-slate-300 text-sm">{item.asset}</div>
                  <div className="flex-1 bg-slate-800 rounded-full h-8 overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full flex items-center justify-end pr-3`} style={{ width: item.width }}>
                      <span className="text-white text-sm font-semibold">{item.return}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              *Based on historical data. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </section>

      {/* Why Farmland */}
      <section id="why-farmland" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Invest in Farmland?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Farmland offers unique advantages that make it an attractive addition to any investment portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Inflation Protection',
                desc: 'Farmland values and crop prices historically rise with inflation, protecting your purchasing power.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Tangible Asset',
                desc: 'Unlike stocks or bonds, farmland is a real, physical asset that you can see and touch.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Limited Supply',
                desc: 'Farmland is a finite resource. As population grows, demand for productive land increases.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: 'Dual Income Streams',
                desc: 'Earn from both land appreciation and ongoing crop/lease income for diversified returns.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: 'Food Security Demand',
                desc: 'Global population growth ensures continued demand for agricultural production.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                )
              },
              {
                title: 'Portfolio Diversification',
                desc: 'Low correlation with stocks and bonds helps reduce overall portfolio risk.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                )
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-emerald-500 transition-all">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Options - Premium SaaS Style */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-emerald-600 font-medium tracking-wide uppercase text-sm mb-4">Investment Tiers</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Choose your<br />
              <span className="font-medium">farmland investment</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Multiple ways to participate in farmland ownership
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
            {/* Leasing - Starter */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-4">
                  Starter
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Leasing Arrangements</h3>
                <p className="text-slate-500 text-sm">Consistent rental income</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-slate-900">$10K</span>
                  <span className="text-slate-400 text-lg">+</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">minimum investment</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Duration</span>
                  <span className="text-slate-900 font-medium">1–5 years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Target Returns</span>
                  <span className="text-emerald-600 font-semibold">6–10%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Risk Level</span>
                  <span className="text-slate-900 font-medium">Low</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 mb-8">
                <p className="text-slate-900 font-medium text-sm mb-4">Includes:</p>
                <ul className="space-y-3">
                  {[
                    'Steady cash flow',
                    'Professional management',
                    'Quarterly distributions',
                    'Lower entry point',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/sign-up"
                className="block w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-center font-medium rounded-xl transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Development - Growth (Featured) */}
            <div className="bg-slate-900 rounded-3xl p-8 lg:p-10 relative shadow-2xl shadow-slate-900/20 flex flex-col lg:-my-4 lg:py-14">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-block px-4 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-emerald-500/30">
                  Most Popular
                </span>
              </div>
              
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full mb-4">
                  Growth
                </span>
                <h3 className="text-xl font-semibold text-white mb-2">Development Projects</h3>
                <p className="text-slate-400 text-sm">Value-add opportunities</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-white">$25K</span>
                  <span className="text-slate-400 text-lg">+</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">minimum investment</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="text-white font-medium">2–7 years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Target Returns</span>
                  <span className="text-emerald-400 font-semibold">12–18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Risk Level</span>
                  <span className="text-white font-medium">Medium</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 mb-8">
                <p className="text-white font-medium text-sm mb-4">Everything in Starter, plus:</p>
                <ul className="space-y-3">
                  {[
                    'Higher return potential',
                    'Value-add strategies',
                    'Infrastructure improvements',
                    'Capital appreciation focus',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                      <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/sign-up"
                className="block w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white text-center font-medium rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
              >
                Get Started
              </Link>
            </div>

            {/* Land Acquisition - Enterprise */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-4">
                  Enterprise
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Land Acquisition</h3>
                <p className="text-slate-500 text-sm">Direct ownership</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-slate-900">$50K</span>
                  <span className="text-slate-400 text-lg">+</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">minimum investment</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Duration</span>
                  <span className="text-slate-900 font-medium">5–10+ years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Target Returns</span>
                  <span className="text-emerald-600 font-semibold">11.5%+ avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Risk Level</span>
                  <span className="text-slate-900 font-medium">Low–Medium</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 mb-8">
                <p className="text-slate-900 font-medium text-sm mb-4">Everything in Growth, plus:</p>
                <ul className="space-y-3">
                  {[
                    'Full ownership rights',
                    'Long-term appreciation',
                    'Lease income potential',
                    'Tax advantages (1031)',
                    'Legacy asset building',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="block w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-center font-medium rounded-xl transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Farmland vs REITs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Direct Farmland vs. Farmland REITs
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Understanding the differences to make informed investment decisions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden border border-slate-200">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Direct Farmland (TerraVolt)</th>
                  <th className="px-6 py-4 text-center">Farmland REITs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { feature: 'Ownership', direct: 'Direct asset ownership', reit: 'Shares in a fund' },
                  { feature: 'Liquidity', direct: 'Lower (long-term)', reit: 'Higher (traded)' },
                  { feature: 'Minimum Investment', direct: '$10,000+', reit: 'Any amount' },
                  { feature: 'Control', direct: 'More control over assets', reit: 'No control' },
                  { feature: 'Fees', direct: 'Lower ongoing fees', reit: 'Management fees' },
                  { feature: 'Market Correlation', direct: 'Very low', reit: 'Moderate (stock market)' },
                  { feature: 'Tax Benefits', direct: 'Depreciation, 1031 exchange', reit: 'Limited' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{row.direct}</td>
                    <td className="px-6 py-4 text-center text-slate-700">{row.reit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Risk Disclosure
            </h3>
            <p className="text-sm text-amber-700">
              Farmland investments are illiquid and carry risks including environmental factors, commodity price fluctuations, and regulatory changes. Land values can decrease. Past performance does not guarantee future results. TerraVolt Incorporate does not provide investment guarantees. Please consult with financial and legal advisors before investing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Invest in <span className="text-emerald-400">Farmland</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Access institutional-quality farmland investments. Build long-term wealth with America's most productive agricultural land.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-500/30"
            >
              Create Account →
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all border border-white/20"
            >
              Speak to an Advisor
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
