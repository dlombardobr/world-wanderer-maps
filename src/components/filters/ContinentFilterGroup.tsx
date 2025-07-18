
import React from 'react';
import { RouteFilter } from '../RouteFilters';
import { MapLanguage } from '../LeafletMap';
import FilterItem from './FilterItem';

type ContinentFilterGroupProps = {
  continent: string;
  ports: string[];
  activeFilter: RouteFilter;
  onFilterChange: (filter: RouteFilter) => void;
  getFilterLabel: (id: RouteFilter) => string;
  disabled: boolean;
};

const ContinentFilterGroup = ({ 
  continent, 
  ports, 
  activeFilter, 
  onFilterChange, 
  getFilterLabel,
  disabled
}: ContinentFilterGroupProps) => {
  return (
    <details key={continent} className="group cursor-pointer" open>
      <summary className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
        <span className="font-medium">{continent}</span>
        <svg className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </summary>
      <div className="pl-2 mt-1 space-y-1">
        {ports.map((port) => (
          <FilterItem 
            key={port}
            filter={port as RouteFilter}
            label={getFilterLabel(port as RouteFilter).replace('Via ', '')}
            checked={activeFilter === port as RouteFilter}
            onChange={() => onFilterChange(port as RouteFilter)}
            disabled={disabled}
          />
        ))}
      </div>
    </details>
  );
};

export default ContinentFilterGroup;
