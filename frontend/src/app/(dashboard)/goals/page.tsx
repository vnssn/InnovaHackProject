"use client";

import { useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

const GOAL_ICONS: Record<string, string> = {
  emergency: 'shield',
  savings: 'savings',
  travel: 'flight_takeoff',
  car: 'directions_car',
  house: 'home',
  education: 'school',
  default: 'flag',
};

function getGoalIcon(name: string) {
  const lower = name.toLowerCase();
  for (const key of Object.keys(GOAL_ICONS)) {
    if (lower.includes(key)) return GOAL_ICONS[key];
  }
  return GOAL_ICONS.default;
}

const GRADIENT_CLASSES = [
  'from-secondary-fixed-dim to-secondary',
  'from-primary-container to-primary',
  'from-tertiary-container to-tertiary',
  'from-surface-variant to-surface-container-highest',
];

export default function GoalsPage() {
  const queryClient = useQueryClient();
  const { data: goalsData, isLoading, isError } = useGoals();
  const goals = goalsData?.items ?? [];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', target_amount: '', current_amount: '', deadline: '' });

  const createGoal = useMutation({
    mutationFn: (data: any) => api.post('/goals', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setShowForm(false);
      setFormData({ name: '', target_amount: '', current_amount: '', deadline: '' });
    },
  });

  const deleteGoal = useMutation({
    mutationFn: (id: string) => api.delete(`/goals/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] }),
  });

  const totalTarget = goals.reduce((a: number, g: any) => a + (g.target_amount ?? 0), 0);
  const totalSaved = goals.reduce((a: number, g: any) => a + (g.current_amount ?? 0), 0);
  const overallPct = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;
  const activeGoals = goals.filter((g: any) => g.status !== 'completed');

  const getDaysLeft = (deadline?: string) => {
    if (!deadline) return null;
    const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
    return diff;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createGoal.mutate({
      name: formData.name,
      target_amount: parseFloat(formData.target_amount),
      current_amount: formData.current_amount ? parseFloat(formData.current_amount) : 0,
      deadline: formData.deadline || undefined,
    });
  };

  return (
    <>
      <div className="flex flex-col w-full gap-gutter">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-xs">Financial Goals</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[672px]">
              Track your progress, adjust timelines, and stay motivated on your path to financial freedom.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-full shadow-lg hover:shadow-xl hover:bg-primary-fixed-dim transition-all group shrink-0"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">add</span>
            <span className="font-label-md text-label-md font-semibold">New Goal</span>
          </button>
        </div>

        {/* New Goal Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-md" onClick={() => setShowForm(false)}>
            <div className="bg-surface-container rounded-2xl p-lg w-full max-w-[448px] shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">Create New Goal</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-xs block">Goal Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-surface-container-highest text-on-surface px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Emergency Fund"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-xs block">Target Amount (₹)</label>
                  <input
                    required
                    type="number"
                    value={formData.target_amount}
                    onChange={e => setFormData(f => ({ ...f, target_amount: e.target.value }))}
                    className="w-full bg-surface-container-highest text-on-surface px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="500000"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-xs block">Current Amount (₹)</label>
                  <input
                    type="number"
                    value={formData.current_amount}
                    onChange={e => setFormData(f => ({ ...f, current_amount: e.target.value }))}
                    className="w-full bg-surface-container-highest text-on-surface px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-xs block">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={e => setFormData(f => ({ ...f, deadline: e.target.value }))}
                    className="w-full bg-surface-container-highest text-on-surface px-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex gap-sm mt-sm">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-sm rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-colors">Cancel</button>
                  <button type="submit" disabled={createGoal.isPending} className="flex-1 py-sm rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed transition-colors disabled:opacity-50">
                    {createGoal.isPending ? 'Creating...' : 'Create Goal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-xl relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/5 to-tertiary/10 blur-2xl -z-10 rounded-full opacity-50"></div>

          <div className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-md flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-lg relative z-10">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Total Target</span>
              <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">flag</span>
              </div>
            </div>
            <div className="relative z-10">
              <span className="font-headline-md text-headline-md text-on-surface">₹{totalTarget.toLocaleString()}</span>
              <div className="flex items-center gap-xs mt-xs text-secondary">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span className="font-label-sm text-label-sm">Across {activeGoals.length} active goals</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-md flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-lg relative z-10">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Total Saved</span>
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-end gap-sm">
                <span className="font-headline-md text-headline-md text-on-surface">₹{totalSaved.toLocaleString()}</span>
                <span className="font-body-md text-body-md text-on-surface-variant mb-1">/ {overallPct}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-md overflow-hidden">
                <div className="bg-secondary h-1.5 rounded-full transition-all duration-700" style={{ width: `${Math.min(overallPct, 100)}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container/80 backdrop-blur-md rounded-2xl p-md flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-lg relative z-10">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Active Goals</span>
              <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-container">
                <span className="material-symbols-outlined text-[20px]">event</span>
              </div>
            </div>
            <div className="relative z-10">
              <span className="font-headline-md text-headline-md text-on-surface">{activeGoals.length}</span>
              <div className="flex items-center gap-xs mt-xs text-on-surface-variant">
                <span className="font-label-sm text-label-sm">{goals.filter((g: any) => g.status === 'completed').length} completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="flex flex-col gap-gutter">
          <div className="flex items-center justify-between mb-sm">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Active Pursuits</h2>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <span className="text-on-surface-variant">Loading goals...</span>
            </div>
          ) : isError ? (
            <div className="flex h-64 items-center justify-center text-error">
              <span>Failed to load goals. Please try again.</span>
            </div>
          ) : goals.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-xl text-on-surface-variant gap-sm bg-surface-container rounded-2xl">
              <span className="material-symbols-outlined text-[48px]">flag</span>
              <p className="font-body-md">No goals yet. Click "New Goal" to set your first financial target.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {goals.map((goal: any, i: number) => {
                const pct = goal.target_amount > 0 ? Math.round((goal.current_amount / goal.target_amount) * 100) : 0;
                const daysLeft = getDaysLeft(goal.deadline);
                const isCompleted = goal.status === 'completed' || pct >= 100;
                const gradient = GRADIENT_CLASSES[i % GRADIENT_CLASSES.length];
                const icon = getGoalIcon(goal.name);

                return (
                  <div key={goal.id} className={`bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${isCompleted ? 'opacity-70' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex items-start justify-between mb-lg relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary shadow-lg">
                        <span className="material-symbols-outlined text-[24px]">{icon}</span>
                      </div>
                      <div className="flex items-center gap-xs">
                        <div className={`flex items-center gap-xs px-sm py-1 rounded-full backdrop-blur-sm ${isCompleted ? 'bg-surface-container-highest/50' : 'bg-surface-container-highest/50'}`}>
                          {isCompleted ? (
                            <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                          )}
                          <span className="font-label-sm text-label-sm text-on-surface">{isCompleted ? 'Completed' : 'Active'}</span>
                        </div>
                        <button
                          onClick={() => deleteGoal.mutate(goal.id)}
                          className="p-1 text-on-surface-variant hover:text-error transition-colors rounded-full hover:bg-error/10"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="mb-xl relative z-10">
                      <h3 className={`font-headline-md text-headline-md text-on-surface mb-xs ${isCompleted ? 'line-through decoration-outline-variant/50' : ''}`}>{goal.name}</h3>
                    </div>

                    <div className="mt-auto relative z-10">
                      <div className="flex items-end justify-between mb-sm">
                        <div className="flex flex-col">
                          <span className="font-headline-md text-headline-md text-on-surface">₹{(goal.current_amount ?? 0).toLocaleString()}</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">of ₹{(goal.target_amount ?? 0).toLocaleString()}</span>
                        </div>
                        <span className="font-label-md text-label-md text-secondary">{Math.min(pct, 100)}%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-2 mb-md overflow-hidden relative">
                        <div
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        ></div>
                      </div>
                      {goal.deadline && (
                        <div className="flex items-center gap-sm bg-surface-container-lowest/80 backdrop-blur-md p-sm rounded-xl">
                          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_month</span>
                          <div className="flex flex-col">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">{isCompleted ? 'Achieved' : 'Target Date'}</span>
                            <span className="font-label-md text-label-md text-on-surface">
                              {new Date(goal.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              {daysLeft !== null && !isCompleted && ` (${daysLeft > 0 ? `${daysLeft} days` : 'Overdue'})`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
