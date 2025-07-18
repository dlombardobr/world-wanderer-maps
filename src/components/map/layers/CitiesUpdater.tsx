
import React, { useEffect } from 'react';
import { Port } from '../types';
import { RouteFilter } from '../../RouteFilters';

type CitiesUpdaterProps = {
  ports: Port[];
  activeFilter: RouteFilter;
  visiblePorts: Set<string>;
  onCitiesUpdate?: (cities: Port[]) => void;
};

const CitiesUpdater = ({
  ports,
  activeFilter,
  visiblePorts,
  onCitiesUpdate
}: CitiesUpdaterProps) => {
  useEffect(() => {
    if (!onCitiesUpdate) return;
    
    if (activeFilter === 'all') {
      // For "all" filter, show all cities
      onCitiesUpdate(ports);
    } else {
      // For other filters, filter relevant cities
      const filteredCities = ports.filter(port => {
        // Always show all hubs
        if (port.isHub) return true;
        
        // Show ports that are in visible routes
        return visiblePorts.has(port.id);
      });
      
      onCitiesUpdate(filteredCities);
    }
  }, [
    ports,
    activeFilter,
    visiblePorts,
    onCitiesUpdate
  ]);

  return null;
};

export default CitiesUpdater;
