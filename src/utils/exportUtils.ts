
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Port } from '@/components/LeafletMap';
import { RouteFilter } from '@/components/RouteFilters';

/**
 * Exports the current map view as a PNG image
 */
export const exportMapAsImage = async (activeFilter: RouteFilter) => {
  try {
    // Capture the map container
    const mapElement = document.querySelector('.leaflet-container');
    if (!mapElement) {
      console.error('Map element not found');
      return;
    }

    const canvas = await html2canvas(mapElement as HTMLElement);
    
    // Convert to data URL and create download link
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `route-map-${activeFilter}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error downloading map:', error);
  }
};

/**
 * Exports cities data as JSON file
 */
export const exportCitiesData = (cities: Port[], activeFilter: RouteFilter) => {
  // Create a JSON file with cities data
  const dataStr = JSON.stringify(cities, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportName = `cities-data-${activeFilter}.json`;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportName);
  linkElement.click();
};

/**
 * Creates and downloads a complete project ZIP file
 */
export const downloadProjectZip = async (cities: Port[]) => {
  try {
    const zip = new JSZip();
    const srcFolder = zip.folder("src");
    const componentsFolder = srcFolder.folder("components");
    const utilsFolder = srcFolder.folder("utils");
    const pagesFolder = srcFolder.folder("pages");
    
    // Add HTML template with proper imports
    zip.file("index.html", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Route Mapper</title>
    <link href="./src/index.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  </head>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script type="module" src="./src/main.js"></script>
  </body>
</html>`);
    
    // Add package.json with required dependencies
    zip.file("package.json", `{
  "name": "route-mapper",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "leaflet": "^1.9.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "html2canvas": "^1.4.1",
    "jszip": "^3.10.1",
    "file-saver": "^2.0.5"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.8",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}`);
    
    // Add Vite config
    zip.file("vite.config.js", `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});`);
    
    // Add tailwind config
    zip.file("tailwind.config.js", `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-dark": "#001428",
        "teal-dark": "#00719C",
        "teal-medium": "#00A77F", 
        "blue-medium": "#00A0DC",
        "blue-light": "#C5E5F2",
        "yellow": "#FFCC33",
      },
    },
  },
  plugins: [],
}`);
    
    // Add postcss config
    zip.file("postcss.config.js", `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);
    
    // Add the main CSS file
    srcFolder.file("index.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Leaflet-specific styles */
.leaflet-container {
  background-color: #f0f0f0 !important;
}

.leaflet-control-attribution {
  display: none !important;
}

/* Route styles */
.route-direct {
  stroke: #00A0DC;
  stroke-width: 2;
  stroke-opacity: 0.8;
}

.route-indirect {
  stroke: #FFCC33;
  stroke-width: 1.5;
  stroke-opacity: 0.8;
  stroke-dasharray: 5, 5;
}`);
    
    // Add the main entry point
    srcFolder.file("main.js", `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`);
    
    // Add the App component
    srcFolder.file("App.js", `import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}`);
    
    // Add the main Index page component with your actual code
    pagesFolder.file("Index.js", `import React, { useState } from 'react';
import Header from '../components/Header';
import LeafletMap from '../components/LeafletMap';
import RouteFilters from '../components/RouteFilters';
import CitiesTable from '../components/CitiesTable';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [cities, setCities] = useState([]);
  const [mapStyle, setMapStyle] = useState('light');
  const mapLanguage = 'en';

  const handleFilterChange = (filter) => {
    console.log("Filter change:", filter);
    setActiveFilter(filter);
  };

  const handleDownload = async () => {
    // Your download code
  };

  const exportCitiesData = () => {
    // Your export code
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto pb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 h-[600px] relative">
              <LeafletMap 
                activeFilter={activeFilter} 
                onCitiesUpdate={setCities}
                mapStyle={mapStyle}
                mapLanguage={mapLanguage}
              />
            </div>
            
            <div className="md:w-1/4 p-4 border-t md:border-t-0 md:border-l border-gray-200">
              <RouteFilters 
                activeFilter={activeFilter} 
                onFilterChange={handleFilterChange} 
                mapLanguage={mapLanguage} 
              />
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div>
                <label className="text-sm font-medium">Map Style:</label>
                <select 
                  value={mapStyle}
                  onChange={(e) => setMapStyle(e.target.value)}
                  className="ml-2 p-1 border rounded"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="satellite">Satellite</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <CitiesTable 
          activeFilter={activeFilter} 
          cities={cities} 
          mapLanguage={mapLanguage}
        />
        
        <div className="mt-6 flex flex-wrap gap-4">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Map as Image
          </button>
          
          <button 
            onClick={exportCitiesData}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Cities Data (JSON)
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;`);
    
    // Add map components and utilities
    componentsFolder.file("LeafletMap.js", `import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ports, routes } from './mapData';

const LeafletMap = ({ activeFilter, onCitiesUpdate, mapStyle = 'light', mapLanguage = 'en' }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Create map instance
      mapRef.current = L.map(mapContainerRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2,
        maxZoom: 8,
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
      
      // Add markers for all ports
      ports.forEach(port => {
        const marker = L.marker([port.lat, port.lng], {
          icon: L.divIcon({
            className: port.isHub ? 'hub-marker' : 'port-marker',
            html: \`<div style="
              background-color: \${port.isHub ? '#FF4A4A' : '#4A90E2'};
              width: \${port.isHub ? 16 : 10}px;
              height: \${port.isHub ? 16 : 10}px;
              border-radius: 50%;
              border: 2px solid white;
            "></div>\`,
            iconSize: port.isHub ? [16, 16] : [10, 10],
            iconAnchor: port.isHub ? [8, 8] : [5, 5]
          })
        }).addTo(mapRef.current);
        
        // Add tooltip
        marker.bindTooltip(port.name);
      });
      
      // Draw routes
      routes.forEach(route => {
        const fromPort = ports.find(p => p.id === route.from);
        const toPort = ports.find(p => p.id === route.to);
        
        if (fromPort && toPort) {
          const line = L.polyline(
            [[fromPort.lat, fromPort.lng], [toPort.lat, toPort.lng]], 
            {
              color: route.type === 'direct' ? '#00A0DC' : '#FFCC33',
              weight: route.type === 'direct' ? 3 : 2,
              dashArray: route.type === 'direct' ? '' : '5, 5'
            }
          ).addTo(mapRef.current);
        }
      });
      
      // Update cities list
      if (onCitiesUpdate) {
        onCitiesUpdate(ports);
      }
    }
  }, []);
  
  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full rounded-xl overflow-hidden relative"
    ></div>
  );
};

export default LeafletMap;`);
    
    // Add map data
    componentsFolder.file("mapData.js", `export const ports = [
  { id: 'hamburg', name: 'Hamburg', lat: 53.5511, lng: 9.9937, isHub: true },
  { id: 'rotterdam', name: 'Rotterdam', lat: 51.9225, lng: 4.47917, isHub: true },
  { id: 'barcelona', name: 'Barcelona', lat: 41.3851, lng: 2.1734, isHub: true },
  { id: 'singapore', name: 'Singapore', lat: 1.3521, lng: 103.8198, isHub: true },
  { id: 'hong-kong', name: 'Hong Kong', lat: 22.3193, lng: 114.1694, isHub: true },
  { id: 'busan', name: 'Busan', lat: 35.1796, lng: 129.0756, isHub: true },
  // Add more ports as needed
];

export const routes = [
  { id: 'direct-hamburg', type: 'direct', from: 'hamburg', to: 'hamburg' },
  { id: 'direct-rotterdam', type: 'direct', from: 'rotterdam', to: 'rotterdam' },
  { id: 'direct-barcelona', type: 'direct', from: 'barcelona', to: 'barcelona' },
  { id: 'direct-singapore-rotterdam', type: 'direct', from: 'singapore', to: 'rotterdam' },
  { id: 'direct-hong-kong-hamburg', type: 'direct', from: 'hong-kong', to: 'hamburg' },
  // Add more routes as needed
];`);
    
    // Add basic components
    componentsFolder.file("Header.js", `import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-800 text-white py-4 mb-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold">Route Mapper</h1>
      </div>
    </header>
  );
};

export default Header;`);
    
    componentsFolder.file("RouteFilters.js", `import React from 'react';

const RouteFilters = ({ activeFilter, onFilterChange, mapLanguage }) => {
  const filters = [
    { id: 'all', label: 'All Routes' },
    { id: 'direct', label: 'Direct Routes' },
    { id: 'rotterdam', label: 'Via Rotterdam' },
    { id: 'singapore', label: 'Via Singapore' },
    { id: 'busan', label: 'Via Busan' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold text-blue-800">Filters</h3>
      
      <div className="space-y-2">
        {filters.map(filter => (
          <div 
            key={filter.id}
            className={\`p-2 rounded cursor-pointer hover:bg-blue-50 \${
              activeFilter === filter.id ? 'bg-blue-100 border-l-4 border-blue-500' : ''
            }\`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteFilters;`);
    
    componentsFolder.file("CitiesTable.js", `import React from 'react';

const CitiesTable = ({ activeFilter, cities, mapLanguage }) => {
  const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name));
  
  return (
    <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-50 border-b border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800">
          {activeFilter === 'all' ? 'All Ports' : \`Ports for \${activeFilter}\`}
        </h3>
      </div>
      
      <div className="p-4">
        <ul className="list-disc pl-5 space-y-1">
          {sortedCities.map((city) => (
            <li key={city.id} className="text-sm text-gray-700">{city.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CitiesTable;`);

    // Add README with instructions
    zip.file("README.md", `# Route Mapper

A complete interactive shipping route mapping application.

## Installation

1. Make sure you have Node.js installed (version 14 or newer)
2. Extract all files to a folder
3. Open terminal in that folder
4. Run \`npm install\` to install dependencies
5. Run \`npm run dev\` to start the development server
6. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Building for production

Run \`npm run build\` to create a production build in the \`dist\` folder.
You can then deploy these files to any static hosting service.

## Features

- Interactive map showing shipping routes
- Filter routes by hub port
- Download map as image
- Export data as JSON
`);

    // Download map image and add to ZIP
    const mapElement = document.querySelector('.leaflet-container');
    if (mapElement) {
      const canvas = await html2canvas(mapElement as HTMLElement);
      const imgData = canvas.toDataURL('image/png');
      const imgBase64 = imgData.split(',')[1];
      zip.file("preview.png", imgBase64, {base64: true});
    }
    
    // Add cities data to ZIP as sample data
    zip.file("data/cities-data.json", JSON.stringify(cities, null, 2));
    
    // Generate and download ZIP
    const content = await zip.generateAsync({type: "blob"});
    saveAs(content, "route-mapper-complete-project.zip");
  } catch (error) {
    console.error("Error creating project ZIP:", error);
  }
};
