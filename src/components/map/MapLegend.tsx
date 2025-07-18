
import React from 'react';
import Legend from '../Legend';
import { MapLegendProps } from './types';

const MapLegend = ({ activeFilter, mapLanguage }: MapLegendProps) => {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 p-2 rounded-lg shadow-lg border border-gray-200" style={{ maxWidth: '300px' }}>
      <Legend 
        activeFilter={activeFilter} 
        mapLanguage={mapLanguage} 
      />
    </div>
  );
};

export default MapLegend;
