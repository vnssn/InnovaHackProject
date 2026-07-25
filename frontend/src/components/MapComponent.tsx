"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

export default function MapComponent({ points }: { points: any[] }) {
  useEffect(() => {
    // Fix for Leaflet default icons in NextJS
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png')?.default?.src || 'marker-icon-2x.png',
      iconUrl: require('leaflet/dist/images/marker-icon.png')?.default?.src || 'marker-icon.png',
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')?.default?.src || 'marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%', zIndex: 0 }} zoomControl={false}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {points?.map((p, i) => (
        <CircleMarker 
          key={i} 
          center={[p.lat, p.lng]} 
          radius={p.weight ? p.weight * 15 + 5 : 10}
          pathOptions={{ color: '#0066FF', fillColor: '#0066FF', fillOpacity: 0.6 }}
        >
          <Popup>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-black">{p.category || 'Location'}</span>
              <span className="text-black">Weight: {p.weight}</span>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
