import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface font-body-md text-on-surface overflow-x-hidden">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-md py-md lg:px-xl z-50 absolute top-0 bg-transparent">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[24px]">account_balance_wallet</span>
          </div>
          <span className="font-display-lg text-headline-md tracking-tight text-on-surface">SpendSense</span>
        </div>
        <nav className="flex items-center gap-sm">
          <Link href="/login" className="px-md py-sm rounded-full font-label-md text-label-md hover:bg-surface-container-high transition-colors text-on-surface">
            Log In
          </Link>
          <Link href="/signup" className="px-md py-sm rounded-full bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 shadow-sm transition-all hover:shadow-primary/20 hover:-translate-y-0.5">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-md lg:px-xl relative z-10 text-center w-full max-w-5xl mx-auto">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

        <div className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-surface-container-high border border-outline-variant/30 mb-lg animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">Meet your AI Financial Copilot</span>
        </div>

        <h1 className="font-display-lg text-display-lg lg:text-[72px] leading-[1.1] tracking-tight text-on-surface mb-md">
          Take control of your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">financial future.</span>
        </h1>

        <p className="font-body-lg text-body-lg md:text-headline-md text-on-surface-variant max-w-2xl mx-auto mb-xl font-normal leading-relaxed">
          SpendSense automatically tracks your expenses, finds hidden subscriptions, and generates personalized AI insights to help you save more every month.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-md w-full sm:w-auto">
          <Link href="/signup" className="w-full sm:w-auto px-lg py-md rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed transition-all flex items-center justify-center gap-sm shadow-[0_0_40px_-10px_rgba(173,198,255,0.4)] hover:shadow-[0_0_60px_-15px_rgba(173,198,255,0.6)] hover:-translate-y-1 group">
            Start for free
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-lg py-md rounded-full bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface font-label-md text-label-md transition-all text-center">
            View demo
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mt-24 text-left w-full">
          <div className="bg-surface-container-lowest/50 backdrop-blur-xl border border-outline-variant/20 p-lg rounded-3xl hover:bg-surface-container-low transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-md group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-[28px]">monitoring</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Smart Analytics</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Real-time tracking of your spending patterns and category breakdowns.</p>
          </div>

          <div className="bg-surface-container-lowest/50 backdrop-blur-xl border border-outline-variant/20 p-lg rounded-3xl hover:bg-surface-container-low transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-md group-hover:bg-secondary/20 transition-colors">
              <span className="material-symbols-outlined text-secondary text-[28px]">search_insights</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">AI Coach</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Personalized insights that identify unusual transactions and potential savings.</p>
          </div>

          <div className="bg-surface-container-lowest/50 backdrop-blur-xl border border-outline-variant/20 p-lg rounded-3xl hover:bg-surface-container-low transition-colors group">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-md group-hover:bg-tertiary/20 transition-colors">
              <span className="material-symbols-outlined text-tertiary text-[28px]">subscriptions</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Subscription Leak</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Automatically detect forgotten recurring payments and cut down waste.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-lg border-t border-outline-variant/20 mt-auto text-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant">© 2026 SpendSense. All rights reserved.</p>
      </footer>
    </div>
  );
}
