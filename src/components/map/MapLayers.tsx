
import React from 'react';
import L from 'leaflet';
import { Port, Route, MapLanguage } from './types';
import { RouteFilter } from '../RouteFilters';
import { useLegendVisibility } from './hooks/useLegendVisibility';
import PortMarkersLayer from './layers/PortMarkersLayer';
import RouteLinesLayer from './layers/RouteLinesLayer';
import CitiesUpdater from './layers/CitiesUpdater';
import { ports } from './mapData';

type MapLayersProps = {
  map: L.Map | null;
  markersLayer: L.LayerGroup | null;
  routesLayer: L.LayerGroup | null;
  labelsLayer: L.LayerGroup | null;
  activeFilter: RouteFilter;
  showAllLabels: boolean;
  mapLanguage: MapLanguage;
  visibleRoutes: Route[];
  visiblePorts: Set<string>;
  onCitiesUpdate?: (cities: Port[]) => void;
};

const MapLayers = ({
  map,
  markersLayer,
  routesLayer,
  labelsLayer,
  activeFilter,
  showAllLabels,
  mapLanguage,
  visibleRoutes,
  visiblePorts,
  onCitiesUpdate,
}: MapLayersProps) => {
  // Use our custom hook for legend visibility
  const legendVisibility = useLegendVisibility();

  return (
    <>
      <PortMarkersLayer
        map={map}
        markersLayer={markersLayer}
        labelsLayer={labelsLayer}
        mapLanguage={mapLanguage}
        ports={ports}
        legendVisibility={legendVisibility}
      />
      
      <RouteLinesLayer
        map={map}
        routesLayer={routesLayer}
        activeFilter={activeFilter}
        mapLanguage={mapLanguage}
        visibleRoutes={visibleRoutes}
        legendVisibility={legendVisibility}
      />
      
      <CitiesUpdater
        ports={ports}
        activeFilter={activeFilter}
        visiblePorts={visiblePorts}
        onCitiesUpdate={onCitiesUpdate}
      />
    </>
  );
};

export default MapLayers;
