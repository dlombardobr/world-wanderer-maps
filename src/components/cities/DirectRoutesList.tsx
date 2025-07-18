
import React from 'react';

type RouteGroup = {
  title: string;
  cities: string[];
};

type DirectRoutesGroupProps = {
  groups: RouteGroup[];
};

const DirectRoutesList = ({ groups }: DirectRoutesGroupProps) => {
  return (
    <div className="space-y-4 px-6 py-3">
      <h4 className="text-md font-medium text-blue-600 mb-2">Rotas Diretas</h4>
      {groups.map((group, index) => (
        <div key={index}>
          <h5 className="text-sm font-medium text-gray-700 mb-1">{group.title}</h5>
          <p className="text-sm text-gray-700">{group.cities.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default DirectRoutesList;
