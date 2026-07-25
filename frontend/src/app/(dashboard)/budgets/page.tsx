"use client";

export default function BudgetsPage() {
  return (
    <>
      <div className="flex flex-col w-full gap-xl py-xl relative">

<div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
<div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
<div className="absolute top-[30%] -right-[10%] w-[35%] h-[50%] rounded-full bg-secondary/5 blur-[100px]"></div>
</div>

<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-md relative z-10 px-md md:px-0">
<div className="flex flex-col gap-xs">
<h1 className="font-display-lg text-display-lg text-on-background relative">
        Budgets
        <span className="absolute -top-4 -right-12 font-label-sm text-label-sm text-secondary px-2 py-1 bg-secondary/10 rounded-full">NOV</span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
        Monitor your spending velocity. We've detected an <span className="text-error font-semibold">18% increase</span> in discretionary categories this week.
      </p>
</div>
<div className="flex items-center gap-sm">
<button className="flex items-center gap-2 px-md py-sm bg-surface-container-high hover:bg-surface-container-highest transition-colors rounded-full text-on-surface font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px]">calendar_month</span>
        November 2024
        <span className="material-symbols-outlined text-[18px]">expand_more</span>
</button>
<button className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary-container transition-colors rounded-full text-on-primary shadow-lg shadow-primary/20 group">
<span className="material-symbols-outlined transition-transform group-hover:rotate-90">add</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-md relative z-10">
<div className="bg-surface-container-low/60 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-sm relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Budget</span>
<span className="material-symbols-outlined text-primary">account_balance_wallet</span>
</div>
<div className="flex items-baseline gap-xs mt-2">
<span className="font-display-lg text-display-lg text-on-background">₹84,500</span>
</div>
<div className="w-full h-1 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
<div className="h-full bg-primary rounded-full w-[65%]"></div>
</div>
<div className="flex justify-between items-center mt-1">
<span className="font-label-sm text-label-sm text-on-surface-variant">₹54,925 Spent</span>
<span className="font-label-sm text-label-sm text-primary">65%</span>
</div>
</div>
<div className="bg-surface-container-low/60 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-sm relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Remaining</span>
<span className="material-symbols-outlined text-secondary">trending_down</span>
</div>
<div className="flex items-baseline gap-xs mt-2">
<span className="font-display-lg text-display-lg text-secondary">₹29,575</span>
</div>
<div className="flex items-center gap-2 mt-4 bg-secondary/10 px-sm py-1 rounded-full w-fit">
<span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
<span className="font-label-sm text-label-sm text-secondary">On track for month end</span>
</div>
</div>
<div className="bg-surface-container-low/60 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-sm relative overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Proj. Savings</span>
<span className="material-symbols-outlined text-error">warning</span>
</div>
<div className="flex items-baseline gap-xs mt-2">
<span className="font-display-lg text-display-lg text-on-background">₹12,400</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-tight">
        Lower than average due to high dining expenses in week 2.
      </p>
</div>
</div>

<div className="flex flex-col gap-md relative z-10">
<h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Category Breakdown</h2>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">

<div className="bg-surface-container-low/40 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-md hover:bg-surface-container-low/60 transition-colors">
<div className="flex justify-between items-start">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-xl bg-error/20 flex items-center justify-center">
<span className="material-symbols-outlined text-error">restaurant</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-background">Dining Out</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">14 Transactions</span>
</div>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-2"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-lg text-headline-lg text-error">₹14,500</span>
<span className="font-body-md text-body-md text-on-surface-variant">/ ₹15,000</span>
</div>

<div className="relative w-full h-3 bg-surface-container-highest rounded-full mt-2 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
<div className="absolute top-0 left-0 h-full bg-error rounded-full shadow-[0_0_10px_rgba(255,180,171,0.5)] transition-all duration-1000 ease-out" style={{"width":"96%"} as React.CSSProperties}></div>
</div>
<div className="flex justify-between items-center mt-1">
<span className="font-label-sm text-label-sm text-error font-semibold">96% Exhausted</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">₹500 left</span>
</div>
</div>
<div className="bg-surface-container-highest/30 rounded-xl p-sm flex items-center justify-between border border-error/20">
<span className="font-label-md text-label-md text-on-surface-variant">Projected End: <span className="text-error font-semibold">₹17,200</span></span>
<span className="material-symbols-outlined text-error text-[18px]">trending_up</span>
</div>
</div>

<div className="bg-surface-container-low/40 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-md hover:bg-surface-container-low/60 transition-colors">
<div className="flex justify-between items-start">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">shopping_cart</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-background">Groceries</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">8 Transactions</span>
</div>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-2"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-lg text-headline-lg text-secondary">₹8,200</span>
<span className="font-body-md text-body-md text-on-surface-variant">/ ₹20,000</span>
</div>

<div className="relative w-full h-3 bg-surface-container-highest rounded-full mt-2 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
<div className="absolute top-0 left-0 h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(78,222,163,0.3)] transition-all duration-1000 ease-out" style={{"width":"41%"} as React.CSSProperties}></div>
</div>
<div className="flex justify-between items-center mt-1">
<span className="font-label-sm text-label-sm text-secondary font-semibold">41% Spent</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">₹11,800 left</span>
</div>
</div>
<div className="bg-surface-container-highest/30 rounded-xl p-sm flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">Projected End: <span className="text-on-surface font-semibold">₹18,500</span></span>
<span className="material-symbols-outlined text-secondary text-[18px]">trending_flat</span>
</div>
</div>

<div className="bg-surface-container-low/40 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-md hover:bg-surface-container-low/60 transition-colors">
<div className="flex justify-between items-start">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-xl bg-tertiary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">bolt</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-background">Utilities</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">3 Transactions</span>
</div>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-2"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-lg text-headline-lg text-tertiary">₹6,800</span>
<span className="font-body-md text-body-md text-on-surface-variant">/ ₹8,000</span>
</div>

<div className="relative w-full h-3 bg-surface-container-highest rounded-full mt-2 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
<div className="absolute top-0 left-0 h-full bg-tertiary rounded-full shadow-[0_0_10px_rgba(255,179,173,0.4)] transition-all duration-1000 ease-out" style={{"width":"85%"} as React.CSSProperties}></div>
</div>
<div className="flex justify-between items-center mt-1">
<span className="font-label-sm text-label-sm text-tertiary font-semibold">85% Spent</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">₹1,200 left</span>
</div>
</div>
<div className="bg-surface-container-highest/30 rounded-xl p-sm flex items-center justify-between border border-tertiary/20">
<span className="font-label-md text-label-md text-on-surface-variant">Projected End: <span className="text-tertiary font-semibold">₹8,400</span></span>
<span className="material-symbols-outlined text-tertiary text-[18px]">trending_up</span>
</div>
</div>

<div className="bg-surface-container-low/40 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-md hover:bg-surface-container-low/60 transition-colors">
<div className="flex justify-between items-start">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">directions_car</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-background">Transport</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">12 Transactions</span>
</div>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-2"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-lg text-headline-lg text-secondary">₹3,400</span>
<span className="font-body-md text-body-md text-on-surface-variant">/ ₹10,000</span>
</div>
<div className="relative w-full h-3 bg-surface-container-highest rounded-full mt-2 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
<div className="absolute top-0 left-0 h-full bg-secondary rounded-full transition-all duration-1000 ease-out" style={{"width":"34%"} as React.CSSProperties}></div>
</div>
<div className="flex justify-between items-center mt-1">
<span className="font-label-sm text-label-sm text-secondary font-semibold">34% Spent</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">₹6,600 left</span>
</div>
</div>
<div className="bg-surface-container-highest/30 rounded-xl p-sm flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">Projected End: <span className="text-on-surface font-semibold">₹7,200</span></span>
<span className="material-symbols-outlined text-secondary text-[18px]">trending_down</span>
</div>
</div>

<div className="bg-surface-container-low/40 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-md hover:bg-surface-container-low/60 transition-colors">
<div className="flex justify-between items-start">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-xl bg-tertiary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">movie</span>
</div>
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-background">Entertainment</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">5 Transactions</span>
</div>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-2"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
</div>
<div className="flex flex-col gap-xs">
<div className="flex justify-between items-baseline">
<span className="font-headline-lg text-headline-lg text-tertiary">₹3,800</span>
<span className="font-body-md text-body-md text-on-surface-variant">/ ₹5,000</span>
</div>
<div className="relative w-full h-3 bg-surface-container-highest rounded-full mt-2 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
<div className="absolute top-0 left-0 h-full bg-tertiary rounded-full transition-all duration-1000 ease-out" style={{"width":"76%"} as React.CSSProperties}></div>
</div>
<div className="flex justify-between items-center mt-1">
<span className="font-label-sm text-label-sm text-tertiary font-semibold">76% Spent</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">₹1,200 left</span>
</div>
</div>
<div className="bg-surface-container-highest/30 rounded-xl p-sm flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface-variant">Projected End: <span className="text-tertiary font-semibold">₹4,900</span></span>
<span className="material-symbols-outlined text-tertiary text-[18px]">trending_flat</span>
</div>
</div>
</div>
</div>
</div>
    </>
  );
}
