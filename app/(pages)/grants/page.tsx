import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function GrantsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[60vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/94a9bc3e-f7bb-450e-8d0a-9a021e4e0add.webp"
            alt="Agricultural Grants"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Funding Support</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              Agricultural grants<br />
              <span className="font-medium">& funding</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Access funding opportunities for agricultural projects. We connect farmers and agribusinesses with grant programs, subsidies, and development funding.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#eligibility"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-medium rounded transition-all"
              >
                Check Eligibility
              </Link>
              <Link
                href="#programs"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-medium rounded transition-all border border-white/30"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Funding <span className="text-emerald-500">Opportunities</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We help connect agricultural stakeholders with various funding sources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Government Grants */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200">
              <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Government Grants</h3>
              <p className="text-slate-600 mb-6">
                Federal and state agricultural grant programs supporting farming operations, equipment purchases, and sustainable practices.
              </p>
              <ul className="space-y-2">
                {['USDA Programs', 'State Agriculture Dept.', 'Conservation Grants', 'Rural Development'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Private Funding */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Private Funding</h3>
              <p className="text-slate-600 mb-6">
                Connect with private investors, agricultural funds, and impact investors focused on sustainable agriculture.
              </p>
              <ul className="space-y-2">
                {['Impact Investors', 'Agricultural Funds', 'Family Offices', 'Corporate Partners'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Development Programs */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200">
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Development Programs</h3>
              <p className="text-slate-600 mb-6">
                International development funding for agricultural projects in emerging markets and developing regions.
              </p>
              <ul className="space-y-2">
                {['World Bank Programs', 'UN FAO Initiatives', 'Regional Dev. Banks', 'NGO Partnerships'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700 text-sm">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Grant Programs */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Available <span className="text-emerald-500">Programs</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore funding programs we can help you access
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Beginning Farmer & Rancher Development',
                amount: '$10,000 - $250,000',
                type: 'Grant',
                desc: 'Support for new farmers entering the agricultural industry, including training, equipment, and operational costs.',
                eligibility: ['Less than 10 years farming experience', 'US-based operations', 'Viable business plan'],
              },
              {
                title: 'Sustainable Agriculture Research & Education',
                amount: '$15,000 - $500,000',
                type: 'Grant',
                desc: 'Funding for research and education projects that advance sustainable farming practices.',
                eligibility: ['Research institutions', 'Farmer cooperatives', 'Agricultural nonprofits'],
              },
              {
                title: 'Value-Added Producer Grant',
                amount: '$75,000 - $250,000',
                type: 'Grant',
                desc: 'Help agricultural producers enter value-added activities related to processing and marketing.',
                eligibility: ['Independent producers', 'Farmer cooperatives', 'Majority-controlled producer groups'],
              },
              {
                title: 'Conservation Stewardship Program',
                amount: 'Annual payments',
                type: 'Subsidy',
                desc: 'Payments for maintaining and improving existing conservation systems on agricultural land.',
                eligibility: ['Active farmers', 'Land stewardship commitment', 'Conservation plan'],
              },
              {
                title: 'Rural Energy for America Program',
                amount: '$20,000 - $500,000',
                type: 'Grant/Loan',
                desc: 'Funding for renewable energy systems and energy efficiency improvements for rural businesses.',
                eligibility: ['Rural small businesses', 'Agricultural producers', 'Energy audit required'],
              },
            ].map((program, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-emerald-500 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-slate-900">{program.title}</h3>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        {program.type}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{program.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {program.eligibility.map((req, j) => (
                        <span key={j} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <div className="text-2xl font-bold text-emerald-600 mb-2">{program.amount}</div>
                    <Link
                      href="/contact"
                      className="inline-block px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-full transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Who Can <span className="text-emerald-500">Apply</span>?
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Agricultural grants and funding programs are available to a wide range of stakeholders in the agricultural sector.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Individual Farmers', desc: 'Small to medium-scale farming operations' },
                  { title: 'Farm Cooperatives', desc: 'Farmer-owned cooperative organizations' },
                  { title: 'Agribusinesses', desc: 'Agricultural processing and distribution companies' },
                  { title: 'Research Institutions', desc: 'Universities and agricultural research centers' },
                  { title: 'Agricultural Nonprofits', desc: 'Organizations supporting farming communities' },
                  { title: 'Beginning Farmers', desc: 'New entrants to the agricultural industry' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Grant Services</h3>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Eligibility Assessment', desc: 'We evaluate your situation to identify suitable funding programs' },
                  { step: '2', title: 'Application Support', desc: 'Guidance on preparing and submitting grant applications' },
                  { step: '3', title: 'Documentation Review', desc: 'Help organizing required documents and business plans' },
                  { step: '4', title: 'Submission Tracking', desc: 'Monitor application status and follow up as needed' },
                  { step: '5', title: 'Compliance Guidance', desc: 'Support with reporting and compliance requirements' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Funding <span className="text-emerald-500">Success Stories</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how agricultural stakeholders have benefited from grant funding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Green Valley Farm',
                location: 'Iowa',
                amount: '$125,000',
                program: 'Beginning Farmer Grant',
                quote: 'The grant helped us purchase essential equipment and establish our organic vegetable operation.',
              },
              {
                name: 'Sunrise Cooperative',
                location: 'California',
                amount: '$350,000',
                program: 'Value-Added Producer Grant',
                quote: 'We were able to build a processing facility that increased our product value by 40%.',
              },
              {
                name: 'Heritage Ranch',
                location: 'Texas',
                amount: '$85,000',
                program: 'Conservation Program',
                quote: 'The funding supported our transition to regenerative grazing practices.',
              },
            ].map((story, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{story.name}</h3>
                    <p className="text-sm text-slate-500">{story.location}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-emerald-600">{story.amount}</span>
                  <span className="text-slate-500 text-sm ml-2">via {story.program}</span>
                </div>
                <p className="text-slate-600 italic">"{story.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Important Information
            </h3>
            <p className="text-sm text-blue-700">
              TerraVolt provides information and assistance with grant applications but does not guarantee funding approval. Grant decisions are made by the respective funding organizations. Eligibility requirements and available funding vary by program and are subject to change. We recommend consulting with financial and legal advisors before applying for grants.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Explore <span className="text-emerald-400">Funding Options</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Contact our team to discuss your agricultural project and explore available grant opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-500/30"
            >
              Schedule Consultation →
            </Link>
            <Link
              href="/sign-up"
              className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all border border-white/20"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
