import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Elegant Gradient Header */}
      <section className="relative pt-32 pb-24 min-h-[50vh] flex items-end overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-emerald-900/40 to-slate-900">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Help Center</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              How can we<br />
              <span className="font-medium">help you today?</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Find answers to common questions or get personalized support from our team.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search for help articles, guides, and FAQs..."
                className="w-full px-6 py-4 pr-14 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-emerald-500/50 focus:bg-white/10 focus:outline-none transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Browse by Topic
            </h2>
            <p className="text-lg text-slate-600">
              Find helpful articles organized by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Getting Started',
                desc: 'New to TerraVolt? Learn how to create an account, complete verification, and make your first investment in agricultural or energy assets.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                articles: 12
              },
              {
                title: 'Investment Options',
                desc: 'Explore our investment categories: livestock farming, crop production, farmland, lithium-ion energy, and commodities trading.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                articles: 15
              },
              {
                title: 'Account & Security',
                desc: 'Learn how to secure your account with 2FA, manage your passwords, and protect your investments from unauthorized access.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                articles: 18
              },
              {
                title: 'Deposits & Withdrawals',
                desc: 'Understand how to fund your account, withdrawal options, processing times, and supported payment methods.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
                articles: 10
              },
              {
                title: 'Returns & Profit',
                desc: 'Learn about expected returns, profit distribution schedules, and how to track your investment performance.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                articles: 8
              },
              {
                title: 'Identity Verification',
                desc: 'Step-by-step guide to completing KYC verification, required documents, and tips for faster approval.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                articles: 6
              },
            ].map((topic, index) => (
              <Link
                key={index}
                href="#"
                className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{topic.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  {topic.articles} articles
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Quick answers to questions you may have
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How do I create an account?',
                a: 'Creating an account is simple. Click "Get Started" in the navigation bar and you\'ll be guided through a 3-step process: (1) Enter your email and create a password, (2) Verify your email address, (3) Complete identity verification (KYC). The entire process typically takes less than 10 minutes.'
              },
              {
                q: 'What investment options are available?',
                a: 'TerraVolt offers diverse asset-backed investments including: Livestock Farming (cattle & livestock), Crop Production (commercial farming), Farmland Investment (land acquisition & leasing), Lithium-Ion Energy (renewable energy sector), and CFD/Commodities Trading (gold, oil, metals). Each has different minimum investments and return profiles.'
              },
              {
                q: 'Are my investments safe with TerraVolt?',
                a: 'Security is our top priority. All investments are backed by real, verifiable assets. We conduct thorough due diligence on all partner farms and operations. Your account is protected with AES-256 encryption, 2FA, and we maintain comprehensive insurance coverage. We work only with regulated and verified partners.'
              },
              {
                q: 'What are the minimum investment amounts?',
                a: 'Minimum investments vary by product: Livestock Farming starts at $5,000, Crop Production at $2,000, Farmland at $10,000, and Lithium-Ion Transportation at $2,000. Higher-tier institutional investments have different minimums. All fees are transparent and disclosed before you invest.'
              },
              {
                q: 'How long does identity verification take?',
                a: 'Most identity verifications are completed within 24 hours using our verification system. You\'ll need a government-issued ID and proof of address. In some cases where manual review is required, verification can take up to 48 hours. You\'ll receive an email notification once your account is verified.'
              },
              {
                q: 'When can I withdraw my returns?',
                a: 'Withdrawal terms depend on your investment type. Agricultural investments follow harvest or sale cycles (typically 6-48 months). CFD trading profits can be withdrawn anytime. All withdrawal schedules are clearly stated in your investment agreement. Bank withdrawals typically process within 1-3 business days.'
              },
              {
                q: 'Do you offer customer support?',
                a: 'We offer 24/7 customer support through multiple channels: live chat (average response time under 5 minutes), email support, and phone support for urgent matters. Our support team consists of investment specialists ready to help you with any questions or issues.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept bank transfers (ACH/wire), debit cards, credit cards, and cryptocurrency deposits for funding your account. Bank transfers have the lowest fees, while card payments are instant but carry a small processing fee. All payment methods are secure and encrypted.'
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-slate-200 hover:border-emerald-500 transition-all">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                  <span className="text-emerald-500 flex-shrink-0">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 leading-relaxed ml-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-2xl p-12 border border-slate-200 text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Our dedicated support team is available 24/7 to answer your questions and help you resolve any issues. Average response time is under 2 minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Start Live Chat
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 rounded-full font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
