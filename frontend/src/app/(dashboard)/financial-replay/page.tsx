"use client";

import { useState } from 'react';
import { useTransactionReplay } from '@/hooks/useTransactions';

export default function FinancialReplayPage() {
  // Use today's date formatted as YYYY-MM-DD for default
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const { data: replayData, isLoading } = useTransactionReplay(selectedDate);

  const txns = replayData?.transactions || [];
  const total = replayData?.total || 0;
  const breakdown = replayData?.category_breakdown || {};
  const aiSummary = replayData?.ai_summary || "No insights available for this date.";

  return (
    <>
      <div className="flex flex-col w-full min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] mix-blend-screen opacity-50"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md mb-xl pt-lg relative z-10">
          <div className="flex flex-col gap-xs relative">
            <h1 className="font-display-lg text-display-lg text-on-surface">Financial Replay</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">A story of your spending, step by step.</p>
          </div>

          <div className="flex items-center gap-sm bg-surface-container/80 backdrop-blur-md rounded-full px-1 py-1 shadow-md border border-outline-variant/30">
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
              className="bg-transparent text-on-surface px-md py-sm outline-none cursor-pointer"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-on-surface-variant text-center py-xl">Loading replay...</div>
        ) : txns.length === 0 ? (
          <div className="text-on-surface-variant text-center py-xl">No transactions found for this date. Try another date.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl relative z-10">
            <div className="lg:col-span-7 flex flex-col relative">
              <div className="absolute left-8 top-8 bottom-32 w-px bg-gradient-to-b from-surface-variant via-outline-variant/50 to-transparent"></div>

              <div className="flex flex-col gap-lg pl-3 relative mb-xl">
                {txns.map((txn: any, i: number) => (
                  <div key={txn.id} className="flex gap-md group hover:-translate-y-1 transition-transform duration-300 mt-4">
                    <div className="flex flex-col items-center mt-2 relative z-10">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/50 flex items-center justify-center shrink-0 shadow-md transition-colors">
                        <span className="material-symbols-outlined text-primary text-[20px]">receipt</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-surface-container-low/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl p-md shadow-md transition-all relative overflow-hidden">
                      <div className="flex justify-between items-start mb-sm">
                        <div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">
                            {new Date(txn.transaction_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
                            {txn.merchant_name || txn.description}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="font-headline-md text-headline-md text-on-surface block">₹{txn.amount.toLocaleString()}</span>
                          <span className="inline-flex items-center gap-xs px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm mt-1">
                            {txn.category_name || 'Uncategorized'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-sm text-on-surface-variant mt-sm">
                        <p className="font-body-md text-body-md line-clamp-1">{txn.provider || txn.payment_method}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-lg mt-12 lg:mt-0 relative z-10 lg:-ml-4">
              <div className="bg-surface-container-low/80 backdrop-blur-2xl border border-outline-variant/40 rounded-[32px] p-xl shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]">
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="mb-lg">
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-[0.2em] block mb-2">Total Day Spend</span>
                    <div className="flex items-baseline gap-2">
                      <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">₹{total.toLocaleString()}</h2>
                    </div>
                  </div>

                  <div className="mb-xl flex-1">
                    <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-md">Category Breakdown</h3>
                    <div className="flex flex-col gap-md">
                      {Object.entries(breakdown).map(([catName, amt]: any, i: number) => {
                         const pct = total > 0 ? (amt / total) * 100 : 0;
                         return (
                          <div key={catName} className="flex flex-col gap-xs">
                            <div className="flex justify-between items-end">
                              <span className="font-label-md text-label-md text-on-surface">{catName}</span>
                              <span className="font-label-md text-label-md text-on-surface-variant">₹{amt.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }}></div>
                            </div>
                          </div>
                         );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto bg-gradient-to-br from-primary-container/20 to-surface-container-highest border border-primary/20 rounded-2xl p-md relative overflow-hidden">
                    <div className="flex gap-md relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                        <span className="material-symbols-outlined text-primary">auto_awesome</span>
                      </div>
                      <div className="flex flex-col gap-xs">
                        <h4 className="font-label-md text-label-md text-on-surface">FinAI Insight</h4>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          "{aiSummary}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
