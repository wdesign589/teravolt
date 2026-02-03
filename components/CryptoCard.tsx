import Image from 'next/image';
import Link from 'next/link';

interface CryptoCardProps {
  name: string;
  symbol: string;
  icon: string;
  price: string;
  change: string;
  tags: string[];
  runtime: string;
  minInvestment: string;
  roi: string;
}

export default function CryptoCard({
  name,
  symbol,
  icon,
  price,
  change,
  tags,
  runtime,
  minInvestment,
  roi,
}: CryptoCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200 min-w-[380px] w-[380px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">{symbol}</span>
          </div>
          <div>
            <h3 className="text-slate-900 font-bold text-2xl">{name}</h3>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-slate-100 text-slate-500 text-sm rounded-full whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-slate-900 mb-2">${price}</div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 font-semibold flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {change}%
          </span>
          <span className="text-slate-400 text-sm">Last week</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="text-slate-400 text-xs mb-1">ROI</div>
          <div className="text-slate-900 font-semibold text-sm">{roi}%</div>
        </div>
        <div>
          <div className="text-slate-400 text-xs mb-1">Runtime</div>
          <div className="text-slate-900 font-semibold text-sm">{runtime}</div>
        </div>
        <div>
          <div className="text-slate-400 text-xs mb-1">Min. Investment</div>
          <div className="text-slate-900 font-semibold text-sm">${minInvestment}</div>
        </div>
      </div>

      {/* Invest Button */}
      <Link
        href="#"
        className="block w-full py-3 text-center rounded-full border-2 border-emerald-500 text-emerald-500 font-semibold hover:bg-emerald-50 transition-colors"
      >
        Invest Now
      </Link>
    </div>
  );
}
