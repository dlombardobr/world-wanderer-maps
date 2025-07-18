
import { Port, MapLanguage } from '../types';

// Simplified translation function that just returns the port name
export const getPortName = (port: Port, mapLanguage: MapLanguage): string => {
  return port.name;
};
