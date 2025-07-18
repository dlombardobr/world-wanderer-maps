
import React from 'react';
import { RouteFilter } from '../RouteFilters';
import { MapLanguage } from '../LeafletMap';
import { getFilterLabel } from '@/utils/filterTranslations';

type CitiesTableHeaderProps = {
  activeFilter: RouteFilter;
  mapLanguage: MapLanguage;
};

const CitiesTableHeader = ({ activeFilter, mapLanguage }: CitiesTableHeaderProps) => {
  const filterLabel = getFilterLabel(activeFilter, mapLanguage);
  
  return (
    <div className="p-4 bg-blue-50 border-b border-blue-100">
      <h3 className="text-xl font-semibold text-blue-800">
        {filterLabel}
      </h3>
    </div>
  );
};

export default CitiesTableHeader;
