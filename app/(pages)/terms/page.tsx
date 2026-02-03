import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
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
              Terms & <span className="text-emerald-400">Conditions</span>
            </h1>
            <p className="text-lg text-slate-300">
              Last updated: November 8, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing and using Teravolt Incorporated's platform, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you should not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Eligibility</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be located in a restricted jurisdiction</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Account Registration</h2>
              <p className="text-slate-600 leading-relaxed">
                You agree to provide accurate, current, and complete information during registration and keep your account information updated. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">4. Trading Services</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our platform provides cryptocurrency trading services subject to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Trading fees as disclosed on our platform</li>
                <li>Market volatility and price fluctuations</li>
                <li>Technical limitations and system availability</li>
                <li>Regulatory compliance requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Fees and Charges</h2>
              <p className="text-slate-600 leading-relaxed">
                We charge fees for certain services as outlined on our platform. All fees are subject to change with prior notice. You are responsible for all applicable taxes.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Risk Disclosure</h2>
              <p className="text-slate-600 leading-relaxed">
                Cryptocurrency trading involves substantial risk. You acknowledge that you understand the risks associated with cryptocurrency trading and that you may lose all or part of your investment.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Prohibited Activities</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Use our services for illegal activities</li>
                <li>Attempt to manipulate markets or prices</li>
                <li>Engage in fraudulent activities</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">8. Termination</h2>
              <p className="text-slate-600 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                To the maximum extent permitted by law, Teravolt Incorporated shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">10. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                For questions about these Terms and Conditions, please contact us at legal@terravolt.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
