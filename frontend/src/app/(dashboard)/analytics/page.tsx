"use client";

import { useOverviewAnalytics, useCategoryBreakdown } from '@/hooks/useAnalytics';

export default function AnalyticsPage() {
  const { data: overview, isLoading } = useOverviewAnalytics();
  const { data: categoryData } = useCategoryBreakdown();

  const dashboard = overview?.dashboard;
  const topMerchants = overview?.top_merchants ?? [];
  const categories = categoryData?.items ?? (Array.isArray(overview?.category_breakdown) ? overview.category_breakdown : overview?.category_breakdown?.items) ?? [];

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
            <button onClick={() => alert("Filter options coming soon")} className="px-md py-sm bg-surface-container hover:bg-surface-container-high rounded-lg font-label-md text-label-md text-on-surface transition-colors flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Last 6 Months
            </button>
            <button onClick={() => alert("Report generation coming soon")} className="px-md py-sm bg-primary hover:opacity-90 rounded-lg font-label-md text-label-md text-on-primary shadow-sm transition-colors flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Report
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <span className="text-on-surface-variant">Loading analytics...</span>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-md w-full">

              <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full -mr-14 -mt-14 blur-2xl transition-transform group-hover:scale-110"></div>
                <div className="flex justify-between items-start mb-md relative z-10">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Monthly Spend</span>
                  <span className="material-symbols-outlined text-error text-[20px]">trending_down</span>
                </div>
                <p className="font-display-lg text-display-lg text-on-surface relative z-10">₹{dashboard?.monthly_spending?.toLocaleString() ?? 0}</p>
                <div className="flex items-center gap-xs mt-sm relative z-10">
                  <span className="material-symbols-outlined text-[16px]" style={{ color: (dashboard?.spending_change_pct ?? 0) < 0 ? 'var(--color-secondary)' : 'var(--color-error)' }}>
                    {(dashboard?.spending_change_pct ?? 0) < 0 ? 'arrow_downward' : 'arrow_upward'}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{Math.abs(dashboard?.spending_change_pct ?? 0).toFixed(1)}% vs last period</span>
                </div>
              </div>

              <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-secondary/5 rounded-full -mr-14 -mt-14 blur-2xl transition-transform group-hover:scale-110"></div>
                <div className="flex justify-between items-start mb-md relative z-10">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Today's Spend</span>
                  <span className="material-symbols-outlined text-primary text-[20px]">today</span>
                </div>
                <p className="font-display-lg text-display-lg text-on-surface relative z-10">₹{dashboard?.today_spending?.toLocaleString() ?? 0}</p>
                <div className="flex items-center gap-xs mt-sm relative z-10">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Transactions today</span>
                </div>
              </div>

              <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-secondary/5 rounded-full -mr-14 -mt-14 blur-2xl transition-transform group-hover:scale-110"></div>
                <div className="flex justify-between items-start mb-md relative z-10">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Potential Savings</span>
                  <span className="material-symbols-outlined text-secondary text-[20px]">savings</span>
                </div>
                <p className="font-display-lg text-display-lg text-on-surface relative z-10">₹{dashboard?.potential_savings?.toLocaleString() ?? 0}</p>
                <div className="flex items-center gap-xs mt-sm relative z-10">
                  <span className="font-label-sm text-label-sm text-secondary">AI-detected opportunities</span>
                </div>
              </div>

              <div className="bg-surface-container rounded-xl p-md shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-primary/5 rounded-full -mr-14 -mt-14 blur-2xl transition-transform group-hover:scale-110"></div>
                <div className="flex justify-between items-start mb-md relative z-10">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Subscriptions</span>
                  <span className="material-symbols-outlined text-primary text-[20px]">subscriptions</span>
                </div>
                <p className="font-display-lg text-display-lg text-on-surface relative z-10">{dashboard?.subscription_count ?? 0}</p>
                <div className="flex items-center gap-xs mt-sm relative z-10">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Active recurring payments</span>
                </div>
              </div>

            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

              <div className="md:col-span-2 bg-surface-container rounded-xl p-md shadow-sm flex flex-col gap-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Spend by Category</h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Current month breakdown</p>
                </div>
                <div className="flex flex-col gap-sm">
                  {categories.slice(0, 6).map((cat: any) => (
                    <div key={cat.category_id} className="flex items-center gap-md">
                      <span className="font-label-md text-label-md text-on-surface-variant w-32 shrink-0 truncate">{cat.category_name}</span>
                      <div className="flex-1 bg-surface-container-high rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${cat.percentage}%`, backgroundColor: cat.color || 'var(--color-primary)' }}
                        ></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant w-20 text-right">₹{cat.total?.toLocaleString()}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant w-10 text-right">{cat.percentage?.toFixed(0)}%</span>
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-on-surface-variant text-center py-md">No category data available.</p>
                  )}
                </div>
              </div>

              <div className="bg-surface-container rounded-xl p-md shadow-sm flex flex-col gap-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Top Categories</h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">By total spend</p>
                </div>
                <div className="flex flex-col gap-sm">
                  {categories.slice(0, 5).map((cat: any) => (
                    <div key={cat.category_id} className="flex items-center justify-between">
                      <div className="flex items-center gap-sm">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color || 'var(--color-primary)' }}></div>
                        <span className="font-label-md text-label-md text-on-surface">{cat.category_name}</span>
                      </div>
                      <div className="flex items-center gap-sm">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">₹{cat.total?.toLocaleString()}</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant w-8 text-right">{cat.percentage?.toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Merchants Table */}
            <div className="bg-surface-container rounded-xl shadow-sm overflow-hidden">
              <div className="p-md flex items-center justify-between border-b border-outline-variant/20">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Top Merchants by Spend</h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Based on your transaction history</p>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-outline-variant/20">
                    <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Merchant</th>
                    <th className="px-md py-sm font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Spend</th>
                  </tr>
                </thead>
                <tbody>
                  {topMerchants.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-md py-md text-on-surface-variant text-center">No merchant data available.</td>
                    </tr>
                  ) : topMerchants.map((merchant: any, i: number) => (
                    <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-high transition-colors">
                      <td className="px-md py-sm">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-primary-container text-[16px]">store</span>
                          </div>
                          <span className="font-label-md text-label-md text-on-surface">{merchant.name}</span>
                        </div>
                      </td>
                      <td className="px-md py-sm font-headline-md text-headline-md text-on-surface">₹{merchant.total_spent?.toLocaleString() ?? merchant.amount?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
