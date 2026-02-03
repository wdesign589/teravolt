import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Slim Page Header */}
      <section className="relative bg-black pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full mb-4">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wide">Legal</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              Privacy <span className="text-emerald-400">Policy</span>
            </h1>
            <p className="text-lg text-slate-300">
              Last updated: November 8, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We collect information to provide better services to our users:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>Personal identification information (name, email, phone number)</li>
              <li>Identity verification documents</li>
              <li>Transaction and trading history</li>
              <li>Device and usage information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Your information is used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>Provide and improve our services</li>
              <li>Verify your identity and prevent fraud</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Communicate with you about your account</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement industry-standard security measures including AES-256 encryption, secure servers, and regular security audits to protect your data.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
            <p className="text-slate-600 leading-relaxed">
              We do not sell your personal information. We may share information with service providers, regulatory authorities, and as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>Access your personal data</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              For privacy concerns, contact privacy@terravolt.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
