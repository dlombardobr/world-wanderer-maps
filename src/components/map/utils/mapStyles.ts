
import L from 'leaflet';
import { MapStyle } from '../types';

// Function to update the map tile layer based on the selected style
export const updateMapStyle = (map: L.Map, tileLayer: L.TileLayer | null, style: MapStyle): L.TileLayer => {
  if (!map) throw new Error("Map not initialized");
  
  // Remove current tile layer if it exists
  if (tileLayer) {
    tileLayer.remove();
  }
  
  let tileLayerUrl = '';
  
  switch(style) {
    case 'dark':
      tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      break;
    case 'satellite':
      tileLayerUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      break;
    case 'light':
    default:
      tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      break;
  }
  
  // Add new tile layer
  const newTileLayer = L.tileLayer(tileLayerUrl, {
    subdomains: 'abcd',
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  return newTileLayer;
};

// Add custom CSS for tooltips
export const addMapStyles = (): HTMLStyleElement => {
  const style = document.createElement('style');
  style.innerHTML = `
    .hub-tooltip {
      background-color: rgba(255, 74, 74, 0.9);
      border: 1px solid #FF4A4A;
      color: white;
      font-weight: bold;
      padding: 3px 8px;
      box-shadow: 0 0 8px rgba(255, 74, 74, 0.6);
    }
    .port-tooltip {
      background-color: rgba(74, 144, 226, 0.9);
      border: 1px solid #4A90E2;
      color: white;
      padding: 2px 6px;
      box-shadow: 0 0 5px rgba(74, 144, 226, 0.4);
    }
    .route-tooltip {
      background-color: rgba(0, 0, 0, 0.7);
      border: none;
      color: white;
      padding: 3px 8px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    }
    .leaflet-fullscreen-button {
      background-color: white;
      border: 2px solid rgba(0,0,0,0.2);
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);
  return style;
};
