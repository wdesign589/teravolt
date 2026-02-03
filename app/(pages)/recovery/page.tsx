import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function RecoveryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Elegant Gradient Header */}
      <section className="relative pt-32 pb-24 min-h-[55vh] flex items-end overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-red-400/5 rounded-full blur-2xl" />
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-red-400 font-medium tracking-wide uppercase text-sm mb-4">Recovery Services</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Investment<br />
              <span className="font-medium">recovery services</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl">
              Have you been a victim of investment fraud? Our recovery services help investors reclaim lost capital through legal and regulatory channels.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#consultation"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded transition-all"
              >
                Free Consultation
              </Link>
              <Link
                href="#process"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded transition-all border border-white/30"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Common <span className="text-red-500">Warning Signs</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Recognize the signs of investment fraud and scam operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636', title: 'Withdrawal Blocked', desc: 'Unable to withdraw your funds despite multiple requests' },
              { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: 'Pressure Tactics', desc: 'Aggressive calls demanding more deposits to "unlock" funds' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Account Frozen', desc: 'Account suddenly frozen with vague explanations' },
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Hidden Fees', desc: 'Unexpected taxes, fees, or charges to release funds' },
              { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'No Response', desc: 'Platform stops responding to emails and calls' },
              { icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', title: 'Unregulated Broker', desc: 'Platform not registered with financial authorities' },
            ].map((sign, i) => (
              <div key={i} className="bg-red-50 rounded-xl p-6 border border-red-100">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sign.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{sign.title}</h3>
                <p className="text-sm text-slate-600">{sign.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800">
              <strong>If you recognize any of these signs, you may be a victim of investment fraud.</strong> Don't wait—early action increases recovery chances.
            </p>
          </div>
        </div>
      </section>

      {/* What We Recover */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Types of <span className="text-emerald-500">Recovery Cases</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We assist with recovery from various types of investment fraud
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Forex & CFD Scams',
                desc: 'Unregulated forex brokers and CFD platforms that refuse withdrawals or manipulate trades.',
                examples: ['Fake trading platforms', 'Manipulated spreads', 'Bonus traps'],
              },
              {
                title: 'Cryptocurrency Fraud',
                desc: 'Fake crypto exchanges, Ponzi schemes, and fraudulent ICOs that have taken investor funds.',
                examples: ['Fake exchanges', 'Rug pulls', 'Phishing scams'],
              },
              {
                title: 'Binary Options Fraud',
                desc: 'Fraudulent binary options platforms that manipulate outcomes and block withdrawals.',
                examples: ['Rigged outcomes', 'Identity theft', 'Withdrawal blocks'],
              },
              {
                title: 'Investment Ponzi Schemes',
                desc: 'High-yield investment programs and Ponzi schemes that have collapsed or disappeared.',
                examples: ['HYIP schemes', 'Pyramid schemes', 'Fake hedge funds'],
              },
              {
                title: 'Romance & Social Scams',
                desc: 'Investment scams initiated through dating apps or social media relationships.',
                examples: ['Pig butchering', 'Romance scams', 'Social engineering'],
              },
              {
                title: 'Advance Fee Fraud',
                desc: 'Scams requiring upfront payments for taxes, fees, or insurance to release funds.',
                examples: ['Tax payment scams', 'Insurance fees', 'Processing charges'],
              },
            ].map((type, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-emerald-500 transition-all">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{type.title}</h3>
                <p className="text-slate-600 mb-4">{type.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((ex, j) => (
                    <span key={j} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Process */}
      <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Recovery <span className="text-emerald-500">Process</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A systematic approach to recovering your lost investments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Free Consultation',
                desc: 'Share your case details with our recovery specialists for initial assessment.',
                details: ['Case evaluation', 'Document review', 'Recovery feasibility'],
              },
              {
                step: '2',
                title: 'Investigation',
                desc: 'Our team investigates the scam operation and traces the flow of funds.',
                details: ['Platform research', 'Fund tracing', 'Evidence gathering'],
              },
              {
                step: '3',
                title: 'Legal Action',
                desc: 'We work with legal partners to pursue recovery through appropriate channels.',
                details: ['Regulatory complaints', 'Legal proceedings', 'Chargeback claims'],
              },
              {
                step: '4',
                title: 'Fund Recovery',
                desc: 'Recovered funds are returned to you through secure banking channels.',
                details: ['Fund retrieval', 'Secure transfer', 'Case closure'],
              },
            ].map((phase, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{phase.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{phase.title}</h3>
                <p className="text-slate-600 mb-4">{phase.desc}</p>
                <ul className="space-y-2">
                  {phase.details.map((detail, j) => (
                    <li key={j} className="text-sm text-slate-500 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Recovery <span className="text-emerald-400">Methods</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We utilize multiple channels to maximize recovery success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Chargeback Claims',
                desc: 'Work with banks and payment processors to reverse fraudulent transactions.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
              },
              {
                title: 'Regulatory Complaints',
                desc: 'File complaints with financial regulators and consumer protection agencies.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Legal Proceedings',
                desc: 'Pursue civil litigation and work with law enforcement when appropriate.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ),
              },
            ].map((method, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 text-emerald-400">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-slate-400">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Our Track <span className="text-emerald-500">Record</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We've helped thousands of investors recover funds from fraudulent platforms. Our experienced team combines legal expertise, financial investigation, and regulatory knowledge to maximize recovery outcomes.
              </p>

              <div className="space-y-4">
                {[
                  'Experienced recovery specialists',
                  'Global network of legal partners',
                  'No upfront fees on most cases',
                  'Confidential case handling',
                  'Regular case updates',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200 text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">$25M+</div>
                <div className="text-slate-600">Funds Recovered</div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200 text-center mt-8">
                <div className="text-4xl font-bold text-emerald-600 mb-2">2,500+</div>
                <div className="text-slate-600">Cases Handled</div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200 text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">78%</div>
                <div className="text-slate-600">Success Rate</div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200 text-center mt-8">
                <div className="text-4xl font-bold text-emerald-600 mb-2">45+</div>
                <div className="text-slate-600">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section id="consultation" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Request Free <span className="text-emerald-500">Consultation</span>
            </h2>
            <p className="text-lg text-slate-600">
              Share your case details and our recovery specialists will assess your situation
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Loss Amount *</label>
                <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
                  <option value="">Select range</option>
                  <option value="under-10k">Under $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="over-500k">Over $500,000</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Type of Scam *</label>
              <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
                <option value="">Select type</option>
                <option value="forex">Forex/CFD Scam</option>
                <option value="crypto">Cryptocurrency Fraud</option>
                <option value="binary">Binary Options</option>
                <option value="ponzi">Ponzi/HYIP Scheme</option>
                <option value="romance">Romance Scam</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Case Details *</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                placeholder="Please describe your situation, including the platform name, when the fraud occurred, and any actions you've already taken..."
              />
            </div>

            <div className="mb-6">
              <label className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 text-emerald-500 border-slate-300 rounded focus:ring-emerald-500" />
                <span className="text-sm text-slate-600">
                  I consent to TerraVolt contacting me regarding my recovery case. I understand that submitting this form does not guarantee recovery and that case assessment is required.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
            >
              Submit for Free Assessment
            </button>

            <p className="text-xs text-slate-500 text-center mt-4">
              Your information is confidential and protected. We will respond within 24-48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 mb-2">Important Disclaimer</h3>
            <p className="text-sm text-slate-600">
              TerraVolt's recovery services assist victims of investment fraud in pursuing fund recovery through legal and regulatory channels. Recovery is not guaranteed and depends on various factors including the nature of the fraud, available evidence, and applicable laws. We do not provide legal advice. Complex cases may be referred to licensed legal professionals. Success fees may apply to recovered funds. Please be aware of "recovery room" scams that target fraud victims—TerraVolt will never ask for upfront payment to begin case assessment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Don't Let Scammers <span className="text-red-400">Win</span>
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Take action today. The sooner you start the recovery process, the better your chances of getting your money back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#consultation"
              className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition-all shadow-lg shadow-red-500/30"
            >
              Start Recovery Process →
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all border border-white/20"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
