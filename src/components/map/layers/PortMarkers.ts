
import L from 'leaflet';
import { Port, MapLanguage } from '../types';
import { getPortName } from '../mapUtil';

// Função para adicionar marcadores de portos ao mapa
export const addPortMarkers = (
  ports: Port[],
  markersLayer: L.LayerGroup,
  labelsLayer: L.LayerGroup,
  mapLanguage: MapLanguage,
  legendVisibility: { hub: boolean; port: boolean }
) => {
  ports.forEach(port => {
    // Adicionar nome do porto traduzido
    const translatedPort = {
      ...port,
      name: getPortName(port, mapLanguage)
    };
    
    // Verificar visibilidade baseada nas configurações da legenda
    const isVisible = port.isHub ? legendVisibility.hub : legendVisibility.port;
    
    // Se o item da legenda estiver visível, adicionar o marcador
    if (isVisible) {
      // Criar ícone baseado no tipo de porto (hub=vermelho, porto=azul)
      const iconColor = port.isHub ? '#FF4A4A' : '#4A90E2';
      const marker = L.marker([port.lat, port.lng], {
        icon: L.divIcon({
          className: port.isHub ? 'hub-marker' : 'port-marker',
          html: `<div style="
            background-color: ${iconColor};
            width: ${port.isHub ? 16 : 10}px;
            height: ${port.isHub ? 16 : 10}px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 ${port.isHub ? 8 : 4}px rgba(${port.isHub ? '255, 74, 74' : '74, 144, 226'}, ${port.isHub ? 0.8 : 0.6});
          "></div>`,
          iconSize: port.isHub ? [16, 16] : [10, 10],
          iconAnchor: port.isHub ? [8, 8] : [5, 5]
        })
      }).addTo(markersLayer);
      
      // Adicionar tooltip com nome traduzido
      marker.bindTooltip(translatedPort.name, {
        permanent: false,
        direction: 'top',
        className: port.isHub ? 'hub-tooltip' : 'port-tooltip',
        offset: [0, -5]
      });
    }
    
    // Sempre adicione o rótulo, mas com opacidade reduzida se não estiver visível
    const cityLabelIcon = L.divIcon({
      className: 'city-label',
      html: `<div style="
        color: ${port.isHub ? '#333' : '#555'};
        font-size: ${port.isHub ? 12 : 11}px;
        font-weight: ${port.isHub ? 'bold' : 'normal'};
        text-shadow: 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white, 0px 0px 4px white;
        width: 120px;
        text-align: center;
        opacity: ${isVisible ? 1 : 0.4};
      ">${translatedPort.name}</div>`,
      iconSize: [120, 20],
      iconAnchor: [60, 0]
    });
    
    L.marker([port.lat - 0.5, port.lng], {
      icon: cityLabelIcon,
      interactive: false
    }).addTo(labelsLayer);
  });
};
