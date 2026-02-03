interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export default function TestimonialCard({
  name,
  role,
  avatar,
  quote,
}: TestimonialCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-8 border border-emerald-500/20 relative hover:border-emerald-500/40 transition-all group">
      {/* Gradient Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* Quote Icon */}
      <div className="absolute top-6 right-6">
        <svg className="w-12 h-12 text-emerald-500 opacity-30 group-hover:opacity-50 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.5 10c-1.5 0-2.7.4-3.6 1.2-.9.8-1.4 1.9-1.4 3.3 0 1.3.5 2.3 1.4 3.1.9.8 2.1 1.2 3.6 1.2 1.4 0 2.6-.4 3.5-1.2.9-.8 1.4-1.8 1.4-3.1 0-.6-.1-1.1-.3-1.6l-1.5-4.8C9.3 6.5 8.3 5.7 7 5.7c-.8 0-1.5.3-2 .8-.5.5-.8 1.2-.8 2 0 .7.3 1.3.8 1.8.5.5 1.2.7 2 .7zm11 0c-1.5 0-2.7.4-3.6 1.2-.9.8-1.4 1.9-1.4 3.3 0 1.3.5 2.3 1.4 3.1.9.8 2.1 1.2 3.6 1.2 1.4 0 2.6-.4 3.5-1.2.9-.8 1.4-1.8 1.4-3.1 0-.6-.1-1.1-.3-1.6l-1.5-4.8c-.3-1.6-1.3-2.4-2.6-2.4-.8 0-1.5.3-2 .8-.5.5-.8 1.2-.8 2 0 .7.3 1.3.8 1.8.5.5 1.2.7 2 .7z" />
        </svg>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-semibold text-lg">{name}</h4>
          <p className="text-slate-400 text-sm">{role}</p>
        </div>
      </div>

      {/* Quote */}
      <p className="text-slate-300 leading-relaxed text-base relative z-10">
        "{quote}"
      </p>
    </div>
  );
}
