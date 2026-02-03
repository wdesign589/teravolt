import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Elegant Gradient Header */}
      <section className="relative pt-32 pb-24 min-h-[50vh] flex items-end overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-slate-900">
          {/* Decorative Elements */}
          <div className="absolute top-10 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-400/5 rounded-full blur-2xl" />
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Contact Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              We're here to<br />
              <span className="font-medium">help you succeed</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl">
              Get in touch with our team—we're available 24/7 to answer your questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Choose How You'd Like to Connect
            </h2>
            <p className="text-lg text-slate-600">
              Multiple ways to reach us—whichever works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: '24/7 Live Chat',
                desc: 'Get instant answers from our support team. Average response time under 2 minutes.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                action: 'Start Chat',
                href: '#'
              },
              {
                title: 'Email Support',
                desc: 'Send us a detailed message. We typically respond within 1-2 hours.',
                contact: 'support@terravolt.com',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                action: 'Send Email',
                href: 'mailto:support@terravolt.com'
              },
              {
                title: 'Phone Support',
                desc: 'Speak directly with our team for urgent matters. Available 24/7.',
                contact: '+1 (855) 586-3929',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                action: 'Call Us',
                href: 'tel:+18555863929'
              },
            ].map((option, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all group">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  {option.desc}
                </p>
                {option.contact && (
                  <p className="text-emerald-600 font-semibold mb-4">
                    {option.contact}
                  </p>
                )}
                <Link
                  href={option.href}
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  {option.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-slate-600">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Subject *
                </label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all">
                  <option value="">Select a subject...</option>
                  <option>General Inquiry</option>
                  <option>Investment Questions</option>
                  <option>Account Support</option>
                  <option>Agricultural Grants</option>
                  <option>Investment Recovery</option>
                  <option>Partnership Opportunity</option>
                  <option>Institutional Services</option>
                  <option>Press & Media</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all resize-none"
                  placeholder="Please provide as much detail as possible so we can assist you better..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-emerald-500/20"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Global Presence, Local Service
            </h2>
            <p className="text-xl text-slate-600">
              Operating from three continents to serve our customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: 'New York',
                address: '123 Wall Street\nNew York, NY 10005\nUnited States',
                region: 'Americas Headquarters',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                city: 'London',
                address: '45 Liverpool Street\nLondon EC2M 7AE\nUnited Kingdom',
                region: 'Europe Headquarters',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                city: 'Singapore',
                address: '88 Market Street\nCapitaSpring, Singapore 048948\nSingapore',
                region: 'Asia-Pacific Headquarters',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
            ].map((office, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6">
                  {office.icon}
                </div>
                <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wide mb-3">
                  {office.region}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{office.city}</h3>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                  {office.address}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
