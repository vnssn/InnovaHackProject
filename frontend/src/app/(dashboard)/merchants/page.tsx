"use client";

import { useState } from 'react';
import { useMerchants, useMerchantAnalytics } from '@/hooks/useMerchants';

export default function MerchantsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: merchantsData, isLoading } = useMerchants();
  const { data: analytics, isLoading: isLoadingAnalytics } = useMerchantAnalytics(selectedId || '');

  const merchants = merchantsData?.items || [];

  return (
    <>
      <div className="flex flex-col w-full gap-xl">
        <section className="relative w-full flex flex-col gap-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md z-10">
            <div className="flex flex-col gap-xs">
              <h1 className="font-display-lg text-display-lg text-on-surface">Merchants</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Manage your vendors and see analytics.</p>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-on-surface-variant">Loading merchants...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md z-10">
              {merchants.map((merchant: any) => (
                <div 
                  key={merchant.id} 
                  onClick={() => setSelectedId(merchant.id)}
                  className="bg-surface-container/60 backdrop-blur-xl rounded-2xl p-md flex flex-col gap-sm relative overflow-hidden group hover:bg-surface-container/80 transition-all cursor-pointer border border-outline-variant/10"
                >
                  <div className="flex items-center gap-sm">
                    <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                       <span className="material-symbols-outlined">storefront</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface">{merchant.name}</h3>
                      <span className="font-label-sm text-on-surface-variant">{merchant.category_name || 'Uncategorized'}</span>
                    </div>
                  </div>
                </div>
              ))}
              {merchants.length === 0 && <div className="text-on-surface-variant">No merchants found.</div>}
            </div>
          )}
        </section>

        {selectedId && (
          <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50 flex items-center justify-end" onClick={() => setSelectedId(null)}>
            <div className="h-full w-full max-w-[500px] bg-surface-container border-l border-outline-variant/30 shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="p-md border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low/50 sticky top-0 backdrop-blur-md z-10">
                <h3 className="font-headline-md text-headline-md text-on-surface">Merchant Analytics</h3>
                <button onClick={() => setSelectedId(null)} className="p-xs hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-md flex flex-col gap-lg">
                {isLoadingAnalytics ? (
                  <div className="text-on-surface-variant text-center py-xl">Loading analytics...</div>
                ) : analytics ? (
                  <>
                    <div className="grid grid-cols-2 gap-md">
                      <div className="bg-surface-container-highest/30 p-md rounded-2xl border border-outline-variant/10">
                        <span className="font-label-sm text-on-surface-variant uppercase">Total Spent</span>
                        <div className="font-display-sm text-on-surface mt-xs">₹{analytics.total_spent?.toLocaleString()}</div>
                      </div>
                      <div className="bg-surface-container-highest/30 p-md rounded-2xl border border-outline-variant/10">
                        <span className="font-label-sm text-on-surface-variant uppercase">Visits</span>
                        <div className="font-display-sm text-on-surface mt-xs">{analytics.visit_count}</div>
                      </div>
                      <div className="bg-surface-container-highest/30 p-md rounded-2xl border border-outline-variant/10">
                        <span className="font-label-sm text-on-surface-variant uppercase">Avg Order</span>
                        <div className="font-display-sm text-on-surface mt-xs">₹{analytics.avg_order_value?.toLocaleString()}</div>
                      </div>
                      <div className="bg-surface-container-highest/30 p-md rounded-2xl border border-outline-variant/10">
                        <span className="font-label-sm text-on-surface-variant uppercase">Frequency</span>
                        <div className="font-display-sm text-on-surface mt-xs">{analytics.payment_frequency}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-sm">
                      <h4 className="font-label-md text-on-surface uppercase tracking-widest">Details</h4>
                      <div className="flex justify-between items-center py-xs border-b border-outline-variant/10">
                        <span className="text-on-surface-variant text-sm">First Visit</span>
                        <span className="text-on-surface">{analytics.first_transaction ? new Date(analytics.first_transaction).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center py-xs border-b border-outline-variant/10">
                        <span className="text-on-surface-variant text-sm">Latest Visit</span>
                        <span className="text-on-surface">{analytics.latest_transaction ? new Date(analytics.latest_transaction).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between items-center py-xs border-b border-outline-variant/10">
                        <span className="text-on-surface-variant text-sm">Most Common Day</span>
                        <span className="text-on-surface">{analytics.most_common_day || 'N/A'}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-on-surface-variant text-center py-xl">Analytics unavailable.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
