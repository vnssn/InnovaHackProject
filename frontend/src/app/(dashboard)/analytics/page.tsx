"use client";

export default function AnalyticsPage() {
  return (
    <>
      <div className="flex flex-col w-full gap-md">

        {/* Page Header */}
        <div className="flex items-end justify-between w-full mb-base">
          <div className="flex flex-col">
            <h1 className="font-display-lg text-display-lg text-on-surface">Analytics</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Deep insights into your financial patterns and trends.</p>
          </div>
          <div className="flex items-center gap-sm">
            <button className="px-md py-sm bg-surface-container hover:bg-surface-container-high rounded-lg font-label-md text-label-md text-on-surface transition-colors flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Last 6 Months
            </button>
            <button className="px-md py-sm bg-primary hover:opacity-90 rounded-lg font-label-md text-label-md text-on-primary shadow-sm transition-colors flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-md w-full">

          <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full -mr-14 -mt-14 blur-2xl transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-md relative z-10">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Income</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">trending_up</span>
            </div>
            <p className="font-display-lg text-display-lg text-on-surface relative z-10">₹2,14,000</p>
            <div className="flex items-center gap-xs mt-sm relative z-10">
              <span className="material-symbols-outlined text-secondary text-[16px]">arrow_upward</span>
              <span className="font-label-sm text-label-sm text-secondary">8.2% vs last period</span>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-error/5 rounded-full -mr-14 -mt-14 blur-2xl transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-md relative z-10">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Spend</span>
              <span className="material-symbols-outlined text-error text-[20px]">trending_down</span>
            </div>
            <p className="font-display-lg text-display-lg text-on-surface relative z-10">₹1,68,400</p>
            <div className="flex items-center gap-xs mt-sm relative z-10">
              <span className="material-symbols-outlined text-error text-[16px]">arrow_downward</span>
              <span className="font-label-sm text-label-sm text-error">12% vs last period</span>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-secondary/5 rounded-full -mr-14 -mt-14 blur-2xl transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-md relative z-10">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Net Savings</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">savings</span>
            </div>
            <p className="font-display-lg text-display-lg text-on-surface relative z-10">₹45,600</p>
            <div className="flex items-center gap-xs mt-sm relative z-10">
              <span className="material-symbols-outlined text-secondary text-[16px]">arrow_upward</span>
              <span className="font-label-sm text-label-sm text-secondary">21.3% savings rate</span>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full -mr-14 -mt-14 blur-2xl transition-transform group-hover:scale-110"></div>
            <div className="flex justify-between items-start mb-md relative z-10">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Avg Daily Spend</span>
              <span className="material-symbols-outlined text-primary text-[20px]">calculate</span>
            </div>
            <p className="font-display-lg text-display-lg text-on-surface relative z-10">₹1,872</p>
            <div className="flex items-center gap-xs mt-sm relative z-10">
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">remove</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Stable pattern</span>
            </div>
          </div>

        </div>

        {/* Income vs Expense Chart + Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

          {/* Income vs Expense Bar Chart */}
          <div className="md:col-span-2 bg-surface-container rounded-xl p-md shadow-sm">
            <div className="flex items-center justify-between mb-md">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Income vs Expense</h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Monthly comparison over the last 6 months</p>
              </div>
              <div className="flex items-center gap-sm">
                <div className="flex items-center gap-xs">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Income</span>
                </div>
                <div className="flex items-center gap-xs">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Expense</span>
                </div>
              </div>
            </div>
            {/* Bar Chart SVG */}
            <svg viewBox="0 0 600 240" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4edea3" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#4edea3" stopOpacity="0.5"/>
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffb4ab" stopOpacity="0.9"/>
                  <stop offset="100%" stopColor="#ffb4ab" stopOpacity="0.5"/>
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="50" y1="20" x2="580" y2="20" stroke="#414755" strokeWidth="0.5" strokeDasharray="4,4"/>
              <line x1="50" y1="70" x2="580" y2="70" stroke="#414755" strokeWidth="0.5" strokeDasharray="4,4"/>
              <line x1="50" y1="120" x2="580" y2="120" stroke="#414755" strokeWidth="0.5" strokeDasharray="4,4"/>
              <line x1="50" y1="170" x2="580" y2="170" stroke="#414755" strokeWidth="0.5" strokeDasharray="4,4"/>
              {/* Y Labels */}
              <text x="40" y="24" textAnchor="end" fill="#8b90a0" fontSize="11">80k</text>
              <text x="40" y="74" textAnchor="end" fill="#8b90a0" fontSize="11">60k</text>
              <text x="40" y="124" textAnchor="end" fill="#8b90a0" fontSize="11">40k</text>
              <text x="40" y="174" textAnchor="end" fill="#8b90a0" fontSize="11">20k</text>
              {/* May */}
              <rect x="60" y="40" width="28" height="155" rx="4" fill="url(#incomeGrad)"/>
              <rect x="92" y="80" width="28" height="115" rx="4" fill="url(#expenseGrad)"/>
              <text x="90" y="215" textAnchor="middle" fill="#8b90a0" fontSize="11">May</text>
              {/* Jun */}
              <rect x="145" y="30" width="28" height="165" rx="4" fill="url(#incomeGrad)"/>
              <rect x="177" y="90" width="28" height="105" rx="4" fill="url(#expenseGrad)"/>
              <text x="175" y="215" textAnchor="middle" fill="#8b90a0" fontSize="11">Jun</text>
              {/* Jul */}
              <rect x="230" y="35" width="28" height="160" rx="4" fill="url(#incomeGrad)"/>
              <rect x="262" y="75" width="28" height="120" rx="4" fill="url(#expenseGrad)"/>
              <text x="260" y="215" textAnchor="middle" fill="#8b90a0" fontSize="11">Jul</text>
              {/* Aug */}
              <rect x="315" y="40" width="28" height="155" rx="4" fill="url(#incomeGrad)"/>
              <rect x="347" y="95" width="28" height="100" rx="4" fill="url(#expenseGrad)"/>
              <text x="345" y="215" textAnchor="middle" fill="#8b90a0" fontSize="11">Aug</text>
              {/* Sep */}
              <rect x="400" y="20" width="28" height="175" rx="4" fill="url(#incomeGrad)"/>
              <rect x="432" y="70" width="28" height="125" rx="4" fill="url(#expenseGrad)"/>
              <text x="430" y="215" textAnchor="middle" fill="#8b90a0" fontSize="11">Sep</text>
              {/* Oct */}
              <rect x="485" y="25" width="28" height="170" rx="4" fill="url(#incomeGrad)"/>
              <rect x="517" y="65" width="28" height="130" rx="4" fill="url(#expenseGrad)"/>
              <text x="515" y="215" textAnchor="middle" fill="#8b90a0" fontSize="11">Oct</text>
              {/* Baseline */}
              <line x1="50" y1="195" x2="580" y2="195" stroke="#414755" strokeWidth="1"/>
            </svg>
          </div>

          {/* Category Donut + Breakdown */}
          <div className="bg-surface-container rounded-xl p-md shadow-sm flex flex-col gap-md">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Spend by Category</h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant">October 2023</p>
            </div>
            <div className="flex justify-center">
              <svg viewBox="0 0 160 160" className="w-36 h-36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="60" fill="none" stroke="#232a3a" strokeWidth="28"/>
                <circle cx="80" cy="80" r="60" fill="none" stroke="#adc6ff" strokeWidth="28" strokeDasharray="94.2 282.6" strokeDashoffset="0" strokeLinecap="butt"/>
                <circle cx="80" cy="80" r="60" fill="none" stroke="#4edea3" strokeWidth="28" strokeDasharray="70.7 282.6" strokeDashoffset="-94.2" strokeLinecap="butt"/>
                <circle cx="80" cy="80" r="60" fill="none" stroke="#ffb4ab" strokeWidth="28" strokeDasharray="47.1 282.6" strokeDashoffset="-164.9" strokeLinecap="butt"/>
                <circle cx="80" cy="80" r="60" fill="none" stroke="#8b90a0" strokeWidth="28" strokeDasharray="70.6 282.6" strokeDashoffset="-212" strokeLinecap="butt"/>
                <text x="80" y="76" textAnchor="middle" fill="#dce2f7" fontSize="13" fontWeight="700">₹45.2k</text>
                <text x="80" y="92" textAnchor="middle" fill="#8b90a0" fontSize="9">TOTAL</text>
              </svg>
            </div>
            <div className="flex flex-col gap-sm">
              {[
                { label: "Housing & Rent", pct: "33%", color: "bg-primary", amt: "₹14,916" },
                { label: "Food & Dining", pct: "25%", color: "bg-secondary", amt: "₹11,300" },
                { label: "Entertainment", pct: "17%", color: "bg-error", amt: "₹7,684" },
                { label: "Others", pct: "25%", color: "bg-outline", amt: "₹11,300" },
              ].map((cat) => (
                <div key={cat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <div className={`w-2 h-2 rounded-full ${cat.color} shrink-0`}></div>
                    <span className="font-label-md text-label-md text-on-surface">{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-sm">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">{cat.amt}</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant w-8 text-right">{cat.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spending Heatmap / Day of Week Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">

          {/* Top Spending Days */}
          <div className="bg-surface-container rounded-xl p-md shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Spending by Day of Week</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-md">Average spend per day</p>
            <div className="flex flex-col gap-sm">
              {[
                { day: "Monday", amt: 1240, max: 3200 },
                { day: "Tuesday", amt: 980, max: 3200 },
                { day: "Wednesday", amt: 1850, max: 3200 },
                { day: "Thursday", amt: 2100, max: 3200 },
                { day: "Friday", amt: 3200, max: 3200 },
                { day: "Saturday", amt: 2800, max: 3200 },
                { day: "Sunday", amt: 1600, max: 3200 },
              ].map((item) => (
                <div key={item.day} className="flex items-center gap-md">
                  <span className="font-label-md text-label-md text-on-surface-variant w-24 shrink-0">{item.day}</span>
                  <div className="flex-1 bg-surface-container-high rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{ width: `${(item.amt / item.max) * 100}%` } as React.CSSProperties}
                    ></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant w-16 text-right">₹{item.amt.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Savings Trend */}
          <div className="bg-surface-container rounded-xl p-md shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Monthly Savings</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-md">Net savings accumulated each month</p>
            <svg viewBox="0 0 460 180" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4edea3" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#4edea3" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 20 140 L 90 120 L 160 100 L 230 80 L 300 60 L 370 45 L 440 30" fill="none" stroke="#4edea3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 20 140 L 90 120 L 160 100 L 230 80 L 300 60 L 370 45 L 440 30 L 440 160 L 20 160 Z" fill="url(#savingsGrad)"/>
              {[
                { x: 20, y: 140, label: "May", val: "₹28k" },
                { x: 90, y: 120, label: "Jun", val: "₹32k" },
                { x: 160, y: 100, label: "Jul", val: "₹36k" },
                { x: 230, y: 80, label: "Aug", val: "₹40k" },
                { x: 300, y: 60, label: "Sep", val: "₹43k" },
                { x: 370, y: 45, label: "Oct (est)", val: "₹46k" },
              ].map((pt) => (
                <g key={pt.label}>
                  <circle cx={pt.x} cy={pt.y} r="4" fill="#4edea3"/>
                  <text x={pt.x} y="175" textAnchor="middle" fill="#8b90a0" fontSize="10">{pt.label}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Top Merchants Table */}
        <div className="bg-surface-container rounded-xl shadow-sm overflow-hidden">
          <div className="p-md flex items-center justify-between border-b border-outline-variant/20">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Top Merchants by Spend</h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Last 6 months</p>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-outline-variant/20">
                <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Merchant</th>
                <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Category</th>
                <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Transactions</th>
                <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Spend</th>
                <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Zomato", category: "Food & Dining", txns: 24, amount: "₹18,420", trend: "up", trendVal: "+14%" },
                { name: "Amazon", category: "Shopping", txns: 18, amount: "₹15,200", trend: "down", trendVal: "-3%" },
                { name: "HDFC Bank EMI", category: "Finance", txns: 6, amount: "₹42,500", trend: "stable", trendVal: "0%" },
                { name: "Swiggy", category: "Food & Dining", txns: 12, amount: "₹8,640", trend: "up", trendVal: "+22%" },
                { name: "Spotify", category: "Entertainment", txns: 6, amount: "₹1,194", trend: "stable", trendVal: "0%" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                  <td className="px-md py-sm">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary-container text-[16px]">store</span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-md py-sm">
                    <span className="px-sm py-xs bg-surface-container-high rounded-full font-label-sm text-label-sm text-on-surface-variant">{row.category}</span>
                  </td>
                  <td className="px-md py-sm font-label-md text-label-md text-on-surface">{row.txns}</td>
                  <td className="px-md py-sm font-headline-md text-headline-md text-on-surface">{row.amount}</td>
                  <td className="px-md py-sm">
                    <span className={`flex items-center gap-xs font-label-sm text-label-sm ${row.trend === "up" ? "text-error" : row.trend === "down" ? "text-secondary" : "text-on-surface-variant"}`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {row.trend === "up" ? "trending_up" : row.trend === "down" ? "trending_down" : "trending_flat"}
                      </span>
                      {row.trendVal}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}
