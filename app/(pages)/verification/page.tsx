import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">KYC</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Identity <span className="text-emerald-400">Verification</span>
            </h1>
            <p className="text-lg text-slate-300">
              Quick and secure KYC process to unlock full platform features.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            Verification Levels
          </h2>
          <div className="space-y-6">
            {[
              { level: 'Level 1', limit: '$1,000/day', requirements: 'Email & Phone', time: 'Instant' },
              { level: 'Level 2', limit: '$10,000/day', requirements: 'Government ID', time: '5 minutes' },
              { level: 'Level 3', limit: 'Unlimited', requirements: 'ID + Address Proof', time: '24 hours' },
            ].map((tier, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{tier.level}</h3>
                  <span className="text-emerald-600 font-bold text-xl">{tier.limit}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Requirements:</span>
                    <span className="text-slate-900 font-semibold ml-2">{tier.requirements}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Approval Time:</span>
                    <span className="text-slate-900 font-semibold ml-2">{tier.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20">
              Start Verification
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
