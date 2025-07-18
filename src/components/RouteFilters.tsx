
import React from 'react';
import { cn } from '@/lib/utils';
import { MapLanguage } from './LeafletMap';
import FilterItem from './filters/FilterItem';
import ContinentFilterGroup from './filters/ContinentFilterGroup';
import { getFilterLabel, getContinentFilters } from '@/utils/filterTranslations';

export type RouteFilter = 'all' | 'direct' | 'rotterdam' | 'singapore' | 'busan' | 'hong-kong' | 'chennai' | 'nhava-sheva' | 'shenzhen' | 'barcelona';

export const filterColors: Record<RouteFilter, string> = {
  'all': '#FFFFFF',
  'direct': '#00A0DC',
  'rotterdam': '#00A0DC', // blue-medium
  'singapore': '#00A77F', // teal-medium
  'busan': '#FFCC33',     // yellow
  'hong-kong': '#00A0DC', // blue-medium
  'chennai': '#00719C',   // teal-dark
  'nhava-sheva': '#00A0DC', // blue-medium
  'shenzhen': '#FFCC33',  // yellow
  'barcelona': '#00A77F'  // teal-medium
};

type RouteFiltersProps = {
  activeFilter: RouteFilter;
  onFilterChange: (filter: RouteFilter) => void;
  mapLanguage: MapLanguage;
};

const RouteFilters = ({ 
  activeFilter, 
  onFilterChange, 
  mapLanguage
}: RouteFiltersProps) => {
  const filters: { id: RouteFilter; label: string }[] = [
    { id: 'all', label: getFilterLabel('all', mapLanguage) },
    { id: 'direct', label: getFilterLabel('direct', mapLanguage) },
    { id: 'rotterdam', label: getFilterLabel('rotterdam', mapLanguage) },
    { id: 'singapore', label: getFilterLabel('singapore', mapLanguage) },
    { id: 'busan', label: getFilterLabel('busan', mapLanguage) },
    { id: 'hong-kong', label: getFilterLabel('hong-kong', mapLanguage) },
    { id: 'chennai', label: getFilterLabel('chennai', mapLanguage) },
    { id: 'nhava-sheva', label: getFilterLabel('nhava-sheva', mapLanguage) },
    { id: 'shenzhen', label: getFilterLabel('shenzhen', mapLanguage) },
    { id: 'barcelona', label: getFilterLabel('barcelona', mapLanguage) },
  ];

  const continentFilters = getContinentFilters(mapLanguage);

  // Handle selection of a single filter
  const handleFilterClick = (filter: RouteFilter) => {
    onFilterChange(filter);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-semibold text-blue-800">
          Filters
        </h3>
      </div>
      
      <div className="space-y-3">
        <FilterItem
          filter="all"
          label={getFilterLabel('all', mapLanguage)}
          checked={activeFilter === 'all'}
          onChange={() => handleFilterClick('all')}
          disabled={false}
        />
        
        <FilterItem
          filter="direct"
          label={getFilterLabel('direct', mapLanguage)}
          checked={activeFilter === 'direct'}
          onChange={() => handleFilterClick('direct')}
          disabled={false}
        />
        
        {/* Continent-based accordion */}
        {continentFilters.map((continentGroup) => (
          <ContinentFilterGroup
            key={continentGroup.continent}
            continent={continentGroup.continent}
            ports={continentGroup.ports}
            activeFilter={activeFilter}
            onFilterChange={handleFilterClick}
            getFilterLabel={(id) => getFilterLabel(id, mapLanguage)}
            disabled={false}
          />
        ))}
      </div>
    </div>
  );
};

export default RouteFilters;
