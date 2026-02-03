import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[50vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/15ba644e-81cd-4531-b325-417a414dfef8.webp"
            alt="Agricultural News"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Updates</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Latest<br />
              <span className="font-medium">News</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Stay updated with the latest developments in agricultural investing and at TerraVolt.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {[
              { title: 'TerraVolt Expands Agricultural Investment Portfolio', date: 'Jan 30, 2026', category: 'Platform Update' },
              { title: 'New Partnership with Leading Farm Operations Network', date: 'Jan 25, 2026', category: 'Partnership' },
              { title: 'Security Audit Results: Perfect Score from Trail of Bits', date: 'Jan 20, 2026', category: 'Security' },
              { title: 'TerraVolt Assets Under Management Reaches $2B', date: 'Jan 15, 2026', category: 'Milestone' },
            ].map((news, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">{news.category}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{news.title}</h3>
                    <div className="text-sm text-slate-500">{news.date}</div>
                  </div>
                  <button className="text-emerald-600 font-semibold text-sm hover:text-emerald-700">Read more →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
