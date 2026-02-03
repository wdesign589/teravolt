import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Get Started</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Create Your <span className="text-emerald-400">Account</span>
            </h1>
            <p className="text-lg text-slate-300">
              Join Terravolt in minutes and start trading cryptocurrency today.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              3 Simple Steps to Get Started
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { step: '1', title: 'Sign Up', desc: 'Create your account with email and password' },
              { step: '2', title: 'Verify Identity', desc: 'Complete KYC verification in minutes' },
              { step: '3', title: 'Start Trading', desc: 'Deposit funds and begin trading' },
            ].map((item) => (
              <div key={item.step} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20">
              Create Account Now
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
