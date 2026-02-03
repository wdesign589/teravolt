'use client';

import { useState } from 'react';

// Declare Smartsupp type
declare global {
  interface Window {
    smartsupp?: any;
  }
}

export default function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs = [
    { question: 'How do I deposit funds?', answer: 'Navigate to the Deposit page and select your preferred payment method.', category: 'deposit' },
    { question: 'What are the withdrawal limits?', answer: 'Daily limit is $50,000 and monthly limit is $500,000 for verified accounts.', category: 'withdraw' },
    { question: 'How long does KYC verification take?', answer: 'KYC verification typically takes 24-48 hours to complete.', category: 'account' },
    { question: 'What cryptocurrencies are supported?', answer: 'We support Bitcoin, Ethereum, Litecoin, Solana, and 50+ other cryptocurrencies.', category: 'crypto' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Support Center</h1>
        <p className="text-sm text-slate-500 mt-1">Get help and find answers to your questions</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Live Chat */}
        <button 
          onClick={() => {
            if (window.smartsupp) {
              window.smartsupp('chat:open');
            }
          }}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-left hover:border-emerald-500"
        >
          <div className="text-3xl mb-3">💬</div>
          <div className="text-sm font-bold text-slate-900 mb-1">Live Chat</div>
          <div className="text-xs text-slate-600">Chat with support</div>
        </button>

        {/* Email Us */}
        <a 
          href="mailto:support@terravolt.com"
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-left hover:border-emerald-500"
        >
          <div className="text-3xl mb-3">📧</div>
          <div className="text-sm font-bold text-slate-900 mb-1">Email Us</div>
          <div className="text-xs text-slate-600">support@terravolt.com</div>
        </a>

        {/* Call Us */}
        <a 
          href="tel:+18169937422"
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-left hover:border-emerald-500"
        >
          <div className="text-3xl mb-3">📞</div>
          <div className="text-sm font-bold text-slate-900 mb-1">Call Us</div>
          <div className="text-xs text-slate-600">+1 816 993 7422</div>
        </a>

        {/* Help Center */}
        <button className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-left hover:border-emerald-500">
          <div className="text-3xl mb-3">📚</div>
          <div className="text-sm font-bold text-slate-900 mb-1">Help Center</div>
          <div className="text-xs text-slate-600">Browse articles</div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          
          <div className="flex gap-2 mb-6">
            {['All', 'Deposit', 'Withdraw', 'Account', 'Crypto'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat.toLowerCase())}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedCategory === cat.toLowerCase() ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {faqs.filter(faq => selectedCategory === 'all' || faq.category === selectedCategory).map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer">
                  <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                  <svg className="w-5 h-5 text-slate-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-4 text-sm text-slate-600">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Create Ticket</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Subject" className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm" />
              <select className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm">
                <option>Select category</option>
                <option>Account Issue</option>
                <option>Payment Problem</option>
              </select>
              <textarea rows={4} placeholder="Description..." className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-sm" />
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold">Submit</button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-sm font-semibold">Live Chat Support</span>
            </div>
            <div className="text-lg font-bold mb-2">Need instant help?</div>
            <div className="text-sm mb-4 opacity-90">Click the chat widget in the bottom right corner to speak with our support team in real-time.</div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
