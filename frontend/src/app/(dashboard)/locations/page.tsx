"use client";

import { useState } from 'react';
import { useLocationCities, useLocationLocalities } from '@/hooks/useLocations';

export default function LocationsPage() {
  const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);

  const { data: citiesData, isLoading: isCitiesLoading } = useLocationCities();
  const { data: localitiesData, isLoading: isLocalitiesLoading } = useLocationLocalities(selectedCity);

  const cities = citiesData?.items ?? [];
  const localities = localitiesData?.items ?? [];
  const totalSpend = cities.reduce((a: number, c: any) => a + (c.total ?? 0), 0);
  const totalCount = cities.reduce((a: number, c: any) => a + (c.count ?? 0), 0);

  return (
    <>
      <div className="flex flex-col w-full h-full min-h-[calc(100vh-4rem)]">
        <div className="relative w-full flex-grow flex" style={{ height: 'calc(100vh - 4rem)' }}>

          {/* Map placeholder background */}
          <div className="absolute inset-0 w-full h-full bg-surface-container-low flex items-center justify-center">
            <div className="flex flex-col items-center gap-sm text-on-surface-variant/50">
              <span className="material-symbols-outlined text-[64px]">map</span>
              <p className="font-body-md">Map visualization</p>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent pointer-events-none w-1/3 md:w-1/4"></div>

          {/* Controls */}
          <div className="absolute top-md left-md z-10 flex gap-sm items-center">
            <div className="bg-surface/80 backdrop-blur-xl border border-outline-variant/30 rounded-xl p-xs flex shadow-lg">
              <button className="px-md py-sm rounded-lg bg-primary-container text-on-primary-container font-label-md transition-colors shadow-sm">Heatmap</button>
              <button className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md">Markers</button>
            </div>
          </div>

          {/* Sidebar Panel */}
          <div className="relative z-10 w-[400px] h-full ml-auto bg-surface/80 backdrop-blur-2xl border-l border-outline-variant/30 flex flex-col shadow-2xl transform transition-transform duration-300">

            <div className="p-lg border-b border-outline-variant/30 bg-surface-container-lowest/50">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs tracking-tight">Location Intelligence</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Analyze spending patterns across geographical zones.</p>

              <div className="grid grid-cols-2 gap-sm mt-lg">
                <div className="bg-surface-container/60 p-sm rounded-xl border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Spend</span>
                  <div className="font-headline-md text-headline-md text-on-surface mt-xs">₹{totalSpend.toLocaleString()}</div>
                </div>
                <div className="bg-surface-container/60 p-sm rounded-xl border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Transactions</span>
                  <div className="font-headline-md text-headline-md text-on-surface mt-xs">{totalCount}</div>
                  <div className="flex items-center gap-xs mt-1 text-on-surface-variant">
                    <span className="font-label-sm text-label-sm">Across {cities.length} cities</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-xl">

              {/* Top Cities */}
              <div>
                <div className="flex items-center justify-between mb-md">
                  <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest flex items-center gap-sm">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Top Cities
                  </h3>
                </div>

                {isCitiesLoading ? (
                  <div className="text-on-surface-variant text-sm py-md">Loading cities...</div>
                ) : cities.length === 0 ? (
                  <div className="text-on-surface-variant text-sm py-md">No city data available.</div>
                ) : (
                  <div className="flex flex-col gap-sm">
                    {cities.slice(0, 5).map((city: any) => (
                      <button
                        key={city.city}
                        onClick={() => setSelectedCity(city.city === selectedCity ? undefined : city.city)}
                        className={`bg-surface-container-low p-md rounded-2xl transition-colors border cursor-pointer group text-left w-full ${selectedCity === city.city ? 'border-primary/50 bg-primary/5' : 'hover:bg-surface-container border-outline-variant/10'}`}
                      >
                        <div className="flex justify-between items-start mb-sm">
                          <div className="flex items-center gap-sm">
                            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                              <span className="material-symbols-outlined">location_city</span>
                            </div>
                            <div>
                              <div className="font-label-md text-label-md text-on-surface">{city.city}</div>
                              <div className="font-label-sm text-label-sm text-on-surface-variant">{city.count} transactions</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-label-md text-label-md text-on-surface">₹{(city.total ?? 0).toLocaleString()}</div>
                            <div className="font-label-sm text-label-sm text-secondary">{(city.percentage ?? 0).toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${city.percentage ?? 0}%` }}></div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Localities for selected city */}
              {selectedCity && (
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface uppercase tracking-widest mb-md border-b border-outline-variant/30 pb-xs">
                    Hotspots in {selectedCity}
                  </h3>
                  {isLocalitiesLoading ? (
                    <div className="text-on-surface-variant text-sm py-md">Loading localities...</div>
                  ) : localities.length === 0 ? (
                    <div className="text-on-surface-variant text-sm py-md">No locality data for this city.</div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-outline-variant/20">
                          <th className="py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-normal">Locality</th>
                          <th className="py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-normal text-right">Spend</th>
                          <th className="py-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-normal text-right">Txns</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localities.slice(0, 6).map((loc: any) => (
                          <tr key={loc.locality} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors cursor-pointer">
                            <td className="py-md">
                              <div className="font-label-md text-label-md text-on-surface">{loc.locality}</div>
                            </td>
                            <td className="py-md text-right">
                              <div className="font-label-md text-label-md text-on-surface">₹{(loc.total ?? 0).toLocaleString()}</div>
                            </td>
                            <td className="py-md text-right">
                              <div className="font-label-sm text-label-sm text-on-surface-variant">{loc.count}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
