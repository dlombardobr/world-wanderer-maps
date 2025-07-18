
import { Port, Route } from './types';

// Define only the ports from the reference image
export const ports: Port[] = [
  // Main Chinese ports from the reference image
  { id: 'shanghai', name: 'Shanghai', lat: 31.2304, lng: 121.4737, isHub: true },
  { id: 'ningbo', name: 'Ningbo', lat: 29.8683, lng: 121.5440, isHub: true },
  { id: 'qingdao', name: 'Qingdao', lat: 36.0671, lng: 120.3826, isHub: true },
  { id: 'shenzhen', name: 'Shenzhen', lat: 22.5431, lng: 114.0579, isHub: true },
  
  // Cities served by Shanghai/Ningbo
  { id: 'hangzhou', name: 'Hangzhou', lat: 30.2741, lng: 120.1551, via: 'shanghai' },
  { id: 'suzhou', name: 'Suzhou', lat: 31.2989, lng: 120.5853, via: 'shanghai' },
  { id: 'yuyao', name: 'Yuyao', lat: 30.0469, lng: 121.1547, via: 'shanghai' },
  { id: 'taizhou-zhejiang', name: 'Taizhou', lat: 28.6129, lng: 121.4201, via: 'shanghai' },
  { id: 'yuhuan', name: 'Yuhuan', lat: 28.1367, lng: 121.3708, via: 'shanghai' },
  
  // Cities served by Qingdao
  { id: 'dalian', name: 'Dalian', lat: 38.9140, lng: 121.6147, via: 'qingdao' },
  { id: 'shenyang', name: 'Shenyang', lat: 41.8057, lng: 123.4315, via: 'qingdao' },
  { id: 'changchun', name: 'Changchun', lat: 43.8171, lng: 125.3235, via: 'qingdao' },
  { id: 'hebi', name: 'Hebi', lat: 35.8999, lng: 114.2978, via: 'qingdao' },
  { id: 'binzhou', name: 'Binzhou', lat: 37.3700, lng: 118.0169, via: 'qingdao' },
  { id: 'mengzhou', name: 'Mengzhou', lat: 34.9050, lng: 112.7924, via: 'qingdao' },
  { id: 'nanyang', name: 'Nanyang', lat: 33.0062, lng: 112.5285, via: 'qingdao' },
  
  // City served by Shanghai directly
  { id: 'chongqing', name: 'Chongqing', lat: 29.4316, lng: 106.9123, via: 'shanghai' },
  
  // Cities served by Shenzhen
  { id: 'foshan', name: 'Foshan', lat: 23.0292, lng: 113.1231, via: 'shenzhen' },
  { id: 'taishan', name: 'Taishan', lat: 22.2511, lng: 112.7804, via: 'shenzhen' },
  { id: 'hengyang', name: 'Hengyang', lat: 26.8968, lng: 112.6140, via: 'shenzhen' },
  { id: 'changsha', name: 'Changsha', lat: 28.2282, lng: 112.9388, via: 'shenzhen' },
  { id: 'zhaoqing', name: 'Zhaoqing', lat: 23.0517, lng: 112.4597, via: 'shenzhen' },
  { id: 'liuyang', name: 'Liuyang', lat: 28.1439, lng: 113.6439, via: 'shenzhen' }
];

// Define only the routes for ports from the reference image
export const routes: Route[] = [
  // Main hub ports (self-connections to display hubs)
  { id: 'direct-shanghai', type: 'direct', from: 'shanghai', to: 'shanghai' },
  { id: 'direct-ningbo', type: 'direct', from: 'ningbo', to: 'ningbo' },
  { id: 'direct-qingdao', type: 'direct', from: 'qingdao', to: 'qingdao' },
  { id: 'direct-shenzhen', type: 'direct', from: 'shenzhen', to: 'shenzhen' },
  
  // Routes via Shanghai/Ningbo
  { id: 'shanghai-hangzhou', type: 'indirect', from: 'shanghai', to: 'hangzhou', via: 'shanghai' },
  { id: 'shanghai-suzhou', type: 'indirect', from: 'shanghai', to: 'suzhou', via: 'shanghai' },
  { id: 'shanghai-yuyao', type: 'indirect', from: 'shanghai', to: 'yuyao', via: 'shanghai' },
  { id: 'shanghai-chongqing', type: 'indirect', from: 'shanghai', to: 'chongqing', via: 'shanghai' },
  { id: 'ningbo-taizhou', type: 'indirect', from: 'ningbo', to: 'taizhou-zhejiang', via: 'ningbo' },
  { id: 'ningbo-yuhuan', type: 'indirect', from: 'ningbo', to: 'yuhuan', via: 'ningbo' },
  
  // Routes via Qingdao
  { id: 'qingdao-dalian', type: 'indirect', from: 'qingdao', to: 'dalian', via: 'qingdao' },
  { id: 'qingdao-shenyang', type: 'indirect', from: 'qingdao', to: 'shenyang', via: 'qingdao' },
  { id: 'qingdao-changchun', type: 'indirect', from: 'qingdao', to: 'changchun', via: 'qingdao' },
  { id: 'qingdao-hebi', type: 'indirect', from: 'qingdao', to: 'hebi', via: 'qingdao' },
  { id: 'qingdao-binzhou', type: 'indirect', from: 'qingdao', to: 'binzhou', via: 'qingdao' },
  { id: 'qingdao-mengzhou', type: 'indirect', from: 'qingdao', to: 'mengzhou', via: 'qingdao' },
  { id: 'qingdao-nanyang', type: 'indirect', from: 'qingdao', to: 'nanyang', via: 'qingdao' },
  
  // Routes via Shenzhen
  { id: 'shenzhen-foshan', type: 'indirect', from: 'shenzhen', to: 'foshan', via: 'shenzhen' },
  { id: 'shenzhen-taishan', type: 'indirect', from: 'shenzhen', to: 'taishan', via: 'shenzhen' },
  { id: 'shenzhen-hengyang', type: 'indirect', from: 'shenzhen', to: 'hengyang', via: 'shenzhen' },
  { id: 'shenzhen-changsha', type: 'indirect', from: 'shenzhen', to: 'changsha', via: 'shenzhen' },
  { id: 'shenzhen-zhaoqing', type: 'indirect', from: 'shenzhen', to: 'zhaoqing', via: 'shenzhen' },
  { id: 'shenzhen-liuyang', type: 'indirect', from: 'shenzhen', to: 'liuyang', via: 'shenzhen' }
];
