import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-emerald-500/20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left gradient glow */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        {/* Right gradient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <Link href="/" className="inline-block mb-8 -ml-2">
              <Image
                src="/logo.png"
                alt="Terravolt"
                width={400}
                height={100}
                className="w-80 h-auto object-left"
              />
            </Link>
            
            {/* Social Links */}
            <div className="flex gap-4 pl-3">
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="https://telegram.org"
                target="_blank"
                className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.325.016.093.036.306.02.472z" />
                </svg>
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Company
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent" />
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Affiliates
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Investors
                </Link>
              </li>
            </ul>
          </div>

          {/* Investments Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Investments
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent" />
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/investments" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  All Investments
                </Link>
              </li>
              <li>
                <Link href="/investments/livestock" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Livestock Farming
                </Link>
              </li>
              <li>
                <Link href="/investments/crops" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Crop Production
                </Link>
              </li>
              <li>
                <Link href="/investments/farmland" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Farmland
                </Link>
              </li>
              <li>
                <Link href="/investments/lithium" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Lithium-Ion Energy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent" />
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/trading" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  CFDs & Trading
                </Link>
              </li>
              <li>
                <Link href="/grants" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Agricultural Grants
                </Link>
              </li>
              <li>
                <Link href="/recovery" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Investment Recovery
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Learn Center
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Support
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent" />
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="tel:+18169937422" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 816 993 7422
                </a>
              </li>
              <li>
                <a href="mailto:support@terravolt.com" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@terravolt.com
                </a>
              </li>
              <li>
                <Link href="/sign-up" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/verification" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  ID Verification
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-emerald-500/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 Teravolt Incorporated. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
