"use client";

export default function TransactionsPage() {
  return (
    <>
      <div className="flex flex-col w-full h-full p-md gap-lg">

<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md z-20">
<div className="flex flex-col gap-xs">
<h1 className="font-display-lg text-display-lg text-on-surface">Transactions</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Review and manage your financial activity across all linked accounts.</p>
</div>
<div className="flex items-center gap-sm">
<button className="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-md py-sm rounded-lg transition-colors flex items-center gap-sm shadow-sm backdrop-blur-md border border-outline-variant/20">
<span className="material-symbols-outlined text-[18px]">download</span>
                Export CSV
            </button>
<button className="bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md px-md py-sm rounded-lg transition-colors flex items-center gap-sm shadow-md">
<span className="material-symbols-outlined text-[18px]">add</span>
                Manual Entry
            </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-md z-10">

<div className="col-span-1 lg:col-span-8 bg-surface-container/40 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-md shadow-lg border border-outline-variant/10">
<div className="flex justify-between items-center pb-sm border-b border-outline-variant/20">
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
<span className="material-symbols-outlined text-primary">filter_alt</span> Filters
                </h2>
<button className="text-primary hover:text-primary-fixed font-label-sm text-label-sm uppercase tracking-wider transition-colors">Clear All</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-md">

<div className="flex flex-col gap-xs">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Date Range</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] z-10 pointer-events-none">calendar_month</span>
<input className="w-full bg-surface-container-highest/60 text-on-surface font-body-md text-body-md pl-10 pr-sm py-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all cursor-pointer backdrop-blur-sm border border-outline-variant/20" placeholder="Select range..." readOnly type="text" value="Oct 1, 2023 - Oct 31, 2023"/>
</div>
</div>

<div className="flex flex-col gap-xs">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Category</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] z-10 pointer-events-none">category</span>
<select className="w-full bg-surface-container-highest/60 text-on-surface font-body-md text-body-md pl-10 pr-lg py-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer backdrop-blur-sm border border-outline-variant/20">
<option value="">All Categories</option>
<option value="dining">Dining &amp; Food</option>
<option value="shopping">Shopping</option>
<option value="utilities">Utilities</option>
<option value="entertainment">Entertainment</option>
</select>
<span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
</div>
</div>

<div className="flex flex-col gap-xs">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Provider / Bank</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] z-10 pointer-events-none">account_balance</span>
<select className="w-full bg-surface-container-highest/60 text-on-surface font-body-md text-body-md pl-10 pr-lg py-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer backdrop-blur-sm border border-outline-variant/20">
<option value="">All Accounts</option>
<option value="hdfc">HDFC Checking</option>
<option value="sbi">SBI Credit Card</option>
<option value="icici">ICICI Savings</option>
</select>
<span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">arrow_drop_down</span>
</div>
</div>

<div className="md:col-span-2 flex flex-col gap-sm pt-sm">
<div className="flex justify-between items-center">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Amount Range</label>
<span className="font-label-md text-label-md text-primary">₹0 - ₹50,000</span>
</div>

<div className="relative h-2 bg-surface-container-highest rounded-full w-full mt-2 group">

<div className="absolute h-full bg-primary rounded-full" style={{"left":"0%","width":"45%"} as React.CSSProperties}></div>

<div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow cursor-grab group-active:cursor-grabbing hover:scale-125 transition-transform ring-2 ring-primary" style={{"left":"0%"} as React.CSSProperties}></div>
<div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow cursor-grab group-active:cursor-grabbing hover:scale-125 transition-transform ring-2 ring-primary" style={{"left":"45%"} as React.CSSProperties}></div>
</div>
<div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mt-1">
<span>Min</span>
<span>Max</span>
</div>
</div>

<div className="flex flex-col gap-xs pt-sm">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Keywords</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] z-10 pointer-events-none">search</span>
<input className="w-full bg-surface-container-highest/60 text-on-surface font-body-md text-body-md pl-10 pr-sm py-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all backdrop-blur-sm border border-outline-variant/20" placeholder="Search merchant..." type="text"/>
</div>
</div>
</div>
</div>

<div className="col-span-1 lg:col-span-4 bg-gradient-to-br from-primary-container to-surface-container rounded-2xl p-md flex flex-col justify-between shadow-lg relative overflow-hidden group">

<div className="absolute -right-8 -top-8 w-48 h-48 bg-primary/20 blur-3xl rounded-full mix-blend-screen pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
<div className="z-10 flex flex-col gap-xs">
<span className="font-label-md text-label-md text-on-primary-container/80 uppercase tracking-wider">Total Spend (Filtered)</span>
<div className="font-display-lg text-display-lg text-on-primary-container flex items-baseline">
<span className="text-headline-lg font-headline-lg mr-1 opacity-70">₹</span>
                    1,24,500
                    <span className="text-headline-md font-headline-md opacity-70">.00</span>
</div>
</div>
<div className="z-10 mt-xl">
<div className="flex justify-between items-end mb-sm">
<span className="font-label-sm text-label-sm text-on-primary-container/80">Spend vs Last Period</span>
<span className="font-label-md text-label-md text-secondary-container flex items-center gap-xs">
<span className="material-symbols-outlined text-[16px]">arrow_downward</span> 12%
                    </span>
</div>

<div className="h-12 w-full">
<svg className="w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none" viewBox="0 0 100 30">

<defs>
<filter id="glow">
<feGaussianBlur result="coloredBlur" stdDeviation="2"></feGaussianBlur>
<feMerge>
<feMergeNode in="coloredBlur"></feMergeNode>
<feMergeNode in="SourceGraphic"></feMergeNode>
</feMerge>
</filter>
<linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="var(--tw-colors-secondary)" stopOpacity="0.3"></stop>
<stop offset="100%" stopColor="var(--tw-colors-secondary)" stopOpacity="0"></stop>
</linearGradient>
</defs>
<path d="M0,30 L0,20 Q10,25 20,15 T40,25 T60,10 T80,18 T100,5 L100,30 Z" fill="url(#areaGradient)"></path>
<path className="text-secondary" d="M0,20 Q10,25 20,15 T40,25 T60,10 T80,18 T100,5" fill="none" filter="url(#glow)" stroke="currentColor" strokeWidth="2"></path>
</svg>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden relative z-0 border border-outline-variant/10">

<div className="flex-1 overflow-auto">
<table className="w-full text-left border-collapse" id="transaction-table">
<thead className="sticky top-0 bg-surface-container/95 backdrop-blur-md z-10">
<tr>
<th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold whitespace-nowrap">Txn ID</th>
<th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer hover:text-primary transition-colors group">
                            Date <span className="material-symbols-outlined text-[14px] inline-block align-middle opacity-0 group-hover:opacity-100 transition-opacity">arrow_downward</span>
</th>
<th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Merchant / Details</th>
<th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Category</th>
<th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer hover:text-primary transition-colors group text-right">
                            Amount <span className="material-symbols-outlined text-[14px] inline-block align-middle opacity-0 group-hover:opacity-100 transition-opacity">swap_vert</span>
</th>
<th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Status</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/10">

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer group" >
<td className="p-md font-body-md text-body-md text-on-surface-variant font-mono text-sm whitespace-nowrap">#TXN-8472-A</td>
<td className="p-md font-body-md text-body-md text-on-surface whitespace-nowrap">Oct 24, 2023<br/><span className="text-label-sm font-label-sm text-on-surface-variant">14:32 IST</span></td>
<td className="p-md">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-surface text-[20px]">restaurant</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate">Bombay Canteen</span>
<span className="font-label-sm text-label-sm text-on-surface-variant truncate">HDFC Credit Card •••• 4821</span>
</div>
</div>
</td>
<td className="p-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm border border-outline-variant/20">
                                Dining
                            </span>
</td>
<td className="p-md font-body-md text-body-md text-right whitespace-nowrap">
<span className="text-on-surface font-semibold">₹4,250<span className="text-sm opacity-60">.00</span></span>
</td>
<td className="p-md">
<div className="flex items-center gap-xs text-secondary">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span className="font-label-sm text-label-sm">Cleared</span>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer group" >
<td className="p-md font-body-md text-body-md text-on-surface-variant font-mono text-sm whitespace-nowrap">#TXN-8471-B</td>
<td className="p-md font-body-md text-body-md text-on-surface whitespace-nowrap">Oct 23, 2023<br/><span className="text-label-sm font-label-sm text-on-surface-variant">09:15 IST</span></td>
<td className="p-md">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-surface text-[20px]">bolt</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate">Adani Electricity</span>
<span className="font-label-sm text-label-sm text-on-surface-variant truncate">SBI UPI via GPay</span>
</div>
</div>
</td>
<td className="p-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm border border-outline-variant/20">
                                Utilities
                            </span>
</td>
<td className="p-md font-body-md text-body-md text-right whitespace-nowrap">
<span className="text-on-surface font-semibold">₹1,840<span className="text-sm opacity-60">.50</span></span>
</td>
<td className="p-md">
<div className="flex items-center gap-xs text-secondary">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span className="font-label-sm text-label-sm">Cleared</span>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer group" >
<td className="p-md font-body-md text-body-md text-on-surface-variant font-mono text-sm whitespace-nowrap">#TXN-8470-C</td>
<td className="p-md font-body-md text-body-md text-on-surface whitespace-nowrap">Oct 22, 2023<br/><span className="text-label-sm font-label-sm text-on-surface-variant">16:45 IST</span></td>
<td className="p-md">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate">Salary Credit - ACME Corp</span>
<span className="font-label-sm text-label-sm text-on-surface-variant truncate">ICICI Checking •••• 9920</span>
</div>
</div>
</td>
<td className="p-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm border border-outline-variant/20">
                                Income
                            </span>
</td>
<td className="p-md font-body-md text-body-md text-right whitespace-nowrap">
<span className="text-secondary font-semibold">+₹85,000<span className="text-sm opacity-60">.00</span></span>
</td>
<td className="p-md">
<div className="flex items-center gap-xs text-tertiary">
<span className="material-symbols-outlined text-[16px] animate-pulse">schedule</span>
<span className="font-label-sm text-label-sm">Processing</span>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container/50 transition-colors cursor-pointer group" >
<td className="p-md font-body-md text-body-md text-on-surface-variant font-mono text-sm whitespace-nowrap">#TXN-8469-D</td>
<td className="p-md font-body-md text-body-md text-on-surface whitespace-nowrap">Oct 20, 2023<br/><span className="text-label-sm font-label-sm text-on-surface-variant">19:30 IST</span></td>
<td className="p-md">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-surface text-[20px]">shopping_bag</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate">Myntra Designs</span>
<span className="font-label-sm text-label-sm text-on-surface-variant truncate">HDFC Credit Card •••• 4821</span>
</div>
</div>
</td>
<td className="p-md">
<span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm border border-outline-variant/20">
                                Shopping
                            </span>
</td>
<td className="p-md font-body-md text-body-md text-right whitespace-nowrap">
<span className="text-on-surface font-semibold">₹3,499<span className="text-sm opacity-60">.00</span></span>
</td>
<td className="p-md">
<div className="flex items-center gap-xs text-secondary">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
<span className="font-label-sm text-label-sm">Cleared</span>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-md border-t border-outline-variant/20 bg-surface-container/50 backdrop-blur-sm flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface-variant">Showing 1 to 10 of 248 entries</span>
<div className="flex items-center gap-xs">
<button className="w-8 h-8 rounded-full bg-surface-container-highest hover:bg-surface-variant flex items-center justify-center text-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md font-bold">1</button>
<button className="w-8 h-8 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-on-surface font-label-md text-label-md transition-colors">2</button>
<button className="w-8 h-8 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-on-surface font-label-md text-label-md transition-colors">3</button>
<span className="text-on-surface-variant mx-1">...</span>
<button className="w-8 h-8 rounded-full hover:bg-surface-container-highest flex items-center justify-center text-on-surface font-label-md text-label-md transition-colors">25</button>
<button className="w-8 h-8 rounded-full bg-surface-container-highest hover:bg-surface-variant flex items-center justify-center text-on-surface transition-colors">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 hidden opacity-0 transition-opacity duration-300" id="drawer-overlay" >
<div className="absolute right-0 top-0 h-full w-full max-w-md bg-surface-container border-l border-outline-variant/30 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col" id="drawer-panel" >

<div className="p-md border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/50 sticky top-0 backdrop-blur-md z-10">
<h3 className="font-headline-md text-headline-md text-on-surface">Transaction Details</h3>
<button className="p-xs hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-on-surface" >
<span className="material-symbols-outlined">close</span>
</button>
</div>

<div className="flex-1 overflow-y-auto p-md flex flex-col gap-lg">

<div className="flex flex-col items-center text-center gap-sm py-md">
<div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center shadow-inner mb-sm">
<span className="material-symbols-outlined text-on-surface text-[32px]" id="drawer-icon">restaurant</span>
</div>
<h4 className="font-headline-lg text-headline-lg text-on-surface" id="drawer-merchant">Bombay Canteen</h4>
<div className="font-display-lg text-display-lg text-on-surface" id="drawer-amount">₹4,250<span className="text-headline-lg font-headline-lg opacity-60">.00</span></div>
<span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-md text-label-md mt-sm">
<span className="material-symbols-outlined text-[16px] mr-1">check_circle</span> Cleared
                    </span>
</div>
<hr className="border-outline-variant/20"/>

<div className="grid grid-cols-2 gap-y-md gap-x-sm">
<div className="flex flex-col gap-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Date &amp; Time</span>
<span className="font-body-md text-body-md text-on-surface" id="drawer-datetime">Oct 24, 2023, 14:32</span>
</div>
<div className="flex flex-col gap-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Transaction ID</span>
<span className="font-body-md text-body-md text-on-surface font-mono text-sm" id="drawer-id">#TXN-8472-A</span>
</div>
<div className="flex flex-col gap-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Payment Method</span>
<span className="font-body-md text-body-md text-on-surface">HDFC Credit Card</span>
</div>
<div className="flex flex-col gap-xs">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Category</span>
<span className="font-body-md text-body-md text-on-surface">Dining &amp; Food</span>
</div>
</div>

<div className="flex flex-col gap-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Location</span>
<div className="w-full h-40 bg-surface-container-highest rounded-xl border border-outline-variant/20 shadow-inner relative overflow-hidden" data-location="Bombay Canteen, Mumbai, India" style={{"backgroundImage":"url('https"} as React.CSSProperties}>

<div className="absolute bottom-0 left-0 w-full p-sm bg-gradient-to-t from-surface to-transparent">
<span className="font-label-md text-label-md text-on-surface drop-shadow-md">Lower Parel, Mumbai</span>
</div>
</div>
</div>

<div className="flex flex-col gap-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Notes</span>
<div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant/10 text-on-surface font-body-md text-body-md italic opacity-80">
                        Dinner with design team.
                    </div>
</div>

<div className="flex gap-sm mt-auto pt-lg">
<button className="flex-1 bg-surface-container-highest hover:bg-surface-variant text-on-surface font-label-md text-label-md py-sm rounded-lg transition-colors border border-outline-variant/20">Report Issue</button>
<button className="flex-1 bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md py-sm rounded-lg transition-colors shadow-md">Download Receipt</button>
</div>
</div>
</div>
</div>
</div>

    </>
  );
}
