import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/7cc5ccf2-8255-4b23-8d42-dcd493b99b10.webp"
            alt="Investment Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Our Services</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Comprehensive<br />
              <span className="font-medium">investment services</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              TerraVolt connects investors with verified opportunities across agriculture, energy, trading, and recovery services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What We <span className="text-emerald-500">Offer</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A complete suite of investment and financial services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agricultural Investments */}
            <Link href="/investments" className="group">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200 hover:border-emerald-500 transition-all h-full">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">Agricultural Investments</h3>
                <p className="text-slate-600 mb-4">
                  Invest in livestock farming, crop production, and farmland. Access real agricultural assets managed by vetted partner farmers with transparent returns.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Livestock Farming', 'Crop Production', 'Farmland Investment'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="text-emerald-600 font-semibold group-hover:underline">Learn More →</span>
              </div>
            </Link>

            {/* Energy Investments */}
            <Link href="/investments/lithium" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200 hover:border-orange-500 transition-all h-full">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">Energy Sector Investments</h3>
                <p className="text-slate-600 mb-4">
                  Participate in the renewable energy revolution. Invest in lithium-ion production, processing, and transportation supporting EVs and clean energy storage.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Lithium Mining & Refinery', 'Transportation Logistics', 'Energy Storage'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="text-orange-600 font-semibold group-hover:underline">Learn More →</span>
              </div>
            </Link>

            {/* Trading Services */}
            <Link href="/trading" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 hover:border-blue-500 transition-all h-full">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">CFDs & Commodities Trading</h3>
                <p className="text-slate-600 mb-4">
                  Access global financial markets through regulated trading platforms. Trade precious metals, energy commodities, and CFDs with professional tools.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Gold & Silver Trading', 'Crude Oil & Energy', 'Stock Indices & Forex'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="text-blue-600 font-semibold group-hover:underline">Learn More →</span>
              </div>
            </Link>

            {/* Agricultural Grants */}
            <Link href="/grants" className="group">
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200 hover:border-green-500 transition-all h-full">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">Agricultural Grants & Funding</h3>
                <p className="text-slate-600 mb-4">
                  Access funding opportunities for agricultural projects. We connect farmers and agribusinesses with grant programs, subsidies, and development funding.
                </p>
                <ul className="space-y-2 mb-6">
                  {['Government Grants', 'Private Funding', 'Development Programs'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="text-green-600 font-semibold group-hover:underline">Learn More →</span>
              </div>
            </Link>

            {/* Investment Recovery - Full Width */}
            <Link href="/recovery" className="group md:col-span-2">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 hover:border-red-500 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2">
                    <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">Investment Recovery Services</h3>
                    <p className="text-slate-600 mb-4">
                      Have you been a victim of investment fraud? Our recovery services help investors reclaim lost capital from scam platforms, unregulated brokers, and fraudulent schemes through legal and regulatory channels.
                    </p>
                    <span className="text-red-600 font-semibold group-hover:underline">Get Free Consultation →</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center border border-red-100">
                      <div className="text-2xl font-bold text-red-600">$25M+</div>
                      <div className="text-xs text-slate-600">Recovered</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border border-red-100">
                      <div className="text-2xl font-bold text-red-600">78%</div>
                      <div className="text-xs text-slate-600">Success Rate</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border border-red-100">
                      <div className="text-2xl font-bold text-red-600">2,500+</div>
                      <div className="text-xs text-slate-600">Cases</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center border border-red-100">
                      <div className="text-2xl font-bold text-red-600">45+</div>
                      <div className="text-xs text-slate-600">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-emerald-500">Approach</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We focus on connecting investors to real assets and verified operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Due Diligence', desc: 'Thorough verification of all investment opportunities and partners' },
              { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Transparency', desc: 'Clear communication of risks, returns, and expectations' },
              { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Asset-Backed', desc: 'Investments tied to real, productive assets' },
              { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Ethical Practice', desc: 'Commitment to responsible and sustainable investing' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200">
            <p className="text-slate-600 text-center max-w-3xl mx-auto">
              <strong className="text-slate-900">We do not promote speculative ventures.</strong> Our focus is on connecting investors to real assets, regulated markets, and verified operations that support long-term economic growth.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get <span className="text-emerald-400">Started</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Create your account today and explore our range of investment services and opportunities.
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
