import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[50vh] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/1e0648bd-b076-4900-9819-fb7100ec376b.webp"
            alt="Security"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Security & Protection</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Your assets are<br />
              <span className="font-medium">protected 24/7</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Industry-leading security protocols protecting $2B+ in customer assets around the clock.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Military-Grade Encryption Protecting Your Wealth
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Every transaction, every login, every piece of data you share with Terravolt is protected by AES-256 encryption—the same standard used by the NSA, CIA, and major financial institutions worldwide to safeguard classified information.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Your private keys never leave our secure infrastructure. All sensitive data is encrypted both in transit and at rest, with multiple layers of protection ensuring that even in the unlikely event of a breach, your information remains unreadable and useless to attackers.
              </p>
              <div className="space-y-4">
                {[
                  'TLS 1.3 encryption for all network connections',
                  'End-to-end encrypted communication channels',
                  'Hardware Security Modules (HSM) for key storage',
                  'Zero-knowledge architecture for maximum privacy'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-10 border border-slate-200">
              <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 text-center mb-4">
                AES-256 Encryption
              </h3>
              <p className="text-slate-600 text-center mb-6">
                The same encryption standard trusted by governments and Fortune 500 companies
              </p>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-sm text-slate-500 mb-2">Encryption Strength</div>
                <div className="text-2xl font-bold text-emerald-500">2^256 possible keys</div>
                <div className="text-xs text-slate-500 mt-2">Would take billions of years to crack</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Security Measures */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Multi-Layered Security Architecture
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We employ institutional-grade security measures across every layer of our infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Cold Storage Vaults',
                desc: '95% of customer assets stored in offline, geographically distributed cold storage facilities with military-grade physical security. Multi-signature wallets require multiple approvals for any withdrawal, eliminating single points of failure.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                )
              },
              {
                title: 'Multi-Factor Authentication',
                desc: 'Advanced 2FA with support for authenticator apps, SMS, email, and biometric verification. Optional hardware security key integration for institutional clients requiring the highest security standards.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                )
              },
              {
                title: 'Continuous Security Audits',
                desc: 'Quarterly penetration testing by leading security firms including Trail of Bits and Kudelski Security. Real-time vulnerability scanning and automated security assessments running 24/7 across our entire infrastructure.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: '$100M Insurance Coverage',
                desc: 'Comprehensive insurance policy from Lloyd\'s of London protecting customer assets against theft, hacking, and unauthorized access. Your investments are backed by one of the world\'s most trusted insurance providers.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: 'AI-Powered Fraud Detection',
                desc: 'Machine learning algorithms analyze millions of transactions daily to detect and prevent fraudulent activity. Suspicious patterns trigger immediate alerts and automatic protective measures.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: 'Regulatory Compliance',
                desc: 'Fully compliant with SOC 2 Type II, ISO 27001, PCI DSS, and GDPR standards. Regular audits by independent third parties ensure we maintain the highest compliance standards globally.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                <p className="text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Certified & Independently Audited
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We maintain the highest industry certifications and undergo regular third-party audits to ensure your assets are protected
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { name: 'SOC 2 Type II', desc: 'Annual security audits' },
              { name: 'ISO 27001', desc: 'Information security' },
              { name: 'PCI DSS Level 1', desc: 'Payment card security' },
              { name: 'GDPR Compliant', desc: 'Data protection' }
            ].map((cert) => (
              <div key={cert.name} className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-lg font-bold text-slate-900 mb-2">{cert.name}</div>
                <div className="text-sm text-slate-600">{cert.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl p-12 border border-slate-200 text-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Experience Fort Knox-Level Security?</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join 100,000+ investors who trust Terravolt to protect their digital assets with industry-leading security.
            </p>
            <Link
              href="/sign-up"
              className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
            >
              Create Secure Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
