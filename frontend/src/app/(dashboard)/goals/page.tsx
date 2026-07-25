"use client";

import { useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function GoalsPage() {
  const queryClient = useQueryClient();
  const { data: goalsData, isLoading } = useGoals();
  const goals = goalsData?.items || [];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', target_amount: '', deadline: '' });

  const addMutation = useMutation({
    mutationFn: (data: { name: string; target_amount: number; deadline?: string }) => api.post('/goals', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setIsAddModalOpen(false);
      setAddForm({ name: '', target_amount: '', deadline: '' });
    },
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate({
      name: addForm.name,
      target_amount: parseFloat(addForm.target_amount),
      deadline: addForm.deadline || undefined,
    });
  };

  const totalTarget = goals.reduce((acc: number, goal: any) => acc + (goal.target_amount || 0), 0);
  const totalSaved = goals.reduce((acc: number, goal: any) => acc + (goal.current_amount || 0), 0);
  const percentSaved = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <>
      <div className="flex flex-col w-full gap-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface mb-xs">Financial Goals</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Track your progress, adjust timelines, and stay motivated on your path to financial freedom.
            </p>
          </div>
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-sm bg-primary text-on-primary px-lg py-sm rounded-full shadow-lg hover:shadow-xl hover:bg-primary-fixed-dim transition-all group shrink-0">
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-90">add</span>
            <span className="font-label-md text-label-md font-semibold">New Goal</span>
          </button>
        </div>

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
                <span className="font-label-sm text-label-sm">Across {goals.length} active goals</span>
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
                <span className="font-body-md text-body-md text-on-surface-variant mb-1">/ {percentSaved}%</span>
              </div>
              <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-md overflow-hidden">
                <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${percentSaved}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-gutter">
          <div className="flex items-center justify-between mb-sm">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Active Pursuits</h2>
          </div>

          {isLoading ? (
            <div className="text-on-surface-variant">Loading goals...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {goals.map((goal: any) => {
                const pct = goal.target_amount > 0 ? (goal.current_amount / goal.target_amount) * 100 : 0;
                const isCompleted = goal.status === 'completed' || pct >= 100;

                return (
                  <div key={goal.id} className={`backdrop-blur-xl rounded-2xl p-md flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 ${isCompleted ? 'bg-surface-container-lowest/40 border border-outline-variant/10 opacity-70 hover:opacity-100' : 'bg-surface-container/60'}`}>
                    <div className="flex items-start justify-between mb-lg relative z-10">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${isCompleted ? 'bg-surface-container text-on-surface-variant' : 'bg-surface-container-highest text-secondary'}`}>
                        <span className="material-symbols-outlined text-[24px]">{isCompleted ? 'task_alt' : 'shield'}</span>
                      </div>
                      <div className={`flex items-center gap-xs px-sm py-1 rounded-full backdrop-blur-sm ${isCompleted ? 'bg-surface-container' : 'bg-surface-container-highest/50'}`}>
                        {!isCompleted && <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>}
                        {isCompleted && <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>}
                        <span className="font-label-sm text-label-sm text-on-surface">{isCompleted ? 'Completed' : 'Active'}</span>
                      </div>
                    </div>
                    
                    <div className="mb-xl relative z-10">
                      <h3 className={`font-headline-md text-headline-md mb-xs ${isCompleted ? 'text-on-surface-variant line-through decoration-outline-variant/50' : 'text-on-surface'}`}>{goal.name}</h3>
                    </div>

                    <div className="mt-auto relative z-10">
                      <div className="flex items-end justify-between mb-sm">
                        <div className="flex flex-col">
                          <span className={`font-headline-md text-headline-md ${isCompleted ? 'text-on-surface-variant' : 'text-on-surface'}`}>₹{goal.current_amount.toLocaleString()}</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">of ₹{goal.target_amount.toLocaleString()}</span>
                        </div>
                        <span className="font-label-md text-label-md text-secondary">{Math.min(pct, 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-2 mb-md overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-secondary-fixed-dim to-secondary rounded-full" style={{ width: `${Math.min(pct, 100)}%` }}></div>
                      </div>
                      
                      <div className="flex items-center gap-sm bg-surface-container-lowest/50 p-sm rounded-xl">
                        <span className="material-symbols-outlined text-[18px] text-tertiary-container">timer</span>
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Deadline</span>
                          <span className="font-label-md text-label-md text-on-surface">{goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {goals.length === 0 && <div className="text-on-surface-variant">No goals found.</div>}
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsAddModalOpen(false)}>
          <form onSubmit={handleAddSubmit} className="bg-surface-container rounded-2xl w-full max-w-[448px] p-lg flex flex-col gap-md shadow-2xl border border-outline-variant/30" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-sm">
              <h3 className="font-headline-md text-headline-md text-on-surface">New Goal</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-on-surface">Goal Name</label>
              <input required type="text" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Emergency Fund" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-on-surface">Target Amount (₹)</label>
              <input required type="number" step="0.01" value={addForm.target_amount} onChange={e => setAddForm({...addForm, target_amount: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="0.00" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-on-surface">Deadline</label>
              <input type="date" value={addForm.deadline} onChange={e => setAddForm({...addForm, deadline: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <button type="submit" disabled={addMutation.isPending} className="mt-sm bg-primary text-on-primary py-sm rounded-xl font-label-md hover:bg-primary-fixed transition-colors disabled:opacity-50">
              {addMutation.isPending ? 'Saving...' : 'Create Goal'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
