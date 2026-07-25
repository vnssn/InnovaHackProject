"use client";

import { useState } from 'react';
import { useMerchants, useMerchantAnalytics } from '@/hooks/useMerchants';

export default function MerchantsPage() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState('');

  const { data: merchantsData, isLoading } = useMerchants(1, 20, search || undefined);
  const { data: analyticsData, isLoading: isAnalyticsLoading } = useMerchantAnalytics(selectedId ?? '');

  const merchants = merchantsData?.items ?? [];
  const selected = merchants.find((m: any) => m.id === selectedId) ?? (selectedId ? { id: selectedId } : null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-xl">
        <section className="relative w-full flex flex-col gap-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md z-10">
            <div className="flex flex-col gap-xs">
              <h1 className="font-display-lg text-display-lg text-on-surface">Merchants</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[672px]">Analytics and spending patterns across your merchants.</p>
            </div>
            <form onSubmit={handleSearch} className="flex gap-sm">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">search</span>
                <input
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search merchants..."
                  className="bg-surface-container text-on-surface pl-10 pr-md py-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20 w-56"
                />
              </div>
              <button type="submit" className="bg-primary text-on-primary px-md py-sm rounded-xl font-label-md text-label-md hover:bg-primary-fixed transition-colors">Search</button>
            </form>
          </div>

          {/* Merchant List + Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Merchant list */}
            <div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md shadow-lg border border-outline-variant/10 flex flex-col gap-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">All Merchants</h2>
              {isLoading ? (
                <div className="flex h-32 items-center justify-center text-on-surface-variant">Loading...</div>
              ) : merchants.length === 0 ? (
                <div className="flex h-32 items-center justify-center flex-col gap-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[36px]">store</span>
                  <p className="text-sm">No merchants found.</p>
                </div>
              ) : (
                merchants.map((m: any) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`flex items-center gap-sm p-sm rounded-xl text-left transition-colors ${selectedId === m.id ? 'bg-primary/10 border border-primary/30' : 'hover:bg-surface-container-highest'}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">store</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md text-on-surface truncate">{m.name}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{m.city ?? 'Unknown city'}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Merchant Analytics */}
            <div className="lg:col-span-2 flex flex-col gap-gutter">
              {!selectedId ? (
                <div className="flex flex-col items-center justify-center h-64 bg-surface-container/40 rounded-2xl text-on-surface-variant gap-sm">
                  <span className="material-symbols-outlined text-[48px]">shopping_bag</span>
                  <p className="font-body-md">Select a merchant to view analytics</p>
                </div>
              ) : isAnalyticsLoading ? (
                <div className="flex h-64 items-center justify-center text-on-surface-variant">Loading analytics...</div>
              ) : analyticsData ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                    <div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-sm relative overflow-hidden group hover:bg-surface-container/80 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Spent</span>
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">account_balance_wallet</span>
                      </div>
                      <div className="flex items-baseline gap-xs">
                        <span className="font-headline-md text-headline-md text-on-surface-variant">₹</span>
                        <span className="font-display-lg text-display-lg text-on-surface">{(analyticsData.total_spent ?? 0).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-sm relative overflow-hidden group hover:bg-surface-container/80 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Avg. Order</span>
                        <span className="material-symbols-outlined text-secondary bg-secondary/10 p-2 rounded-lg">receipt_long</span>
                      </div>
                      <div className="flex items-baseline gap-xs">
                        <span className="font-headline-md text-headline-md text-on-surface-variant">₹</span>
                        <span className="font-display-lg text-display-lg text-on-surface">{(analyticsData.avg_order_value ?? 0).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-sm relative overflow-hidden group hover:bg-surface-container/80 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Visit Count</span>
                        <span className="material-symbols-outlined text-tertiary bg-tertiary/10 p-2 rounded-lg">storefront</span>
                      </div>
                      <div className="flex items-baseline gap-xs">
                        <span className="font-display-lg text-display-lg text-on-surface">{analyticsData.visit_count ?? 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                    {/* Monthly Trend */}
                    <div className="lg:col-span-2 bg-surface-container/40 backdrop-blur-md rounded-3xl p-lg flex flex-col gap-md shadow-lg">
                      <h2 className="font-headline-lg text-headline-lg text-on-surface">Monthly Trend</h2>
                      {analyticsData.monthly_trend?.length > 0 ? (
                        <div className="flex flex-col gap-sm">
                          {analyticsData.monthly_trend.map((item: any) => {
                            const max = Math.max(...(analyticsData.monthly_trend?.map((t: any) => t.total) ?? [1]));
                            const pct = max > 0 ? (item.total / max) * 100 : 0;
                            return (
                              <div key={item.month} className="flex items-center gap-sm">
                                <span className="font-label-sm text-label-sm text-on-surface-variant w-12 shrink-0">{item.month}</span>
                                <div className="flex-1 bg-surface-container-highest rounded-full h-2 overflow-hidden">
                                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }}></div>
                                </div>
                                <span className="font-label-sm text-label-sm text-on-surface-variant w-20 text-right">₹{item.total?.toLocaleString()}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-on-surface-variant text-sm">No trend data available.</p>
                      )}
                    </div>

                    {/* Merchant Details */}
                    <div className="bg-surface-container/40 backdrop-blur-md rounded-3xl p-lg flex flex-col gap-md shadow-lg">
                      <h3 className="font-headline-md text-headline-md text-on-surface">Details</h3>
                      <div className="flex flex-col gap-md">
                        {analyticsData.first_transaction && (
                          <div className="flex flex-col gap-xs p-md bg-surface-container-high/50 rounded-2xl">
                            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">First Visit</span>
                            <span className="font-body-lg text-body-lg text-on-surface font-medium">
                              {new Date(analyticsData.first_transaction).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        )}
                        {analyticsData.latest_transaction && (
                          <div className="flex flex-col gap-xs p-md bg-surface-container-high/50 rounded-2xl">
                            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Last Visit</span>
                            <span className="font-body-lg text-body-lg text-on-surface font-medium">
                              {new Date(analyticsData.latest_transaction).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        )}
                        {analyticsData.payment_frequency && (
                          <div className="flex flex-col gap-xs p-md bg-surface-container-high/50 rounded-2xl">
                            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Frequency</span>
                            <span className="font-body-lg text-body-lg text-on-surface font-medium">{analyticsData.payment_frequency}</span>
                          </div>
                        )}
                        {analyticsData.most_common_day && (
                          <div className="flex flex-col gap-xs p-md bg-surface-container-high/50 rounded-2xl">
                            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Common Day</span>
                            <span className="font-body-lg text-body-lg text-on-surface font-medium">{analyticsData.most_common_day}</span>
                          </div>
                        )}
                        {analyticsData.location?.city && (
                          <div className="mt-auto pt-md flex items-center justify-between text-on-surface-variant">
                            <span className="font-label-sm text-label-sm uppercase">Location: {analyticsData.location.city}</span>
                            <span className="material-symbols-outlined text-[20px]">location_on</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
