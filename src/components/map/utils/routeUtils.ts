
import { Route, RouteFilter } from '../types';
import { filterColors } from '../../RouteFilters';

// Filter routes based on active filters
export const filterRoutes = (routes: Route[], activeFilter: RouteFilter | RouteFilter[]): Route[] => {
  // Convert to array if it's a single filter
  const filtersArray = Array.isArray(activeFilter) ? activeFilter : [activeFilter];
  
  // Check if 'all' is selected
  const showAll = filtersArray.includes('all');
  
  if (showAll) return routes;
  
  let visibleRoutes: Route[] = []; // Start with an empty array
  
  if (filtersArray.includes('direct')) {
    // Include direct routes
    const directRoutes = routes.filter(route => route.type === 'direct');
    visibleRoutes = [...visibleRoutes, ...directRoutes];
  }
  
  // Include routes for each selected hub
  filtersArray.forEach(filter => {
    if (filter !== 'direct' && filter !== 'all') {
      const hubRoutes = routes.filter(route => route.via === filter);
      visibleRoutes = [...visibleRoutes, ...hubRoutes];
      
      // Add the hub itself as a direct route
      const hubDirectRoute = routes.find(route => 
        route.from === filter && route.to === filter
      );
      
      if (hubDirectRoute && !visibleRoutes.includes(hubDirectRoute)) {
        visibleRoutes.push(hubDirectRoute);
      }
      
      // Add direct routes that connect to this hub
      const directToHub = routes.filter(route => 
        route.type === 'direct' && (route.from === filter || route.to === filter)
      );
      
      directToHub.forEach(route => {
        if (!visibleRoutes.includes(route)) {
          visibleRoutes.push(route);
        }
      });
    }
  });
  
  return visibleRoutes;
};

// Get route color based on filter
export const getRouteColor = (route: Route, showAll: boolean, activeFilter: RouteFilter | RouteFilter[]): string => {
  // Convert to array if it's a single filter
  const filtersArray = Array.isArray(activeFilter) ? activeFilter : [activeFilter];
  
  let routeColor = route.type === 'direct' ? '#1E40AF' : '#FFCC33';
  
  // Apply color-coding when all filter is selected
  if (showAll && route.via) {
    routeColor = filterColors[route.via as RouteFilter] || routeColor;
  } else if (!showAll && route.via && filtersArray.includes(route.via as RouteFilter)) {
    // Use the hub's color for its routes
    routeColor = filterColors[route.via as RouteFilter] || routeColor;
  }
  
  return routeColor;
};
