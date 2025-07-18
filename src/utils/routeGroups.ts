
export type RouteGroup = {
  title: string;
  cities: string[];
};

export type DirectRouteGroups = {
  title: string;
  groups: RouteGroup[];
};

export type IndirectRouteGroup = {
  title: string;
  cities: string[];
};

export type AllRouteGroups = {
  direct: DirectRouteGroups;
  [key: string]: DirectRouteGroups | IndirectRouteGroup;
};

export const routeGroups: AllRouteGroups = {
  direct: {
    title: 'Rotas Diretas',
    groups: [
      { title: 'China →', cities: ['Hong Kong', 'Ningbo', 'Qingdao', 'Shanghai', 'Shanghai (IMO)', 'Shenzhen'] },
      { title: 'Korea →', cities: ['Busan'] },
      { title: 'Índia →', cities: ['Nhava Sheva', 'Chennai'] },
      { title: 'Singapore →', cities: ['Singapore'] },
      { title: 'Serviço direto:', cities: ['Hamburgo', 'Roterdã', 'Barcelona', 'Valência', 'Gênova', 'Antuérpia'] }
    ]
  },
  rotterdam: {
    title: 'Rotas via Rotterdam',
    cities: ['Vienna', 'Linz', 'Sofia', 'Aarhus', 'Alexandria', 'Bratislava', 'Koper', 'Helsinki', 'Le Havre', 'Paris', 'Budapest', 'Dublin', 'Belfast', 'Ashdod', 'Haifa', 'Beirut', 'Oslo', 'Prague', 'Ostrava', 'Bucharest', 'Gothenborg', 'Basel', 'Geneve']
  },
  singapore: {
    title: 'Rotas via Singapore',
    cities: ['Brisbane', 'Melbourne', 'Sydney', 'Chittagong', 'Sihanoukville', 'Cochin', 'Calcutta', 'Jakarta', 'Semarang', 'Surabaya', 'Tokyo', 'Penang', 'Port Klang', 'Pasir Gudang', 'Yangon', 'Auckland', 'Karachi', 'Cebu', 'Manila', 'Colombo', 'Keelung', 'Kaohsiung', 'Taichung', 'Laem Chaban', 'Bangkok', 'Dubai', 'Jebel Ali', 'Danang', 'Haiphong', 'Ho Chi Minh']
  },
  busan: {
    title: 'Rotas via Busan',
    cities: ['Dalian', 'Xingang/Tianjin', 'Kobe', 'Nagoya', 'Osaka', 'Yokohama']
  },
  'hong-kong': {
    title: 'Rotas via Hong Kong',
    cities: ['Ichon']
  },
  chennai: {
    title: 'Rotas via Chennai',
    cities: ['Bangalore']
  },
  'nhava-sheva': {
    title: 'Rotas via Nhava Sheva',
    cities: ['Ahmedabad', 'New Delhi', 'Hyderabad', 'Ludhiana']
  },
  shenzhen: {
    title: 'Rotas via Shenzhen',
    cities: ['Foshan', 'Fuzhou', 'Guangzhou', 'Jiangmen', 'Shantou', 'Shunde', 'Xiamen', 'Zhongshan/Xiaolan', 'Zhuhai']
  },
  barcelona: {
    title: 'Rotas via Barcelona',
    cities: ['Leixões']
  }
};
