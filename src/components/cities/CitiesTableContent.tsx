
import React from 'react';
import { Port } from '../LeafletMap';
import { RouteFilter } from '../RouteFilters';
import AlphabeticalCitiesList from './AlphabeticalCitiesList';
import DirectRoutesList from './DirectRoutesList';
import SingleRouteGroup from './SingleRouteGroup';
import { routeGroups, DirectRouteGroups, IndirectRouteGroup } from '@/utils/routeGroups';

type CitiesTableContentProps = {
  activeFilter: RouteFilter;
  cities: Port[];
};

const CitiesTableContent = ({ activeFilter, cities }: CitiesTableContentProps) => {
  if (activeFilter === 'all') {
    return <AlphabeticalCitiesList cities={cities} />;
  } 
  
  if (activeFilter === 'direct') {
    const directGroup = routeGroups.direct;
    return <DirectRoutesList groups={directGroup.groups} />;
  }
  
  const group = routeGroups[activeFilter as keyof typeof routeGroups];
  if (!group) {
    return (
      <div className="px-6 py-4 text-center text-sm text-gray-500">
        Nenhuma cidade disponível para o filtro selecionado.
      </div>
    );
  }
  
  if ('groups' in group) {
    return <DirectRoutesList groups={(group as DirectRouteGroups).groups} />;
  } else {
    return (
      <SingleRouteGroup 
        title={(group as IndirectRouteGroup).title} 
        cities={(group as IndirectRouteGroup).cities} 
      />
    );
  }
};

export default CitiesTableContent;
