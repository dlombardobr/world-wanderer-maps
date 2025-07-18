
import { RouteFilter } from '../RouteFilters';

// Define type for a port
export type Port = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isHub?: boolean;
  via?: string;
};

// Define type for a route
export type Route = {
  id: string;
  type: 'direct' | 'indirect';
  from: string;
  to: string;
  via?: string;
};

export type MapStyle = 'light' | 'dark' | 'satellite';
export type MapLanguage = 'en'; // Simplified to only English

export type MapLegendProps = {
  activeFilter: RouteFilter;
  mapLanguage: MapLanguage;
};

export type LeafletMapProps = {
  activeFilter: RouteFilter;
  onCitiesUpdate?: (cities: Port[]) => void;
  mapStyle?: MapStyle;
  mapLanguage?: MapLanguage;
  showAllLabels?: boolean;
  legendActiveFilter?: RouteFilter;
};

// Re-export RouteFilter for use in utility files
export type { RouteFilter };
