
import React from 'react';
import { RouteFilter } from '@/components/RouteFilters';
import RouteFilters from '@/components/RouteFilters';
import { MapLanguage } from '@/components/LeafletMap';

type MapSidebarProps = {
  activeFilter: RouteFilter;
  onFilterChange: (filter: RouteFilter) => void;
  mapLanguage: MapLanguage;
};

const MapSidebar = ({
  activeFilter,
  onFilterChange,
  mapLanguage
}: MapSidebarProps) => {
  return (
    <div className="md:w-1/4 p-4 border-t md:border-t-0 md:border-l border-gray-200">
      <RouteFilters 
        activeFilter={activeFilter} 
        onFilterChange={onFilterChange} 
        mapLanguage={mapLanguage} 
      />
      {/* A legenda foi removida daqui pois já existe no mapa */}
    </div>
  );
};

export default MapSidebar;
