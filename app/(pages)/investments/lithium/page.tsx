import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function LithiumInvestmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/1e0648bd-b076-4900-9819-fb7100ec376b.webp"
            alt="Lithium-Ion Energy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-orange-400 font-medium tracking-wide uppercase text-sm mb-4">Renewable Energy Investment</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Lithium-ion<br />
              <span className="font-medium">energy investment</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Invest in the future of renewable energy. Access opportunities in lithium-ion production, processing, and transportation—the backbone of EVs and clean energy storage.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded transition-all"
              >
                Start Investing
              </Link>
              <Link
                href="#packages"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded transition-all border border-white/30"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Lithium */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              The <span className="text-orange-500">Lithium</span> Opportunity
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Lithium-ion technology is at the heart of the global energy transition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { value: '$400B+', label: 'Projected Market Size by 2030', desc: 'The lithium-ion battery market is experiencing explosive growth' },
              { value: '25%', label: 'Annual Growth Rate', desc: 'CAGR driven by EV adoption and energy storage demand' },
              { value: '10x', label: 'Demand Increase', desc: 'Expected lithium demand increase over the next decade' },
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-slate-900 mb-2">{stat.label}</div>
                <p className="text-sm text-slate-600">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', title: 'Electric Vehicles', desc: 'Powering the EV revolution with advanced battery technology' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Energy Storage', desc: 'Grid-scale storage for renewable energy systems' },
              { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', title: 'Consumer Electronics', desc: 'Smartphones, laptops, and portable devices' },
              { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Industrial Applications', desc: 'Manufacturing and industrial power solutions' },
            ].map((app, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-slate-200">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={app.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{app.title}</h3>
                <p className="text-sm text-slate-600">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Packages - Premium SaaS Style */}
      <section id="packages" className="py-28 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-orange-600 font-medium tracking-wide uppercase text-sm mb-4">Investment Tiers</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Choose your<br />
              <span className="font-medium">energy investment</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From transportation contracts to industrial mining operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
            {/* Transportation Starter */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full mb-4">
                  Starter
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Logistics Contracts</h3>
                <p className="text-slate-500 text-sm">Revenue share on transportation</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-slate-900">$2,000</span>
                  <span className="text-slate-400 text-lg">– $25K</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">entry-level investment</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Duration</span>
                  <span className="text-slate-900 font-medium">6–24 months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Target Returns</span>
                  <span className="text-emerald-600 font-semibold">8–20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Risk Level</span>
                  <span className="text-slate-900 font-medium">Low–Medium</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 mb-8">
                <p className="text-slate-900 font-medium text-sm mb-4">Includes:</p>
                <ul className="space-y-3">
                  {[
                    'Revenue share on shipments',
                    'Tracking & compliance updates',
                    'Quarterly distributions',
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

            {/* Fleet Co-invest (Featured) */}
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
                <h3 className="text-xl font-semibold text-white mb-2">Fleet & Warehouse</h3>
                <p className="text-slate-400 text-sm">Asset-backed logistics infrastructure</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-white">$25K</span>
                  <span className="text-slate-400 text-lg">– $500K</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">flexible investment range</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="text-white font-medium">1–5 years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Target Returns</span>
                  <span className="text-emerald-400 font-semibold">15–35%</span>
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
                    'Asset-backed investments',
                    'Insured storage facilities',
                    'Chain-of-custody reporting',
                    'Priority distribution rights',
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

            {/* Mining Enterprise */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full mb-4">
                  Enterprise
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Mining & Refinery</h3>
                <p className="text-slate-500 text-sm">Industrial-scale operations</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-slate-900">$50K</span>
                  <span className="text-slate-400 text-lg">– $1M</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">institutional investment</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Duration</span>
                  <span className="text-slate-900 font-medium">2–6 years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Target Returns</span>
                  <span className="text-orange-600 font-semibold">20–50%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Risk Level</span>
                  <span className="text-slate-900 font-medium">Medium–High</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 mb-8">
                <p className="text-slate-900 font-medium text-sm mb-4">Everything in Growth, plus:</p>
                <ul className="space-y-3">
                  {[
                    'Structured equity positions',
                    'Off-take priority agreements',
                    'Governance participation',
                    'Quarterly performance reports',
                    'Site visit opportunities',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 text-sm">
                      <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* The Energy Transition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Powering the <span className="text-orange-500">Energy Transition</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                The global shift to renewable energy and electric transportation is creating unprecedented demand for lithium-ion technology. TerraVolt connects you with verified industrial operations supporting this transformation.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'EV Revolution', desc: 'Electric vehicle sales are projected to reach 40% of all car sales by 2030.' },
                  { title: 'Grid Storage', desc: 'Utility-scale battery storage is essential for renewable energy integration.' },
                  { title: 'Supply Chain Critical', desc: 'Lithium supply chains are strategic national priorities worldwide.' },
                  { title: 'Sustainable Future', desc: 'Your investment supports the transition to clean energy infrastructure.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">2030</div>
                <div className="text-slate-600">Target Year for Major EV Adoption</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 text-center mt-8">
                <div className="text-4xl font-bold text-orange-500 mb-2">$15T</div>
                <div className="text-slate-600">Global Clean Energy Investment Needed</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">140+</div>
                <div className="text-slate-600">Countries with Net-Zero Targets</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 text-center mt-8">
                <div className="text-4xl font-bold text-orange-500 mb-2">3x</div>
                <div className="text-slate-600">Battery Capacity Growth by 2030</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Risk Disclosure
            </h3>
            <p className="text-sm text-amber-700">
              Lithium-ion investments carry risks including commodity price volatility, regulatory changes, technological disruption, and operational challenges. Mining and production investments involve capital expenditure risks. Past performance does not guarantee future results. TerraVolt Incorporate does not provide investment guarantees. Please consult with financial advisors before investing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Invest in the <span className="text-orange-400">Energy Future</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Join investors powering the clean energy transition. Start with logistics contracts from $2,000 or explore production investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all shadow-lg shadow-orange-500/30"
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
