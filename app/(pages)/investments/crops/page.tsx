import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function CropProductionPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/8fd16e70-9a71-4afe-bbec-8f2cabfe11a0.webp"
            alt="Crop Production"
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
              Crop production<br />
              <span className="font-medium">investment</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Invest in commercial-scale farming operations involving staple and high-value crops. Earn returns aligned with planting cycles and market demand.
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
                View Plans
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
              How Crop Investment Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Participate in the agricultural cycle from planting to harvest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Select Your Plan', desc: 'Choose between Starter or Commercial crop investment plans.' },
              { step: '2', title: 'Plot Allocation', desc: 'Your investment is allocated to specific farmland and crop types.' },
              { step: '3', title: 'Growth & Monitoring', desc: 'Professional farmers manage planting, irrigation, and crop care.' },
              { step: '4', title: 'Harvest Returns', desc: 'Receive your revenue share after crop sale at market prices.' },
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

      {/* Investment Plans - Premium SaaS Style */}
      <section id="packages" className="py-28 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-emerald-600 font-medium tracking-wide uppercase text-sm mb-4">Investment Tiers</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Choose your<br />
              <span className="font-medium">crop investment plan</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select the plan that matches your capital and investment horizon
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Growth Plan */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-4">
                  Growth
                </span>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Growth Crop Plan</h3>
                <p className="text-slate-500 text-sm">For retail and semi-professional investors</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-slate-900">$2,000</span>
                  <span className="text-slate-400 text-lg">– $25K</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">flexible investment range</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Duration</span>
                  <span className="text-slate-900 font-medium">6–12 months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Target Returns</span>
                  <span className="text-emerald-600 font-semibold">18–30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-sm">Risk Level</span>
                  <span className="text-slate-900 font-medium">Medium</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-8 mb-8">
                <p className="text-slate-900 font-medium text-sm mb-4">Includes:</p>
                <ul className="space-y-3">
                  {[
                    'Larger plot allocation',
                    'Agronomic advisory services',
                    'Partial yield guarantees',
                    'Quarterly reporting',
                    'Revenue share on harvest',
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

            {/* Commercial Plan (Featured) */}
            <div className="bg-slate-900 rounded-3xl p-8 lg:p-10 relative shadow-2xl shadow-slate-900/20 flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-block px-4 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-emerald-500/30">
                  Recommended
                </span>
              </div>
              
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full mb-4">
                  Commercial
                </span>
                <h3 className="text-xl font-semibold text-white mb-2">Commercial Crop Plan</h3>
                <p className="text-slate-400 text-sm">For institutional investors & family offices</p>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-light text-white">$25K</span>
                  <span className="text-slate-400 text-lg">– $500K+</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">institutional investment</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Duration</span>
                  <span className="text-white font-medium">12–36 months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Target Returns</span>
                  <span className="text-emerald-400 font-semibold">30–60%+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Risk Level</span>
                  <span className="text-white font-medium">Medium–High</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 mb-8">
                <p className="text-white font-medium text-sm mb-4">Everything in Growth, plus:</p>
                <ul className="space-y-3">
                  {[
                    'Contract farming agreements',
                    'Off-take agreements secured',
                    'Comprehensive insurance',
                    'Full due diligence reports',
                    'Site visits available',
                    'Profit-sharing agreements',
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
                href="/contact"
                className="block w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white text-center font-medium rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Crop Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Crop Categories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Diversify across different crop types based on market demand and seasonal cycles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Grains', crops: 'Corn, Wheat, Soybeans, Rice', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
              { name: 'Vegetables', crops: 'Tomatoes, Peppers, Lettuce, Onions', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { name: 'Fruits', crops: 'Apples, Citrus, Berries, Grapes', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
              { name: 'Cash Crops', crops: 'Cotton, Coffee, Cocoa, Sugarcane', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            ].map((category, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 transition-all text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                <p className="text-slate-600 text-sm">{category.crops}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Crop Investment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Why Invest in <span className="text-emerald-500">Crop Production</span>?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Crop production investments offer exposure to one of humanity's most essential industries. With global population growth and increasing food demand, agricultural investments provide both stability and growth potential.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Essential Industry', desc: 'Food production is a fundamental human need with consistent demand.' },
                  { title: 'Seasonal Returns', desc: 'Aligned with natural harvest cycles for predictable income timing.' },
                  { title: 'Portfolio Diversification', desc: 'Low correlation with traditional financial markets.' },
                  { title: 'Sustainable Impact', desc: 'Support sustainable farming practices and food security.' },
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
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">50K+</div>
                <div className="text-slate-600">Acres Under Management</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center mt-8">
                <div className="text-4xl font-bold text-emerald-500 mb-2">24%</div>
                <div className="text-slate-600">Avg. Annual Return</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">100+</div>
                <div className="text-slate-600">Partner Farms</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center mt-8">
                <div className="text-4xl font-bold text-emerald-500 mb-2">12</div>
                <div className="text-slate-600">Crop Varieties</div>
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
              Crop production investments carry risks including weather events, market price fluctuations, pest damage, and operational challenges. Returns depend on crop type and market conditions. Past performance does not guarantee future results. TerraVolt Incorporate does not provide investment guarantees. Please consult with financial advisors before investing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Invest in <span className="text-emerald-400">Crop Production</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Join investors earning returns from commercial farming operations. Start with as little as $2,000.
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
