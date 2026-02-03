import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Premium Image Header */}
      <section className="relative pt-32 pb-24 min-h-[50vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="/94a9bc3e-f7bb-450e-8d0a-9a021e4e0add.webp"
            alt="Growing Investments"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm mb-4">Insights & Updates</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
              TerraVolt<br />
              <span className="font-medium">Blog</span>
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Latest insights on agricultural investments, market analysis, and platform updates.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Why Farmland Outperforms Traditional Assets',
                excerpt: 'Learn how farmland has historically provided stable returns with low volatility. Our comprehensive guide explores the fundamentals of agricultural investing.',
                category: 'Education',
                date: 'Jan 28, 2026',
                readTime: '8 min read'
              },
              {
                title: 'Top Agricultural Trends to Watch in 2026',
                excerpt: 'Our research team analyzes the most promising agricultural sectors for 2026. Discover which crops and regions have strong growth potential.',
                category: 'Market Analysis',
                date: 'Jan 25, 2026',
                readTime: '12 min read'
              },
              {
                title: 'Building a Diversified Agricultural Portfolio',
                excerpt: 'Professional strategies for portfolio diversification across livestock, crops, and farmland. Reduce risk while maximizing returns.',
                category: 'Strategy',
                date: 'Jan 22, 2026',
                readTime: '10 min read'
              },
              {
                title: 'The Rise of Lithium-Ion Energy Investments',
                excerpt: 'Renewable energy is transforming the investment landscape. Learn about lithium-ion opportunities and how to get started.',
                category: 'Energy',
                date: 'Jan 18, 2026',
                readTime: '15 min read'
              },
              {
                title: 'Security Best Practices for Asset Investors',
                excerpt: 'Protect your investments with these essential security measures. From account protection to due diligence, keep your assets safe.',
                category: 'Security',
                date: 'Jan 15, 2026',
                readTime: '7 min read'
              },
              {
                title: 'Understanding Crop Cycles and Investment Returns',
                excerpt: 'Everything you need to know about agricultural cycles. Learn how harvest timing affects your investment returns.',
                category: 'Education',
                date: 'Jan 12, 2026',
                readTime: '11 min read'
              },
            ].map((post, index) => (
              <Link
                key={index}
                href="#"
                className="bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-slate-200" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{post.category}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{post.date}</span>
                    <span className="text-emerald-600 font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                      Read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
