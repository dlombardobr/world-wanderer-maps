
import { RouteFilter } from '@/components/RouteFilters';
import { MapLanguage } from '@/components/LeafletMap';

export const getFilterLabel = (id: RouteFilter, mapLanguage: MapLanguage): string => {
  const labels = {
    all: 'Todas as Rotas',
    direct: 'Rotas Diretas',
    rotterdam: 'Via Rotterdam',
    singapore: 'Via Singapore',
    busan: 'Via Busan',
    'hong-kong': 'Via Hong Kong',
    chennai: 'Via Chennai',
    'nhava-sheva': 'Via Nhava Sheva',
    shenzhen: 'Via Shenzhen',
    barcelona: 'Via Barcelona'
  };
  
  return labels[id];
};

export const getContinentFilters = (mapLanguage: MapLanguage) => [
  { 
    continent: 'APAC', 
    ports: ['singapore', 'busan', 'hong-kong', 'shenzhen', 'chennai'] 
  },
  { 
    continent: 'Europe', 
    ports: ['rotterdam', 'barcelona'] 
  },
  { 
    continent: 'India', 
    ports: ['nhava-sheva'] 
  }
];
