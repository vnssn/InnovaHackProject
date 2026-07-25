"use client";

import { useState } from 'react';
import { useTransactionReplay } from '@/hooks/useTransactions';

const CATEGORY_COLORS: Record<string, string> = {
  food: 'text-secondary',
  dining: 'text-secondary',
  transport: 'text-tertiary',
  shopping: 'text-primary',
  groceries: 'text-secondary',
  entertainment: 'text-tertiary',
  utilities: 'text-error',
  default: 'text-on-surface-variant',
};

const CATEGORY_ICONS: Record<string, string> = {
  food: 'restaurant',
  dining: 'restaurant',
  transport: 'directions_car',
  shopping: 'shopping_bag',
  groceries: 'shopping_cart',
  entertainment: 'movie',
  utilities: 'bolt',
  health: 'favorite',
  default: 'receipt',
};

function getCategoryKey(name?: string) {
  const lower = (name ?? '').toLowerCase();
  for (const key of Object.keys(CATEGORY_ICONS)) {
    if (lower.includes(key)) return key;
  }
  return 'default';
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

export default function FinancialReplayPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dateStr = formatDate(selectedDate);
  const { data: replayData, isLoading, isError } = useTransactionReplay(dateStr);

  const transactions = replayData?.transactions ?? [];
  const total = replayData?.total ?? 0;
  const aiSummary = replayData?.ai_summary;
  const categoryBreakdown: Record<string, number> = replayData?.category_breakdown ?? {};

  const navigateDay = (delta: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + delta);
    setSelectedDate(next);
  };

  const dayName = selectedDate.toLocaleDateString('en-IN', { weekday: 'long' });
  const dateLabel = selectedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const isToday = formatDate(selectedDate) === formatDate(new Date());

  const breakdownEntries = Object.entries(categoryBreakdown);
  const totalBreakdown = breakdownEntries.reduce((a, [, v]) => a + v, 0);

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">

        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md mb-xl pt-lg relative z-10">
          <div className="flex flex-col gap-xs relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent rounded-full opacity-50"></div>
            <h1 className="font-display-lg text-display-lg text-on-surface">Financial Replay</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[672px]">A story of your spending, step by step.</p>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center gap-sm bg-surface-container/80 backdrop-blur-md rounded-full px-1 py-1 shadow-md border border-outline-variant/30">
            <button
              onClick={() => navigateDay(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex items-center gap-sm px-sm">
              <span className="material-symbols-outlined text-primary">calendar_today</span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface">{dateLabel}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{dayName}{isToday ? ' · Today' : ''}</span>
              </div>
            </div>
            <button
              onClick={() => navigateDay(1)}
              disabled={isToday}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl relative z-10">

          {/* Timeline */}
          <div className="lg:col-span-7 flex flex-col relative">
            <div className="absolute left-8 top-8 bottom-32 w-px bg-gradient-to-b from-surface-variant via-outline-variant/50 to-transparent"></div>

            {isLoading ? (
              <div className="flex h-64 items-center justify-center text-on-surface-variant">Loading replay...</div>
            ) : isError ? (
              <div className="flex h-64 items-center justify-center text-error">Failed to load replay data.</div>
            ) : transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-sm text-on-surface-variant bg-surface-container/40 rounded-2xl ml-16">
                <span className="material-symbols-outlined text-[48px]">event_busy</span>
                <p className="font-body-md">No transactions on this day.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-lg pl-3 relative">
                {transactions.map((txn: any, i: number) => {
                  const catKey = getCategoryKey(txn.category?.name);
                  const icon = CATEGORY_ICONS[catKey];
                  const color = CATEGORY_COLORS[catKey];
                  const time = new Date(txn.transaction_date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div key={txn.id} className="flex gap-md group hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex flex-col items-center mt-2 relative z-10">
                        <div className={`w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center shrink-0 shadow-md group-hover:border-primary/50 transition-colors`}>
                          <span className={`material-symbols-outlined ${color} text-[20px]`}>{icon}</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-surface-container-low/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-md shadow-md group-hover:bg-surface-container-low/80 group-hover:shadow-lg transition-all relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-sm">
                          <div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">{time}</span>
                            <h3 className="font-headline-md text-headline-md text-on-surface">{txn.merchant?.name ?? txn.description}</h3>
                          </div>
                          <div className="text-right">
                            <span className="font-headline-md text-headline-md text-on-surface block">₹{(txn.amount ?? 0).toLocaleString()}</span>
                            {txn.category?.name && (
                              <span className={`inline-flex items-center gap-xs px-2 py-0.5 rounded-full bg-surface-container/50 ${color} font-label-sm text-label-sm mt-1`}>
                                <span className="material-symbols-outlined text-[14px]">{icon}</span>
                                {txn.category.name}
                              </span>
                            )}
                          </div>
                        </div>
                        {txn.provider && (
                          <div className="flex items-center gap-sm text-on-surface-variant">
                            <span className="font-body-sm text-sm">{txn.provider}</span>
                            {txn.merchant?.city && <span className="font-label-sm text-label-sm">· {txn.merchant.city}</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-5 flex flex-col gap-lg mt-12 lg:mt-0 relative z-10">
            <div className="bg-surface-container-low/80 backdrop-blur-2xl border border-outline-variant/40 rounded-[32px] p-xl shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="mb-lg">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-[0.2em] block mb-2">Total Day Spend</span>
                  <div className="flex items-baseline gap-2">
                    <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">
                      ₹{Math.floor(total).toLocaleString()}
                      <span className="text-headline-lg text-on-surface-variant">.{String(Math.round((total % 1) * 100)).padStart(2, '0')}</span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-xs mt-3">
                    <span className="font-label-md text-label-md text-on-surface-variant">{transactions.length} transactions</span>
                  </div>
                </div>

                {/* Category Breakdown */}
                {breakdownEntries.length > 0 && (
                  <div className="mb-xl flex-1">
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-md">Category Breakdown</h3>
                    <div className="flex flex-col gap-md">
                      {breakdownEntries.map(([cat, amount]) => {
                        const pct = totalBreakdown > 0 ? (amount / totalBreakdown) * 100 : 0;
                        const catKey = getCategoryKey(cat);
                        const color = CATEGORY_COLORS[catKey];
                        return (
                          <div key={cat} className="flex flex-col gap-xs">
                            <div className="flex justify-between items-end">
                              <span className={`font-label-md text-label-md text-on-surface flex items-center gap-xs`}>
                                <span className={`w-2 h-2 rounded-full bg-current ${color}`}></span>
                                {cat}
                              </span>
                              <span className="font-label-md text-label-md text-on-surface-variant">₹{(amount ?? 0).toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                              <div className={`h-full rounded-full bg-current ${color} transition-all duration-700`} style={{ width: `${pct}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* AI Summary */}
                {aiSummary && (
                  <div className="mt-auto bg-gradient-to-br from-primary-container/20 to-surface-container-highest border border-primary/20 rounded-2xl p-md relative overflow-hidden group hover:border-primary/40 transition-colors">
                    <div className="flex gap-md relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                        <span className="material-symbols-outlined text-primary">auto_awesome</span>
                      </div>
                      <div className="flex flex-col gap-xs">
                        <h4 className="font-label-md text-label-md text-on-surface">FinAI Insight</h4>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">"{aiSummary}"</p>
                      </div>
                    </div>
                  </div>
                )}

                {!isLoading && transactions.length === 0 && !aiSummary && (
                  <div className="flex flex-col items-center justify-center flex-1 gap-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[36px]">calendar_month</span>
                    <p className="text-sm font-body-md text-center">Navigate to a date with transactions to see the replay.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
