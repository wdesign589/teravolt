'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import GoogleTranslate from './GoogleTranslate';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuData = {
    'Investments': [
      { href: '/investments', label: 'All Investments', desc: 'Explore all opportunities' },
      { href: '/investments/livestock', label: 'Livestock Farming', desc: 'Cattle & livestock assets' },
      { href: '/investments/crops', label: 'Crop Production', desc: 'Commercial farming' },
      { href: '/investments/farmland', label: 'Farmland', desc: 'Land acquisition & leasing' },
      { href: '/investments/lithium', label: 'Lithium-Ion Energy', desc: 'Renewable energy sector' },
    ],
    'Services': [
      { href: '/services', label: 'All Services', desc: 'What we offer' },
      { href: '/trading', label: 'CFDs & Trading', desc: 'Commodities & metals' },
      { href: '/grants', label: 'Agricultural Grants', desc: 'Funding opportunities' },
      { href: '/recovery', label: 'Investment Recovery', desc: 'Fraud recovery services' },
    ],
    'Company': [
      { href: '/about', label: 'About Us', desc: 'Our mission & vision' },
      { href: '/careers', label: 'Careers', desc: 'Join our team' },
      { href: '/security', label: 'Security', desc: 'How we protect you' },
      { href: '/blog', label: 'Blog', desc: 'Latest insights' },
      { href: '/news', label: 'News', desc: 'Company updates' },
    ],
    'Support': [
      { href: '/help', label: 'Help Center', desc: 'FAQs & guides' },
      { href: '/contact', label: 'Contact Us', desc: 'Reach our team' },
      { href: '/status', label: 'System Status', desc: 'Platform health' },
    ],
  };

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="fixed top-2 left-0 right-0 z-50 px-2 sm:px-4 md:left-1/2 md:-translate-x-1/2 md:w-[90%] lg:w-[85%] max-w-7xl">
      {/* Glass Morphism Container */}
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl md:rounded-full shadow-2xl shadow-black/20">
        <div className="px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-transform group-hover:scale-105">
                <Image
                  src="/icon.png"
                  alt="Terravolt Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">Terravolt</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {Object.keys(menuData).map((menuName) => (
                <div key={menuName} className="relative">
                  <button
                    onClick={() => toggleDropdown(menuName)}
                    className="flex items-center gap-1 px-4 py-2 text-slate-300 hover:text-white transition-colors font-medium text-[15px] rounded-full hover:bg-white/5"
                  >
                    {menuName}
                    <svg 
                      className={`w-4 h-4 transition-transform ${activeDropdown === menuName ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Mega Menu */}
                  {activeDropdown === menuName && (
                    <>
                      {/* Backdrop to close dropdown */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setActiveDropdown(null)}
                      />
                      
                      {/* Dropdown Content - Glassy Design */}
                      <div className="absolute top-full left-0 mt-2 w-72 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                        <div className="p-2">
                          {menuData[menuName as keyof typeof menuData].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block p-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 group-hover:bg-emerald-300 group-hover:shadow-lg group-hover:shadow-emerald-400/50 transition-all" />
                                <div className="flex-1">
                                  <div className="text-white/90 font-medium text-sm mb-0.5 group-hover:text-white transition-colors">
                                    {item.label}
                                  </div>
                                  <div className="text-white/40 text-xs">
                                    {item.desc}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Google Translate & Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="mr-2">
                <GoogleTranslate variant="minimal" />
              </div>
              <Link
                href="/sign-in"
                className="px-6 py-2 text-slate-200 hover:text-white border border-white/20 hover:border-white/30 rounded-full transition-all font-medium text-[15px] hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full transition-all font-semibold text-[15px] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 backdrop-blur-xl rounded-b-3xl">
            <div className="px-6 py-6 space-y-2">
              {Object.keys(menuData).map((menuName) => (
                <div key={menuName}>
                  <button
                    onClick={() => toggleDropdown(menuName)}
                    className="flex items-center justify-between w-full px-4 py-3 text-white font-semibold rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {menuName}
                    <svg 
                      className={`w-4 h-4 transition-transform ${activeDropdown === menuName ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeDropdown === menuName && (
                    <div className="mt-2 ml-4 space-y-1">
                      {menuData[menuName as keyof typeof menuData].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                          className="block p-3 rounded-lg hover:bg-emerald-500/10 transition-colors"
                        >
                          <div className="text-slate-300 font-medium text-sm">
                            {item.label}
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                {/* Google Translate */}
                <div className="flex justify-center mb-3">
                  <GoogleTranslate variant="minimal" />
                </div>
                
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-6 py-3 text-slate-200 border border-white/20 rounded-xl font-medium hover:bg-white/5 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
