"use client";

import { useDashboardAnalytics, useCategoryBreakdown, useTrends } from '@/hooks/useAnalytics';
import { useInsights } from '@/hooks/useAI';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardPage() {
  const { data: dashboard, isLoading: isDashboardLoading } = useDashboardAnalytics();
  const { data: categoryData, isLoading: isCategoryLoading } = useCategoryBreakdown();
  const { data: trendsData, isLoading: isTrendsLoading } = useTrends('6m');
  const { data: insightsData, isLoading: isInsightsLoading } = useInsights();

  if (isDashboardLoading || isCategoryLoading || isTrendsLoading || isInsightsLoading) {
    return (
      <div className="flex flex-col w-full gap-md animate-pulse">
        <div className="flex items-end justify-between w-full mb-base">
          <div className="flex flex-col gap-sm">
            <div className="h-10 w-48 bg-surface-container rounded-lg"></div>
            <div className="h-5 w-64 bg-surface-container rounded-lg"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-md w-full">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-surface-container rounded-xl p-md shadow-sm h-32 flex flex-col justify-between">
              <div className="h-6 w-32 bg-surface-container-highest rounded-lg"></div>
              <div className="h-10 w-24 bg-surface-container-highest rounded-lg"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-md w-full mt-sm">
          <div className="lg:col-span-2 bg-surface-container rounded-xl p-md shadow-sm h-[380px]"></div>
          <div className="flex flex-col gap-md">
            <div className="bg-surface-container rounded-xl p-md shadow-sm h-[250px]"></div>
            <div className="bg-surface-container rounded-xl p-md shadow-sm flex-1 min-h-[150px]"></div>
          </div>
        </div>
      </div>
    );
  }

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
                <span className="font-headline-lg text-headline-lg text-on-surface">₹{dashboard?.monthly_spending?.toLocaleString() ?? 0}</span>
              </div>
              <div className="flex items-center gap-xs mt-xs">
                <span className="flex items-center text-secondary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">
                    {dashboard?.spending_change_pct && dashboard.spending_change_pct < 0 ? 'arrow_downward' : 'arrow_upward'}
                  </span>
                  {Math.abs(dashboard?.spending_change_pct ?? 0)}%
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
                <span className="font-headline-lg text-headline-lg text-on-surface">₹{dashboard?.today_spending?.toLocaleString() ?? 0}</span>
              </div>
              <div className="flex items-center gap-xs mt-xs">
                <span className="font-body-md text-[12px] text-on-surface-variant">Active today</span>
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
                <span className="font-headline-lg text-headline-lg text-on-primary-container">₹{dashboard?.potential_savings?.toLocaleString() ?? 0}</span>
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
              {trendsData?.items && trendsData.items.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendsData.items} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" opacity={0.2} />
                    <XAxis 
                      dataKey="period" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }} 
                      tickFormatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface-container-high)', borderRadius: '8px', border: 'none', color: 'var(--on-surface)' }}
                      itemStyle={{ color: 'var(--primary)' }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Spent']}
                    />
                    <Area type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center border border-dashed border-outline-variant rounded">
                  <span className="text-on-surface-variant">No data available</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-md">

            <div className="bg-surface-container rounded-xl p-md shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Spend by Category</h2>
              <div className="relative w-full h-[200px] flex items-center justify-center">
                {categoryData?.items && categoryData.items.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData.items}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="total"
                          stroke="none"
                        >
                          {categoryData.items.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.color || 'var(--primary)'} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Spent']}
                          contentStyle={{ backgroundColor: 'var(--surface-container-high)', borderRadius: '8px', border: 'none', color: 'var(--on-surface)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wide">Total</span>
                      <span className="font-headline-md text-[18px] font-bold text-on-surface">₹{dashboard?.monthly_spending?.toLocaleString() ?? 0}</span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wide">Total</span>
                    <span className="font-headline-md text-[18px] font-bold text-on-surface">₹{dashboard?.monthly_spending?.toLocaleString() ?? 0}</span>
                  </div>
                )}
              </div>

              <div className="mt-md flex flex-col gap-sm">
                {categoryData?.items?.slice(0, 4).map((cat: any) => (
                  <div key={cat.category_id} className="flex items-center justify-between font-label-md text-label-md">
                    <div className="flex items-center gap-sm text-on-surface"><span className="w-3 h-3 rounded-full bg-primary" style={{ backgroundColor: cat.color }}></span>{cat.category_name}</div>
                    <span className="text-on-surface-variant">{cat.percentage}%</span>
                  </div>
                ))}
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
                {insightsData?.insights?.slice(0, 3).map((insight: any) => (
                  <div key={insight.id} className="bg-surface p-sm rounded-lg flex items-start gap-sm group cursor-pointer hover:bg-surface-container-high transition-colors">
                    <div className="mt-1">
                      <span className="material-symbols-outlined text-tertiary-container text-[18px]">
                        {insight.type === 'leak' ? 'receipt_long' : insight.type === 'alert' ? 'warning' : 'lightbulb'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md font-semibold text-on-surface group-hover:text-tertiary-container transition-colors">{insight.title}</span>
                      <span className="font-body-md text-[13px] text-on-surface-variant leading-tight mt-1">{insight.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
