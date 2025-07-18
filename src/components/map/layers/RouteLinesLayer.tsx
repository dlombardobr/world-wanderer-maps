
import React, { useEffect } from 'react';
import L from 'leaflet';
import { Route, MapLanguage } from '../types';
import { RouteFilter } from '../../RouteFilters';
import { addRouteLines } from './RouteLines';

type RouteLinesLayerProps = {
  map: L.Map | null;
  routesLayer: L.LayerGroup | null;
  activeFilter: RouteFilter;
  mapLanguage: MapLanguage;
  visibleRoutes: Route[];
  legendVisibility: { direct: boolean; indirect: boolean };
};

const RouteLinesLayer = ({
  map,
  routesLayer,
  activeFilter,
  mapLanguage,
  visibleRoutes,
  legendVisibility
}: RouteLinesLayerProps) => {
  useEffect(() => {
    if (!map || !routesLayer) return;
    
    // Clear previous routes
    routesLayer.clearLayers();
    
    // Add route lines to the map
    addRouteLines(visibleRoutes, routesLayer, mapLanguage, activeFilter, legendVisibility);
  }, [
    map, 
    routesLayer, 
    activeFilter, 
    mapLanguage, 
    visibleRoutes, 
    legendVisibility
  ]);

  return null;
};

export default RouteLinesLayer;
