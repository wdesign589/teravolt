import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function LivestockInvestmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/15ba644e-81cd-4531-b325-417a414dfef8.webp"
            alt="Livestock Farming"
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
              Livestock farming<br />
              <span className="font-medium">investment</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Invest in cattle and livestock operations with transparent returns. Own real agricultural assets managed by vetted partner farmers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded transition-all"
              >
                Start Investing
              </Link>
              <Link
                href="#packages"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded transition-all border border-white/30"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How Livestock Investment Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A simple, transparent process to invest in real livestock assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Package', desc: 'Select an investment tier that matches your goals and capital.' },
              { step: '2', title: 'We Acquire Livestock', desc: 'Your investment funds the purchase of cattle or livestock from verified farms.' },
              { step: '3', title: 'Professional Management', desc: 'Partner farmers handle feeding, veterinary care, and growth monitoring.' },
              { step: '4', title: 'Earn Returns', desc: 'Receive your share of proceeds when livestock reach market weight or breeding goals.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Packages - Premium SaaS Style */}
      <section id="packages" className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-emerald-600 font-medium tracking-wide uppercase text-sm mb-4">Investment Tiers</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Choose your<br />
              <span className="font-medium">investment plan</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select the tier that aligns with your financial goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
            {/* Tier 1 - Starter */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-4">
                  Starter
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Entry Level</h3>
                <p className="text-slate-500 text-sm">Perfect for first-time investors</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-slate-900">$5,000</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">per calf / small pod</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Duration</span>
                  <span className="text-slate-900 font-medium">6–12 months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Target Returns</span>
                  <span className="text-emerald-600 font-semibold">12–25%</span>
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
                    'Animal ownership certificate',
                    'Veterinary care & feeding',
                    'Monthly progress updates',
                    'Sale proceeds split',
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

            {/* Tier 2 - Growth (Featured) */}
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
                <h3 className="text-xl font-semibold text-white mb-2">Herd Growth Plan</h3>
                <p className="text-slate-400 text-sm">Breeding & expansion focused</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-white">$11,000</span>
                  <span className="text-slate-400 text-lg">– $45,500</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">flexible investment range</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="text-white font-medium">12–48 months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Target Returns</span>
                  <span className="text-emerald-400 font-semibold">Revenue Share</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Risk Level</span>
                  <span className="text-white font-medium">Low–Medium</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 mb-8">
                <p className="text-white font-medium text-sm mb-4">Everything in Starter, plus:</p>
                <ul className="space-y-3">
                  {[
                    'Breeding program access',
                    'Performance dashboard',
                    'Insurance options',
                    'Meat/dairy revenue share',
                    'Multiple slot access',
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

            {/* Tier 3 - Enterprise */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-4">
                  Enterprise
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Ranch Ownership</h3>
                <p className="text-slate-500 text-sm">For institutional investors</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-slate-900">$125K</span>
                  <span className="text-slate-400 text-lg">– $5M</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">institutional investment</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Duration</span>
                  <span className="text-slate-900 font-medium">Multi-year</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Target Returns</span>
                  <span className="text-emerald-600 font-semibold">55–68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Risk Level</span>
                  <span className="text-slate-900 font-medium">Medium</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 mb-8">
                <p className="text-slate-900 font-medium text-sm mb-4">Everything in Growth, plus:</p>
                <ul className="space-y-3">
                  {[
                    'Full herd ownership',
                    'Dedicated management',
                    'Direct market access',
                    'Carbon credit potential',
                    'Strategic benefits',
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

      {/* Why Livestock Investment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Why Invest in <span className="text-emerald-500">Livestock</span>?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Livestock farming represents one of the most stable and essential sectors of the global economy. With growing demand for protein and sustainable farming practices, agricultural investments offer unique advantages.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Tangible Assets', desc: 'Your investment is backed by real, physical livestock that you own.' },
                  { title: 'Food Security Demand', desc: 'Global protein demand continues to rise, ensuring market stability.' },
                  { title: 'Inflation Hedge', desc: 'Agricultural assets historically perform well during inflationary periods.' },
                  { title: 'Professional Management', desc: 'Experienced farmers handle all operations while you earn returns.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
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
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">70+</div>
                <div className="text-slate-600">Partner Farmers</div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center mt-8">
                <div className="text-4xl font-bold text-emerald-500 mb-2">$50M+</div>
                <div className="text-slate-600">Assets Managed</div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">15%</div>
                <div className="text-slate-600">Avg. Annual Return</div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center mt-8">
                <div className="text-4xl font-bold text-emerald-500 mb-2">5,000+</div>
                <div className="text-slate-600">Investors Globally</div>
              </div>
            </div>
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
              Livestock investments carry inherent risks including disease, market price fluctuations, and operational challenges. Past performance does not guarantee future results. TerraVolt Incorporate does not provide investment guarantees. Please review all documentation and consult with financial advisors before investing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Invest in <span className="text-emerald-400">Livestock</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Join thousands of investors building wealth through agricultural assets. Start with as little as $5,000.
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
