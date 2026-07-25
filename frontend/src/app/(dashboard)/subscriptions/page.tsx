"use client";

import { useState } from 'react';
import { useSubscriptions, useSubscriptionLeaks, useAddSubscription } from '@/hooks/useSubscriptions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function SubscriptionsPage() {
  const queryClient = useQueryClient();
  const { data: subsData, isLoading } = useSubscriptions('active');
  const { data: leaksData } = useSubscriptionLeaks();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({ amount: '', custom_name: '', next_date: new Date().toISOString().slice(0, 16) });

  const addMutation = useAddSubscription();

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMutation.mutateAsync({
      amount: parseFloat(addForm.amount),
      custom_name: addForm.custom_name,
      next_date: new Date(addForm.next_date).toISOString(),
    });
    setIsAddModalOpen(false);
    setAddForm({ amount: '', custom_name: '', next_date: new Date().toISOString().slice(0, 16) });
  };

  const detectMutation = useMutation({
    mutationFn: () => api.post('/subscriptions/detect'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscriptions'] }),
  });

  const subs = subsData?.items ?? [];
  const leaks = leaksData ?? {};

  const totalMonthly = subs.reduce((acc: number, s: any) => acc + (s.amount ?? 0), 0);

  return (
    <>
      <div className="flex flex-col w-full">

        <div className="flex items-center justify-between mb-xl pb-md">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-xs">Subscription Hub</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Manage your recurring payments and identify potential savings.</p>
          </div>
          <div className="flex gap-sm">
            <button
              onClick={() => detectMutation.mutate()}
              disabled={detectMutation.isPending}
              className="bg-surface-container text-on-surface font-label-md text-label-md py-sm px-md rounded-xl flex items-center gap-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              {detectMutation.isPending ? 'Detecting...' : 'Detect AI'}
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-on-primary font-label-md text-label-md py-sm px-md rounded-xl flex items-center gap-xs hover:bg-primary-fixed transition-colors shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Subscription
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-xl">

          {/* Leak Report Card */}
          <div className="col-span-1 lg:col-span-2 bg-surface-container rounded-2xl p-md flex flex-col md:flex-row gap-lg items-center relative overflow-hidden group hover:bg-surface-container-high transition-colors">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-110 duration-500"></div>

            <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-surface-container-highest" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="0" strokeWidth="8"></circle>
                <circle
                  className="text-tertiary drop-shadow-[0_0_10px_rgba(255,179,173,0.5)] transition-all duration-1000 ease-out"
                  cx="50" cy="50" fill="none" r="45" stroke="currentColor"
                  strokeDasharray="283"
                  strokeDashoffset={283 * (1 - Math.min((leaks.leak_score ?? 0), 1))}
                  strokeLinecap="round" strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display-lg text-headline-lg text-on-surface">{Math.round((leaks.leak_score ?? 0) * 100)}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Score</span>
              </div>
            </div>

            <div className="flex flex-col flex-1 z-10">
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-tertiary text-[24px]">warning</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Leak Report</h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-md max-w-[448px]">
                {leaks.unused?.length > 0 || leaks.duplicates?.length > 0
                  ? `We identified ${leaks.unused?.length ?? 0} unused and ${leaks.duplicates?.length ?? 0} duplicate services.`
                  : 'Your subscription health looks good. No major issues detected.'}
              </p>
              <div className="bg-tertiary-container/10 border border-tertiary-container/20 rounded-xl p-md flex items-center justify-between mt-auto">
                <div>
                  <p className="font-label-md text-label-md text-tertiary mb-xs">Potential Savings</p>
                  <p className="font-headline-md text-headline-md text-on-surface">₹{leaks.potential_savings?.toLocaleString() ?? 0} <span className="font-body-md text-body-md text-on-surface-variant">/mo</span></p>
                </div>
                <button className="bg-tertiary text-on-tertiary font-label-md text-label-md py-sm px-md rounded-xl hover:bg-tertiary-fixed transition-colors shadow-lg shadow-tertiary/20">
                  Review Matches
                </button>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="col-span-1 bg-surface-container rounded-2xl p-md flex flex-col justify-between hover:bg-surface-container-high transition-colors">
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Total Monthly Spend</p>
              <h2 className="font-display-lg text-display-lg text-on-surface mb-sm">₹{totalMonthly.toLocaleString()}</h2>
              <div className="flex items-center gap-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">subscriptions</span>
                <span className="font-label-md text-label-md">{subs.length} active subscriptions</span>
              </div>
            </div>
            <div className="mt-lg">
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-sm uppercase tracking-wider">Recommendations</p>
              <div className="space-y-sm">
                {(leaks.recommendations ?? []).slice(0, 3).map((rec: string, i: number) => (
                  <div key={i} className="flex items-start gap-xs">
                    <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">lightbulb</span>
                    <span className="font-body-md text-body-md text-on-surface-variant text-sm">{rec}</span>
                  </div>
                ))}
                {!leaks.recommendations?.length && (
                  <p className="text-on-surface-variant text-sm">No recommendations yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Grid */}
        <div className="flex flex-col gap-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-md mb-sm">
            <h3 className="font-headline-md text-headline-md text-on-surface">Active Subscriptions</h3>
          </div>

          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <span className="text-on-surface-variant">Loading subscriptions...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
              {subs.map((sub: any) => (
                <div key={sub.id} className="bg-surface-container rounded-2xl p-md flex flex-col group hover:-translate-y-1 transition-transform duration-300 relative shadow-md">
                  <div className="flex items-start justify-between mb-md">
                    <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center shadow-inner">
                      <span className="material-symbols-outlined text-on-surface text-[24px]">subscriptions</span>
                    </div>
                    <button className="text-on-surface-variant hover:text-on-surface transition-colors p-xs rounded-full hover:bg-surface-container-highest">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </div>
                  <h4 className="font-headline-md text-on-surface mb-xs">{sub.custom_name ?? sub.merchant?.name ?? 'Unknown'}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-lg">{sub.category?.name ?? 'Subscription'}</p>
                  <div className="mt-auto pt-md border-t border-outline-variant/30 flex items-end justify-between">
                    <div>
                      <p className="font-headline-md text-headline-md text-on-surface">₹{sub.amount?.toLocaleString()} <span className="font-label-md text-label-md text-on-surface-variant font-normal">/{sub.frequency ?? 'mo'}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="font-label-sm text-label-sm text-on-surface-variant mb-xs">Next billing</p>
                      <p className="font-label-md text-label-md text-on-surface">{sub.next_date ? new Date(sub.next_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}</p>
                    </div>
                  </div>
                </div>
              ))}

              {subs.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-xl text-on-surface-variant gap-sm">
                  <span className="material-symbols-outlined text-[48px]">subscriptions</span>
                  <p className="font-body-md">No active subscriptions found. Click "Detect AI" to scan your transactions.</p>
                </div>
              )}

              <button onClick={() => setIsAddModalOpen(true)} className="bg-surface-container/50 border-2 border-dashed border-outline-variant/30 rounded-2xl p-md flex flex-col items-center justify-center group hover:bg-surface-container hover:border-primary/50 transition-all min-h-[200px]">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-md group-hover:scale-110 transition-transform group-hover:bg-primary/20 group-hover:text-primary text-on-surface-variant">
                  <span className="material-symbols-outlined text-[32px]">add</span>
                </div>
                <h4 className="font-headline-md text-on-surface mb-xs">Track New</h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-center">Add a subscription manually.</p>
              </button>
            </div>
          )}
        </div>

        {isAddModalOpen && (
          <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsAddModalOpen(false)}>
            <form 
              onSubmit={handleAddSubmit}
              className="bg-surface-container rounded-2xl w-full max-w-[448px] p-lg flex flex-col gap-md shadow-2xl border border-outline-variant/30" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-sm">
                <h3 className="font-headline-md text-headline-md text-on-surface">Add Subscription</h3>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface">Service Name</label>
                <input required type="text" value={addForm.custom_name} onChange={e => setAddForm({...addForm, custom_name: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Netflix" />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface">Amount (₹)</label>
                <input required type="number" step="0.01" value={addForm.amount} onChange={e => setAddForm({...addForm, amount: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="0.00" />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface">Next Billing Date</label>
                <input required type="datetime-local" value={addForm.next_date} onChange={e => setAddForm({...addForm, next_date: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <button 
                type="submit" 
                disabled={addMutation.isPending}
                className="mt-sm bg-primary text-on-primary py-sm rounded-xl font-label-md hover:bg-primary-fixed transition-colors disabled:opacity-50"
              >
                {addMutation.isPending ? 'Saving...' : 'Save Subscription'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
