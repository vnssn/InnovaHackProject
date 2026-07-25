"use client";

import { useLocationCities, useLocationLocalities } from '@/hooks/useLocations';

export default function LocationsPage() {
  const { data: citiesData, isLoading: isLoadingCities } = useLocationCities();
  const { data: localitiesData, isLoading: isLoadingLocalities } = useLocationLocalities();

  const cities = citiesData?.items || [];
  const localities = localitiesData?.items || [];

  const totalSpent = cities.reduce((acc: number, city: any) => acc + (city.total || 0), 0);

  return (
    <>
      <div className="flex flex-col w-full h-full min-h-[calc(100vh-4rem)]">
        <div className="relative w-full flex-grow flex" style={{ height: "calc(100vh - 4rem)" }}>
          <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570168007204-dfb528c6678f?q=80&w=2000')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent pointer-events-none w-1/3 md:w-1/4"></div>

          <div className="absolute top-md left-md z-10 flex gap-sm items-center">
            <div className="bg-surface/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-xs flex shadow-lg">
              <button className="px-md py-sm rounded-lg bg-primary-container text-on-primary-container font-label-md transition-colors shadow-sm">Top Cities</button>
            </div>
          </div>

          <div className="relative z-10 w-[400px] h-full ml-auto bg-surface/80 backdrop-blur-2xl border-l border-outline-variant/30 flex flex-col shadow-2xl transform transition-transform duration-300">
            <div className="p-lg border-b border-outline-variant/30 bg-surface-container-lowest/50">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs tracking-tight">Location Intelligence</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Analyze spending patterns across geographical zones.</p>

              <div className="grid grid-cols-2 gap-sm mt-lg">
                <div className="bg-surface-container/60 p-sm rounded-xl border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Mapped Spent</span>
                  <div className="font-headline-md text-headline-md text-on-surface mt-xs">₹ {totalSpent.toLocaleString()}</div>
                </div>
                <div className="bg-surface-container/60 p-sm rounded-xl border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Active Cities</span>
                  <div className="font-headline-md text-headline-md text-on-surface mt-xs">{cities.length}</div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-xl custom-scrollbar">
              <div>
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-md border-b border-outline-variant/30 pb-xs">
                    Top Cities
                </h3>
                <div className="flex flex-col gap-sm">
                  {isLoadingCities ? (
                    <span className="text-on-surface-variant">Loading cities...</span>
                  ) : cities.map((city: any, i: number) => (
                    <div key={i} className="bg-surface-container-low p-md rounded-2xl border border-outline-variant/10">
                      <div className="flex justify-between items-start mb-sm">
                        <div className="flex flex-col">
                          <div className="font-label-md text-label-md text-on-surface">{city.city || 'Unknown'}</div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">{city.count} transactions</div>
                        </div>
                        <div className="text-right">
                          <div className="font-label-md text-label-md text-on-surface">₹ {city.total.toLocaleString()}</div>
                          <div className="font-label-sm text-label-sm text-secondary-fixed">{city.percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${city.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                  {cities.length === 0 && !isLoadingCities && (
                    <span className="text-on-surface-variant">No cities found.</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-md border-b border-outline-variant/30 pb-xs">
                    Hotspots
                </h3>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/20">
                      <th className="py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-normal">Locality</th>
                      <th className="py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-normal text-right">Spend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingLocalities ? (
                      <tr><td colSpan={2} className="py-md text-on-surface-variant">Loading...</td></tr>
                    ) : localities.map((loc: any, i: number) => (
                      <tr key={i} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors group">
                        <td className="py-md">
                          <div className="font-label-md text-label-md text-on-surface">{loc.locality || 'Unknown'}</div>
                        </td>
                        <td className="py-md text-right">
                          <div className="font-label-md text-label-md text-on-surface">₹ {loc.total.toLocaleString()}</div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant">{loc.count} txns</div>
                        </td>
                      </tr>
                    ))}
                    {localities.length === 0 && !isLoadingLocalities && (
                       <tr><td colSpan={2} className="py-md text-on-surface-variant">No localities found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
