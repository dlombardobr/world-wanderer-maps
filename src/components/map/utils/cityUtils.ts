
import { Port, MapLanguage } from '../types';
import { getPortName, getPort } from '../mapUtil';

// Collect visible cities for display in the table
export const collectVisibleCities = (
  visiblePorts: Set<string>,
  mapLanguage: MapLanguage,
  activeFilter: string
): Port[] => {
  // Collect all ports from the data for the table - don't filter them out
  const allPorts = getPort ? 
    Object.values(getPort)
      .filter(port => port && typeof port === 'object' && 'id' in port)
      .map(port => port as Port) : 
    [];
    
  // We'll display filtered cities in the table based on the filter
  const visibleCities: Port[] = [];
  
  // Add visible ports to map
  allPorts.forEach(port => {
    // Add translated port name
    const translatedPort = {
      ...port,
      name: getPortName(port, mapLanguage)
    };
    
    // Check if this port should be in the filtered list for the table
    if (visiblePorts.has(port.id) || port.isHub || activeFilter === 'all') {
      visibleCities.push(translatedPort);
    }
  });

  // Sort cities alphabetically for the table
  return visibleCities.sort((a, b) => a.name.localeCompare(b.name));
};
