
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
      { title: 'Portos Principais:', cities: ['Shanghai', 'Ningbo', 'Qingdao', 'Shenzhen'] }
    ]
  },
  shanghai: {
    title: 'Rotas via Shanghai/Ningbo',
    cities: ['Hangzhou', 'Suzhou', 'Yuyao', 'Chongqing', 'Taizhou', 'Yuhuan']
  },
  qingdao: {
    title: 'Rotas via Qingdao',
    cities: ['Dalian', 'Shenyang', 'Changchun', 'Hebi', 'Binzhou', 'Mengzhou', 'Nanyang']
  },
  shenzhen: {
    title: 'Rotas via Shenzhen',
    cities: ['Foshan', 'Taishan', 'Hengyang', 'Changsha', 'Zhaoqing', 'Liuyang']
  }
};
