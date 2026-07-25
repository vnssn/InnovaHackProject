"use client";

export default function MerchantsPage() {
  return (
    <>
      <div className="flex flex-col w-full gap-xl">
<section className="relative w-full flex flex-col gap-lg">
<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md z-10">
<div className="flex flex-col gap-xs">
<div className="flex items-center gap-sm">
<div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shadow-lg relative overflow-hidden">
<span className="material-symbols-outlined text-primary text-[28px] z-10">shopping_bag</span>
</div>
<h1 className="font-display-lg text-display-lg text-on-surface">Amazon</h1>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Merchant analytics and spending patterns for this vendor.</p>
</div>
<div className="flex gap-sm">
<button className="bg-primary/10 text-primary hover:bg-primary/20 px-md py-sm rounded-full font-label-md text-label-md transition-all flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">download</span>
                    Export Report
                </button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter z-10">
<div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-sm relative overflow-hidden group hover:bg-surface-container/80 transition-all cursor-pointer">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Spent</span>
<span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">account_balance_wallet</span>
</div>
<div className="flex items-baseline gap-xs">
<span className="font-headline-md text-headline-md text-on-surface-variant">₹</span>
<span className="font-display-lg text-display-lg text-on-surface">32,450</span>
</div>
<div className="flex items-center gap-xs text-secondary">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="font-label-sm text-label-sm">12% vs last year</span>
</div>
</div>
<div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-sm relative overflow-hidden group hover:bg-surface-container/80 transition-all cursor-pointer">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-all"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Avg. Order Value</span>
<span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg">receipt_long</span>
</div>
<div className="flex items-baseline gap-xs">
<span className="font-headline-md text-headline-md text-on-surface-variant">₹</span>
<span className="font-display-lg text-display-lg text-on-surface">1,248</span>
</div>
<div className="flex items-center gap-xs text-on-surface-variant">
<span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
<span className="font-label-sm text-label-sm">Consistent average</span>
</div>
</div>
<div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-sm relative overflow-hidden group hover:bg-surface-container/80 transition-all cursor-pointer">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl group-hover:bg-tertiary/10 transition-all"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Visit Count</span>
<span className="material-symbols-outlined text-tertiary bg-tertiary/10 p-2 rounded-lg">storefront</span>
</div>
<div className="flex items-baseline gap-xs">
<span className="font-display-lg text-display-lg text-on-surface">26</span>
</div>
<div className="flex items-center gap-xs text-error">
<span className="material-symbols-outlined text-[16px]">trending_down</span>
<span className="font-label-sm text-label-sm">3 fewer than last month</span>
</div>
</div>
</div>
</section>
<section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
<div className="lg:col-span-2 bg-surface-container/40 backdrop-blur-md rounded-3xl p-lg flex flex-col gap-lg shadow-lg relative overflow-hidden">
<div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"></div>
<div className="flex items-center justify-between z-10">
<h2 className="font-headline-lg text-headline-lg text-on-surface">Monthly Trend</h2>
<div className="flex gap-2">
<button className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors hover:bg-primary hover:text-on-primary">6M</button>
<button className="px-3 py-1 rounded-full bg-transparent text-on-surface-variant font-label-sm text-label-sm transition-colors hover:bg-surface-container-high">1Y</button>
<button className="px-3 py-1 rounded-full bg-transparent text-on-surface-variant font-label-sm text-label-sm transition-colors hover:bg-surface-container-high">ALL</button>
</div>
</div>
<div className="w-full h-72 z-10 relative">
<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
<defs>
<linearGradient id="lineGrad" x1="0%" x2="100%" y1="0%" y2="0%">
<stop offset="0%" stopColor="#4b8eff" stopOpacity="0.3"></stop>
<stop offset="50%" stopColor="#4b8eff" stopOpacity="1"></stop>
<stop offset="100%" stopColor="#4b8eff" stopOpacity="0.3"></stop>
</linearGradient>
<linearGradient id="areaGrad" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" stopColor="#4b8eff" stopOpacity="0.2"></stop>
<stop offset="100%" stopColor="#4b8eff" stopOpacity="0"></stop>
</linearGradient>
</defs>
<g className="text-on-surface-variant/30 font-label-sm text-label-sm" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1">
<line x1="40" x2="780" y1="50" y2="50"></line>
<line x1="40" x2="780" y1="125" y2="125"></line>
<line x1="40" x2="780" y1="200" y2="200"></line>
<line strokeDasharray="none" strokeWidth="2" x1="40" x2="780" y1="275" y2="275"></line>
</g>
<g className="text-on-surface-variant font-label-sm text-label-sm" fill="currentColor">
<text textAnchor="end" x="30" y="55">8k</text>
<text textAnchor="end" x="30" y="130">6k</text>
<text textAnchor="end" x="30" y="205">4k</text>
<text textAnchor="end" x="30" y="280">0</text>
<text textAnchor="middle" x="100" y="295">May</text>
<text textAnchor="middle" x="236" y="295">Jun</text>
<text textAnchor="middle" x="372" y="295">Jul</text>
<text textAnchor="middle" x="508" y="295">Aug</text>
<text textAnchor="middle" x="644" y="295">Sep</text>
<text textAnchor="middle" x="750" y="295">Oct</text>
</g>
<path d="M100,200 C150,150 200,250 236,220 C280,180 320,100 372,130 C420,160 460,80 508,60 C560,40 600,140 644,110 C690,80 720,180 750,150 L750,275 L100,275 Z" fill="url(#areaGrad)"></path>
<path d="M100,200 C150,150 200,250 236,220 C280,180 320,100 372,130 C420,160 460,80 508,60 C560,40 600,140 644,110 C690,80 720,180 750,150" fill="none" stroke="url(#lineGrad)" strokeLinecap="round" strokeWidth="4"></path>
<circle cx="508" cy="60" fill="#0c1322" r="6" stroke="#4b8eff" strokeWidth="3"></circle>
<circle cx="750" cy="150" fill="#0c1322" r="6" stroke="#4b8eff" strokeWidth="3"></circle>
</svg>
</div>
</div>
<div className="bg-surface-container/40 backdrop-blur-md rounded-3xl p-lg flex flex-col gap-lg shadow-lg">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">info</span>
<h3 className="font-headline-md text-headline-md text-on-surface">Merchant Details</h3>
</div>
<div className="flex flex-col gap-md">
<div className="flex flex-col gap-xs p-md bg-surface-container-high/50 rounded-2xl hover:bg-surface-container-high transition-colors">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">First Visit</span>
<span className="font-body-lg text-body-lg text-on-surface font-medium">Jan 12, 2023</span>
</div>
<div className="flex flex-col gap-xs p-md bg-surface-container-high/50 rounded-2xl hover:bg-surface-container-high transition-colors">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Last Visit</span>
<span className="font-body-lg text-body-lg text-on-surface font-medium">Oct 28, 2023</span>
</div>
<div className="flex flex-col gap-xs p-md bg-surface-container-high/50 rounded-2xl hover:bg-surface-container-high transition-colors">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Payment Frequency</span>
<div className="flex items-end gap-sm">
<span className="font-headline-lg text-headline-lg text-on-surface">3.2</span>
<span className="font-body-md text-body-md text-on-surface-variant mb-1">times / month</span>
</div>
</div>
</div>
<div className="mt-auto pt-md flex items-center justify-between text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase">Category: E-Commerce</span>
<span className="material-symbols-outlined text-[20px]">category</span>
</div>
</div>
</section>
</div>
    </>
  );
}
