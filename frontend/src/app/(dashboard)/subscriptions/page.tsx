"use client";

export default function SubscriptionsPage() {
  return (
    <>
      <div className="flex flex-col w-full">

<div className="flex items-center justify-between mb-xl pb-md">
<div>
<h1 className="font-display-lg text-display-lg text-on-surface mb-xs">Subscription Hub</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Manage your recurring payments and identify potential savings.</p>
</div>
<div className="flex gap-sm">
<button className="bg-primary text-on-primary font-label-md text-label-md py-sm px-md rounded-xl flex items-center gap-xs hover:bg-primary-fixed transition-colors shadow-lg shadow-primary/20">
<span className="material-symbols-outlined text-[18px]">add</span>
                Add Subscription
            </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-xl">

<div className="col-span-1 lg:col-span-2 bg-surface-container rounded-2xl p-md flex flex-col md:flex-row gap-lg items-center relative overflow-hidden group hover:bg-surface-container-high transition-colors">

<div className="absolute -right-20 -top-20 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>

<div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">

<circle className="text-surface-container-highest" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="0" strokeWidth="8"></circle>

<circle className="text-tertiary drop-shadow-[0_0_10px_rgba(255,179,173,0.5)] transition-all duration-1000 ease-out" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="79.24" strokeLinecap="round" strokeWidth="8" style={{"--tw-stroke-dashoffset":"79.24"} as React.CSSProperties}></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-display-lg text-headline-lg text-on-surface">72</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Score</span>
</div>
</div>

<div className="flex flex-col flex-1 z-10">
<div className="flex items-center gap-sm mb-xs">
<span className="material-symbols-outlined text-tertiary text-[24px]">warning</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Leak Report</h2>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-md max-w-md">Your subscription health is fair. We identified underutilized services and price increases.</p>
<div className="bg-tertiary-container/10 border border-tertiary-container/20 rounded-xl p-md flex items-center justify-between mt-auto">
<div>
<p className="font-label-md text-label-md text-tertiary mb-xs">Potential Savings</p>
<p className="font-headline-md text-headline-md text-on-surface">₹3,200 <span className="font-body-md text-body-md text-on-surface-variant">/mo</span></p>
</div>
<button className="bg-tertiary text-on-tertiary font-label-md text-label-md py-sm px-md rounded-xl hover:bg-tertiary-fixed transition-colors shadow-lg shadow-tertiary/20">
                        Review Matches
                    </button>
</div>
</div>
</div>

<div className="col-span-1 bg-surface-container rounded-2xl p-md flex flex-col justify-between hover:bg-surface-container-high transition-colors">
<div>
<p className="font-label-md text-label-md text-on-surface-variant mb-xs">Total Monthly Spend</p>
<h2 className="font-display-lg text-display-lg text-on-surface mb-sm">₹14,850</h2>
<div className="flex items-center gap-xs text-error">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="font-label-md text-label-md">+₹450 from last month</span>
</div>
</div>
<div className="mt-lg">
<p className="font-label-sm text-label-sm text-on-surface-variant mb-sm uppercase tracking-wider">Top Categories</p>
<div className="space-y-sm">
<div className="flex justify-between items-center">
<span className="font-body-md text-body-md text-on-surface">Entertainment</span>
<span className="font-label-md text-label-md text-on-surface-variant">₹5,400</span>
</div>
<div className="flex justify-between items-center">
<span className="font-body-md text-body-md text-on-surface">Software/Tools</span>
<span className="font-label-md text-label-md text-on-surface-variant">₹4,200</span>
</div>
<div className="flex justify-between items-center">
<span className="font-body-md text-body-md text-on-surface">Health &amp; Fitness</span>
<span className="font-label-md text-label-md text-on-surface-variant">₹3,000</span>
</div>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-md">

<div className="flex flex-col md:flex-row items-center justify-between gap-md mb-sm">
<h3 className="font-headline-md text-headline-md text-on-surface">Active Subscriptions</h3>
<div className="flex flex-wrap gap-sm">

<button className="bg-primary-container text-on-primary-container font-label-md text-label-md py-xs px-md rounded-full flex items-center gap-xs">
                    All
                </button>
<button className="bg-surface-container text-on-surface-variant font-label-md text-label-md py-xs px-md rounded-full flex items-center gap-xs hover:bg-surface-container-high transition-colors">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
                    Unused
                </button>
<button className="bg-surface-container text-on-surface-variant font-label-md text-label-md py-xs px-md rounded-full flex items-center gap-xs hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[16px]">content_copy</span>
                    Duplicate
                </button>
<div className="w-px h-6 bg-outline-variant/50 mx-xs hidden md:block"></div>
<button className="bg-surface-container text-on-surface-variant font-label-md text-label-md py-xs px-sm rounded-full flex items-center gap-xs hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[18px]">sort</span>
                    Sort: Cost (High to Low)
                </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">

<div className="bg-surface-container rounded-2xl p-md flex flex-col group hover:-translate-y-1 transition-transform duration-300 relative shadow-md">

<div className="absolute -top-3 -right-3 bg-tertiary text-on-tertiary font-label-sm text-label-sm py-xs px-sm rounded-full flex items-center gap-xs shadow-lg shadow-tertiary/30 animate-pulse">
<span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                    Price Increase
                </div>
<div className="flex items-start justify-between mb-md">
<div className="w-12 h-12 bg-[#E50914] rounded-xl flex items-center justify-center text-white font-display-lg text-headline-md shadow-inner">
                        N
                    </div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-xs rounded-full hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<h4 className="font-headline-md text-headline-lg-mobile text-on-surface mb-xs">Netflix Premium</h4>
<p className="font-body-md text-body-md text-on-surface-variant mb-lg">Entertainment</p>
<div className="mt-auto pt-md border-t border-outline-variant/30 flex items-end justify-between">
<div>
<p className="font-label-sm text-label-sm text-tertiary line-through mb-xs">₹649</p>
<p className="font-headline-md text-headline-md text-on-surface">₹799 <span className="font-label-md text-label-md text-on-surface-variant font-normal">/mo</span></p>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-on-surface-variant mb-xs">Next billing</p>
<p className="font-label-md text-label-md text-on-surface">Oct 12</p>
</div>
</div>
</div>

<div className="bg-surface-container rounded-2xl p-md flex flex-col group hover:-translate-y-1 transition-transform duration-300 relative shadow-md overflow-hidden">

<div className="absolute top-0 right-0 bg-surface-container-highest px-md py-xs rounded-bl-xl border-l border-b border-outline-variant/30 flex items-center gap-xs">
<span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Low Usage</span>
</div>
<div className="flex items-start justify-between mb-md mt-sm">
<div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center text-on-surface font-display-lg text-headline-md shadow-inner overflow-hidden border border-outline-variant/50">
<span className="material-symbols-outlined text-[24px]">fitness_center</span>
</div>
</div>
<h4 className="font-headline-md text-headline-lg-mobile text-on-surface mb-xs">Cult.fit Elite</h4>
<p className="font-body-md text-body-md text-on-surface-variant mb-lg">Health &amp; Fitness</p>

<div className="w-full bg-surface-container-highest h-1.5 rounded-full mb-md overflow-hidden">
<div className="bg-tertiary h-full w-[15%] rounded-full"></div>
</div>
<p className="font-label-sm text-label-sm text-tertiary mb-sm">Visited 1 time this month</p>
<div className="mt-auto pt-md border-t border-outline-variant/30 flex items-end justify-between">
<div>
<p className="font-headline-md text-headline-md text-on-surface">₹2,400 <span className="font-label-md text-label-md text-on-surface-variant font-normal">/mo</span></p>
</div>
<div className="text-right">
<button className="text-tertiary font-label-md text-label-md hover:underline">Cancel</button>
</div>
</div>
</div>

<div className="bg-surface-container rounded-2xl p-md flex flex-col group hover:-translate-y-1 transition-transform duration-300 relative shadow-md">
<div className="flex items-start justify-between mb-md">
<div className="w-12 h-12 bg-[#1B894B] rounded-xl flex items-center justify-center text-white shadow-inner">
<span className="font-headline-md text-headline-md tracking-tighter">Spotify</span>
</div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-xs rounded-full hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<h4 className="font-headline-md text-headline-lg-mobile text-on-surface mb-xs">Spotify Duo</h4>
<p className="font-body-md text-body-md text-on-surface-variant mb-xs">Entertainment</p>
<div className="flex items-center gap-xs mb-lg bg-surface-container-highest w-fit px-xs py-0.5 rounded-md">
<span className="material-symbols-outlined text-[14px] text-secondary">verified_user</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">UPI AutoPay Active</span>
</div>
<div className="mt-auto pt-md border-t border-outline-variant/30 flex items-end justify-between">
<div>
<p className="font-headline-md text-headline-md text-on-surface">₹149 <span className="font-label-md text-label-md text-on-surface-variant font-normal">/mo</span></p>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-on-surface-variant mb-xs">Next billing</p>
<p className="font-label-md text-label-md text-on-surface">Oct 15</p>
</div>
</div>
</div>

<div className="bg-surface-container rounded-2xl p-md flex flex-col group hover:-translate-y-1 transition-transform duration-300 relative shadow-md">
<div className="flex items-start justify-between mb-md">
<div className="w-12 h-12 bg-[#232F3E] rounded-xl flex items-center justify-center text-[#FF9900] shadow-inner font-headline-md text-headline-md">
                        AWS
                    </div>
<button className="text-on-surface-variant hover:text-on-surface transition-colors p-xs rounded-full hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[20px]">more_vert</span>
</button>
</div>
<h4 className="font-headline-md text-headline-lg-mobile text-on-surface mb-xs">AWS Hosting</h4>
<p className="font-body-md text-body-md text-on-surface-variant mb-lg">Software/Tools</p>
<div className="mt-auto pt-md border-t border-outline-variant/30 flex items-end justify-between">
<div>
<p className="font-headline-md text-headline-md text-on-surface">₹4,200 <span className="font-label-md text-label-md text-on-surface-variant font-normal">/mo (Est)</span></p>
</div>
<div className="text-right">
<p className="font-label-sm text-label-sm text-on-surface-variant mb-xs">Variable</p>
<p className="font-label-md text-label-md text-on-surface">Oct 01</p>
</div>
</div>
</div>

<button className="bg-surface-container/50 border-2 border-dashed border-outline-variant/30 rounded-2xl p-md flex flex-col items-center justify-center group hover:bg-surface-container hover:border-primary/50 transition-all min-h-[280px]">
<div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-md group-hover:scale-110 transition-transform group-hover:bg-primary/20 group-hover:text-primary text-on-surface-variant">
<span className="material-symbols-outlined text-[32px]">add</span>
</div>
<h4 className="font-headline-md text-headline-lg-mobile text-on-surface mb-xs">Track New</h4>
<p className="font-body-md text-body-md text-on-surface-variant text-center">Add a subscription manually or connect an account.</p>
</button>
</div>
</div>
</div>

    </>
  );
}
