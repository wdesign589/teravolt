import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import TestimonialCard from '@/components/TestimonialCard';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section - Video Background (FarmTogether Style) */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content - Positioned at bottom like FarmTogether */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24 pt-32">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-10 tracking-tight max-w-2xl">
            Invest in Real Assets
          </h1>
          
          {/* Stats Row - Inline like FarmTogether */}
          <div className="flex flex-wrap items-end gap-8 sm:gap-12 lg:gap-16 mb-10">
            <div>
              <div className="text-3xl sm:text-4xl font-light text-white">$100M+</div>
              <div className="text-white/60 text-sm mt-1">AUM</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-light text-white">52</div>
              <div className="text-white/60 text-sm mt-1">Deals Funded</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-light text-white">7.1K+</div>
              <div className="text-white/60 text-sm mt-1">Acres Managed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-light text-white">8</div>
              <div className="text-white/60 text-sm mt-1">Countries</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-light text-white">15</div>
              <div className="text-white/60 text-sm mt-1">Asset Types</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/sign-up"
              className="px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded font-medium text-sm uppercase tracking-wider transition-all"
            >
              Get Started
            </Link>
            <Link
              href="/investments"
              className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white rounded font-medium text-sm uppercase tracking-wider transition-all border border-white/80"
            >
              Live Offerings
            </Link>
          </div>
        </div>
      </section>
      
      {/* The TerraVolt Advantage - Premium Design */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-stone-50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-emerald-600 font-medium tracking-wide uppercase text-sm mb-4">The TerraVolt Advantage</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-tight">
              Built for investors who value<br />
              <span className="font-medium">transparency and security</span>
            </h2>
          </div>
          
          {/* 3 Feature Cards - Premium Glass Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Security */}
            <div className="group bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/80 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Security You Can Trust</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Industry-leading encryption keeps your assets and data secure. Protected with AES-256 encryption and $100M insurance coverage.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                <span>Bank-grade security</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Accessibility */}
            <div className="group bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/80 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Seamless Accessibility</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Manage your investments on any device, anytime. Our platform is designed for simplicity so you can focus on growing wealth.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                <span>Available 24/7</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Real-Time Data */}
            <div className="group bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/80 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Real-Time Data & Insights</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Stay informed with live market data for confident decisions. Track performance, monitor returns, and access analytics.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm">
                <span>Live dashboard</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Premium 3-Step Process */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/7cc5ccf2-8255-4b23-8d42-dcd493b99b10.webp"
            alt="Orchard"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">How It Works</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              Start investing in<br />
              <span className="font-medium">three simple steps</span>
            </h2>
          </div>
          
          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-light text-emerald-400">01</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Create Your Account</h3>
              <p className="text-white/70 leading-relaxed">
                Sign up in minutes with just your email. Complete verification to unlock all investment opportunities.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-light text-emerald-400">02</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Select Your Investment</h3>
              <p className="text-white/70 leading-relaxed">
                Browse verified opportunities across agriculture, energy, and commodities. Choose what aligns with your goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-8">
                <span className="text-2xl font-light text-emerald-400">03</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Watch Your Wealth Grow</h3>
              <p className="text-white/70 leading-relaxed">
                Track performance in real-time. Receive returns directly to your account and reinvest or withdraw anytime.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link 
              href="/sign-up" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded transition-all"
            >
              Get Started Today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Opportunities - Premium Cards with Images */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-medium tracking-wide uppercase text-sm mb-4">Investment Opportunities</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-tight mb-6">
              Diversify across<br />
              <span className="font-medium">real, productive assets</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Access verified investment opportunities tied to tangible assets and real economic activity.
            </p>
          </div>

          {/* Investment Cards - 6 Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Farmland Investment */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/DJI_20240107162404_0073_D-Edit-1.webp"
                  alt="Farmland"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded">Agricultural</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-900 mb-2">Farmland Investment</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  Own productive agricultural land with long-term appreciation and lease income potential.
                </p>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500">Target Returns</div>
                    <div className="text-lg font-medium text-emerald-600">11 - 15% p.a.</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Min. Investment</div>
                    <div className="text-lg font-medium text-slate-900">$10,000</div>
                  </div>
                </div>
                <Link href="/investments/farmland" className="mt-4 block w-full py-3 text-center text-emerald-600 font-medium border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                  View Opportunities
                </Link>
              </div>
            </div>

            {/* Crop Production */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/8fd16e70-9a71-4afe-bbec-8f2cabfe11a0.webp"
                  alt="Crop Production"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded">Agricultural</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-900 mb-2">Crop Production</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  Invest in commercial farming operations with returns aligned to harvest cycles.
                </p>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500">Target Returns</div>
                    <div className="text-lg font-medium text-emerald-600">18 - 30% p.a.</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Min. Investment</div>
                    <div className="text-lg font-medium text-slate-900">$2,000</div>
                  </div>
                </div>
                <Link href="/investments/crops" className="mt-4 block w-full py-3 text-center text-emerald-600 font-medium border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                  View Opportunities
                </Link>
              </div>
            </div>

            {/* Livestock Farming */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/15ba644e-81cd-4531-b325-417a414dfef8.webp"
                  alt="Livestock"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded">Agricultural</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-900 mb-2">Livestock Farming</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  Own cattle and livestock managed by vetted partner farmers with transparent returns.
                </p>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500">Target Returns</div>
                    <div className="text-lg font-medium text-emerald-600">12 - 25% p.a.</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Min. Investment</div>
                    <div className="text-lg font-medium text-slate-900">$5,000</div>
                  </div>
                </div>
                <Link href="/investments/livestock" className="mt-4 block w-full py-3 text-center text-emerald-600 font-medium border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                  View Opportunities
                </Link>
              </div>
            </div>

            {/* Lithium-Ion Energy */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/1e0648bd-b076-4900-9819-fb7100ec376b.webp"
                  alt="Lithium Energy"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded">Energy</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-900 mb-2">Lithium-Ion Energy</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  Participate in the renewable energy revolution through lithium production and logistics.
                </p>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500">Target Returns</div>
                    <div className="text-lg font-medium text-orange-600">15 - 50% p.a.</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Min. Investment</div>
                    <div className="text-lg font-medium text-slate-900">$2,000</div>
                  </div>
                </div>
                <Link href="/investments/lithium" className="mt-4 block w-full py-3 text-center text-emerald-600 font-medium border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                  View Opportunities
                </Link>
              </div>
            </div>

            {/* CFDs & Trading */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/7cc5ccf2-8255-4b23-8d42-dcd493b99b10.webp"
                  alt="Trading Platform"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded">Trading</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-900 mb-2">CFDs & Commodities</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  Access global markets through regulated platforms. Trade gold, oil, forex, and more.
                </p>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500">Leverage</div>
                    <div className="text-lg font-medium text-blue-600">Up to 200:1</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Min. Investment</div>
                    <div className="text-lg font-medium text-slate-900">$250</div>
                  </div>
                </div>
                <Link href="/trading" className="mt-4 block w-full py-3 text-center text-emerald-600 font-medium border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                  Start Trading
                </Link>
              </div>
            </div>

            {/* Agricultural Grants */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/94a9bc3e-f7bb-450e-8d0a-9a021e4e0add.webp"
                  alt="Agricultural Grants"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded">Funding</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-slate-900 mb-2">Agricultural Grants</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  Access funding opportunities for agricultural projects through government and private programs.
                </p>
                <div className="flex items-center justify-between py-3 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-500">Grant Type</div>
                    <div className="text-lg font-medium text-green-600">Gov & Private</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Funding Range</div>
                    <div className="text-lg font-medium text-slate-900">$5K - $500K</div>
                  </div>
                </div>
                <Link href="/grants" className="mt-4 block w-full py-3 text-center text-emerald-600 font-medium border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                  Explore Grants
                </Link>
              </div>
            </div>
          </div>

          {/* View All */}
          <div className="text-center">
            <Link href="/investments" className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium transition-colors">
              View all investment opportunities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Farmland - Full Width Image with Stats */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/DJI_20240107162404_0073_D-Edit-1.webp"
            alt="Aerial Farmland"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Why Farmland</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
              An asset class with<br />
              <span className="font-medium">proven resilience</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-12">
              Farmland has historically outperformed traditional asset classes while providing essential stability through economic cycles. As global food demand rises, agricultural land continues to appreciate.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl sm:text-4xl font-light text-white mb-1">11.5%</div>
                <div className="text-white/60 text-sm">Avg. Annual Return</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-light text-white mb-1">40+</div>
                <div className="text-white/60 text-sm">Years of Positive Returns</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-light text-white mb-1">Low</div>
                <div className="text-white/60 text-sm">Correlation to Stocks</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-light text-white mb-1">9.7B</div>
                <div className="text-white/60 text-sm">People to Feed by 2050</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You Invest. We Grow. You Profit. - Almond Blossoms */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Image-from-iOS--18---1-.webp"
            alt="Almond Blossoms"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl ml-auto text-right">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Agricultural Crowdfunding</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
              You invest.<br />
              <span className="font-medium">We grow.</span><br />
              You profit.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Own real agricultural assets as they grow on partner farms. Our model connects you directly with vetted farmers, creating wealth for both investors and farming communities.
            </p>
            
            {/* Benefits */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-end gap-3">
                <span className="text-white/90">Invest in farmland, livestock, and crop production</span>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <span className="text-white/90">Transparent returns with clear profit projections</span>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
              </div>
              <div className="flex items-center justify-end gap-3">
                <span className="text-white/90">Support sustainable farming communities</span>
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />
              </div>
            </div>
            
            <Link 
              href="/sign-up" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded transition-all"
            >
              Start Investing
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Recovery Services - New Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <div>
              <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Investment Recovery</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
                Lost access to<br />
                <span className="font-medium">your investments?</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Our specialized recovery division helps individuals reclaim lost, forgotten, or inaccessible financial assets. Through forensic analysis and legal coordination, we've helped thousands recover what's rightfully theirs.
              </p>
              
              {/* Services List */}
              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Dormant Investment Recovery</div>
                    <div className="text-slate-500 text-sm">Locate and recover forgotten shares, stocks, and portfolios</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Fraud Recovery Assistance</div>
                    <div className="text-slate-500 text-sm">Professional support for victims of investment scams</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full mt-3 flex-shrink-0" />
                  <div>
                    <div className="text-white font-medium">Asset Tracing & Verification</div>
                    <div className="text-slate-500 text-sm">Comprehensive forensic analysis and documentation</div>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/recovery" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-medium rounded transition-all"
              >
                File a Recovery Claim
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            {/* Right - Stats */}
            <div className="bg-slate-800/50 rounded-2xl p-10 border border-slate-700">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6">
                  <div className="text-4xl font-light text-white mb-2">5,000+</div>
                  <div className="text-slate-400 text-sm">Clients Assisted</div>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl font-light text-white mb-2">$25M+</div>
                  <div className="text-slate-400 text-sm">Assets Recovered</div>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl font-light text-white mb-2">8</div>
                  <div className="text-slate-400 text-sm">Countries Served</div>
                </div>
                <div className="text-center p-6">
                  <div className="text-4xl font-light text-white mb-2">92%</div>
                  <div className="text-slate-400 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security - Clean Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-medium tracking-wide uppercase text-sm mb-4">Trust & Security</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-tight">
              Your investments are<br />
              <span className="font-medium">in safe hands</span>
            </h2>
          </div>
          
          {/* Trust Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="text-slate-900 font-medium mb-1">AES-256 Encryption</div>
              <div className="text-slate-500 text-sm">Bank-grade security</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-slate-900 font-medium mb-1">Regulated Broker</div>
              <div className="text-slate-500 text-sm">Fully licensed</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-slate-900 font-medium mb-1">$100M Insurance</div>
              <div className="text-slate-500 text-sm">Asset protection</div>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="text-slate-900 font-medium mb-1">24/7 Support</div>
              <div className="text-slate-500 text-sm">Always available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-emerald-600 font-medium tracking-wide uppercase text-sm mb-4">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-tight">
              What our investors<br />
              <span className="font-medium">are saying</span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                "I was looking for a way to diversify beyond traditional stocks. Terravolt's farmland investment has been incredible - 15% returns in my first year."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-medium">SM</span>
                </div>
                <div>
                  <div className="text-slate-900 font-medium">Sarah Mitchell</div>
                  <div className="text-slate-500 text-sm">Agricultural Investor</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                "The combination of energy sector and agricultural investments is genius. The returns from agro are stable while energy gives me growth potential."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-medium">DC</span>
                </div>
                <div>
                  <div className="text-slate-900 font-medium">David Chen</div>
                  <div className="text-slate-500 text-sm">Energy & Agro Investor</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                "What sets Terravolt apart is the transparency. I can see exactly where my money is going and track my returns in real-time."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-medium">AR</span>
                </div>
                <div>
                  <div className="text-slate-900 font-medium">Amanda Rodriguez</div>
                  <div className="text-slate-500 text-sm">Long-Term Investor</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20 pt-12 border-t border-slate-100">
            <div className="text-center">
              <div className="text-3xl font-light text-slate-900">4.9/5</div>
              <div className="text-sm text-slate-500 mt-1">User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-slate-900">$25M+</div>
              <div className="text-sm text-slate-500 mt-1">Paid to Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-slate-900">50K+</div>
              <div className="text-sm text-slate-500 mt-1">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-slate-900">8</div>
              <div className="text-sm text-slate-500 mt-1">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Premium */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/15ba644e-81cd-4531-b325-417a414dfef8.webp"
            alt="Orchard"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6">
            Ready to start building<br />
            <span className="font-medium">your wealth?</span>
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of investors accessing verified opportunities in agriculture, energy, and global markets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded transition-all"
            >
              Create Your Account
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded transition-all border border-white/30"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
