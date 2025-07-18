import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RouteFilter } from './RouteFilters';

// Define type for a port
type Port = {
  id: string;
  name: string;
  x: number;
  y: number;
  isHub?: boolean;
  isVisible?: boolean;
};

// Define type for a route
type Route = {
  id: string;
  type: 'direct' | 'indirect';
  from: string;
  to: string;
  via?: string;
};

const MapComponent = ({ activeFilter }: { activeFilter: RouteFilter }) => {
  const [ports, setPorts] = useState<Port[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [visiblePorts, setVisiblePorts] = useState<string[]>([]);
  const [visibleRoutes, setVisibleRoutes] = useState<string[]>([]);
  const mapRef = useRef<SVGSVGElement>(null);

  // Define all ports
  useEffect(() => {
    const allPorts: Port[] = [
      // Main hubs
      { id: 'rotterdam', name: 'Rotterdam', x: 35, y: 25, isHub: true },
      { id: 'hamburg', name: 'Hamburg', x: 37, y: 23, isHub: true },
      { id: 'barcelona', name: 'Barcelona', x: 33, y: 32, isHub: true },
      { id: 'valencia', name: 'Valencia', x: 32, y: 33, isHub: true },
      { id: 'genova', name: 'Genova', x: 38, y: 31, isHub: true },
      { id: 'antwerpia', name: 'Antwerpia', x: 36, y: 24, isHub: true },
      
      // Asian hubs
      { id: 'singapore', name: 'Singapore', x: 65, y: 55, isHub: true },
      { id: 'hong-kong', name: 'Hong Kong', x: 72, y: 44, isHub: true },
      { id: 'busan', name: 'Busan', x: 77, y: 38, isHub: true },
      { id: 'shanghai', name: 'Shanghai', x: 74, y: 42, isHub: true },
      { id: 'ningbo', name: 'Ningbo', x: 73, y: 43, isHub: true },
      { id: 'qingdao', name: 'Qingdao', x: 73, y: 40, isHub: true },
      { id: 'shenzhen', name: 'Shenzhen', x: 71, y: 45, isHub: true },
      
      // Indian hubs
      { id: 'chennai', name: 'Chennai', x: 60, y: 49, isHub: true },
      { id: 'nhava-sheva', name: 'Nhava Sheva', x: 56, y: 45, isHub: true },
      
      // European ports
      { id: 'vienna', name: 'Vienna', x: 40, y: 28 },
      { id: 'linz', name: 'Linz', x: 39, y: 27 },
      { id: 'sofia', name: 'Sofia', x: 43, y: 31 },
      { id: 'aarhus', name: 'Aarhus', x: 38, y: 21 },
      { id: 'alexandria', name: 'Alexandria', x: 45, y: 38 },
      { id: 'bratislava', name: 'Bratislava', x: 41, y: 27 },
      { id: 'koper', name: 'Koper', x: 39, y: 30 },
      { id: 'helsinki', name: 'Helsinki', x: 41, y: 17 },
      { id: 'le-havre', name: 'Le Havre', x: 33, y: 26 },
      { id: 'paris', name: 'Paris', x: 34, y: 27 },
      { id: 'budapest', name: 'Budapest', x: 42, y: 28 },
      { id: 'dublin', name: 'Dublin', x: 29, y: 24 },
      { id: 'belfast', name: 'Belfast', x: 30, y: 23 },
      { id: 'ashdod', name: 'Ashdod', x: 46, y: 36 },
      { id: 'haifa', name: 'Haifa', x: 47, y: 35 },
      { id: 'beirut', name: 'Beirut', x: 47, y: 34 },
      { id: 'oslo', name: 'Oslo', x: 37, y: 19 },
      { id: 'prague', name: 'Prague', x: 39, y: 26 },
      { id: 'ostrava', name: 'Ostrava', x: 40, y: 26 },
      { id: 'bucharest', name: 'Bucharest', x: 44, y: 29 },
      { id: 'gothenborg', name: 'Gothenborg', x: 37, y: 20 },
      { id: 'basel', name: 'Basel', x: 36, y: 28 },
      { id: 'geneve', name: 'Geneve', x: 35, y: 29 },
      { id: 'leixoes', name: 'Leixões', x: 28, y: 33 },
      
      // Asian ports
      { id: 'brisbane', name: 'Brisbane', x: 87, y: 65 },
      { id: 'melbourne', name: 'Melbourne', x: 84, y: 69 },
      { id: 'sydney', name: 'Sydney', x: 86, y: 67 },
      { id: 'chittagong', name: 'Chittagong', x: 63, y: 46 },
      { id: 'sihanoukville', name: 'Sihanoukville', x: 68, y: 50 },
      { id: 'cochin', name: 'Cochin', x: 58, y: 51 },
      { id: 'calcutta', name: 'Calcutta', x: 62, y: 45 },
      { id: 'jakarta', name: 'Jakarta', x: 68, y: 59 },
      { id: 'semarang', name: 'Semarang', x: 69, y: 58 },
      { id: 'surabaya', name: 'Surabaya', x: 70, y: 58 },
      { id: 'tokyo', name: 'Tokyo', x: 81, y: 39 },
      { id: 'penang', name: 'Penang', x: 64, y: 53 },
      { id: 'port-klang', name: 'Port Klang', x: 65, y: 54 },
      { id: 'pasir-gudang', name: 'Pasir Gudang', x: 66, y: 55 },
      { id: 'yangon', name: 'Yangon', x: 64, y: 48 },
      { id: 'auckland', name: 'Auckland', x: 90, y: 68 },
      { id: 'karachi', name: 'Karachi', x: 55, y: 43 },
      { id: 'cebu', name: 'Cebu', x: 73, y: 53 },
      { id: 'manila', name: 'Manila', x: 74, y: 50 },
      { id: 'colombo', name: 'Colombo', x: 59, y: 52 },
      { id: 'keelung', name: 'Keelung', x: 75, y: 45 },
      { id: 'kaohsiung', name: 'Kaohsiung', x: 74, y: 46 },
      { id: 'taichung', name: 'Taichung', x: 75, y: 45.5 },
      { id: 'laem-chaban', name: 'Laem Chaban', x: 67, y: 49 },
      { id: 'bangkok', name: 'Bangkok', x: 66, y: 48 },
      { id: 'dubai', name: 'Dubai', x: 54, y: 42 },
      { id: 'jebel-ali', name: 'Jebel Ali', x: 53, y: 42.5 },
      { id: 'danang', name: 'Danang', x: 69, y: 47 },
      { id: 'haiphong', name: 'Haiphong', x: 70, y: 46 },
      { id: 'ho-chi-minh', name: 'Ho Chi Minh', x: 68, y: 51 },
      { id: 'dalian', name: 'Dalian', x: 75, y: 37 },
      { id: 'xingang', name: 'Xingang/Tianjin', x: 74, y: 38 },
      { id: 'kobe', name: 'Kobe', x: 79, y: 40 },
      { id: 'nagoya', name: 'Nagoya', x: 80, y: 39.5 },
      { id: 'osaka', name: 'Osaka', x: 80, y: 40 },
      { id: 'yokohama', name: 'Yokohama', x: 81, y: 39.5 },
      { id: 'ichon', name: 'Ichon', x: 76, y: 39 },
      
      // Indian ports
      { id: 'bangalore', name: 'Bangalore', x: 59, y: 49 },
      { id: 'ahmedabad', name: 'Ahmedabad', x: 56, y: 44 },
      { id: 'new-delhi', name: 'New Delhi', x: 57, y: 41 },
      { id: 'hyderabad', name: 'Hyderabad', x: 58, y: 47 },
      { id: 'ludhiana', name: 'Ludhiana', x: 56, y: 40 },
      
      // China ports via Shenzhen
      { id: 'foshan', name: 'Foshan', x: 70, y: 44.5 },
      { id: 'fuzhou', name: 'Fuzhou', x: 72, y: 43.5 },
      { id: 'guangzhou', name: 'Guangzhou', x: 70, y: 44 },
      { id: 'jiangmen', name: 'Jiangmen', x: 69, y: 44.5 },
      { id: 'shantou', name: 'Shantou', x: 72, y: 44.5 },
      { id: 'shunde', name: 'Shunde', x: 70, y: 44.2 },
      { id: 'xiamen', name: 'Xiamen', x: 72, y: 44 },
      { id: 'zhongshan', name: 'Zhongshan/Xiaolan', x: 70, y: 44.7 },
      { id: 'zhuhai', name: 'Zhuhai', x: 71, y: 44.8 },
    ];

    setPorts(allPorts);
  }, []);

  // Define all routes
  useEffect(() => {
    const allRoutes: Route[] = [
      // Direct routes to European hubs
      { id: 'europe-1', type: 'direct', from: 'hamburg', to: 'hamburg' },
      { id: 'europe-2', type: 'direct', from: 'rotterdam', to: 'rotterdam' },
      { id: 'europe-3', type: 'direct', from: 'barcelona', to: 'barcelona' },
      { id: 'europe-4', type: 'direct', from: 'valencia', to: 'valencia' },
      { id: 'europe-5', type: 'direct', from: 'genova', to: 'genova' },
      { id: 'europe-6', type: 'direct', from: 'antwerpia', to: 'antwerpia' },
      
      // Direct routes to Asian hubs
      { id: 'asia-1', type: 'direct', from: 'hong-kong', to: 'hong-kong' },
      { id: 'asia-2', type: 'direct', from: 'ningbo', to: 'ningbo' },
      { id: 'asia-3', type: 'direct', from: 'qingdao', to: 'qingdao' },
      { id: 'asia-4', type: 'direct', from: 'shanghai', to: 'shanghai' },
      { id: 'asia-5', type: 'direct', from: 'shenzhen', to: 'shenzhen' },
      { id: 'asia-6', type: 'direct', from: 'busan', to: 'busan' },
      { id: 'asia-7', type: 'direct', from: 'singapore', to: 'singapore' },
      
      // Direct routes to Indian hubs
      { id: 'india-1', type: 'direct', from: 'nhava-sheva', to: 'nhava-sheva' },
      { id: 'india-2', type: 'direct', from: 'chennai', to: 'chennai' },
      
      // Routes via Rotterdam
      ...['vienna', 'linz', 'sofia', 'aarhus', 'alexandria', 'bratislava', 'koper', 
        'helsinki', 'le-havre', 'paris', 'budapest', 'dublin', 'belfast', 'ashdod', 
        'haifa', 'beirut', 'oslo', 'prague', 'ostrava', 'bucharest', 'gothenborg', 
        'basel', 'geneve'].map((port, index) => ({
        id: `rotterdam-${index + 1}`,
        type: 'indirect' as const,
        from: 'rotterdam',
        to: port,
        via: 'rotterdam'
      })),
      
      // Routes via Singapore
      ...['brisbane', 'melbourne', 'sydney', 'chittagong', 'sihanoukville', 'cochin', 
        'calcutta', 'jakarta', 'semarang', 'surabaya', 'tokyo', 'penang', 'port-klang', 
        'pasir-gudang', 'yangon', 'auckland', 'karachi', 'cebu', 'manila', 'colombo', 
        'keelung', 'kaohsiung', 'taichung', 'laem-chaban', 'bangkok', 'dubai', 'jebel-ali', 
        'danang', 'haiphong', 'ho-chi-minh'].map((port, index) => ({
        id: `singapore-${index + 1}`,
        type: 'indirect' as const,
        from: 'singapore',
        to: port,
        via: 'singapore'
      })),
      
      // Routes via Busan
      ...['dalian', 'xingang', 'kobe', 'nagoya', 'osaka', 'yokohama'].map((port, index) => ({
        id: `busan-${index + 1}`,
        type: 'indirect' as const,
        from: 'busan',
        to: port,
        via: 'busan'
      })),
      
      // Routes via Hong Kong
      { id: 'hk-1', type: 'indirect', from: 'hong-kong', to: 'ichon', via: 'hong-kong' },
      
      // Routes via Chennai
      { id: 'chennai-1', type: 'indirect', from: 'chennai', to: 'bangalore', via: 'chennai' },
      
      // Routes via Nhava Sheva
      ...['ahmedabad', 'new-delhi', 'hyderabad', 'ludhiana'].map((port, index) => ({
        id: `nhava-${index + 1}`,
        type: 'indirect' as const,
        from: 'nhava-sheva',
        to: port,
        via: 'nhava-sheva'
      })),
      
      // Routes via Shenzhen
      ...['foshan', 'fuzhou', 'guangzhou', 'jiangmen', 'shantou', 'shunde', 
        'xiamen', 'zhongshan', 'zhuhai'].map((port, index) => ({
        id: `shenzhen-${index + 1}`,
        type: 'indirect' as const,
        from: 'shenzhen',
        to: port,
        via: 'shenzhen'
      })),
      
      // Routes via Barcelona
      { id: 'barcelona-1', type: 'indirect', from: 'barcelona', to: 'leixoes', via: 'barcelona' },
    ];

    setRoutes(allRoutes);
  }, []);

  // Filter routes and ports based on active filter
  useEffect(() => {
    let relevantPorts: string[] = [];
    let relevantRoutes: string[] = [];

    if (activeFilter === 'all') {
      // Show all routes and ports
      relevantRoutes = routes.map(route => route.id);
      relevantPorts = ports.map(port => port.id);
    } else if (activeFilter === 'direct') {
      // Show only direct routes
      const directRoutes = routes.filter(route => route.type === 'direct');
      relevantRoutes = directRoutes.map(route => route.id);
      
      // Get all ports involved in direct routes
      const directPorts = directRoutes.reduce((acc, route) => {
        acc.add(route.from);
        acc.add(route.to);
        return acc;
      }, new Set<string>());
      
      relevantPorts = Array.from(directPorts);
    } else {
      // Show routes via a specific hub
      const hubRoutes = routes.filter(route => route.via === activeFilter);
      relevantRoutes = hubRoutes.map(route => route.id);
      
      // Add the hub itself as a direct route
      const hubDirectRoute = routes.find(route => route.from === activeFilter && route.to === activeFilter);
      if (hubDirectRoute) {
        relevantRoutes.push(hubDirectRoute.id);
      }
      
      // Get all ports involved in these routes
      const hubPorts = hubRoutes.reduce((acc, route) => {
        acc.add(route.from);
        acc.add(route.to);
        if (route.via) acc.add(route.via);
        return acc;
      }, new Set<string>());
      
      relevantPorts = Array.from(hubPorts);
    }

    setVisiblePorts(relevantPorts);
    setVisibleRoutes(relevantRoutes);
  }, [activeFilter, routes, ports]);

  // Helper function to get port by ID
  const getPort = (id: string) => {
    return ports.find(port => port.id === id);
  };

  return (
    <div className="map-container bg-marine">
      <svg ref={mapRef} viewBox="0 0 100 80" className="w-full h-full">
        <defs>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="port-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="ocean-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#0a3d62" />
            <stop offset="100%" stopColor="#01172F" />
          </radialGradient>
          <linearGradient id="land-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2C394B" />
            <stop offset="100%" stopColor="#082032" />
          </linearGradient>
        </defs>
        
        {/* Ocean background */}
        <rect x="0" y="0" width="100" height="80" fill="url(#ocean-gradient)" />
        
        {/* Detailed World Map */}
        <g className="world-map">
          {/* North America */}
          <path d="M12,17 C11,15.5 10,14 9.5,12 C9,10 8.5,8 9,6 C9.5,4 10.5,2.5 12,1.5 C13.5,0.5 15.5,0 17.5,0.5 
                  C19.5,1 21,2.5 22,4.5 C23,6.5 23.5,9 23,11.5 C22.5,14 21.5,16 20,17.5 C18.5,19 16.5,20 14.5,20.5 
                  C12.5,21 10.5,20.5 9,19.5 C7.5,18.5 6.5,17 6,15 C5.5,13 5.5,11 6,9 C6.5,7 7.5,5.5 9,4.5 
                  C10.5,3.5 12.5,3 14.5,3.5 C16.5,4 18,5.5 19,7.5 C20,9.5 20,12 19.5,14.5 C19,17 18,19 16.5,20.5" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Central America */}
          <path d="M18,21 C18.5,20 19.5,19.5 20.5,19.5 C21.5,19.5 22.5,20 23,21 C23.5,22 23.5,23 23,24 
                  C22.5,25 21.5,25.5 20.5,25.5 C19.5,25.5 18.5,25 18,24 C17.5,23 17.5,22 18,21Z" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* South America */}
          <path d="M22,27 C23,26 24.5,25.5 26,26 C27.5,26.5 28.5,27.5 29,29 C29.5,30.5 29.5,32 29,33.5 
                  C28.5,35 27.5,36.5 26,37.5 C24.5,38.5 22.5,39 20.5,38.5 C18.5,38 17,37 16,35.5 
                  C15,34 14.5,32 14.5,30 C14.5,28 15,26 16,24.5 C17,23 18.5,22 20.5,21.5 
                  C22.5,21 24.5,21.5 26,22.5 C27.5,23.5 28.5,25 29,27 C29.5,29 29.5,31 29,33" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Europe */}
          <path d="M40,10 C41,9 42.5,8.5 44,9 C45.5,9.5 46.5,10.5 47,12 C47.5,13.5 47.5,15 47,16.5 
                  C46.5,18 45.5,19.5 44,20.5 C42.5,21.5 40.5,22 38.5,21.5 C36.5,21 35,20 34,18.5 
                  C33,17 32.5,15 32.5,13 C32.5,11 33,9 34,7.5 C35,6 36.5,5 38.5,4.5 
                  C40.5,4 42.5,4.5 44,5.5 C45.5,6.5 46.5,8 47,10 C47.5,12 47.5,14 47,16" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Africa */}
          <path d="M40,22 C41.5,21 43.5,20.5 45.5,21 C47.5,21.5 49,23 50,25 C51,27 51.5,29.5 51,32 
                  C50.5,34.5 49,37 47,39 C45,41 42.5,42.5 39.5,43 C36.5,43.5 33.5,43 31,42 
                  C28.5,41 26.5,39.5 25,37.5 C23.5,35.5 22.5,33 22.5,30.5 C22.5,28 23,25.5 24.5,23.5 
                  C26,21.5 28,20 30.5,19 C33,18 36,17.5 39,18 C42,18.5 44.5,19.5 46.5,21.5 
                  C48.5,23.5 49.5,26 50,29 C50.5,32 50,35 48.5,37.5 C47,40 44.5,42 41.5,43.5" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Middle East */}
          <path d="M51,22 C52,21 53.5,20.5 55,21 C56.5,21.5 57.5,22.5 58,24 C58.5,25.5 58.5,27 58,28.5 
                  C57.5,30 56.5,31.5 55,32.5 C53.5,33.5 51.5,34 49.5,33.5 C47.5,33 46,32 45,30.5 
                  C44,29 43.5,27 43.5,25 C43.5,23 44,21 45,19.5 C46,18 47.5,17 49.5,16.5 
                  C51.5,16 53.5,16.5 55,17.5 C56.5,18.5 57.5,20 58,22" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Asia */}
          <path d="M60,12 C62,10.5 64.5,9.5 67,10 C69.5,10.5 72,12 74,14 C76,16 77.5,18.5 78,21.5 
                  C78.5,24.5 78,28 76.5,31 C75,34 72.5,36.5 69,38.5 C65.5,40.5 61.5,42 57,42.5 
                  C52.5,43 48,42.5 44,41 C40,39.5 36.5,37 34.5,34 C32.5,31 31.5,27.5 32,24 
                  C32.5,20.5 34.5,17 37.5,14 C40.5,11 44.5,8.5 49,7 C53.5,5.5 58.5,5 63,5.5 
                  C67.5,6 71.5,7.5 75,9.5 C78.5,11.5 81.5,14 83.5,17 C85.5,20 86.5,23.5 86.5,27.5 
                  C86.5,31.5 85.5,35.5 83.5,39 C81.5,42.5 78.5,45.5 75,48 C71.5,50.5 67.5,52.5 63,53.5" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* South East Asia Peninsula */}
          <path d="M69,35 C70,34 71.5,33.5 73,34 C74.5,34.5 75.5,35.5 76,37 C76.5,38.5 76.5,40 76,41.5 
                  C75.5,43 74.5,44.5 73,45.5 C71.5,46.5 69.5,47 67.5,46.5 C65.5,46 64,45 63,43.5 
                  C62,42 61.5,40 61.5,38 C61.5,36 62,34 63,32.5 C64,31 65.5,30 67.5,29.5 
                  C69.5,29 71.5,29.5 73,30.5 C74.5,31.5 75.5,33 76,35" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Australia */}
          <path d="M82,50 C83.5,48.5 85.5,47.5 88,48 C90.5,48.5 92.5,50 94,52 C95.5,54 96,56.5 95.5,59 
                  C95,61.5 93.5,64 91,66 C88.5,68 85.5,69.5 82,70 C78.5,70.5 75,70 72,68.5 
                  C69,67 66.5,65 65,62.5 C63.5,60 63,57 63.5,54 C64,51 65.5,48 68,45.5 
                  C70.5,43 73.5,41 77,40 C80.5,39 84.5,39 88,40 C91.5,41 94.5,43 97,45.5 
                  C99.5,48 101.5,51 102.5,54.5" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Indonesian Archipelago */}
          <path d="M72,46 L73,46 L74,47 L74,48 L73,49 L72,49 L71,48 L71,47 Z
                  M75,48 L76,48 L77,49 L77,50 L76,51 L75,51 L74,50 L74,49 Z
                  M70,50 L71,50 L72,51 L72,52 L71,53 L70,53 L69,52 L69,51 Z" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Japan */}
          <path d="M82,26 C82.5,25.5 83.5,25 84.5,25 C85.5,25 86.5,25.5 87,26.5 C87.5,27.5 87.5,28.5 87,29.5 
                  C86.5,30.5 85.5,31 84.5,31 C83.5,31 82.5,30.5 82,29.5 C81.5,28.5 81.5,27.5 82,26.5 Z
                  M83,32 C83.5,31.5 84.5,31 85.5,31 C86.5,31 87.5,31.5 88,32.5 C88.5,33.5 88.5,34.5 88,35.5 
                  C87.5,36.5 86.5,37 85.5,37 C84.5,37 83.5,36.5 83,35.5 C82.5,34.5 82.5,33.5 83,32.5 Z" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
                
          {/* Philippines */}
          <path d="M76,39 L77,39 L78,40 L78,41 L77,42 L76,42 L75,41 L75,40 Z
                  M74,41 L75,41 L76,42 L76,43 L75,44 L74,44 L73,43 L73,42 Z" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* New Zealand */}
          <path d="M92,62 L93,62 L94,63 L94,64 L93,65 L92,65 L91,64 L91,63 Z
                  M90,65 L91,65 L92,66 L92,67 L91,68 L90,68 L89,67 L89,66 Z" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Iceland */}
          <path d="M35,8 C35.5,7.5 36.5,7 37.5,7 C38.5,7 39.5,7.5 40,8.5 C40.5,9.5 40.5,10.5 40,11.5 
                  C39.5,12.5 38.5,13 37.5,13 C36.5,13 35.5,12.5 35,11.5 C34.5,10.5 34.5,9.5 35,8.5 Z" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Madagascar */}
          <path d="M52,39 C52.5,38.5 53.5,38 54.5,38 C55.5,38 56.5,38.5 57,39.5 C57.5,40.5 57.5,41.5 57,42.5 
                  C56.5,43.5 55.5,44 54.5,44 C53.5,44 52.5,43.5 52,42.5 C51.5,41.5 51.5,40.5 52,39.5 Z" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* Greenland */}
          <path d="M27,3 C28,2 29.5,1.5 31,2 C32.5,2.5 33.5,3.5 34,5 C34.5,6.5 34.5,8 34,9.5 
                  C33.5,11 32.5,12.5 31,13.5 C29.5,14.5 27.5,15 25.5,14.5 C23.5,14 22,13 21,11.5 
                  C20,10 19.5,8 19.5,6 C19.5,4 20,2 21,0.5 C22,-1 23.5,-2 25.5,-2.5
                  C27.5,-3 29.5,-2.5 31,-1.5" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
          
          {/* United Kingdom */}
          <path d="M39,15 C39.5,14.5 40.5,14 41.5,14 C42.5,14 43.5,14.5 44,15.5 C44.5,16.5 44.5,17.5 44,18.5 
                  C43.5,19.5 42.5,20 41.5,20 C40.5,20 39.5,19.5 39,18.5 C38.5,17.5 38.5,16.5 39,15.5 Z" 
                fill="url(#land-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
                
          {/* Antarctica */}
          <path d="M20,75 C25,74 30,73.5 35,73.5 C40,73.5 45,74 50,75 C55,76 60,77.5 65,79.5
                  C60,79.5 55,79.5 50,79.5 C45,79.5 40,79.5 35,79.5 C30,79.5 25,79.5 20,79.5
                  C15,79.5 10,79.5 5,79.5 C10,77.5 15,76 20,75Z" 
                fill="#E8F0F8" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
                
          {/* Grid Lines - Longitude/Latitude */}
          <g className="grid-lines" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1" strokeDasharray="0.5,0.5">
            {/* Equator */}
            <line x1="0" y1="40" x2="100" y2="40" strokeWidth="0.2" />
            
            {/* Tropics */}
            <line x1="0" y1="30" x2="100" y2="30" strokeDasharray="0.8,0.8" />
            <line x1="0" y1="50" x2="100" y2="50" strokeDasharray="0.8,0.8" />
            
            {/* Prime Meridian and International Date Line */}
            <line x1="50" y1="0" x2="50" y2="80" strokeDasharray="0.8,0.8" />
            
            {/* Other longitude lines */}
            {[10, 20, 30, 40, 60, 70, 80, 90].map(x => (
              <line key={`long-${x}`} x1={x} y1="0" x2={x} y2="80" />
            ))}
            
            {/* Other latitude lines */}
            {[10, 20, 60, 70].map(y => (
              <line key={`lat-${y}`} x1="0" y1={y} x2="100" y2={y} />
            ))}
          </g>
          
          {/* Ocean Labels */}
          <g className="ocean-labels" fill="rgba(255,255,255,0.4)" fontSize="1.2">
            <text x="25" y="25" transform="rotate(-15, 25, 25)">NORTH ATLANTIC</text>
            <text x="25" y="50" transform="rotate(15, 25, 50)">SOUTH ATLANTIC</text>
            <text x="75" y="25" transform="rotate(15, 75, 25)">NORTH PACIFIC</text>
            <text x="75" y="55" transform="rotate(-15, 75, 55)">SOUTH PACIFIC</text>
            <text x="50" y="60" transform="rotate(0, 50, 60)">INDIAN OCEAN</text>
            <text x="50" y="75" transform="rotate(0, 50, 75)">SOUTHERN OCEAN</text>
          </g>
        </g>
        
        {/* Draw routes */}
        <g className="routes">
          {routes.map(route => {
            if (!visibleRoutes.includes(route.id)) return null;
            
            const from = getPort(route.from);
            const to = getPort(route.to);
            
            if (!from || !to) return null;
            
            // For direct routes, just draw a point
            if (from.id === to.id) {
              return null;
            }
            
            return (
              <motion.path
                key={route.id}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: Math.random() * 0.5 }}
                d={`M${from.x},${from.y} L${to.x},${to.y}`}
                className={`route-line ${route.type}`}
                strokeDasharray="3 2"
                style={{ 
                  strokeWidth: route.type === 'direct' ? 0.35 : 0.25,
                  strokeDasharray: route.type === 'direct' ? '' : '2 0.5'
                }}
              />
            );
          })}
        </g>
        
        {/* Draw ports */}
        <g className="ports">
          {ports.map(port => {
            if (!visiblePorts.includes(port.id)) return null;
            
            const size = port.isHub ? 0.6 : 0.35;
            const color = port.isHub ? '#e74c3c' : '#ffffff';
            
            return (
              <g key={port.id}>
                <motion.circle
                  key={port.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + Math.random() * 0.5 }}
                  cx={port.x}
                  cy={port.y}
                  r={size}
                  fill={color}
                  className={`port-dot ${port.isHub ? 'hub' : ''}`}
                  filter={port.isHub ? 'url(#glow)' : 'url(#port-glow)'}
                />
                {port.isHub && (
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 + Math.random() * 0.5 }}
                    x={port.x}
                    y={port.y - 0.8}
                    fontSize="0.8"
                    fill="white"
                    textAnchor="middle"
                    className="text-white text-opacity-80 font-medium"
                  >
                    {port.name}
                  </motion.text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default MapComponent;
