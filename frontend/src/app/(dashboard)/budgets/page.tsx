"use client";

import { useState } from 'react';
import { useBudgets } from '@/hooks/useBudgets';
import { useCategories } from '@/hooks/useCategories';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

const CATEGORY_ICONS: Record<string, string> = {
  dining: 'restaurant',
  food: 'restaurant',
  groceries: 'shopping_cart',
  utilities: 'bolt',
  transport: 'directions_car',
  entertainment: 'movie',
  shopping: 'shopping_bag',
  health: 'favorite',
  default: 'account_balance_wallet',
};

function getBudgetColor(pct: number) {
  if (pct >= 90) return 'bg-error';
  if (pct >= 70) return 'bg-tertiary';
  return 'bg-secondary';
}

function getIconForCategory(name: string) {
  const lower = name.toLowerCase();
  for (const key of Object.keys(CATEGORY_ICONS)) {
    if (lower.includes(key)) return CATEGORY_ICONS[key];
  }
  return CATEGORY_ICONS['default'];
}

export default function BudgetsPage() {
  const queryClient = useQueryClient();
  const { data: budgetsData, isLoading } = useBudgets();
  const { data: categoriesData } = useCategories();
  const budgets = budgetsData?.items ?? [];
  const categories = categoriesData?.items ?? [];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ category_id: '', monthly_limit: '' });

  const totalLimit = budgets.reduce((acc: number, b: any) => acc + (b.monthly_limit ?? 0), 0);
  const totalSpent = budgets.reduce((acc: number, b: any) => acc + (b.spent ?? 0), 0);
  const totalRemaining = totalLimit - totalSpent;
  const totalPct = totalLimit > 0 ? Math.round((totalSpent / totalLimit) * 100) : 0;
  const currentMonth = new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' });

  const createBudget = useMutation({
    mutationFn: (data: any) => api.post('/budgets', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      setShowForm(false);
      setFormData({ category_id: '', monthly_limit: '' });
    },
  });

  const deleteBudget = useMutation({
    mutationFn: (id: string) => api.delete(`/budgets/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBudget.mutate({
      category_id: formData.category_id,
      monthly_limit: parseFloat(formData.monthly_limit),
    });
  };

  return (
    <>
      <div className="flex flex-col w-full gap-xl py-xl relative">

        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
          <div className="absolute top-[30%] -right-[10%] w-[35%] h-[50%] rounded-full bg-secondary/5 blur-[100px]"></div>
        </div>

        {/* Create Budget Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-md" onClick={() => setShowForm(false)}>
            <div className="bg-surface-container rounded-2xl p-lg w-full max-w-[400px] shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Create Budget</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-xs block">Category</label>
                  <select
                    required
                    value={formData.category_id}
                    onChange={e => setFormData(f => ({ ...f, category_id: e.target.value }))}
                    className="w-full bg-surface-container-highest text-on-surface px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-xs block">Monthly Limit (₹)</label>
                  <input
                    required
                    type="number"
                    value={formData.monthly_limit}
                    onChange={e => setFormData(f => ({ ...f, monthly_limit: e.target.value }))}
                    className="w-full bg-surface-container-highest text-on-surface px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="5000"
                  />
                </div>
                <div className="flex gap-sm mt-sm">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-sm rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-colors">Cancel</button>
                  <button type="submit" disabled={createBudget.isPending} className="flex-1 py-sm rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed transition-colors disabled:opacity-50">
                    {createBudget.isPending ? 'Creating...' : 'Create'}
                  </button>
                </div>
                {createBudget.isError && (
                  <p className="text-error text-sm">Failed to create budget. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-md relative z-10 px-md md:px-0">
          <div className="flex flex-col gap-xs">
            <h1 className="font-display-lg text-display-lg text-on-background relative">
              Budgets
              <span className="absolute -top-4 -right-12 font-label-sm text-label-sm text-secondary px-2 py-1 bg-secondary/10 rounded-full">
                {new Date().toLocaleString('default', { month: 'short' }).toUpperCase()}
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[672px]">Monitor your spending velocity across all categories.</p>
          </div>
          <div className="flex items-center gap-sm">
            <button className="flex items-center gap-2 px-md py-sm bg-surface-container-high hover:bg-surface-container-highest transition-colors rounded-full text-on-surface font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              {currentMonth}
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center w-12 h-12 bg-primary hover:bg-primary-container transition-colors rounded-full text-on-primary shadow-lg shadow-primary/20 group"
            >
              <span className="material-symbols-outlined transition-transform group-hover:rotate-90">add</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center relative z-10">
            <span className="text-on-surface-variant">Loading budgets...</span>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md relative z-10">
              <div className="bg-surface-container-low/60 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Budget</span>
                  <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                </div>
                <div className="flex items-baseline gap-xs mt-2">
                  <span className="font-display-lg text-display-lg text-on-background">₹{totalLimit.toLocaleString()}</span>
                </div>
                <div className="w-full h-1 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(totalPct, 100)}%` }}></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">₹{totalSpent.toLocaleString()} Spent</span>
                  <span className="font-label-sm text-label-sm text-primary">{totalPct}%</span>
                </div>
              </div>

              <div className="bg-surface-container-low/60 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Remaining</span>
                  <span className="material-symbols-outlined text-secondary">trending_down</span>
                </div>
                <div className="flex items-baseline gap-xs mt-2">
                  <span className="font-display-lg text-display-lg text-secondary">₹{Math.max(totalRemaining, 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-4 bg-secondary/10 px-sm py-1 rounded-full w-fit">
                  <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                  <span className="font-label-sm text-label-sm text-secondary">{budgets.length} budgets active</span>
                </div>
              </div>

              <div className="bg-surface-container-low/60 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-error/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">At Risk</span>
                  <span className="material-symbols-outlined text-error">warning</span>
                </div>
                <div className="flex items-baseline gap-xs mt-2">
                  <span className="font-display-lg text-display-lg text-on-background">
                    {budgets.filter((b: any) => b.monthly_limit > 0 && (b.spent / b.monthly_limit) >= 0.8).length}
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-tight">Budgets above 80% utilization.</p>
              </div>
            </div>

            {/* Budget Cards */}
            <div className="flex flex-col gap-md relative z-10">
              <h2 className="font-headline-lg text-headline-lg text-on-background mb-sm">Category Breakdown</h2>
              {budgets.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-xl text-on-surface-variant gap-sm bg-surface-container rounded-2xl">
                  <span className="material-symbols-outlined text-[48px]">account_balance_wallet</span>
                  <p className="font-body-md">No budgets set up yet. Click the + button to create your first budget.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-md">
                  {budgets.map((budget: any) => {
                    const pct = budget.monthly_limit > 0 ? Math.round((budget.spent / budget.monthly_limit) * 100) : 0;
                    const remaining = budget.monthly_limit - budget.spent;
                    const colorClass = getBudgetColor(pct);
                    const iconName = getIconForCategory(budget.category?.name ?? '');

                    return (
                      <div key={budget.id} className="bg-surface-container-low/40 backdrop-blur-xl p-md rounded-2xl flex flex-col gap-md hover:bg-surface-container-low/60 transition-colors group">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-sm">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pct >= 90 ? 'bg-error/20' : pct >= 70 ? 'bg-tertiary/20' : 'bg-secondary/20'}`}>
                              <span className={`material-symbols-outlined ${pct >= 90 ? 'text-error' : pct >= 70 ? 'text-tertiary' : 'text-secondary'}`}>{iconName}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="font-headline-md text-headline-md text-on-background">{budget.category?.name ?? 'Budget'}</span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">{budget.month ?? currentMonth}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteBudget.mutate(budget.id)}
                            className="text-on-surface-variant hover:text-error transition-colors p-1 opacity-0 group-hover:opacity-100"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <div className="flex flex-col gap-xs">
                          <div className="flex justify-between items-baseline">
                            <span className={`font-headline-lg text-headline-lg ${pct >= 90 ? 'text-error' : pct >= 70 ? 'text-tertiary' : 'text-secondary'}`}>
                              ₹{(budget.spent ?? 0).toLocaleString()}
                            </span>
                            <span className="font-body-md text-body-md text-on-surface-variant">/ ₹{(budget.monthly_limit ?? 0).toLocaleString()}</span>
                          </div>
                          <div className="relative w-full h-3 bg-surface-container-highest rounded-full mt-2 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                            <div
                              className={`absolute top-0 left-0 h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className={`font-label-sm text-label-sm font-semibold ${pct >= 90 ? 'text-error' : pct >= 70 ? 'text-tertiary' : 'text-secondary'}`}>{pct}% Spent</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">₹{Math.max(remaining, 0).toLocaleString()} left</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
