"use client";

import { useState, useEffect } from 'react';
import { useDashboardAnalytics, useCategoryBreakdown, useTrends } from '@/hooks/useAnalytics';
import { useInsights } from '@/hooks/useAI';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { data: dashboard, isLoading: isDashboardLoading } = useDashboardAnalytics();
  const { data: categoryData, isLoading: isCategoryLoading } = useCategoryBreakdown();
  const { data: trendsData, isLoading: isTrendsLoading } = useTrends('6m');
  const { data: insightsData, isLoading: isInsightsLoading } = useInsights();

  const [showAiModal, setShowAiModal] = useState(false);
  const [aiKeyInput, setAiKeyInput] = useState('');
  const [aiProviderInput, setAiProviderInput] = useState('gemini');
  const [hasCustomKey, setHasCustomKey] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('spendsense_ai_key');
      const savedProvider = localStorage.getItem('spendsense_ai_provider');
      if (savedKey) {
        setHasCustomKey(true);
        setAiKeyInput(savedKey);
        setAiProviderInput(savedProvider || 'gemini');
      }
    }
  }, []);

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
            <button onClick={() => alert("Date filtering coming soon")} className="px-md py-sm bg-surface-container hover:bg-surface-container-high rounded-lg font-label-md text-label-md text-on-surface transition-colors flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              Last 30 Days
            </button>
            <button onClick={() => router.push('/transactions')} className="px-md py-sm bg-primary hover:bg-primary-fixed rounded-lg font-label-md text-label-md text-on-primary shadow-sm transition-colors flex items-center gap-xs">
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
                  <AreaChart data={[...trendsData.items].sort((a, b) => a.period.localeCompare(b.period))} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.4} />
                    <XAxis 
                      dataKey="period" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} 
                      tickFormatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', color: '#f8fafc', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                      itemStyle={{ color: '#38bdf8', fontWeight: 600 }}
                      formatter={(value: any) => [`₹${Number(value || 0).toLocaleString()}`, 'Spent']}
                      labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                    />
                    <Area type="monotone" dataKey="total" stroke="#38bdf8" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
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
                          formatter={(value: any) => [`₹${Number(value || 0).toLocaleString()}`, 'Spent']}
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
              <div className="flex items-center justify-between mb-md">
                <div className="flex items-center gap-sm">
                  <div className="p-xs bg-primary/20 rounded-md">
                    <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                  </div>
                  <h2 className="font-headline-md text-[18px] font-semibold text-on-surface">AI Insights</h2>
                </div>
                <button
                  onClick={() => setShowAiModal(true)}
                  className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-primary/20 text-xs font-semibold text-primary transition-all flex items-center gap-1 border border-primary/30 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[14px]">key</span>
                  {hasCustomKey ? 'AI Active (Custom Key)' : 'Configure AI Key'}
                </button>
              </div>
              <div className="flex flex-col gap-sm">
                {insightsData?.insights && insightsData.insights.length > 0 ? (
                  insightsData.insights.slice(0, 3).map((insight: any) => (
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
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center p-md text-center bg-surface rounded-lg">
                    <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-2">auto_awesome</span>
                    <span className="font-label-md text-label-md text-on-surface-variant">No new insights right now.</span>
                    <span className="font-body-md text-[12px] text-on-surface-variant mt-1">Keep spending and our AI will generate personalized tips.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-surface-container-high border border-outline-variant/30 rounded-2xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4 relative">
              <button onClick={() => setShowAiModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
              
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                <h3 className="font-headline-md text-lg font-bold text-on-surface">Connect Live AI Copilot</h3>
              </div>
              
              <p className="font-body-md text-sm text-on-surface-variant">
                Enter your free Gemini or OpenRouter API key to activate deep real-time financial analysis and subscription leak detection.
              </p>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-xs font-semibold text-on-surface-variant uppercase">Select AI Provider</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAiProviderInput('gemini')}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${aiProviderInput === 'gemini' ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-surface border-outline-variant/30 text-on-surface-variant'}`}
                  >
                    Google Gemini (Free)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAiProviderInput('openrouter')}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${aiProviderInput === 'openrouter' ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-surface border-outline-variant/30 text-on-surface-variant'}`}
                  >
                    OpenRouter
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-md text-xs font-semibold text-on-surface-variant uppercase">API Key</label>
                <input
                  type="password"
                  placeholder={aiProviderInput === 'gemini' ? 'AIzaSy...' : 'sk-or-v1-...'}
                  value={aiKeyInput}
                  onChange={(e) => setAiKeyInput(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/40 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
                <span className="text-[11px] text-on-surface-variant">
                  {aiProviderInput === 'gemini' ? 'Get a free key from Google AI Studio (aistudio.google.com).' : 'Get a key from openrouter.ai/keys.'}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 mt-2">
                {hasCustomKey && (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem('spendsense_ai_key');
                      localStorage.removeItem('spendsense_ai_provider');
                      setHasCustomKey(false);
                      setAiKeyInput('');
                      setShowAiModal(false);
                      window.location.reload();
                    }}
                    className="px-4 py-2 rounded-lg bg-error/20 text-error text-sm font-semibold hover:bg-error/30 transition-colors"
                  >
                    Remove Key
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (aiKeyInput.trim()) {
                      localStorage.setItem('spendsense_ai_key', aiKeyInput.trim());
                      localStorage.setItem('spendsense_ai_provider', aiProviderInput);
                      setHasCustomKey(true);
                    }
                    setShowAiModal(false);
                    window.location.reload();
                  }}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-bold shadow-md hover:opacity-90 transition-all"
                >
                  Save & Activate AI
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
