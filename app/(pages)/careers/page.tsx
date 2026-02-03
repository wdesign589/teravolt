import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[50vh] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/8fd16e70-9a71-4afe-bbec-8f2cabfe11a0.webp"
            alt="Agricultural Fields"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Careers</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Build the future of<br />
              <span className="font-medium">sustainable investing</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Join a world-class team reshaping how people invest in agriculture and energy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Work That Matters
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                At TerraVolt Incorporated, you'll work on products that impact millions of lives. We're not just building another fintech app—we're democratizing access to sustainable wealth through agricultural and energy investments.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Our team of 200+ professionals across 30 countries is united by a shared mission: making asset-backed investment accessible, secure, and profitable for everyone. From engineers and designers to marketers and customer success specialists, every role contributes to this vision.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We move fast, think big, and celebrate wins together. If you\'re passionate about technology, finance, and making a real difference, you\'ll find your place here.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="text-4xl font-bold text-emerald-500 mb-2">200+</div>
                <div className="text-slate-600 font-semibold">Team Members</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mt-8">
                <div className="text-4xl font-bold text-emerald-500 mb-2">30+</div>
                <div className="text-slate-600 font-semibold">Countries</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="text-4xl font-bold text-emerald-500 mb-2">$500M</div>
                <div className="text-slate-600 font-semibold">Funding Raised</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mt-8">
                <div className="text-4xl font-bold text-emerald-500 mb-2">4.9/5</div>
                <div className="text-slate-600 font-semibold">Glassdoor Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Benefits & Perks
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We invest in our people because they\'re our greatest asset
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Competitive Compensation',
                desc: 'Top-tier salaries benchmarked against FAANG companies, plus equity in a fast-growing company and performance-based bonuses.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Remote-First',
                desc: 'Work from anywhere in the world with flexible hours. We provide $2,000 home office setup budget and co-working space memberships.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Health & Wellness',
                desc: 'Premium health, dental, and vision insurance. Mental health support, gym memberships, and annual wellness stipends.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              },
              {
                title: 'Learning & Development',
                desc: '$5,000 annual budget for courses, certifications, conferences, and books. We invest in your continuous growth.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: 'Unlimited PTO',
                desc: 'Take time off when you need it. We trust our team to manage their time and maintain work-life balance.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: 'Latest Technology',
                desc: 'MacBook Pro, multiple monitors, and any tools you need. We don\'t compromise on equipment that helps you do your best work.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all group">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-slate-600">
              Find your perfect role and join our mission to democratize sustainable investing
            </p>
          </div>

          <div className="space-y-4">
            {[
              { title: 'Senior Full-Stack Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time', description: 'Build scalable backend systems and beautiful UIs' },
              { title: 'Product Designer', dept: 'Design', location: 'Remote', type: 'Full-time', description: 'Design intuitive experiences for crypto investors' },
              { title: 'Agricultural Analyst', dept: 'Research', location: 'Remote', type: 'Full-time', description: 'Analyze farm investments and market opportunities' },
              { title: 'Growth Marketing Manager', dept: 'Marketing', location: 'Remote', type: 'Full-time', description: 'Drive user acquisition and engagement' },
              { title: 'Customer Success Lead', dept: 'Support', location: 'Remote', type: 'Full-time', description: 'Help customers succeed with crypto investing' },
              { title: 'Security Engineer', dept: 'Security', location: 'Remote', type: 'Full-time', description: 'Protect billions in customer assets' },
              { title: 'DevOps Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time', description: 'Build and maintain our infrastructure' },
              { title: 'Content Marketing Writer', dept: 'Marketing', location: 'Remote', type: 'Full-time', description: 'Educate users about sustainable investing' },
            ].map((job, index) => (
              <Link
                key={index}
                href="/contact"
                className="block bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-3">{job.description}</p>
                    <div className="flex gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.dept}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-emerald-500 transform group-hover:translate-x-2 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center bg-slate-50 rounded-2xl p-12 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Don't See Your Role?</h3>
            <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and tell us why you'd be a great fit for Terravolt.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/20"
            >
              Send Your Resume
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
