import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Teravolt Incorporated',
  description: 'Sign in or sign up to manage your agricultural and energy investments',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 z-0" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px] z-0 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] z-0 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[80px] z-0" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', 
          backgroundSize: '48px 48px' 
        }} 
      />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-6xl px-4 py-8">
        {children}
      </div>
    </div>
  );
}
