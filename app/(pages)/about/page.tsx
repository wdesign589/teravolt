import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[60vh] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/DJI_20240107162404_0073_D-Edit-1.webp"
            alt="Farmland"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">About Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Empowering the future of<br />
              <span className="font-medium">smart investing</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Building the world's most trusted platform for agricultural and energy investments since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Building Trust Through Innovation
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Founded in 2020 by a team of fintech veterans and agricultural investment specialists, TerraVolt Incorporated emerged from a simple belief: asset-backed investing should be accessible, secure, and profitable for everyone—not just institutional investors and industry experts.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We've spent four years building the infrastructure, partnerships, and user experience that today serves over 100,000 investors managing more than $2 billion in agricultural and energy assets. Our platform connects investors with verified opportunities across farming, renewable energy, and commodities.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                But numbers only tell part of the story. What truly drives us is empowering individuals to take control of their financial future. Whether you're making your first $2,000 investment in livestock or managing a multi-million dollar farmland portfolio, TerraVolt provides the tools, transparency, and support you need to succeed in real asset investing.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/sign-up"
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
                >
                  Join 100K+ Investors
                </Link>
                <Link
                  href="/security"
                  className="px-8 py-3 border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 rounded-full font-semibold transition-all"
                >
                  Our Security →
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <div className="text-5xl font-bold text-emerald-500 mb-3">100K+</div>
                  <div className="text-slate-600 font-semibold mb-2">Active Investors</div>
                  <div className="text-sm text-slate-500">Growing 40% YoY</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mt-8">
                  <div className="text-5xl font-bold text-emerald-500 mb-3">$2B+</div>
                  <div className="text-slate-600 font-semibold mb-2">Assets Under Management</div>
                  <div className="text-sm text-slate-500">Institutional grade custody</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <div className="text-5xl font-bold text-emerald-500 mb-3">50+</div>
                  <div className="text-slate-600 font-semibold mb-2">Investment Options</div>
                  <div className="text-sm text-slate-500">Agro, Energy & Commodities</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mt-8">
                  <div className="text-5xl font-bold text-emerald-500 mb-3">24/7</div>
                  <div className="text-slate-600 font-semibold mb-2">Expert Support</div>
                  <div className="text-sm text-slate-500">Always here to help</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're not just building a platform—we're shaping the future of finance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-10 border border-slate-200">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                To democratize access to asset-backed investments by creating the world's most secure, user-friendly, and accessible platform for agricultural and energy investments.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We believe financial opportunity shouldn't be limited by geography, wealth, or expertise. Every person deserves the tools and support to build wealth through real, productive assets, and we're committed to making that a reality.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 border border-slate-200">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                A world where agricultural and energy investments are as accessible and trusted as traditional banking, empowering everyone to participate in sustainable wealth building.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We envision a future where investing in farmland, livestock, and renewable energy is mainstream—where anyone can invest as easily as a Wall Street trader, where transparency and security are standard, and where financial inclusion is a reality, not an aspiration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Teravolt Incorporated
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Security First',
                desc: 'Bank-level encryption, multi-factor authentication, and cold storage protection. Your assets are protected by the same standards used by major financial institutions.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )
              },
              {
                title: 'Transparency',
                desc: 'Clear pricing, no hidden fees, and complete visibility into all transactions. We believe trust is built through honesty and openness in everything we do.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: 'Innovation',
                desc: 'Cutting-edge technology and continuous platform improvements. We invest heavily in R&D to ensure you always have access to the latest features.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Customer Focus',
                desc: '24/7 support, educational resources, and tools designed for your success. Our team is always available to help you navigate investment opportunities.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: 'Compliance',
                desc: 'Fully regulated and compliant with global financial standards. We work closely with regulators to ensure we meet all legal requirements.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Accessibility',
                desc: 'Easy-to-use platform designed for both beginners and professionals. Intuitive interfaces make asset-backed investing simple for everyone.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
            ].map((value, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all group">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Built by Industry Leaders
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our leadership team brings together decades of experience from the world's leading financial institutions, agricultural enterprises, and energy companies.
            </p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-center text-slate-500 text-sm font-semibold uppercase tracking-wider mb-8">
              Our team members have worked at
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Goldman Sachs', 'JPMorgan Chase', 'Cargill', 'ADM', 'John Deere', 'BlackRock', 'MIT', 'Stanford'].map((company) => (
                <div key={company} className="text-slate-500 font-semibold text-base text-center">
                  {company}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Join Our Mission</h3>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our vision of making asset-backed investing accessible to everyone. Explore opportunities to work with world-class teams on innovative investment solutions.
            </p>
            <Link
              href="/careers"
              className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
