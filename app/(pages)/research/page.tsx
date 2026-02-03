import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Analysis</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Market <span className="text-emerald-400">Research</span>
            </h1>
            <p className="text-lg text-slate-300">
              In-depth analysis and reports from our research team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            Latest Research Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Q4 2024 Crypto Market Outlook', date: 'Nov 1, 2024', type: 'Quarterly Report' },
              { title: 'DeFi Sector Analysis: Opportunities & Risks', date: 'Oct 28, 2024', type: 'Sector Analysis' },
              { title: 'Bitcoin Technical Analysis: Key Levels to Watch', date: 'Oct 25, 2024', type: 'Technical Analysis' },
              { title: 'Institutional Adoption Report 2024', date: 'Oct 20, 2024', type: 'Special Report' },
            ].map((report, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all">
                <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">{report.type}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{report.title}</h3>
                <div className="text-sm text-slate-500 mb-4">{report.date}</div>
                <button className="text-emerald-600 font-semibold text-sm hover:text-emerald-700">Download PDF →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
