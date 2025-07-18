
import L from 'leaflet';
import { Port } from '../types';
import { ports } from '../mapData';

// Helper function to get port by ID
export const getPort = (id: string): Port | undefined => {
  return ports.find(port => port.id === id);
};

// Create custom icons for ports and hubs
export const getPortIcon = (port: Port) => {
  const isHub = port.isHub === true;
  const color = isHub ? '#FF4A4A' : '#4A90E2';
  
  return L.divIcon({
    className: isHub ? 'hub-marker' : 'port-marker',
    html: `<div style="
      background-color: ${color};
      width: ${isHub ? 16 : 10}px;
      height: ${isHub ? 16 : 10}px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 0 ${isHub ? 8 : 4}px rgba(${isHub ? '255, 74, 74' : '74, 144, 226'}, ${isHub ? 0.8 : 0.6});
    "></div>`,
    iconSize: isHub ? [16, 16] : [10, 10],
    iconAnchor: isHub ? [8, 8] : [5, 5]
  });
};
