"use client";

export default function GoalsPage() {
  return (
    <>
      <div className="flex flex-col w-full gap-gutter">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
<div>
<h1 className="font-display-lg text-display-lg text-on-surface mb-xs">Financial Goals</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
        Track your progress, adjust timelines, and stay motivated on your path to financial freedom.
      </p>
</div>
<button className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-full shadow-lg hover:shadow-xl hover:bg-primary-fixed-dim transition-all group shrink-0">
<span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">add</span>
<span className="font-label-md text-label-md font-semibold">New Goal</span>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl relative">

<div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/5 to-tertiary/10 blur-2xl -z-10 rounded-full opacity-50"></div>
<div className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-md flex flex-col justify-between overflow-hidden relative group">
<div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-110"></div>
<div className="flex items-center justify-between mb-lg relative z-10">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Total Target</span>
<div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[20px]">flag</span>
</div>
</div>
<div className="relative z-10">
<span className="font-headline-md text-headline-md text-on-surface">₹24,50,000</span>
<div className="flex items-center gap-xs mt-xs text-secondary">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="font-label-sm text-label-sm">Across 4 active goals</span>
</div>
</div>
</div>
<div className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-md flex flex-col justify-between overflow-hidden relative group">
<div className="absolute right-0 top-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-110"></div>
<div className="flex items-center justify-between mb-lg relative z-10">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Total Saved</span>
<div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
</div>
</div>
<div className="relative z-10">
<div className="flex items-end gap-sm">
<span className="font-headline-md text-headline-md text-on-surface">₹8,15,500</span>
<span className="font-body-md text-body-md text-on-surface-variant mb-1">/ 33%</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-md overflow-hidden">
<div className="bg-secondary h-1.5 rounded-full" style={{"width":"33%"} as React.CSSProperties}></div>
</div>
</div>
</div>
<div className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-md flex flex-col justify-between overflow-hidden relative group">
<div className="absolute right-0 top-0 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-110"></div>
<div className="flex items-center justify-between mb-lg relative z-10">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Next Milestone</span>
<div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined text-[20px]">event</span>
</div>
</div>
<div className="relative z-10">
<span className="font-headline-md text-headline-md text-on-surface">45 Days</span>
<div className="flex items-center gap-xs mt-xs text-on-surface-variant">
<span className="font-label-sm text-label-sm">Emergency Fund Target</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-gutter">
<div className="flex items-center justify-between mb-sm">
<h2 className="font-headline-lg text-headline-lg text-on-surface">Active Pursuits</h2>
<div className="flex gap-sm">
<button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-[20px]">filter_list</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-gutter">

<div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
<div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
<div className="flex items-start justify-between mb-lg relative z-10">
<div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary shadow-lg">
<span className="material-symbols-outlined text-[24px]">shield</span>
</div>
<div className="flex items-center gap-xs bg-surface-container-highest/50 px-sm py-1 rounded-full backdrop-blur-sm">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface">Active</span>
</div>
</div>
<div className="mb-xl relative z-10">
<h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Emergency Savings</h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">6 months of essential living expenses for peace of mind.</p>
</div>
<div className="mt-auto relative z-10">
<div className="flex items-end justify-between mb-sm">
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-surface">₹4,50,000</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">of ₹5,00,000</span>
</div>
<span className="font-label-md text-label-md text-secondary">90%</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-2 mb-md overflow-hidden relative">
<div className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary-fixed-dim to-secondary rounded-full" style={{"width":"90%"} as React.CSSProperties}></div>

<div className="absolute top-0 w-1 h-full bg-surface left-[75%] opacity-50"></div>
</div>
<div className="flex items-center gap-sm bg-surface-container-lowest/50 p-sm rounded-xl">
<span className="material-symbols-outlined text-[18px] text-tertiary-container">timer</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Deadline</span>
<span className="font-label-md text-label-md text-on-surface">Dec 31, 2024 (45 days)</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">

<div className="bg-cover bg-center w-full h-full" data-alt="A sleek, modern electric car driving through a futuristic city at night, neon lights reflecting off the dark metallic paint, shot from a low angle with motion blur, high contrast cinematic lighting, deep charcoal and electric blue color palette." style={{"backgroundImage":"url('https"} as React.CSSProperties}></div>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/90 to-surface-container/60 z-0"></div>
<div className="flex items-start justify-between mb-lg relative z-10">
<div className="w-12 h-12 rounded-xl bg-surface-container-highest/80 flex items-center justify-center text-primary shadow-lg backdrop-blur-md">
<span className="material-symbols-outlined text-[24px]">directions_car</span>
</div>
<div className="flex items-center gap-xs bg-surface-container-highest/80 px-sm py-1 rounded-full backdrop-blur-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface">Active</span>
</div>
</div>
<div className="mb-xl relative z-10">
<h3 className="font-headline-md text-headline-md text-on-surface mb-xs">EV Downpayment</h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Upgrading to a sustainable commute. Target: Tesla Model 3.</p>
</div>
<div className="mt-auto relative z-10">
<div className="flex items-end justify-between mb-sm">
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-surface">₹2,15,500</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">of ₹8,00,000</span>
</div>
<span className="font-label-md text-label-md text-primary">27%</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-2 mb-md overflow-hidden relative">
<div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-container to-primary rounded-full" style={{"width":"27%"} as React.CSSProperties}></div>
</div>
<div className="flex items-center gap-sm bg-surface-container-lowest/80 backdrop-blur-md p-sm rounded-xl">
<span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Target Date</span>
<span className="font-label-md text-label-md text-on-surface">Aug 2025 (280 days)</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">

<div className="absolute inset-0 z-0 opacity-10 mix-blend-screen transition-opacity duration-500 group-hover:opacity-20 bg-cover bg-center w-full h-full grayscale" data-location="Paris, France" style={{"backgroundImage":"url('https"} as React.CSSProperties}></div>
<div className="absolute inset-0 bg-gradient-to-br from-surface-container via-surface-container/95 to-surface-container/80 z-0"></div>
<div className="flex items-start justify-between mb-lg relative z-10">
<div className="w-12 h-12 rounded-xl bg-surface-container-highest/80 flex items-center justify-center text-tertiary shadow-lg backdrop-blur-md">
<span className="material-symbols-outlined text-[24px]">flight_takeoff</span>
</div>
<div className="flex items-center gap-xs bg-surface-container-highest/80 px-sm py-1 rounded-full backdrop-blur-sm">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
<span className="font-label-sm text-label-sm text-on-surface">Active</span>
</div>
</div>
<div className="mb-xl relative z-10">
<h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Europe Summer '25</h3>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">3-week itinerary across France, Italy, and Switzerland.</p>
</div>
<div className="mt-auto relative z-10">
<div className="flex items-end justify-between mb-sm">
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-surface">₹1,50,000</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">of ₹4,50,000</span>
</div>
<span className="font-label-md text-label-md text-tertiary">33%</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-2 mb-md overflow-hidden relative">
<div className="absolute top-0 left-0 h-full bg-gradient-to-r from-tertiary-container to-tertiary rounded-full" style={{"width":"33%"} as React.CSSProperties}></div>
</div>
<div className="flex items-center gap-sm bg-surface-container-lowest/80 backdrop-blur-md p-sm rounded-xl">
<span className="material-symbols-outlined text-[18px] text-tertiary">calendar_month</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Target Date</span>
<span className="font-label-md text-label-md text-on-surface">Jun 15, 2025 (215 days)</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest/40 backdrop-blur-xl rounded-2xl p-md flex flex-col relative overflow-hidden group border border-outline-variant/10 opacity-70 hover:opacity-100 transition-opacity">
<div className="absolute inset-0 bg-gradient-to-br from-surface/50 to-surface-container-lowest/50 z-0"></div>
<div className="flex items-start justify-between mb-lg relative z-10">
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant shadow-lg backdrop-blur-md">
<span className="material-symbols-outlined text-[24px]">laptop_mac</span>
</div>
<div className="flex items-center gap-xs bg-surface-container px-sm py-1 rounded-full backdrop-blur-sm">
<span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Completed</span>
</div>
</div>
<div className="mb-xl relative z-10">
<h3 className="font-headline-md text-headline-md text-on-surface-variant mb-xs line-through decoration-outline-variant/50">MacBook Pro M3</h3>
<p className="font-body-md text-body-md text-on-surface-variant/70 line-clamp-2">Workstation upgrade for creative projects.</p>
</div>
<div className="mt-auto relative z-10">
<div className="flex items-end justify-between mb-sm">
<div className="flex flex-col">
<span className="font-headline-md text-headline-md text-on-surface-variant">₹2,50,000</span>
<span className="font-label-sm text-label-sm text-on-surface-variant/70">Target reached</span>
</div>
<span className="font-label-md text-label-md text-secondary">100%</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2 mb-md overflow-hidden relative">
<div className="absolute top-0 left-0 h-full bg-secondary-fixed/50 rounded-full" style={{"width":"100%"} as React.CSSProperties}></div>
</div>
<div className="flex items-center gap-sm bg-surface-container/30 p-sm rounded-xl">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant/70">task_alt</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant/70">Achieved On</span>
<span className="font-label-md text-label-md text-on-surface-variant">Oct 12, 2023</span>
</div>
</div>
</div>
</div>
</div>
</div>


</div>
    </>
  );
}
