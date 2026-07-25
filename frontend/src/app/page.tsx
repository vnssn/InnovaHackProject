import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-md text-on-surface overflow-x-hidden selection:bg-primary/30">
      
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-5 lg:px-12 z-50 absolute top-0 bg-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-primary text-[24px]">account_balance_wallet</span>
          </div>
          <span className="font-display-lg text-2xl tracking-tight text-on-surface font-bold">SpendSense</span>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href="/login" className="px-4 py-2 rounded-full font-label-md text-sm hover:bg-surface-container-high transition-colors text-on-surface hidden sm:block">
            Log In
          </Link>
          <Link href="/signup" className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-sm font-semibold hover:opacity-90 shadow-sm transition-transform hover:-translate-y-0.5">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 relative z-10 text-center w-full max-w-5xl mx-auto pt-32 pb-16 min-h-[85vh]">
        
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/30 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="font-label-sm text-xs font-medium text-on-surface-variant tracking-widest uppercase">Meet your AI Financial Copilot</span>
        </div>

        <h1 className="font-display-lg text-5xl sm:text-6xl lg:text-[80px] leading-[1.1] tracking-tight text-on-surface mb-6 font-bold">
          Take control of your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }}>
            financial future.
          </span>
        </h1>

        <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          SpendSense automatically tracks your expenses, finds hidden subscriptions, and generates personalized AI insights to help you save more every month.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link href="/signup" className="w-full sm:w-auto min-w-[200px] px-8 py-4 rounded-full bg-primary text-on-primary font-label-md text-base font-semibold hover:bg-primary-fixed transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(173,198,255,0.4)] hover:shadow-[0_0_60px_-15px_rgba(173,198,255,0.6)] hover:-translate-y-1 group">
            Start for free
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <Link href="/login" className="w-full sm:w-auto min-w-[200px] px-8 py-4 rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-md text-base font-medium transition-all text-center">
            View demo
          </Link>
        </div>
      </main>

      {/* Feature Highlights - Moved below fold */}
      <section className="w-full px-6 lg:px-12 py-16 lg:py-24 bg-surface-container-lowest/50 relative z-20 border-t border-outline-variant/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left">
          <div className="bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/20 p-8 rounded-3xl hover:bg-surface-container transition-colors group shadow-sm hover:shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-[32px]">monitoring</span>
            </div>
            <h3 className="font-headline-md text-2xl font-semibold text-on-surface mb-3">Smart Analytics</h3>
            <p className="font-body-md text-base text-on-surface-variant leading-relaxed">Real-time tracking of your spending patterns and category breakdowns.</p>
          </div>

          <div className="bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/20 p-8 rounded-3xl hover:bg-surface-container transition-colors group shadow-sm hover:shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
              <span className="material-symbols-outlined text-secondary text-[32px]">search_insights</span>
            </div>
            <h3 className="font-headline-md text-2xl font-semibold text-on-surface mb-3">AI Coach</h3>
            <p className="font-body-md text-base text-on-surface-variant leading-relaxed">Personalized insights that identify unusual transactions and potential savings.</p>
          </div>

          <div className="bg-surface-container-low/80 backdrop-blur-xl border border-outline-variant/20 p-8 rounded-3xl hover:bg-surface-container transition-colors group shadow-sm hover:shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-6 group-hover:bg-tertiary/20 transition-colors">
              <span className="material-symbols-outlined text-tertiary text-[32px]">subscriptions</span>
            </div>
            <h3 className="font-headline-md text-2xl font-semibold text-on-surface mb-3">Subscription Leak</h3>
            <p className="font-body-md text-base text-on-surface-variant leading-relaxed">Automatically detect forgotten recurring payments and cut down waste.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-surface-container-lowest text-center relative z-20">
        <p className="font-label-sm text-sm font-medium text-on-surface-variant">© 2026 SpendSense. All rights reserved.</p>
      </footer>
    </div>
  );
}
