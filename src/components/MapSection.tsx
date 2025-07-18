
import React, { useRef } from 'react';
import LeafletMap, { Port, MapLanguage } from '@/components/LeafletMap';
import { RouteFilter } from '@/components/RouteFilters';

type MapSectionProps = {
  activeFilter: RouteFilter;
  onCitiesUpdate: (cities: Port[]) => void;
  mapStyle: 'light' | 'dark' | 'satellite';
  mapLanguage: MapLanguage;
  translations: Record<MapLanguage, Record<string, string>>;
};

const MapSection = ({
  activeFilter,
  onCitiesUpdate,
  mapStyle,
  mapLanguage,
  translations
}: MapSectionProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mapContainerRef} className="w-full md:w-3/4 h-[600px] relative">
      <LeafletMap 
        activeFilter={activeFilter} 
        onCitiesUpdate={onCitiesUpdate}
        mapStyle={mapStyle}
        mapLanguage={mapLanguage}
        showAllLabels={activeFilter !== 'all'}
        legendActiveFilter={activeFilter}
      />
    </div>
  );
};

export default MapSection;
