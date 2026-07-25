"use client";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col w-full gap-md">

<div className="flex items-end justify-between w-full mb-base">
<div className="flex flex-col">
<h1 className="font-display-lg text-display-lg text-on-surface">Overview</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Here is a summary of your financial activity.</p>
</div>
<div className="flex items-center gap-sm">
<button className="px-md py-sm bg-surface-container hover:bg-surface-container-high rounded-lg font-label-md text-label-md text-on-surface transition-colors flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Last 30 Days
            </button>
<button className="px-md py-sm bg-primary hover:bg-primary-fixed rounded-lg font-label-md text-label-md text-on-primary shadow-sm transition-colors flex items-center gap-xs">
<span className="material-symbols-outlined text-[18px]">add</span>
                Add Transaction
            </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-md w-full">

<div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl transition-transform group-hover:scale-110"></div>
<div className="flex justify-between items-start mb-lg relative z-10">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Monthly Spend</span>
<div className="p-xs bg-surface-container-highest rounded-md">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">account_balance_wallet</span>
</div>
</div>
<div className="flex flex-col relative z-10">
<div className="flex items-baseline gap-xs">
<span className="font-headline-lg text-headline-lg text-on-surface">₹45,200</span>
</div>
<div className="flex items-center gap-xs mt-xs">
<span className="flex items-center text-secondary font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                        12%
                    </span>
<span className="font-body-md text-[12px] text-on-surface-variant">from last month</span>
</div>
</div>
</div>

<div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
<div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl transition-transform group-hover:scale-110"></div>
<div className="flex justify-between items-start mb-lg relative z-10">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Today's Spend</span>
<div className="p-xs bg-surface-container-highest rounded-md">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">today</span>
</div>
</div>
<div className="flex flex-col relative z-10">
<div className="flex items-baseline gap-xs">
<span className="font-headline-lg text-headline-lg text-on-surface">₹1,240</span>
</div>
<div className="flex items-center gap-xs mt-xs">
<span className="font-body-md text-[12px] text-on-surface-variant">Across 3 transactions</span>
</div>
</div>
</div>

<div className="bg-primary-container rounded-xl p-md shadow-md relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-transparent to-on-primary-container/10"></div>
<div className="flex justify-between items-start mb-lg relative z-10">
<span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider">Potential Savings</span>
<div className="p-xs bg-surface-container-highest/20 rounded-md">
<span className="material-symbols-outlined text-on-primary-container text-[20px]">savings</span>
</div>
</div>
<div className="flex flex-col relative z-10">
<div className="flex items-baseline gap-xs">
<span className="font-headline-lg text-headline-lg text-on-primary-container">₹8,500</span>
</div>
<div className="flex items-center gap-xs mt-xs">
<span className="font-body-md text-[12px] text-on-primary-container/80">Based on AI analysis</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-md w-full mt-sm">

<div className="lg:col-span-2 bg-surface-container rounded-xl p-md shadow-sm flex flex-col relative">
<div className="flex justify-between items-center mb-md">
<h2 className="font-headline-md text-headline-md text-on-surface">Spending Trends</h2>
<button className="p-xs hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>

<div className="w-full h-[300px] mt-auto relative">

<div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between font-label-sm text-[11px] text-on-surface-variant text-right w-8">
<span>4k</span>
<span>3k</span>
<span>2k</span>
<span>1k</span>
<span>0</span>
</div>

<div className="absolute left-10 right-0 top-2 bottom-6 flex flex-col justify-between border-t border-b border-surface-container-highest">
<div className="w-full h-px bg-surface-container-highest"></div>
<div className="w-full h-px bg-surface-container-highest"></div>
<div className="w-full h-px bg-surface-container-highest"></div>
</div>

<div className="absolute left-10 right-0 bottom-0 flex justify-between font-label-sm text-[11px] text-on-surface-variant px-sm">
<span>1</span>
<span>5</span>
<span>10</span>
<span>15</span>
<span>20</span>
<span>25</span>
<span>30</span>
</div>

<div className="absolute left-10 right-0 top-2 bottom-8 overflow-hidden">
<svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 250">
<defs>
<linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="var(--color-primary, #4b8eff)" stopOpacity="0.3"></stop>
<stop offset="100%" stopColor="var(--color-primary, #4b8eff)" stopOpacity="0"></stop>
</linearGradient>
</defs>

<path d="M0,200 C100,180 200,220 300,150 C400,80 500,190 600,120 C700,50 800,90 900,40 C950,15 1000,50 1000,50 L1000,250 L0,250 Z" fill="url(#areaGradient)"></path>

<path className="drop-shadow-[0_4px_12px_rgba(75,142,255,0.3)]" d="M0,200 C100,180 200,220 300,150 C400,80 500,190 600,120 C700,50 800,90 900,40 C950,15 1000,50 1000,50" fill="none" stroke="var(--color-primary, #4b8eff)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>

<circle cx="800" cy="90" fill="var(--color-surface, #0c1322)" r="5" stroke="var(--color-primary, #4b8eff)" strokeWidth="3"></circle>
</svg>

<div className="absolute top-[30px] right-[15%] bg-surface-container-highest/90 backdrop-blur-sm border border-outline-variant/30 rounded-lg p-sm shadow-md pointer-events-none hidden md:block">
<div className="font-label-sm text-label-sm text-on-surface-variant mb-xs">Day 24</div>
<div className="font-headline-md text-[16px] font-semibold text-on-surface">₹2,450</div>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-md">

<div className="bg-surface-container rounded-xl p-md shadow-sm">
<h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Spend by Category</h2>
<div className="relative w-full h-[200px] flex items-center justify-center">

<svg className="w-[180px] h-[180px] transform -rotate-90" viewBox="0 0 100 100">

<circle className="drop-shadow-sm transition-all hover:stroke-width-[22px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="var(--color-primary, #4b8eff)" strokeDasharray="100.53 251.32" strokeDashoffset="0" strokeWidth="20"></circle>

<circle className="drop-shadow-sm transition-all hover:stroke-width-[22px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="var(--color-secondary, #4edea3)" strokeDasharray="75.39 251.32" strokeDashoffset="-100.53" strokeWidth="20"></circle>

<circle className="drop-shadow-sm transition-all hover:stroke-width-[22px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="var(--color-tertiary, #ffb3ad)" strokeDasharray="25.13 251.32" strokeDashoffset="-175.92" strokeWidth="20"></circle>

<circle className="drop-shadow-sm transition-all hover:stroke-width-[22px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="#8b5cf6" strokeDasharray="25.13 251.32" strokeDashoffset="-201.05" strokeWidth="20"></circle>

<circle className="drop-shadow-sm transition-all hover:stroke-width-[22px] cursor-pointer" cx="50" cy="50" fill="transparent" r="40" stroke="var(--color-outline-variant, #414755)" strokeDasharray="25.13 251.32" strokeDashoffset="-226.18" strokeWidth="20"></circle>
</svg>

<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
<span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wide">Total</span>
<span className="font-headline-md text-[18px] font-bold text-on-surface">₹45.2k</span>
</div>
</div>

<div className="mt-md flex flex-col gap-sm">
<div className="flex items-center justify-between font-label-md text-label-md">
<div className="flex items-center gap-sm text-on-surface"><span className="w-3 h-3 rounded-full bg-primary"></span>Rent</div>
<span className="text-on-surface-variant">40%</span>
</div>
<div className="flex items-center justify-between font-label-md text-label-md">
<div className="flex items-center gap-sm text-on-surface"><span className="w-3 h-3 rounded-full bg-secondary"></span>Food</div>
<span className="text-on-surface-variant">30%</span>
</div>
<div className="flex items-center justify-between font-label-md text-label-md">
<div className="flex items-center gap-sm text-on-surface"><span className="w-3 h-3 rounded-full bg-tertiary"></span>Utilities</div>
<span className="text-on-surface-variant">10%</span>
</div>
</div>
</div>

<div className="bg-surface-container rounded-xl p-md shadow-sm flex flex-col flex-1">
<div className="flex items-center gap-sm mb-md">
<div className="p-xs bg-primary/20 rounded-md">
<span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
</div>
<h2 className="font-headline-md text-[18px] font-semibold text-on-surface">AI Insights</h2>
</div>
<div className="flex flex-col gap-sm">

<div className="bg-surface p-sm rounded-lg flex items-start gap-sm group cursor-pointer hover:bg-surface-container-high transition-colors">
<div className="mt-1">
<span className="material-symbols-outlined text-tertiary-container text-[18px]">receipt_long</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-tertiary-container transition-colors">Subscription Leak</span>
<span className="font-body-md text-[13px] text-on-surface-variant leading-tight mt-1">Found 2 unused services charging ₹850/mo.</span>
</div>
</div>

<div className="bg-surface p-sm rounded-lg flex items-start gap-sm group cursor-pointer hover:bg-surface-container-high transition-colors">
<div className="mt-1">
<span className="material-symbols-outlined text-error text-[18px]">warning</span>
</div>
<div className="flex flex-col w-full">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-error transition-colors">Budget Alert</span>
<span className="font-body-md text-[13px] text-on-surface-variant leading-tight mt-1">Food budget at 85% for this month.</span>
<div className="w-full h-1.5 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
<div className="h-full bg-error w-[85%] rounded-full"></div>
</div>
</div>
</div>

<div className="bg-surface p-sm rounded-lg flex items-start gap-sm group cursor-pointer hover:bg-surface-container-high transition-colors">
<div className="mt-1">
<span className="material-symbols-outlined text-secondary text-[18px]">lightbulb</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-secondary transition-colors">Savings Tip</span>
<span className="font-body-md text-[13px] text-on-surface-variant leading-tight mt-1">Switching to annual electricity plan could save ₹2k.</span>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-screen"></div>
</div>
    </>
  );
}
