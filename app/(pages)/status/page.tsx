import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Elegant Gradient Header */}
      <section className="relative pt-32 pb-20 min-h-[45vh] flex items-end overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-slate-900">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">System Health</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Platform<br />
              <span className="font-medium">status</span>
            </h1>
            <p className="text-lg text-white/70">
              Real-time status of all TerraVolt systems and services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-emerald-200 rounded-3xl p-10 mb-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">All Systems Operational</h2>
            <p className="text-slate-500">Last updated: Feb 2, 2026 at 5:00 PM UTC</p>
          </div>

          <div className="space-y-4">
            {[
              { service: 'Trading Engine', status: 'Operational', uptime: '99.99%' },
              { service: 'API Services', status: 'Operational', uptime: '99.98%' },
              { service: 'Wallet Services', status: 'Operational', uptime: '100%' },
              { service: 'Deposit/Withdrawal', status: 'Operational', uptime: '99.95%' },
              { service: 'Website', status: 'Operational', uptime: '100%' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-emerald-200 transition-colors">
                <div>
                  <div className="font-semibold text-slate-900">{item.service}</div>
                  <div className="text-sm text-slate-500">Uptime: {item.uptime}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-emerald-600 font-medium">{item.status}</span>
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
