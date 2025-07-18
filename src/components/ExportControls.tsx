
import React from 'react';
import { RouteFilter } from '@/components/RouteFilters';
import { Port } from '@/components/LeafletMap';

type ExportControlsProps = {
  activeFilter: RouteFilter;
  cities: Port[];
};

// Componente vazio - botões de exportação removidos conforme solicitado
const ExportControls = ({ activeFilter, cities }: ExportControlsProps) => {
  return null;
};

export default ExportControls;
