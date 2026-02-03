import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Slim Page Header */}
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Partner Program</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Earn Up To <span className="text-emerald-400">50% Commission</span>
            </h1>
            <p className="text-lg text-slate-300">
              Join our affiliate program and earn recurring commissions by referring new users to Terravolt.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits - White Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Turn Your Audience Into Revenue
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Our affiliate program offers industry-leading commissions for promoting Terravolt to your audience. Whether you\'re a content creator, influencer, or business owner, earn passive income by sharing Terravolt with your community.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                With real-time tracking, dedicated support, and monthly payouts, we make it easy for you to monetize your traffic and grow alongside Terravolt.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
              >
                Join Affiliate Program
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Earnings Potential</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-slate-600 font-semibold">Standard Commission</span>
                    <span className="text-4xl font-bold text-emerald-500">30%</span>
                  </div>
                  <p className="text-sm text-slate-500">On all trading fees for 12 months</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-slate-600 font-semibold">Premium Tier</span>
                    <span className="text-4xl font-bold text-emerald-500">50%</span>
                  </div>
                  <p className="text-sm text-slate-500">For 100+ active referrals/month</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-slate-600 font-semibold">Cookie Duration</span>
                    <span className="text-4xl font-bold text-emerald-500">90d</span>
                  </div>
                  <p className="text-sm text-slate-500">Long attribution window</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Off-White Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We provide all the tools and support to help you maximize your affiliate earnings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-Time Dashboard',
                desc: 'Track clicks, conversions, and earnings in real-time with our comprehensive analytics dashboard. See exactly how your campaigns are performing.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: 'Marketing Materials',
                desc: 'Access professionally designed banners, landing pages, and promotional content. Pre-made assets optimized for conversion across all channels.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Dedicated Support',
                desc: 'Get help from our affiliate success team via email, chat, or phone. We\'re here to help you optimize your campaigns and grow your income.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              },
              {
                title: 'Custom Tracking Links',
                desc: 'Create unlimited tracking links with custom parameters. Track performance across different campaigns, channels, and platforms.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                )
              },
              {
                title: 'Monthly Payouts',
                desc: 'Get paid every month via bank transfer, PayPal, or cryptocurrency. No minimum payout threshold for premium affiliates.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Lifetime Cookies',
                desc: '90-day cookie duration ensures you get credited for referrals even if they don\'t sign up immediately. Your link, your commission.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all group">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - White Background */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-2xl p-12 border border-slate-200 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of affiliates earning passive income by promoting the leading crypto investment platform.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
            >
              Apply Now
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
