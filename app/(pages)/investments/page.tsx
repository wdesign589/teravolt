import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function InvestmentsPage() {
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
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Investment Opportunities</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Invest in<br />
              <span className="font-medium">real assets</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              TerraVolt provides structured access to asset-backed investment opportunities across agriculture, renewable energy, and commodities.
            </p>
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Investment <span className="text-emerald-500">Categories</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose from our diverse range of asset-backed investment opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Livestock Farming */}
            <Link href="/investments/livestock" className="group">
              <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all p-8 h-full">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      Livestock Farming
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Invest in cattle and livestock operations. Own real agricultural assets managed by vetted partner farmers.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-emerald-600 font-semibold">From $5,000</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">12-25% Returns</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">6-48 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Crop Production */}
            <Link href="/investments/crops" className="group">
              <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all p-8 h-full">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      Crop Production
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Participate in commercial-scale farming operations. Earn returns aligned with harvest cycles and market demand.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-emerald-600 font-semibold">From $2,000</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">18-60% Returns</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">6-36 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Farmland */}
            <Link href="/investments/farmland" className="group">
              <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all p-8 h-full">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      Farmland Investment
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Invest in productive agricultural land. Access land acquisition, leasing, and long-term appreciation strategies.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-emerald-600 font-semibold">From $10,000</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">11.5% Avg. Return</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">Long-term</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Lithium-Ion Energy */}
            <Link href="/investments/lithium" className="group">
              <div className="bg-white rounded-2xl border-2 border-slate-200 hover:border-orange-500 transition-all p-8 h-full">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                      Lithium-Ion Energy
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Invest in the future of renewable energy. Access lithium-ion production and transportation opportunities.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-orange-600 font-semibold">From $2,000</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">8-50% Returns</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">6 months - 6 years</span>
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
              Our Investment Approach
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We focus on connecting investors to real assets and verified operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Due Diligence', desc: 'Thorough verification of all investment opportunities and partners', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { title: 'Transparency', desc: 'Clear communication of risks, returns, and expectations', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { title: 'Asset-Backed', desc: 'Investments tied to real, productive assets', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
              { title: 'Ethical Practice', desc: 'Commitment to responsible and sustainable investing', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
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
            Ready to Start <span className="text-emerald-400">Investing</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Create your account today and explore our range of asset-backed investment opportunities.
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
