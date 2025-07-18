
import React from 'react';
import { Port } from './LeafletMap';
import { RouteFilter } from './RouteFilters';
import { MapLanguage } from './LeafletMap';
import CitiesTableHeader from './cities/CitiesTableHeader';
import CitiesTableContent from './cities/CitiesTableContent';

type CitiesTableProps = {
  activeFilter: RouteFilter;
  cities: Port[];
  mapLanguage: MapLanguage;
};

const CitiesTable = ({ activeFilter, cities, mapLanguage }: CitiesTableProps) => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
      <CitiesTableHeader 
        activeFilter={activeFilter} 
        mapLanguage={mapLanguage} 
      />
      
      <div className="overflow-x-auto py-2">
        <CitiesTableContent 
          activeFilter={activeFilter} 
          cities={cities} 
        />
      </div>
    </div>
  );
};

export default CitiesTable;
