
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
        case 'rotterdam':
          bounds.extend([51.9225, 4.47917]);
          break;
        case 'singapore':
          bounds.extend([1.3521, 103.8198]);
          break;
        case 'busan':
          bounds.extend([35.1796, 129.0756]);
          break;
        case 'hong-kong':
          bounds.extend([22.3193, 114.1694]);
          break;
        case 'chennai':
          bounds.extend([13.0827, 80.2707]);
          break;
        case 'nhava-sheva':
          bounds.extend([18.9490, 72.9492]);
          break;
        case 'shenzhen':
          bounds.extend([22.5431, 114.0579]);
          break;
        case 'barcelona':
          bounds.extend([41.3851, 2.1734]);
          break;
        case 'direct':
          // For direct routes, add major shipping hubs
          bounds.extend([51.9225, 4.47917]); // Rotterdam
          bounds.extend([1.3521, 103.8198]); // Singapore
          bounds.extend([35.1796, 129.0756]); // Busan
          bounds.extend([22.3193, 114.1694]); // Hong Kong
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
    case 'rotterdam':
      center = [51.9225, 4.47917]; // Rotterdam
      zoom = 4;
      break;
    case 'singapore':
      center = [1.3521, 103.8198]; // Singapore
      zoom = 4;
      break;
    case 'busan':
      center = [35.1796, 129.0756]; // Busan
      zoom = 4; 
      break;
    case 'hong-kong':
      center = [22.3193, 114.1694]; // Hong Kong
      zoom = 5;
      break;
    case 'chennai':
      center = [13.0827, 80.2707]; // Chennai
      zoom = 5;
      break;
    case 'nhava-sheva':
      center = [18.9490, 72.9492]; // Nhava Sheva
      zoom = 5;
      break;
    case 'shenzhen':
      center = [22.5431, 114.0579]; // Shenzhen
      zoom = 5;
      break;
    case 'barcelona':
      center = [41.3851, 2.1734]; // Barcelona
      zoom = 5;
      break;
    case 'direct':
      // For direct routes, let's see more of the world but focus a bit on major shipping lanes
      center = [20, 40]; 
      zoom = 3;
      break;
  }

  map.setView(center, zoom, {
    animate: true,
    duration: 1 // Animation duration in seconds
  });
};
