"use client";

export default function LocationsPage() {
  return (
    <>
      <div className="flex flex-col w-full h-full min-h-[calc(100vh-4rem)]">

<div className="relative w-full flex-grow flex" style={{"height":"calc(100vh - 4rem)"} as React.CSSProperties}>

<div className="absolute inset-0 w-full h-full bg-cover bg-center" data-location="Mumbai, India" style={{"backgroundImage":"url('https"} as React.CSSProperties}></div>

<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none"></div>
<div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent pointer-events-none w-1/3 md:w-1/4"></div>

<div className="absolute top-md left-md z-10 flex gap-sm items-center">
<div className="bg-surface/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-xs flex shadow-lg">
<button className="px-md py-sm rounded-lg bg-primary-container text-on-primary-container font-label-md transition-colors shadow-sm">Heatmap</button>
<button className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md">Markers</button>
</div>
<div className="bg-surface/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-xs flex items-center shadow-lg group relative">
<select className="appearance-none bg-transparent pl-md pr-xl py-sm text-on-surface font-label-md outline-none cursor-pointer">
<option value="oct-2023">October 2023</option>
<option value="sep-2023">September 2023</option>
<option value="aug-2023">August 2023</option>
</select>
<span className="material-symbols-outlined absolute right-sm text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>

<div className="absolute bottom-md right-xl z-10 flex flex-col gap-sm">
<button className="w-12 h-12 bg-surface/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-on-surface hover:text-primary transition-colors border border-outline-variant/30">
<span className="material-symbols-outlined">my_location</span>
</button>
<div className="flex flex-col bg-surface/90 backdrop-blur-md rounded-2xl shadow-lg border border-outline-variant/30 overflow-hidden">
<button className="w-12 h-12 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined">add</span>
</button>
<div className="h-px bg-outline-variant/50 w-full"></div>
<button className="w-12 h-12 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined">remove</span>
</button>
</div>
</div>

<div className="relative z-10 w-[400px] h-full ml-auto bg-surface/80 backdrop-blur-2xl border-l border-outline-variant/30 flex flex-col shadow-2xl transform transition-transform duration-300">

<div className="p-lg border-b border-outline-variant/30 bg-surface-container-lowest/50">
<h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs tracking-tight">Location Intelligence</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Analyze spending patterns across geographical zones.</p>

<div className="grid grid-cols-2 gap-sm mt-lg">
<div className="bg-surface-container/60 p-sm rounded-xl border border-outline-variant/20">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Mapped Spent</span>
<div className="font-headline-md text-headline-md text-on-surface mt-xs">₹ 4,28,500</div>
<div className="flex items-center gap-xs mt-1 text-secondary-fixed">
<span className="material-symbols-outlined text-[16px]">trending_up</span>
<span className="font-label-sm text-label-sm">12% vs last mo</span>
</div>
</div>
<div className="bg-surface-container/60 p-sm rounded-xl border border-outline-variant/20">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Locations</span>
<div className="font-headline-md text-headline-md text-on-surface mt-xs">42</div>
<div className="flex items-center gap-xs mt-1 text-on-surface-variant">
<span className="font-label-sm text-label-sm">Across 3 cities</span>
</div>
</div>
</div>
</div>

<div className="flex-1 overflow-y-auto p-lg flex flex-col gap-xl custom-scrollbar">

<div>
<div className="flex items-center justify-between mb-md">
<h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest flex items-center gap-sm">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Top Cities
                        </h3>
<button className="text-primary hover:text-primary-container font-label-sm text-label-sm transition-colors">View All</button>
</div>
<div className="flex flex-col gap-sm">

<div className="bg-surface-container-low p-md rounded-2xl hover:bg-surface-container transition-colors border border-outline-variant/10 cursor-pointer group">
<div className="flex justify-between items-start mb-sm">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">location_city</span>
</div>
<div>
<div className="font-label-md text-label-md text-on-surface">Mumbai, MH</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">284 transactions</div>
</div>
</div>
<div className="text-right">
<div className="font-label-md text-label-md text-on-surface">₹ 2,85,000</div>
<div className="font-label-sm text-label-sm text-secondary-fixed">66.5%</div>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width":"66.5%"} as React.CSSProperties}></div>
</div>
</div>

<div className="bg-surface-container-low p-md rounded-2xl hover:bg-surface-container transition-colors border border-outline-variant/10 cursor-pointer group">
<div className="flex justify-between items-start mb-sm">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">location_city</span>
</div>
<div>
<div className="font-label-md text-label-md text-on-surface">Pune, MH</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">102 transactions</div>
</div>
</div>
<div className="text-right">
<div className="font-label-md text-label-md text-on-surface">₹ 1,12,000</div>
<div className="font-label-sm text-label-sm text-secondary-fixed">26.1%</div>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-primary/70 h-full rounded-full" style={{"width":"26.1%"} as React.CSSProperties}></div>
</div>
</div>

<div className="bg-surface-container-low p-md rounded-2xl hover:bg-surface-container transition-colors border border-outline-variant/10 cursor-pointer group">
<div className="flex justify-between items-start mb-sm">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined">location_city</span>
</div>
<div>
<div className="font-label-md text-label-md text-on-surface">Delhi, NCR</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">45 transactions</div>
</div>
</div>
<div className="text-right">
<div className="font-label-md text-label-md text-on-surface">₹ 31,500</div>
<div className="font-label-sm text-label-sm text-secondary-fixed">7.4%</div>
</div>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
<div className="bg-primary/40 h-full rounded-full" style={{"width":"7.4%"} as React.CSSProperties}></div>
</div>
</div>
</div>
</div>

<div>
<h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-md border-b border-outline-variant/30 pb-xs">
                        Hotspots in Mumbai
                    </h3>
<table className="w-full text-left border-collapse">
<thead>
<tr className="border-b border-outline-variant/20">
<th className="py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-normal">Locality</th>
<th className="py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-normal text-right">Spend</th>
<th className="py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-normal text-right w-16">Trend</th>
</tr>
</thead>
<tbody>
<tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors group cursor-pointer">
<td className="py-md">
<div className="font-label-md text-label-md text-on-surface">Bandra West</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Dining, Entertainment</div>
</td>
<td className="py-md text-right">
<div className="font-label-md text-label-md text-on-surface">₹ 1,20,400</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">142 txns</div>
</td>
<td className="py-md text-right">
<div className="w-12 h-6 inline-flex">
<svg className="w-full h-full text-secondary-fixed stroke-current" fill="none" strokeLinecap="round" strokeWidth="3" viewBox="0 0 100 30">
<path d="M0 25 L20 20 L40 22 L60 10 L80 15 L100 5"></path>
</svg>
</div>
</td>
</tr>
<tr className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors group cursor-pointer">
<td className="py-md">
<div className="font-label-md text-label-md text-on-surface">Lower Parel</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Shopping, Groceries</div>
</td>
<td className="py-md text-right">
<div className="font-label-md text-label-md text-on-surface">₹ 85,200</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">86 txns</div>
</td>
<td className="py-md text-right">
<div className="w-12 h-6 inline-flex">
<svg className="w-full h-full text-tertiary-container stroke-current" fill="none" strokeLinecap="round" strokeWidth="3" viewBox="0 0 100 30">
<path d="M0 5 L20 15 L40 10 L60 20 L80 18 L100 25"></path>
</svg>
</div>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
<td className="py-md">
<div className="font-label-md text-label-md text-on-surface">Andheri East</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">Utilities, Transit</div>
</td>
<td className="py-md text-right">
<div className="font-label-md text-label-md text-on-surface">₹ 42,100</div>
<div className="font-label-sm text-label-sm text-on-surface-variant">32 txns</div>
</td>
<td className="py-md text-right">
<div className="w-12 h-6 inline-flex">
<svg className="w-full h-full text-secondary-fixed stroke-current" fill="none" strokeLinecap="round" strokeWidth="3" viewBox="0 0 100 30">
<path d="M0 20 L20 22 L40 15 L60 18 L80 10 L100 8"></path>
</svg>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="bg-gradient-to-br from-surface-container-highest to-surface-container p-md rounded-2xl border border-primary/20 relative overflow-hidden">
<div className="absolute top-0 right-0 p-sm opacity-20 text-primary">
<span className="material-symbols-outlined text-[48px]">auto_awesome</span>
</div>
<div className="relative z-10">
<h4 className="font-label-md text-label-md text-primary mb-xs flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]">lightbulb</span>
                            AI Location Insight
                        </h4>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                            Your dining spend in <strong className="text-on-surface">Bandra West</strong> has increased by 34% this month. Consider setting a localized budget to maintain your savings goal.
                        </p>
<button className="mt-sm font-label-md text-label-md text-primary hover:text-primary-container transition-colors">Set Local Budget →</button>
</div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
}
