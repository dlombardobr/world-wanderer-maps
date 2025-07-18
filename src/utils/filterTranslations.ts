
import { RouteFilter } from '@/components/RouteFilters';
import { MapLanguage } from '@/components/LeafletMap';

export const getFilterLabel = (id: RouteFilter, mapLanguage: MapLanguage): string => {
  const labels = {
    all: 'Todas as Rotas',
    direct: 'Rotas Diretas',
    shanghai: 'Via Shanghai/Ningbo',
    qingdao: 'Via Qingdao',
    shenzhen: 'Via Shenzhen'
  };
  
  return labels[id];
};

export const getContinentFilters = (mapLanguage: MapLanguage) => [
  { 
    continent: 'Portos Chineses', 
    ports: ['shanghai', 'qingdao', 'shenzhen'] 
  }
];
