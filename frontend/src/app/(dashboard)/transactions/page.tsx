"use client";

import { useState } from 'react';
import { useTransactions, useAddTransaction, TransactionFilters } from '@/hooks/useTransactions';
import { useLocationCities } from '@/hooks/useLocations';
import { api } from '@/lib/api';

export default function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    size: 20,
    search: '',
  });

  const [selectedTxnId, setSelectedTxnId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({ amount: '', description: '', city: '', transaction_date: new Date().toISOString().slice(0, 16) });
  const [isExporting, setIsExporting] = useState(false);

  const addMutation = useAddTransaction();

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMutation.mutateAsync({
      amount: parseFloat(addForm.amount),
      description: addForm.description,
      city: addForm.city ? addForm.city.trim() : undefined,
      transaction_date: new Date(addForm.transaction_date).toISOString(),
    });
    setIsAddModalOpen(false);
    setAddForm({ amount: '', description: '', city: '', transaction_date: new Date().toISOString().slice(0, 16) });
  };

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      const response = await api.get('/transactions', { 
        params: { 
          page: 1, 
          size: 5000, 
          search: filters.search || undefined,
          sort_by: 'transaction_date', 
          sort_order: 'desc' 
        } 
      });
      const items = response.data?.items || [];
      if (items.length === 0) {
        alert("No transactions available to export.");
        return;
      }

      const headers = ["ID", "Date", "Description", "Merchant", "Category", "Amount", "Status", "Payment Method", "Provider"];
      const rows = items.map((t: any) => [
        t.id || "",
        t.transaction_date ? new Date(t.transaction_date).toLocaleDateString() : "",
        `"${(t.description || "").replace(/"/g, '""')}"`,
        `"${(t.merchant_name || t.provider || "General").replace(/"/g, '""')}"`,
        `"${(t.category_name || "Uncategorized").replace(/"/g, '""')}"`,
        t.amount || 0,
        t.status || "completed",
        t.payment_method || "UPI",
        t.provider || "SpendSense"
      ]);

      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `spendsense_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to export CSV:", err);
      alert("Failed to generate CSV report. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const { data: transactionsData, isLoading } = useTransactions(filters);
  const selectedTxn = transactionsData?.items?.find((t: any) => t.id === selectedTxnId);
  const { data: citiesData } = useLocationCities();
  const topCity = citiesData?.items?.[0];

  return (
    <>
      <div className="flex flex-col w-full h-full p-md gap-lg">

        {topCity && (
          <div className="w-full bg-gradient-to-r from-primary/15 via-surface-container-high to-surface-container border border-primary/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-[28px]">location_city</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm uppercase tracking-wider text-primary font-bold">Location Intelligence Insight</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wide">Top Expenditure Zone</span>
                </div>
                <h3 className="font-headline-md text-lg font-bold text-on-surface mt-0.5">
                  Highest Expenditure City: <span className="text-primary underline decoration-primary/40 underline-offset-4">{topCity.city || 'Unknown'}</span>
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-6 bg-surface/60 px-5 py-2.5 rounded-xl border border-outline-variant/20 shrink-0">
              <div className="flex flex-col text-right">
                <span className="text-xs text-on-surface-variant font-medium">Total Spend in {topCity.city}</span>
                <span className="font-headline-md text-lg font-bold text-on-surface">₹{topCity.total?.toLocaleString()}</span>
              </div>
              <div className="h-8 w-[1px] bg-outline-variant/30"></div>
              <div className="flex flex-col text-right">
                <span className="text-xs text-on-surface-variant font-medium">Share of Total</span>
                <span className="font-headline-md text-lg font-bold text-secondary-fixed">{topCity.percentage?.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md z-20">
          <div className="flex flex-col gap-xs">
            <h1 className="font-display-lg text-display-lg text-on-surface">Transactions</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Review and manage your financial activity across all linked accounts.</p>
          </div>
          <div className="flex items-center gap-sm">
            <button 
              onClick={handleExportCSV} 
              disabled={isExporting}
              className="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-md py-sm rounded-lg transition-colors flex items-center gap-sm shadow-sm backdrop-blur-md border border-outline-variant/20 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">{isExporting ? 'sync' : 'download'}</span>
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </button>
            <button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary-fixed text-on-primary font-label-md text-label-md px-md py-sm rounded-lg transition-colors flex items-center gap-sm shadow-md">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Manual Entry
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-md z-10">

          <div className="col-span-1 lg:col-span-8 bg-surface-container/40 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-md shadow-lg border border-outline-variant/10">
            <div className="flex justify-between items-center pb-sm border-b border-outline-variant/20">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">filter_alt</span> Filters
              </h2>
              <button onClick={() => setFilters({ page: 1, size: 20, search: '' })} className="text-primary hover:text-primary-fixed font-label-sm text-label-sm uppercase tracking-wider transition-colors">Clear All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">

              <div className="flex flex-col gap-xs pt-sm">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Keywords</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] z-10 pointer-events-none">search</span>
                  <input 
                    className="w-full bg-surface-container-highest/60 text-on-surface font-body-md text-body-md pl-10 pr-sm py-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all backdrop-blur-sm border border-outline-variant/20" 
                    placeholder="Search merchant..." 
                    type="text"
                    value={filters.search || ''}
                    onChange={(e) => setFilters(f => ({ ...f, search: e.target.value, page: 1 }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-4 bg-gradient-to-br from-primary-container to-surface-container rounded-2xl p-md flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-48 h-48 bg-primary/20 blur-3xl rounded-full mix-blend-screen pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            <div className="z-10 flex flex-col gap-xs">
              <span className="font-label-md text-label-md text-on-primary-container/80 uppercase tracking-wider">Total Results</span>
              <div className="font-display-lg text-display-lg text-on-primary-container flex items-baseline">
                {transactionsData?.total ?? 0}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden relative z-0 border border-outline-variant/10">
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse" id="transaction-table">
              <thead className="sticky top-0 bg-surface-container/95 backdrop-blur-md z-10">
                <tr>
                  <th className="hidden md:table-cell p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold whitespace-nowrap">Txn ID</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer hover:text-primary transition-colors group">
                    Date
                  </th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Merchant / Details</th>
                  <th className="hidden sm:table-cell p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Category</th>
                  <th className="p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer hover:text-primary transition-colors group text-right">
                    Amount
                  </th>
                  <th className="hidden md:table-cell p-md font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {isLoading ? (
                  <tr><td colSpan={6} className="p-md text-center text-on-surface">Loading transactions...</td></tr>
                ) : transactionsData?.items?.length === 0 ? (
                  <tr><td colSpan={6} className="p-md text-center text-on-surface">No transactions found.</td></tr>
                ) : (
                  transactionsData?.items?.map((txn: any) => (
                    <tr 
                      key={txn.id}
                      onClick={() => setSelectedTxnId(txn.id)}
                      className="hover:bg-surface-container/50 transition-colors cursor-pointer group"
                    >
                      <td className="hidden md:table-cell p-md font-body-md text-body-md text-on-surface-variant font-mono text-sm whitespace-nowrap">#{txn.reference_number || txn.id.substring(0,8)}</td>
                      <td className="p-md font-body-md text-body-md text-on-surface whitespace-nowrap">
                        {new Date(txn.transaction_date).toLocaleDateString()}
                      </td>
                      <td className="p-md">
                        <div className="flex items-center gap-sm">
                          <div className="hidden sm:flex w-10 h-10 rounded-full bg-surface-container-highest items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-on-surface text-[20px]">receipt</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-body-md text-body-md text-on-surface font-semibold truncate">{txn.merchant_name || txn.description}</span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant truncate flex items-center gap-1">
                              <span>{txn.provider}</span>
                              {txn.city && (
                                <span className="inline-flex items-center gap-0.5 text-primary ml-1 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[11px] font-semibold">
                                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                                  {txn.city}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell p-md">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm border border-outline-variant/20">
                          {txn.category_name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="p-md font-body-md text-body-md text-right whitespace-nowrap">
                        <span className="text-on-surface font-semibold">₹{txn.amount.toLocaleString()}</span>
                      </td>
                      <td className="hidden md:table-cell p-md">
                        <div className="flex items-center gap-xs text-secondary">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          <span className="font-label-sm text-label-sm">{txn.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-md border-t border-outline-variant/20 bg-surface-container/50 backdrop-blur-sm flex items-center justify-between">
            <span className="font-body-md text-body-md text-on-surface-variant">Page {filters.page} of {transactionsData?.pages || 1}</span>
            <div className="flex items-center gap-xs">
              <button 
                onClick={() => setFilters(f => ({ ...f, page: Math.max(1, f.page - 1) }))}
                disabled={filters.page === 1}
                className="w-8 h-8 rounded-full bg-surface-container-highest hover:bg-surface-variant flex items-center justify-center text-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button 
                onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
                disabled={!transactionsData?.pages || filters.page >= transactionsData.pages}
                className="w-8 h-8 rounded-full bg-surface-container-highest hover:bg-surface-variant flex items-center justify-center text-on-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {selectedTxn && (
          <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-end" id="drawer-overlay" onClick={() => setSelectedTxnId(null)}>
            <div className="h-full w-full max-w-[448px] bg-surface-container border-l border-outline-variant/30 shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-md border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/50 sticky top-0 backdrop-blur-md z-10">
                <h3 className="font-headline-md text-headline-md text-on-surface">Transaction Details</h3>
                <button onClick={() => setSelectedTxnId(null)} className="p-xs hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-on-surface" >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-md flex flex-col gap-lg">
                <div className="flex flex-col items-center text-center gap-sm py-md">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center shadow-inner mb-sm">
                    <span className="material-symbols-outlined text-on-surface text-[32px]">receipt</span>
                  </div>
                  <h4 className="font-headline-lg text-headline-lg text-on-surface">{selectedTxn.merchant_name || selectedTxn.description}</h4>
                  <div className="font-display-lg text-display-lg text-on-surface">₹{selectedTxn.amount.toLocaleString()}</div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-md text-label-md mt-sm">
                    <span className="material-symbols-outlined text-[16px] mr-1">check_circle</span> {selectedTxn.status}
                  </span>
                </div>
                
                <hr className="border-outline-variant/20"/>

                <div className="grid grid-cols-2 gap-y-md gap-x-sm">
                  <div className="flex flex-col gap-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Date &amp; Time</span>
                    <span className="font-body-md text-body-md text-on-surface">{new Date(selectedTxn.transaction_date).toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Transaction ID</span>
                    <span className="font-body-md text-body-md text-on-surface font-mono text-sm">{selectedTxn.id}</span>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Payment Method</span>
                    <span className="font-body-md text-body-md text-on-surface">{selectedTxn.provider}</span>
                  </div>
                  <div className="flex flex-col gap-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Category</span>
                    <span className="font-body-md text-body-md text-on-surface">{selectedTxn.category_name || 'Uncategorized'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAddModalOpen && (
          <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setIsAddModalOpen(false)}>
            <form 
              onSubmit={handleAddSubmit}
              className="bg-surface-container rounded-2xl w-full max-w-[448px] p-lg flex flex-col gap-md shadow-2xl border border-outline-variant/30" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-sm">
                <h3 className="font-headline-md text-headline-md text-on-surface">Add Transaction</h3>
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface">Amount (₹)</label>
                <input required type="number" step="0.01" value={addForm.amount} onChange={e => setAddForm({...addForm, amount: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="0.00" />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface">Description / Merchant</label>
                <input required type="text" value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Groceries" />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  <span>Location (City)</span>
                </label>
                <input type="text" value={addForm.city || ''} onChange={e => setAddForm({...addForm, city: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" placeholder="e.g. Mumbai, Bengaluru, Delhi, London..." />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-on-surface">Date</label>
                <input required type="datetime-local" value={addForm.transaction_date} onChange={e => setAddForm({...addForm, transaction_date: e.target.value})} className="bg-surface-container-highest p-sm rounded-lg text-on-surface focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>

              <button 
                type="submit" 
                disabled={addMutation.isPending}
                className="mt-sm bg-primary text-on-primary py-sm rounded-xl font-label-md hover:bg-primary-fixed transition-colors disabled:opacity-50"
              >
                {addMutation.isPending ? 'Saving...' : 'Save Transaction'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
