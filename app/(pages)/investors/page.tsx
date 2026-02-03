import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Investor Relations</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Investor <span className="text-emerald-400">Information</span>
            </h1>
            <p className="text-lg text-slate-300">
              Financial reports, presentations, and information for Terravolt investors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">$2B+</div>
              <div className="text-slate-600">Assets Under Management</div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">100K+</div>
              <div className="text-slate-600">Active Users</div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
              <div className="text-4xl font-bold text-emerald-500 mb-2">150+</div>
              <div className="text-slate-600">Employees Worldwide</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-8">Recent Reports</h2>
          <div className="space-y-4">
            {[
              { title: 'Q3 2024 Financial Report', date: 'Oct 30, 2024' },
              { title: 'Q2 2024 Financial Report', date: 'Jul 30, 2024' },
              { title: 'Annual Report 2023', date: 'Jan 15, 2024' },
            ].map((report, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{report.title}</div>
                  <div className="text-sm text-slate-500">{report.date}</div>
                </div>
                <button className="text-emerald-600 font-semibold hover:text-emerald-700">Download PDF →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
