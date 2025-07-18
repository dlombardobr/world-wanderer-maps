
import React, { useEffect } from 'react';
import L from 'leaflet';
import { Port, MapLanguage } from '../types';
import { addPortMarkers } from './PortMarkers';

type PortMarkersLayerProps = {
  map: L.Map | null;
  markersLayer: L.LayerGroup | null;
  labelsLayer: L.LayerGroup | null;
  mapLanguage: MapLanguage;
  ports: Port[];
  legendVisibility: { hub: boolean; port: boolean };
};

const PortMarkersLayer = ({
  map,
  markersLayer,
  labelsLayer,
  mapLanguage,
  ports,
  legendVisibility
}: PortMarkersLayerProps) => {
  useEffect(() => {
    if (!map || !markersLayer || !labelsLayer) return;
    
    // Clear previous markers and labels
    markersLayer.clearLayers();
    labelsLayer.clearLayers();
    
    // Add port markers to the map
    addPortMarkers(ports, markersLayer, labelsLayer, mapLanguage, legendVisibility);
  }, [
    map, 
    markersLayer, 
    labelsLayer, 
    mapLanguage, 
    ports, 
    legendVisibility
  ]);

  return null;
};

export default PortMarkersLayer;
