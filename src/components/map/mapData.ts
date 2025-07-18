
import { Port, Route } from './types';

// Define all ports with lat/lng coordinates
export const ports: Port[] = [
  // Main European hubs (direct service)
  { id: 'hamburg', name: 'Hamburgo', lat: 53.5511, lng: 9.9937, isHub: true },
  { id: 'rotterdam', name: 'Roterdão', lat: 51.9225, lng: 4.47917, isHub: true },
  { id: 'barcelona', name: 'Barcelona', lat: 41.3851, lng: 2.1734, isHub: true },
  { id: 'valencia', name: 'Valência', lat: 39.4699, lng: -0.3763, isHub: true },
  { id: 'genova', name: 'Gênova', lat: 44.4056, lng: 8.9463, isHub: true },
  { id: 'antwerpia', name: 'Antuérpia', lat: 51.2194, lng: 4.4025, isHub: true },
  
  // Asian hubs
  { id: 'singapore', name: 'Singapore', lat: 1.3521, lng: 103.8198, isHub: true },
  { id: 'hong-kong', name: 'Hong Kong', lat: 22.3193, lng: 114.1694, isHub: true },
  { id: 'busan', name: 'Busan', lat: 35.1796, lng: 129.0756, isHub: true },
  { id: 'shanghai', name: 'Shanghai', lat: 31.2304, lng: 121.4737, isHub: true },
  { id: 'shanghai-imo', name: 'Shanghai (IMO)', lat: 31.2304, lng: 121.5737, isHub: true },
  { id: 'ningbo', name: 'Ningbo', lat: 29.8683, lng: 121.5440, isHub: true },
  { id: 'qingdao', name: 'Qingdao', lat: 36.0671, lng: 120.3826, isHub: true },
  { id: 'shenzhen', name: 'Shenzhen', lat: 22.5431, lng: 114.0579, isHub: true },
  
  // Indian hubs
  { id: 'chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707, isHub: true },
  { id: 'nhava-sheva', name: 'Nhava Sheva', lat: 18.9490, lng: 72.9492, isHub: true },

  // European ports via Rotterdam
  { id: 'vienna', name: 'Vienna', lat: 48.2082, lng: 16.3738, via: 'rotterdam' },
  { id: 'linz', name: 'Linz', lat: 48.3069, lng: 14.2858, via: 'rotterdam' },
  { id: 'sofia', name: 'Sofia', lat: 42.6977, lng: 23.3219, via: 'rotterdam' },
  { id: 'aarhus', name: 'Aarhus', lat: 56.1629, lng: 10.2039, via: 'rotterdam' },
  { id: 'alexandria', name: 'Alexandria', lat: 31.2001, lng: 29.9187, via: 'rotterdam' },
  { id: 'bratislava', name: 'Bratislava', lat: 48.1486, lng: 17.1077, via: 'rotterdam' },
  { id: 'koper', name: 'Koper', lat: 45.5475, lng: 13.7304, via: 'rotterdam' },
  { id: 'helsinki', name: 'Helsinki', lat: 60.1699, lng: 24.9384, via: 'rotterdam' },
  { id: 'le-havre', name: 'Le Havre', lat: 49.4944, lng: 0.1079, via: 'rotterdam' },
  { id: 'paris', name: 'Paris', lat: 48.8566, lng: 2.3522, via: 'rotterdam' },
  { id: 'budapest', name: 'Budapest', lat: 47.4979, lng: 19.0402, via: 'rotterdam' },
  { id: 'dublin', name: 'Dublin', lat: 53.3498, lng: -6.2603, via: 'rotterdam' },
  { id: 'belfast', name: 'Belfast', lat: 54.5973, lng: -5.9301, via: 'rotterdam' },
  { id: 'ashdod', name: 'Ashdod', lat: 31.8192, lng: 34.6479, via: 'rotterdam' },
  { id: 'haifa', name: 'Haifa', lat: 32.7940, lng: 34.9896, via: 'rotterdam' },
  { id: 'beirut', name: 'Beirut', lat: 33.8938, lng: 35.5018, via: 'rotterdam' },
  { id: 'oslo', name: 'Oslo', lat: 59.9139, lng: 10.7522, via: 'rotterdam' },
  { id: 'prague', name: 'Prague', lat: 50.0755, lng: 14.4378, via: 'rotterdam' },
  { id: 'ostrava', name: 'Ostrava', lat: 49.8209, lng: 18.2625, via: 'rotterdam' },
  { id: 'bucharest', name: 'Bucharest', lat: 44.4268, lng: 26.1025, via: 'rotterdam' },
  { id: 'gothenborg', name: 'Gothenborg', lat: 57.7089, lng: 11.9746, via: 'rotterdam' },
  { id: 'basel', name: 'Basel', lat: 47.5596, lng: 7.5886, via: 'rotterdam' },
  { id: 'geneve', name: 'Geneve', lat: 46.2044, lng: 6.1432, via: 'rotterdam' },
  
  // Asian ports via Singapore
  { id: 'brisbane', name: 'Brisbane', lat: -27.4698, lng: 153.0251 },
  { id: 'melbourne', name: 'Melbourne', lat: -37.8136, lng: 144.9631 },
  { id: 'sydney', name: 'Sydney', lat: -33.8688, lng: 151.2093 },
  { id: 'chittagong', name: 'Chittagong', lat: 22.3569, lng: 91.7832 },
  { id: 'sihanoukville', name: 'Sihanoukville', lat: 10.6294, lng: 103.5302 },
  { id: 'cochin', name: 'Cochin', lat: 9.9312, lng: 76.2673 },
  { id: 'calcutta', name: 'Calcutta', lat: 22.5726, lng: 88.3639 },
  { id: 'jakarta', name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
  { id: 'semarang', name: 'Semarang', lat: -6.9932, lng: 110.4203 },
  { id: 'surabaya', name: 'Surabaya', lat: -7.2575, lng: 112.7521 },
  { id: 'tokyo', name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
  { id: 'penang', name: 'Penang', lat: 5.4141, lng: 100.3288 },
  { id: 'port-klang', name: 'Port Klang', lat: 3.0050, lng: 101.3590 },
  { id: 'pasir-gudang', name: 'Pasir Gudang', lat: 1.4686, lng: 103.9023 },
  { id: 'yangon', name: 'Yangon', lat: 16.8661, lng: 96.1951 },
  { id: 'auckland', name: 'Auckland', lat: -36.8509, lng: 174.7645 },
  { id: 'karachi', name: 'Karachi', lat: 24.8607, lng: 67.0011 },
  { id: 'cebu', name: 'Cebu', lat: 10.3157, lng: 123.8854 },
  { id: 'manila', name: 'Manila', lat: 14.5995, lng: 120.9842 },
  { id: 'colombo', name: 'Colombo', lat: 6.9271, lng: 79.8612 },
  { id: 'keelung', name: 'Keelung', lat: 25.1276, lng: 121.7392 },
  { id: 'kaohsiung', name: 'Kaohsiung', lat: 22.6273, lng: 120.3014 },
  { id: 'taichung', name: 'Taichung', lat: 24.1477, lng: 120.6736 },
  { id: 'laem-chaban', name: 'Laem Chaban', lat: 13.1061, lng: 100.9159 },
  { id: 'bangkok', name: 'Bangkok', lat: 13.7563, lng: 100.5018 },
  { id: 'dubai', name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { id: 'jebel-ali', name: 'Jebel Ali', lat: 25.0159, lng: 55.0678 },
  { id: 'danang', name: 'Danang', lat: 16.0544, lng: 108.2022 },
  { id: 'haiphong', name: 'Haiphong', lat: 20.8449, lng: 106.6880 },
  { id: 'ho-chi-minh', name: 'Ho Chi Minh', lat: 10.8231, lng: 106.6297 },
  
  // Asian ports via Busan
  { id: 'dalian', name: 'Dalian', lat: 38.9140, lng: 121.6147 },
  { id: 'xingang-tianjin', name: 'Xingang/Tianjin', lat: 39.1047, lng: 117.7402 },
  { id: 'kobe', name: 'Kobe', lat: 34.6913, lng: 135.1830 },
  { id: 'nagoya', name: 'Nagoya', lat: 35.1815, lng: 136.9066 },
  { id: 'osaka', name: 'Osaka', lat: 34.6937, lng: 135.5023 },
  { id: 'yokohama', name: 'Yokohama', lat: 35.4437, lng: 139.6380 },
  
  // Asian port via Hong Kong
  { id: 'ichon', name: 'Ichon', lat: 37.2836, lng: 127.4424 },
  
  // Indian port via Chennai
  { id: 'bangalore', name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  
  // Indian ports via Nhava Sheva
  { id: 'ahmedabad', name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { id: 'new-delhi', name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
  { id: 'hyderabad', name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { id: 'ludhiana', name: 'Ludhiana', lat: 30.9010, lng: 75.8573 },
  
  // Chinese ports via Shenzhen
  { id: 'foshan', name: 'Foshan', lat: 23.0292, lng: 113.1231 },
  { id: 'fuzhou', name: 'Fuzhou', lat: 26.0745, lng: 119.2965 },
  { id: 'guangzhou', name: 'Guangzhou', lat: 23.1291, lng: 113.2644 },
  { id: 'jiangmen', name: 'Jiangmen', lat: 22.5866, lng: 113.0915 },
  { id: 'shantou', name: 'Shantou', lat: 23.3640, lng: 116.6830 },
  { id: 'shunde', name: 'Shunde', lat: 22.8398, lng: 113.2518 },
  { id: 'xiamen', name: 'Xiamen', lat: 24.4797, lng: 118.0819 },
  { id: 'zhongshan-xiaolan', name: 'Zhongshan/Xiaolan', lat: 22.5157, lng: 113.3926 },
  { id: 'zhuhai', name: 'Zhuhai', lat: 22.2764, lng: 113.5674 },
  
  // European port via Barcelona
  { id: 'leixoes', name: 'Leixões', lat: 41.1850, lng: -8.7016 }
];

// Define all routes
export const routes: Route[] = [
  // Direct service - European hubs (self-connections to display hubs)
  { id: 'direct-hamburg', type: 'direct', from: 'hamburg', to: 'hamburg' },
  { id: 'direct-rotterdam', type: 'direct', from: 'rotterdam', to: 'rotterdam' },
  { id: 'direct-barcelona', type: 'direct', from: 'barcelona', to: 'barcelona' },
  { id: 'direct-valencia', type: 'direct', from: 'valencia', to: 'valencia' },
  { id: 'direct-genova', type: 'direct', from: 'genova', to: 'genova' },
  { id: 'direct-antwerpia', type: 'direct', from: 'antwerpia', to: 'antwerpia' },
  
  // Direct routes - China
  { id: 'direct-china-hk', type: 'direct', from: 'china', to: 'hong-kong' },
  { id: 'direct-china-ningbo', type: 'direct', from: 'china', to: 'ningbo' },
  { id: 'direct-china-qingdao', type: 'direct', from: 'china', to: 'qingdao' },
  { id: 'direct-china-shanghai', type: 'direct', from: 'china', to: 'shanghai' },
  { id: 'direct-china-shanghai-imo', type: 'direct', from: 'china', to: 'shanghai-imo' },
  { id: 'direct-china-shenzhen', type: 'direct', from: 'china', to: 'shenzhen' },
  
  // Direct routes - Korea, India, Singapore
  { id: 'direct-korea-busan', type: 'direct', from: 'korea', to: 'busan' },
  { id: 'direct-india-nhava', type: 'direct', from: 'india', to: 'nhava-sheva' },
  { id: 'direct-india-chennai', type: 'direct', from: 'india', to: 'chennai' },
  { id: 'direct-singapore', type: 'direct', from: 'asia', to: 'singapore' },
  
  // Routes via Rotterdam
  { id: 'rotterdam-vienna', type: 'indirect', from: 'rotterdam', to: 'vienna', via: 'rotterdam' },
  { id: 'rotterdam-linz', type: 'indirect', from: 'rotterdam', to: 'linz', via: 'rotterdam' },
  { id: 'rotterdam-sofia', type: 'indirect', from: 'rotterdam', to: 'sofia', via: 'rotterdam' },
  { id: 'rotterdam-aarhus', type: 'indirect', from: 'rotterdam', to: 'aarhus', via: 'rotterdam' },
  { id: 'rotterdam-alexandria', type: 'indirect', from: 'rotterdam', to: 'alexandria', via: 'rotterdam' },
  { id: 'rotterdam-bratislava', type: 'indirect', from: 'rotterdam', to: 'bratislava', via: 'rotterdam' },
  { id: 'rotterdam-koper', type: 'indirect', from: 'rotterdam', to: 'koper', via: 'rotterdam' },
  { id: 'rotterdam-helsinki', type: 'indirect', from: 'rotterdam', to: 'helsinki', via: 'rotterdam' },
  { id: 'rotterdam-le-havre', type: 'indirect', from: 'rotterdam', to: 'le-havre', via: 'rotterdam' },
  { id: 'rotterdam-paris', type: 'indirect', from: 'rotterdam', to: 'paris', via: 'rotterdam' },
  { id: 'rotterdam-budapest', type: 'indirect', from: 'rotterdam', to: 'budapest', via: 'rotterdam' },
  { id: 'rotterdam-dublin', type: 'indirect', from: 'rotterdam', to: 'dublin', via: 'rotterdam' },
  { id: 'rotterdam-belfast', type: 'indirect', from: 'rotterdam', to: 'belfast', via: 'rotterdam' },
  { id: 'rotterdam-ashdod', type: 'indirect', from: 'rotterdam', to: 'ashdod', via: 'rotterdam' },
  { id: 'rotterdam-haifa', type: 'indirect', from: 'rotterdam', to: 'haifa', via: 'rotterdam' },
  { id: 'rotterdam-beirut', type: 'indirect', from: 'rotterdam', to: 'beirut', via: 'rotterdam' },
  { id: 'rotterdam-oslo', type: 'indirect', from: 'rotterdam', to: 'oslo', via: 'rotterdam' },
  { id: 'rotterdam-prague', type: 'indirect', from: 'rotterdam', to: 'prague', via: 'rotterdam' },
  { id: 'rotterdam-ostrava', type: 'indirect', from: 'rotterdam', to: 'ostrava', via: 'rotterdam' },
  { id: 'rotterdam-bucharest', type: 'indirect', from: 'rotterdam', to: 'bucharest', via: 'rotterdam' },
  { id: 'rotterdam-gothenborg', type: 'indirect', from: 'rotterdam', to: 'gothenborg', via: 'rotterdam' },
  { id: 'rotterdam-basel', type: 'indirect', from: 'rotterdam', to: 'basel', via: 'rotterdam' },
  { id: 'rotterdam-geneve', type: 'indirect', from: 'rotterdam', to: 'geneve', via: 'rotterdam' },
  
  // Routes via Singapore
  { id: 'singapore-brisbane', type: 'indirect', from: 'singapore', to: 'brisbane', via: 'singapore' },
  { id: 'singapore-melbourne', type: 'indirect', from: 'singapore', to: 'melbourne', via: 'singapore' },
  { id: 'singapore-sydney', type: 'indirect', from: 'singapore', to: 'sydney', via: 'singapore' },
  { id: 'singapore-chittagong', type: 'indirect', from: 'singapore', to: 'chittagong', via: 'singapore' },
  { id: 'singapore-sihanoukville', type: 'indirect', from: 'singapore', to: 'sihanoukville', via: 'singapore' },
  { id: 'singapore-cochin', type: 'indirect', from: 'singapore', to: 'cochin', via: 'singapore' },
  { id: 'singapore-calcutta', type: 'indirect', from: 'singapore', to: 'calcutta', via: 'singapore' },
  { id: 'singapore-jakarta', type: 'indirect', from: 'singapore', to: 'jakarta', via: 'singapore' },
  { id: 'singapore-semarang', type: 'indirect', from: 'singapore', to: 'semarang', via: 'singapore' },
  { id: 'singapore-surabaya', type: 'indirect', from: 'singapore', to: 'surabaya', via: 'singapore' },
  { id: 'singapore-tokyo', type: 'indirect', from: 'singapore', to: 'tokyo', via: 'singapore' },
  { id: 'singapore-penang', type: 'indirect', from: 'singapore', to: 'penang', via: 'singapore' },
  { id: 'singapore-port-klang', type: 'indirect', from: 'singapore', to: 'port-klang', via: 'singapore' },
  { id: 'singapore-pasir-gudang', type: 'indirect', from: 'singapore', to: 'pasir-gudang', via: 'singapore' },
  { id: 'singapore-yangon', type: 'indirect', from: 'singapore', to: 'yangon', via: 'singapore' },
  { id: 'singapore-auckland', type: 'indirect', from: 'singapore', to: 'auckland', via: 'singapore' },
  { id: 'singapore-karachi', type: 'indirect', from: 'singapore', to: 'karachi', via: 'singapore' },
  { id: 'singapore-cebu', type: 'indirect', from: 'singapore', to: 'cebu', via: 'singapore' },
  { id: 'singapore-manila', type: 'indirect', from: 'singapore', to: 'manila', via: 'singapore' },
  { id: 'singapore-colombo', type: 'indirect', from: 'singapore', to: 'colombo', via: 'singapore' },
  { id: 'singapore-keelung', type: 'indirect', from: 'singapore', to: 'keelung', via: 'singapore' },
  { id: 'singapore-kaohsiung', type: 'indirect', from: 'singapore', to: 'kaohsiung', via: 'singapore' },
  { id: 'singapore-taichung', type: 'indirect', from: 'singapore', to: 'taichung', via: 'singapore' },
  { id: 'singapore-laem-chaban', type: 'indirect', from: 'singapore', to: 'laem-chaban', via: 'singapore' },
  { id: 'singapore-bangkok', type: 'indirect', from: 'singapore', to: 'bangkok', via: 'singapore' },
  { id: 'singapore-dubai', type: 'indirect', from: 'singapore', to: 'dubai', via: 'singapore' },
  { id: 'singapore-jebel-ali', type: 'indirect', from: 'singapore', to: 'jebel-ali', via: 'singapore' },
  { id: 'singapore-danang', type: 'indirect', from: 'singapore', to: 'danang', via: 'singapore' },
  { id: 'singapore-haiphong', type: 'indirect', from: 'singapore', to: 'haiphong', via: 'singapore' },
  { id: 'singapore-ho-chi-minh', type: 'indirect', from: 'singapore', to: 'ho-chi-minh', via: 'singapore' },
  
  // Routes via Busan
  { id: 'busan-dalian', type: 'indirect', from: 'busan', to: 'dalian', via: 'busan' },
  { id: 'busan-xingang-tianjin', type: 'indirect', from: 'busan', to: 'xingang-tianjin', via: 'busan' },
  { id: 'busan-kobe', type: 'indirect', from: 'busan', to: 'kobe', via: 'busan' },
  { id: 'busan-nagoya', type: 'indirect', from: 'busan', to: 'nagoya', via: 'busan' },
  { id: 'busan-osaka', type: 'indirect', from: 'busan', to: 'osaka', via: 'busan' },
  { id: 'busan-yokohama', type: 'indirect', from: 'busan', to: 'yokohama', via: 'busan' },
  
  // Route via Hong Kong
  { id: 'hong-kong-ichon', type: 'indirect', from: 'hong-kong', to: 'ichon', via: 'hong-kong' },
  
  // Route via Chennai
  { id: 'chennai-bangalore', type: 'indirect', from: 'chennai', to: 'bangalore', via: 'chennai' },
  
  // Routes via Nhava Sheva
  { id: 'nhava-ahmedabad', type: 'indirect', from: 'nhava-sheva', to: 'ahmedabad', via: 'nhava-sheva' },
  { id: 'nhava-new-delhi', type: 'indirect', from: 'nhava-sheva', to: 'new-delhi', via: 'nhava-sheva' },
  { id: 'nhava-hyderabad', type: 'indirect', from: 'nhava-sheva', to: 'hyderabad', via: 'nhava-sheva' },
  { id: 'nhava-ludhiana', type: 'indirect', from: 'nhava-sheva', to: 'ludhiana', via: 'nhava-sheva' },
  
  // Routes via Shenzhen
  { id: 'shenzhen-foshan', type: 'indirect', from: 'shenzhen', to: 'foshan', via: 'shenzhen' },
  { id: 'shenzhen-fuzhou', type: 'indirect', from: 'shenzhen', to: 'fuzhou', via: 'shenzhen' },
  { id: 'shenzhen-guangzhou', type: 'indirect', from: 'shenzhen', to: 'guangzhou', via: 'shenzhen' },
  { id: 'shenzhen-jiangmen', type: 'indirect', from: 'shenzhen', to: 'jiangmen', via: 'shenzhen' },
  { id: 'shenzhen-shantou', type: 'indirect', from: 'shenzhen', to: 'shantou', via: 'shenzhen' },
  { id: 'shenzhen-shunde', type: 'indirect', from: 'shenzhen', to: 'shunde', via: 'shenzhen' },
  { id: 'shenzhen-xiamen', type: 'indirect', from: 'shenzhen', to: 'xiamen', via: 'shenzhen' },
  { id: 'shenzhen-zhongshan', type: 'indirect', from: 'shenzhen', to: 'zhongshan-xiaolan', via: 'shenzhen' },
  { id: 'shenzhen-zhuhai', type: 'indirect', from: 'shenzhen', to: 'zhuhai', via: 'shenzhen' },
  
  // Route via Barcelona
  { id: 'barcelona-leixoes', type: 'indirect', from: 'barcelona', to: 'leixoes', via: 'barcelona' },
  
  // Additional direct routes between major hubs
  { id: 'direct-rotterdam-singapore', type: 'direct', from: 'rotterdam', to: 'singapore' },
  { id: 'direct-hong-kong-hamburg', type: 'direct', from: 'hong-kong', to: 'hamburg' },
  { id: 'direct-singapore-shanghai', type: 'direct', from: 'singapore', to: 'shanghai' },
  { id: 'direct-busan-rotterdam', type: 'direct', from: 'busan', to: 'rotterdam' },
  { id: 'direct-barcelona-ningbo', type: 'direct', from: 'barcelona', to: 'ningbo' },
  { id: 'direct-shenzhen-genova', type: 'direct', from: 'shenzhen', to: 'genova' },
  { id: 'direct-nhava-antwerpia', type: 'direct', from: 'nhava-sheva', to: 'antwerpia' }
];
