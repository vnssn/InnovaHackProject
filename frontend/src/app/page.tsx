import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SpendSense | AI Financial Copilot',
  description: 'Track Every Rupee. Understand Every Purchase. Save More Automatically.',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120] font-body-md text-on-surface overflow-x-hidden selection:bg-primary/30">
      
      {/* 1. Sticky Navbar */}
      <header className="fixed top-0 w-full flex items-center justify-between px-6 py-4 lg:px-12 z-50 bg-[#0B1120]/70 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <span className="material-symbols-outlined text-white text-[24px]">account_balance_wallet</span>
          </div>
          <span className="font-display-lg text-2xl tracking-tight text-white font-bold">SpendSense</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-white/70 hover:text-white transition-colors">How It Works</Link>
          <Link href="#why-spendsense" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Why SpendSense</Link>
          <Link href="#contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Contact</Link>
        </nav>

        <nav className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 font-label-md text-sm font-medium text-white/80 hover:text-white transition-colors hidden sm:block">
            Log In
          </Link>
          <Link href="/login" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-label-md text-sm font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all hover:scale-105">
            Start Free Trial
          </Link>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="relative w-full pt-40 pb-20 px-6 lg:px-12 flex flex-col items-center justify-center text-center z-10 min-h-[90vh]">
        {/* Glow effects */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[600px] bg-blue-500/15 rounded-full blur-[120px] -z-10 animate-pulse-glow"></div>
        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[100px] -z-10"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 shadow-lg animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="font-label-sm text-xs font-semibold text-cyan-50 tracking-widest uppercase">AI Powered Financial Copilot</span>
        </div>

        <h1 className="font-display-lg text-5xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight text-white mb-6 font-bold animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Track Every Rupee. <br className="hidden md:block" />
          Understand Every Purchase. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(90deg, #60A5FA, #67E8F9)' }}>
            Save More Automatically.
          </span>
        </h1>

        <p className="font-body-lg text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-10 font-normal leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          SpendSense automatically categorizes transactions, detects subscription leaks, analyses spending by location and provides personalized AI recommendations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/login" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-label-md text-base font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:shadow-[0_0_60px_rgba(56,189,248,0.6)] hover:-translate-y-1">
            Start Free Trial
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
          <Link href="#demo" className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white font-label-md text-base font-medium transition-all text-center flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">play_circle</span>
            Watch Demo
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-white/50 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-cyan-400">check_circle</span> Free Forever</div>
          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-cyan-400">check_circle</span> No Credit Card</div>
          <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-cyan-400">shield</span> Secure</div>
        </div>
      </section>


      {/* 4. Feature Section */}
      <section id="features" className="w-full px-6 lg:px-12 py-24 bg-[#0B1120] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col text-center mb-16">
          <h2 className="font-display-lg text-4xl md:text-[48px] text-white font-bold mb-6 tracking-tight">Everything You Need To Control Your Money</h2>
          <p className="font-body-md text-xl text-white/60 font-normal">Powerful AI tools designed to simplify personal finance.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {[
            { icon: 'monitoring', title: 'Smart Analytics', desc: 'Real-time category tracking.' },
            { icon: 'psychology', title: 'AI Coach', desc: 'Personalized spending advice.' },
            { icon: 'subscriptions', title: 'Subscription Leak Detection', desc: 'Find forgotten subscriptions.' },
            { icon: 'location_on', title: 'Location-Based Insights', desc: 'See where your money goes.' },
            { icon: 'flag', title: 'Budget Goals', desc: 'Track monthly budgets.' },
            { icon: 'notifications_active', title: 'Smart Alerts', desc: 'Receive unusual spending notifications.' }
          ].map((feat, i) => (
            <div key={i} className="group bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[24px] hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/10 group-hover:to-cyan-400/10 transition-colors duration-500"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border-[2px] border-transparent bg-gradient-to-br from-blue-500/50 to-cyan-400/50 rounded-[24px] pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-400 transition-colors shadow-sm relative z-10">
                <span className="material-symbols-outlined text-white text-[28px]">{feat.icon}</span>
              </div>
              <h3 className="font-headline-md text-2xl font-semibold text-white mb-2 relative z-10">{feat.title}</h3>
              <p className="font-body-md text-base text-white/60 relative z-10">{feat.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* 5. How It Works */}
      <section className="w-full px-6 lg:px-12 py-24 bg-[#070b14] relative z-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col text-center mb-16">
          <h2 className="font-display-lg text-4xl md:text-[48px] text-white font-bold tracking-tight">How It Works</h2>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
          
          <div className="flex flex-col items-center text-center z-10 w-full md:w-1/3">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6 relative">
              <span className="material-symbols-outlined text-blue-400 text-[32px]">account_balance</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">1</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Connect Your UPI</h3>
            <p className="text-white/50 text-sm">Securely link your bank accounts for automatic syncing.</p>
          </div>

          <span className="material-symbols-outlined text-white/20 text-[32px] md:-rotate-90 hidden md:block">expand_more</span>
          <span className="material-symbols-outlined text-white/20 text-[32px] md:hidden">expand_more</span>

          <div className="flex flex-col items-center text-center z-10 w-full md:w-1/3">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-6 relative">
              <span className="material-symbols-outlined text-cyan-400 text-[32px]">smart_toy</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-500 text-white font-bold text-xs flex items-center justify-center">2</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Analyses Spending</h3>
            <p className="text-white/50 text-sm">Our models categorize and spot patterns instantly.</p>
          </div>

          <span className="material-symbols-outlined text-white/20 text-[32px] md:-rotate-90 hidden md:block">expand_more</span>
          <span className="material-symbols-outlined text-white/20 text-[32px] md:hidden">expand_more</span>

          <div className="flex flex-col items-center text-center z-10 w-full md:w-1/3">
            <div className="w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6 relative">
              <span className="material-symbols-outlined text-purple-400 text-[32px]">insights</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center">3</div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Actionable Insights</h3>
            <p className="text-white/50 text-sm">Receive alerts and advice to save more money.</p>
          </div>

        </div>
      </section>


      {/* 7. Final CTA */}
      <section className="w-full px-6 lg:px-12 py-12 relative z-20">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-white/10 rounded-[32px] p-12 md:p-24 text-center relative overflow-hidden backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-400/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <h2 className="font-display-lg text-4xl md:text-[56px] leading-[1.1] text-white font-bold tracking-tight mb-8 relative z-10">
            Ready To Take Control <br className="hidden md:block" /> Of Your Finances?
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0B1120] font-label-md text-base font-bold hover:scale-105 transition-all shadow-lg">
              Start Free Trial
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-label-md text-base font-medium transition-all backdrop-blur-md">
              Book Demo
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}
