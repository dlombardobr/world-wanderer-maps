
import L from 'leaflet';
import { Route, MapLanguage, RouteFilter } from '../types';
import { getPortName, getPort, getRouteColor } from '../mapUtil';

// Function to add route lines to the map
export const addRouteLines = (
  routes: Route[],
  routesLayer: L.LayerGroup,
  mapLanguage: MapLanguage,
  activeFilter: RouteFilter,
  legendVisibility: { direct: boolean; indirect: boolean }
) => {
  // Check if 'all' is selected
  const showAll = activeFilter === 'all';

  routes.forEach(route => {
    // Skip routes from generic origins like 'china', 'korea', etc.
    if (route.from === 'china' || route.from === 'korea' || route.from === 'india' || route.from === 'asia') {
      return;
    }
    
    // Filter based on legend visibility
    if ((route.type === 'direct' && !legendVisibility.direct) || 
        (route.type === 'indirect' && !legendVisibility.indirect)) {
      return;
    }
    
    const fromPort = getPort(route.from);
    const toPort = getPort(route.to);
    
    // Skip self-connections (hubs to themselves) as they're only for display
    if (fromPort && toPort && fromPort.id !== toPort.id) {
      // Get route color based on filter
      const routeColor = getRouteColor(route, showAll, activeFilter);
      
      const lineStyle = {
        color: routeColor,
        weight: route.type === 'direct' ? 3 : 2,
        opacity: 0.8,
        dashArray: route.type === 'direct' ? '' : '5, 5',
        className: `route-${route.type}`
      };
      
      // Create the polyline
      const line = L.polyline([[fromPort.lat, fromPort.lng], [toPort.lat, toPort.lng]], lineStyle)
        .addTo(routesLayer);
      
      // Add tooltip for route info with translated port names
      const fromPortName = getPortName(fromPort, mapLanguage);
      const toPortName = getPortName(toPort, mapLanguage);
      line.bindTooltip(`${fromPortName} to ${toPortName}`, {
        sticky: true,
        direction: 'auto',
        className: 'route-tooltip'
      });
    }
  });
};
