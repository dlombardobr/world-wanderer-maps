
import React from 'react';
import { RouteFilter } from '@/components/RouteFilters';
import { MapLanguage } from '@/components/LeafletMap';

type FilterItemProps = {
  filter: RouteFilter;
  label: string;
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
};

const FilterItem = ({ filter, label, checked, onChange, disabled }: FilterItemProps) => {
  return (
    <label className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded transition-colors">
      <input 
        type="checkbox" 
        className="form-checkbox h-5 w-5 text-blue-600 rounded"
        checked={checked} 
        onChange={onChange}
        disabled={disabled}
      />
      <span className={`ml-2 ${disabled ? 'text-gray-400' : ''}`}>
        {label}
      </span>
    </label>
  );
};

export default FilterItem;
