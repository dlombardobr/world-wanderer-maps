
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Port, MapLanguage } from '@/components/LeafletMap';
import { RouteFilter } from '@/components/RouteFilters';
import CitiesTable from '@/components/CitiesTable';
import MapSection from '@/components/MapSection';
import MapSidebar from '@/components/MapSidebar';
import MapSettings from '@/components/MapSettings';
import PageFooter from '@/components/PageFooter';
import { MapStyle, styleLabels, translations } from '@/utils/mapTranslations';

const Index = () => {
  // State for active filter and cities
  const [activeFilter, setActiveFilter] = useState<RouteFilter>('all');
  const [cities, setCities] = useState<Port[]>([]);
  const [mapStyle, setMapStyle] = useState<MapStyle>('light');
  const mapLanguage: MapLanguage = 'en'; // Fixed to English

  // Handle filter change with single selection
  const handleFilterChange = (filter: RouteFilter) => {
    console.log("Filter change:", filter);
    setActiveFilter(filter);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto pb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <MapSection 
              activeFilter={activeFilter}
              onCitiesUpdate={setCities}
              mapStyle={mapStyle}
              mapLanguage={mapLanguage}
              translations={{ en: translations }}
            />
            
            <MapSidebar 
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              mapLanguage={mapLanguage}
            />
          </div>
          
          <MapSettings 
            mapLanguage={mapLanguage}
            mapStyle={mapStyle}
            setMapStyle={setMapStyle}
          />
        </div>
        
        <CitiesTable 
          activeFilter={activeFilter} 
          cities={cities} 
          mapLanguage={mapLanguage}
        />
        
        <PageFooter />
      </main>
    </div>
  );
};

export default Index;
