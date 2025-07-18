
import React from 'react';
import { Port } from '../LeafletMap';

type AlphabeticalCitiesListProps = {
  cities: Port[];
};

const AlphabeticalCitiesList = ({ cities }: AlphabeticalCitiesListProps) => {
  const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="px-6 py-3">
      <h4 className="text-md font-medium text-blue-600 mb-2">Todas as Cidades ({sortedCities.length})</h4>
      <ul className="list-disc pl-5 space-y-1">
        {sortedCities.map((city) => (
          <li key={city.id} className="text-sm text-gray-700">{city.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlphabeticalCitiesList;
