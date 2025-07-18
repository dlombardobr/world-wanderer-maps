
import React from 'react';

type SingleRouteGroupProps = {
  title: string;
  cities: string[];
};

const SingleRouteGroup = ({ title, cities }: SingleRouteGroupProps) => {
  return (
    <div className="px-6 py-3">
      <h4 className="text-md font-medium text-blue-600 mb-2">{title}</h4>
      <p className="text-sm text-gray-700">{cities.join(', ')}</p>
    </div>
  );
};

export default SingleRouteGroup;
