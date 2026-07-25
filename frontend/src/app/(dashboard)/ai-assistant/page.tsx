"use client";

export default function AiAssistantPage() {
  return (
    <>
      <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden">
<div className="flex flex-1 overflow-hidden relative">

<aside className="hidden lg:flex flex-col w-80 bg-surface-container/30 backdrop-blur-md border-r border-outline-variant/30 overflow-y-auto p-md gap-md">
<div className="flex items-center gap-sm mb-sm">
<span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Insights Coach</h2>
</div>
<div className="flex flex-col gap-sm relative group">
<div className="absolute -inset-2 bg-primary/5 rounded-xl blur-xl transition-all group-hover:bg-primary/10"></div>
<div className="relative bg-surface-container-high rounded-xl p-md shadow-md flex flex-col gap-sm">
<div className="flex items-start justify-between">
<span className="font-label-md text-label-md text-tertiary uppercase tracking-widest">Alert</span>
<span className="material-symbols-outlined text-tertiary text-[18px]">trending_up</span>
</div>
<p className="font-body-md text-body-md text-on-surface">Your dining expenses are 42% higher this week compared to last week.</p>
<button className="text-left font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors mt-xs flex items-center gap-xs">
                         Analyze pattern <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
<div className="relative bg-surface-container rounded-xl p-md shadow-sm flex flex-col gap-sm hover:bg-surface-container-high transition-colors cursor-pointer group">
<div className="flex items-start justify-between">
<span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Opportunity</span>
<span className="material-symbols-outlined text-secondary text-[18px]">savings</span>
</div>
<p className="font-body-md text-body-md text-on-surface">Moving ₹15,000 to Liquid Funds now could earn an extra ₹850 this month.</p>
<div className="h-1 w-0 bg-secondary rounded-full mt-xs group-hover:w-full transition-all duration-500"></div>
</div>
<div className="relative bg-surface-container rounded-xl p-md shadow-sm flex flex-col gap-sm hover:bg-surface-container-high transition-colors cursor-pointer group">
<div className="flex items-start justify-between">
<span className="font-label-md text-label-md text-primary uppercase tracking-widest">Prediction</span>
<span className="material-symbols-outlined text-primary text-[18px]">online_prediction</span>
</div>
<p className="font-body-md text-body-md text-on-surface">Based on past behavior, you'll likely overspend your entertainment budget by weekend.</p>
<div className="h-1 w-0 bg-primary rounded-full mt-xs group-hover:w-full transition-all duration-500"></div>
</div>
<div className="mt-auto pt-md border-t border-outline-variant/30 flex items-center justify-between">
<span className="font-label-sm text-label-sm text-on-surface-variant">Model: FinCore Pro-v4</span>
<span className="flex items-center gap-xs text-secondary-fixed">
<span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
<span className="font-label-sm text-label-sm">Active</span>
</span>
</div>
</aside>

<main className="flex-1 flex flex-col relative bg-surface">

<div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-20">
<div className="w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen absolute -top-40 -right-40"></div>
<div className="w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen absolute -bottom-20 -left-20"></div>
</div>

<div className="flex-1 overflow-y-auto p-md md:p-xl flex flex-col gap-lg z-10 scroll-smooth" id="chat-container">

<div className="flex justify-center">
<span className="bg-surface-container-highest px-md py-xs rounded-full font-label-sm text-label-sm text-on-surface-variant shadow-sm border border-outline-variant/20">Today</span>
</div>

<div className="flex justify-end w-full group animate-[slideInUp_0.3s_ease-out]">
<div className="max-w-[85%] md:max-w-[70%] bg-primary text-on-primary rounded-2xl rounded-tr-sm p-md shadow-md relative">
<p className="font-body-md text-body-md leading-relaxed">Where did my salary go this month? It feels like it vanished instantly.</p>
<span className="absolute -right-2 bottom-0 text-[10px] text-on-primary/60 font-mono opacity-0 group-hover:opacity-100 transition-opacity">10:42 AM</span>
</div>
</div>

<div className="flex justify-start w-full gap-sm group animate-[slideInUp_0.4s_ease-out]">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shadow-sm shrink-0 mt-1">
<span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
</div>
<div className="flex flex-col gap-sm max-w-[90%] md:max-w-[80%]">
<div className="bg-surface-container-low backdrop-blur-xl border border-outline-variant/30 text-on-surface rounded-2xl rounded-tl-sm p-md shadow-sm relative">
<p className="font-body-md text-body-md leading-relaxed mb-md">I've analyzed your cash flow since your last salary credit (₹1,45,000 on 1st Nov). Here is the breakdown of the major outflows that account for the rapid drop in balance:</p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-sm mb-md">

<div className="bg-surface-container flex flex-col gap-xs p-sm rounded-xl border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-pointer group/card shadow-sm">
<div className="flex justify-between items-start">
<div className="flex items-center gap-xs text-on-surface-variant font-mono text-[10px]">
<span className="material-symbols-outlined text-[14px]">receipt_long</span> TXN-892A
                                        </div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Nov 2</span>
</div>
<div className="flex justify-between items-center mt-xs">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate pr-2">HDFC Home Loan EMi</span>
<span className="font-headline-md text-headline-md text-error whitespace-nowrap">-₹42,500</span>
</div>
</div>

<div className="bg-surface-container flex flex-col gap-xs p-sm rounded-xl border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-pointer group/card shadow-sm">
<div className="flex justify-between items-start">
<div className="flex items-center gap-xs text-on-surface-variant font-mono text-[10px]">
<span className="material-symbols-outlined text-[14px]">receipt_long</span> TXN-441B
                                        </div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Nov 4</span>
</div>
<div className="flex justify-between items-center mt-xs">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate pr-2">Cred Credit Card Bill</span>
<span className="font-headline-md text-headline-md text-error whitespace-nowrap">-₹38,200</span>
</div>
</div>

<div className="bg-surface-container flex flex-col gap-xs p-sm rounded-xl border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-pointer group/card shadow-sm">
<div className="flex justify-between items-start">
<div className="flex items-center gap-xs text-on-surface-variant font-mono text-[10px]">
<span className="material-symbols-outlined text-[14px]">receipt_long</span> TXN-109C
                                        </div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Nov 5</span>
</div>
<div className="flex justify-between items-center mt-xs">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate pr-2">Zerodha SIP</span>
<span className="font-headline-md text-headline-md text-secondary whitespace-nowrap">-₹25,000</span>
</div>
</div>

<div className="bg-surface-container flex flex-col gap-xs p-sm rounded-xl border border-outline-variant/20 hover:border-primary/50 transition-colors cursor-pointer group/card shadow-sm relative overflow-hidden">
<div className="absolute inset-0 bg-tertiary/5 mix-blend-overlay"></div>
<div className="flex justify-between items-start relative z-10">
<div className="flex items-center gap-xs text-on-surface-variant font-mono text-[10px]">
<span className="material-symbols-outlined text-[14px]">category</span> Aggregated
                                        </div>
<span className="font-label-sm text-label-sm text-tertiary">Spike</span>
</div>
<div className="flex justify-between items-center mt-xs relative z-10">
<span className="font-label-md text-label-md text-on-surface font-semibold truncate pr-2">Food &amp; Dining</span>
<span className="font-headline-md text-headline-md text-error whitespace-nowrap">-₹14,800</span>
</div>
</div>
</div>
<p className="font-body-md text-body-md leading-relaxed">Your fixed obligations and investments took 72% of your income within the first 5 days. However, the dining category is tracking unusually high. Would you like me to drill down into those specific merchants?</p>
<span className="absolute -left-10 bottom-0 text-[10px] text-on-surface-variant font-mono opacity-0 group-hover:opacity-100 transition-opacity">10:42 AM</span>
</div>

<div className="flex flex-wrap gap-sm">
<button className="bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md px-sm py-xs rounded-full border border-outline-variant/20 transition-all flex items-center gap-xs shadow-sm">
<span className="material-symbols-outlined text-[16px]">restaurant</span> Show Dining breakdown
                            </button>
<button className="bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface font-label-md text-label-md px-sm py-xs rounded-full border border-outline-variant/20 transition-all flex items-center gap-xs shadow-sm">
<span className="material-symbols-outlined text-[16px]">monitoring</span> Compare to last month
                            </button>
</div>
</div>
</div>

<div className="flex justify-start w-full gap-sm opacity-50 hidden" id="typing-indicator">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
</div>
<div className="bg-surface-container-low backdrop-blur-xl border border-outline-variant/30 rounded-2xl rounded-tl-sm px-md py-sm flex items-center gap-1">
<div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{"animationDelay":"0ms"} as React.CSSProperties}></div>
<div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{"animationDelay":"150ms"} as React.CSSProperties}></div>
<div className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{"animationDelay":"300ms"} as React.CSSProperties}></div>
</div>
</div>
<div className="h-4 w-full shrink-0"></div> 
</div>

<div className="p-md bg-surface/80 backdrop-blur-2xl border-t border-outline-variant/30 z-20">

<div className="flex gap-sm overflow-x-auto pb-sm mb-sm no-scrollbar">
<button className="shrink-0 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-md py-sm rounded-full border border-outline-variant/20 transition-all whitespace-nowrap shadow-sm">
                        Am I spending too much on Zomato?
                    </button>
<button className="shrink-0 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-md py-sm rounded-full border border-outline-variant/20 transition-all whitespace-nowrap shadow-sm">
                        How much can I save this month?
                    </button>
<button className="shrink-0 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-md py-sm rounded-full border border-outline-variant/20 transition-all whitespace-nowrap shadow-sm">
                        Find recurring subscriptions I don't use
                    </button>
</div>

<div className="relative flex items-end gap-sm bg-surface-container-lowest border border-outline-variant/50 rounded-2xl p-sm shadow-md focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
<button className="p-sm text-on-surface-variant hover:text-primary transition-colors rounded-xl hover:bg-surface-container h-10 w-10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">add_circle</span>
</button>
<textarea className="w-full bg-transparent border-none focus:ring-0 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/50 resize-none py-sm max-h-32 overflow-y-auto" id="chat-input" placeholder="Ask anything about your finances..." rows={1}></textarea>
<button className="p-sm bg-primary text-on-primary hover:bg-primary-fixed transition-colors rounded-xl h-10 w-10 flex items-center justify-center shrink-0 shadow-sm" id="send-btn">
<span className="material-symbols-outlined text-[20px]">send</span>
</button>
</div>
<div className="text-center mt-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant/60">AI can make mistakes. Verify important financial data.</span>
</div>
</div>
</main>
</div>
</div>


    </>
  );
}
