
import L from 'leaflet';
import { RouteFilter } from '../types';

// Helper function for zoom to region based on filter
export const zoomToRegion = (map: L.Map, filter: RouteFilter | RouteFilter[]): void => {
  // Convert to array if it's a single filter
  const filtersArray = Array.isArray(filter) ? filter : [filter];
  
  if (!map || filtersArray.includes('all')) {
    // For 'all' filter or no specific filter, show the world view
    if (map) {
      map.setView([20, 0], 2, { animate: true, duration: 1 });
    }
    return;
  }

  // If we have multiple filters, find a center point that shows all selected regions
  if (filtersArray.length > 1) {
    // Get bounds that include all selected hubs
    const bounds = L.latLngBounds([]);
    
    filtersArray.forEach(filter => {
      switch(filter) {
        case 'shanghai':
          bounds.extend([31.2304, 121.4737]); // Shanghai
          bounds.extend([29.8683, 121.5440]); // Ningbo
          break;
        case 'qingdao':
          bounds.extend([36.0671, 120.3826]); // Qingdao
          break;
        case 'shenzhen':
          bounds.extend([22.5431, 114.0579]); // Shenzhen
          break;
        case 'direct':
          // For direct routes, add main Chinese ports
          bounds.extend([31.2304, 121.4737]); // Shanghai
          bounds.extend([29.8683, 121.5440]); // Ningbo
          bounds.extend([36.0671, 120.3826]); // Qingdao
          bounds.extend([22.5431, 114.0579]); // Shenzhen
          break;
      }
    });
    
    if (!bounds.isValid()) {
      // Default if no bounds are valid
      map.setView([20, 0], 2);
      return;
    }
    
    // Fit the map to the bounds with some padding
    map.fitBounds(bounds, { 
      padding: [50, 50],
      animate: true,
      duration: 1
    });
    return;
  }

  // Single filter case - zoom to the specific region
  const singleFilter = filtersArray[0];
  let center: [number, number] = [20, 0];
  let zoom = 2;

  switch(singleFilter) {
    case 'shanghai':
      center = [30.5, 121]; // Center between Shanghai and Ningbo
      zoom = 6;
      break;
    case 'qingdao':
      center = [36.0671, 120.3826]; // Qingdao
      zoom = 5;
      break;
    case 'shenzhen':
      center = [22.5431, 114.0579]; // Shenzhen
      zoom = 6;
      break;
    case 'direct':
      // For direct routes, focus on China region
      center = [30, 115]; 
      zoom = 4;
      break;
  }

  map.setView(center, zoom, {
    animate: true,
    duration: 1 // Animation duration in seconds
  });
};
