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
          <Link href="#ai" className="text-sm font-medium text-white/70 hover:text-white transition-colors">AI Insights</Link>
          <Link href="#pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</Link>
          <Link href="#about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About</Link>
        </nav>

        <nav className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 font-label-md text-sm font-medium text-white/80 hover:text-white transition-colors hidden sm:block">
            Log In
          </Link>
          <Link href="/signup" className="px-5 py-2.5 rounded-full bg-white text-[#0B1120] font-label-md text-sm font-semibold hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105">
            Get Started
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
          <Link href="/signup" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-label-md text-base font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:shadow-[0_0_60px_rgba(56,189,248,0.6)] hover:-translate-y-1">
            Start Free
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

      {/* 3. Dashboard Preview */}
      <section className="w-full px-6 lg:px-12 pb-32 relative z-20 flex justify-center">
        <div className="w-full max-w-6xl rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col md:flex-row animate-floating">
          
          {/* Mockup Sidebar */}
          <div className="hidden md:flex w-64 bg-black/40 border-r border-white/10 flex-col p-6 gap-6">
            <div className="flex items-center gap-3 opacity-50 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/20"></div>
              <div className="h-4 w-24 bg-white/20 rounded"></div>
            </div>
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="flex items-center gap-3 opacity-60">
                <div className="w-5 h-5 rounded bg-white/20"></div>
                <div className="h-3 w-full bg-white/10 rounded"></div>
              </div>
            ))}
            <div className="mt-auto flex items-center gap-3 opacity-40">
              <div className="w-8 h-8 rounded-full bg-white/20"></div>
              <div className="h-3 w-20 bg-white/10 rounded"></div>
            </div>
          </div>

          {/* Mockup Main Area */}
          <div className="flex-1 p-6 md:p-10 bg-gradient-to-br from-white/5 to-transparent flex flex-col gap-8">
            <div className="flex justify-between items-center opacity-80">
              <div className="h-6 w-48 bg-white/20 rounded"></div>
              <div className="h-10 w-10 bg-white/10 rounded-full"></div>
            </div>
            
            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="h-3 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-32 bg-white/40 rounded"></div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 blur-xl rounded-full"></div>
              </div>
              <div className="h-32 rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="h-3 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-32 bg-white/40 rounded"></div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-400/20 blur-xl rounded-full"></div>
              </div>
              <div className="h-32 rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="h-3 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-32 bg-white/40 rounded"></div>
              </div>
            </div>

            {/* Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 h-64 rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col gap-4">
                <div className="h-4 w-32 bg-white/20 rounded"></div>
                <div className="flex-1 flex items-end gap-2 px-2 opacity-50">
                   {/* Mock bar chart */}
                   <div className="w-full bg-blue-500/40 rounded-t h-[40%]"></div>
                   <div className="w-full bg-blue-500/60 rounded-t h-[60%]"></div>
                   <div className="w-full bg-blue-500/30 rounded-t h-[30%]"></div>
                   <div className="w-full bg-blue-500/80 rounded-t h-[80%]"></div>
                   <div className="w-full bg-blue-500/50 rounded-t h-[50%]"></div>
                   <div className="w-full bg-blue-500/90 rounded-t h-[100%]"></div>
                </div>
              </div>
              <div className="h-64 rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col gap-4 items-center justify-center">
                 <div className="h-4 w-32 bg-white/20 rounded self-start mb-auto"></div>
                 {/* Mock pie chart */}
                 <div className="w-32 h-32 rounded-full border-[12px] border-white/10 border-t-cyan-400 border-r-blue-500 opacity-80"></div>
                 <div className="mt-auto"></div>
              </div>
            </div>

            {/* List */}
            <div className="h-48 rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col gap-4">
              <div className="h-4 w-40 bg-white/20 rounded mb-2"></div>
              {[1,2,3].map(i => (
                <div key={i} className="flex justify-between items-center opacity-60 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                    <div className="h-3 w-32 bg-white/10 rounded"></div>
                  </div>
                  <div className="h-3 w-16 bg-white/20 rounded"></div>
                </div>
              ))}
            </div>
          </div>
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

      {/* 6. Testimonials */}
      <section className="w-full px-6 lg:px-12 py-24 bg-[#0B1120] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col text-center mb-16">
          <h2 className="font-display-lg text-4xl md:text-[48px] text-white font-bold tracking-tight mb-4">Loved By Smart Savers</h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {[
            { name: 'Priya Sharma', role: 'Software Engineer', text: 'SpendSense found 3 streaming subscriptions I forgot I was paying for. The AI insights alone saved me ₹2,400 this month.' },
            { name: 'Rahul Desai', role: 'Freelance Designer', text: 'The location-based tracking is mind-blowing. I finally understand exactly how much I spend at my local cafes. A truly premium experience.' },
            { name: 'Ananya Verma', role: 'Product Manager', text: 'Unlike other bulky finance apps, SpendSense feels like magic. The UI is gorgeous and the categorization is 100% accurate every time.' }
          ].map((t, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[24px] flex flex-col">
              <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-[#FBBF24] text-[18px]">star</span>)}
              </div>
              <p className="text-white/80 font-body-md text-lg leading-relaxed mb-8 flex-1">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-lg">
                  {t.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{t.name}</span>
                  <span className="text-white/50 text-sm">{t.role}</span>
                </div>
              </div>
            </div>
          ))}

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
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#0B1120] font-label-md text-base font-bold hover:scale-105 transition-all shadow-lg">
              Start Free
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-label-md text-base font-medium transition-all backdrop-blur-md">
              Book Demo
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="w-full px-6 lg:px-12 py-16 bg-[#070b14] border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Product</h4>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Features</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Integrations</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Pricing</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Changelog</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Company</h4>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">About Us</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Careers</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Blog</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Contact</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Resources</h4>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Documentation</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Help Center</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Community</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Security</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-2">Social</h4>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Twitter</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">LinkedIn</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">GitHub</Link>
            <Link href="#" className="text-white/50 hover:text-white transition-colors text-sm">Discord</Link>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[14px]">account_balance_wallet</span>
            </div>
            <span className="text-white font-bold tracking-tight">SpendSense</span>
          </div>
          <p className="font-label-sm text-sm font-medium text-white/40">© 2026 SpendSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
