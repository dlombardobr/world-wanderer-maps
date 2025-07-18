
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Port, Route, MapLanguage, MapStyle, LeafletMapProps } from './types';
import { RouteFilter } from '../RouteFilters';
import MapLegend from './MapLegend';
import MapLayers from './MapLayers';
import { 
  zoomToRegion, 
  updateMapStyle, 
  addMapStyles, 
  filterRoutes,
  getPort 
} from './mapUtil';
import { ports, routes } from './mapData';

const LeafletMap = ({ 
  activeFilter, 
  onCitiesUpdate,
  mapStyle = 'light',
  mapLanguage = 'en',
  showAllLabels = true, // Always show labels
  legendActiveFilter
}: LeafletMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);
  const labelsLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [visibleCities, setVisibleCities] = useState<Port[]>([]);
  
  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Create map instance
      mapRef.current = L.map(mapContainerRef.current, {
        center: [30, 115], // Center on China/Asia region
        zoom: 4, // Start more zoomed in to show Asia
        minZoom: 3, // Prevent zooming out too far
        maxZoom: 8,
        worldCopyJump: true,
        attributionControl: false // Hide attribution for cleaner look
      });

      // Create layers for markers, routes, and labels
      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
      routesLayerRef.current = L.layerGroup().addTo(mapRef.current);
      labelsLayerRef.current = L.layerGroup().addTo(mapRef.current);
      
      // Initialize with default style
      tileLayerRef.current = updateMapStyle(mapRef.current, tileLayerRef.current, mapStyle);
    }

    // Invalidate map size
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 300);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapStyle]);
  
  // Update map style when it changes
  useEffect(() => {
    if (mapRef.current) {
      tileLayerRef.current = updateMapStyle(mapRef.current, tileLayerRef.current, mapStyle);
    }
  }, [mapStyle]);

  // Update visible ports and routes when filter changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Zoom to the selected region
    zoomToRegion(mapRef.current, activeFilter);

    // Get filtered routes based on active filter
    const visibleRoutes = filterRoutes(routes, activeFilter);

    // Collect all visible port IDs from filtered routes
    const visiblePortIds = new Set<string>();
    visibleRoutes.forEach(route => {
      if (route.from !== 'china' && route.from !== 'korea' && route.from !== 'india' && route.from !== 'asia') {
        visiblePortIds.add(route.from);
      }
      visiblePortIds.add(route.to);
      if (route.via) visiblePortIds.add(route.via);
    });

    // Add custom CSS for tooltips
    const style = addMapStyles();
    
    return () => {
      document.head.removeChild(style);
    };
  }, [activeFilter]);

  // Filter routes for the MapLayers component
  const visibleRoutes = filterRoutes(routes, activeFilter);
  
  // Collect visible port IDs
  const visiblePortIds = new Set<string>();
  visibleRoutes.forEach(route => {
    if (route.from !== 'china' && route.from !== 'korea' && route.from !== 'india' && route.from !== 'asia') {
      visiblePortIds.add(route.from);
    }
    visiblePortIds.add(route.to);
    if (route.via) visiblePortIds.add(route.via);
  });

  // Handle cities update
  const handleCitiesUpdate = (cities: Port[]) => {
    setVisibleCities(cities);
    if (onCitiesUpdate) {
      onCitiesUpdate(cities);
    }
  };

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-xl overflow-hidden relative"
      style={{
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        animation: 'animate-zoom-fade-in',
        animationDuration: '0.8s'
      }}
    >
      <MapLegend 
        activeFilter={legendActiveFilter || activeFilter} 
        mapLanguage={mapLanguage}
      />
      
      <MapLayers 
        map={mapRef.current}
        markersLayer={markersLayerRef.current}
        routesLayer={routesLayerRef.current}
        labelsLayer={labelsLayerRef.current}
        activeFilter={activeFilter}
        showAllLabels={true} // Always show labels
        mapLanguage={mapLanguage}
        visibleRoutes={visibleRoutes}
        visiblePorts={visiblePortIds}
        onCitiesUpdate={handleCitiesUpdate}
      />
      
      {/* Add gradient overlay to better match the provided image */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-white/5 z-[500]"></div>
    </div>
  );
};

export default LeafletMap;
