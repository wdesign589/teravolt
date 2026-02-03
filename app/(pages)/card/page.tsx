import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Crypto Card</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Spend Crypto <span className="text-emerald-400">Anywhere</span>
            </h1>
            <p className="text-lg text-slate-300">
              The Terravolt Crypto Card - Accepted at 50M+ merchants worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Your Crypto, Your Card, Your Way
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Convert and spend your cryptocurrency instantly at millions of locations worldwide. No conversion fees, real-time exchange rates, and up to 3% cashback on every purchase.
              </p>
              <ul className="space-y-4 mb-8">
                {['Instant crypto-to-fiat conversion', 'Up to 3% cashback in crypto', 'No annual fees', 'Apple Pay & Google Pay support', 'ATM withdrawals worldwide'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20">
                Order Your Card
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-slate-100 rounded-2xl p-12 border border-slate-200">
              <div className="bg-gradient-to-br from-slate-900 to-emerald-900 rounded-2xl p-8 aspect-video flex flex-col justify-between">
                <div className="text-white text-sm">TERRAVOLT</div>
                <div className="text-white">
                  <div className="text-2xl font-mono mb-4">•••• •••• •••• 1234</div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-70">Card Holder</div>
                      <div className="font-semibold">JOHN DOE</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-70">Expires</div>
                      <div className="font-semibold">12/28</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
