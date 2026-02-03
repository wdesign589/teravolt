import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Legal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Cookie <span className="text-emerald-400">Policy</span>
            </h1>
            <p className="text-lg text-slate-300">
              Last updated: November 8, 2024
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Are Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Types of Cookies We Use</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Essential Cookies</h3>
                <p className="text-slate-600">Required for the website to function properly. Cannot be disabled.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Analytics Cookies</h3>
                <p className="text-slate-600">Help us understand how visitors interact with our website.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Marketing Cookies</h3>
                <p className="text-slate-600">Used to deliver relevant advertisements to you.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Managing Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              You can control and manage cookies through your browser settings. However, disabling cookies may affect the functionality of our website.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              For questions about our cookie policy, contact privacy@terravolt.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
