import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, MapPin, Compass } from 'lucide-react';
import { toast } from 'sonner';

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        projection: 'globe' as any,
        zoom: 1.2,
        center: [0, 20],
        pitch: 45,
        bearing: 0,
      });

      // Add navigation controls with custom styling
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add fullscreen control
      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Disable scroll zoom initially for better UX
      map.current.scrollZoom.setWheelZoomRate(1/200);

      // Add atmosphere and lighting effects
      map.current.on('style.load', () => {
        if (!map.current) return;
        
        map.current.setFog({
          color: 'hsl(200, 100%, 80%)',
          'high-color': 'hsl(240, 80%, 90%)',
          'horizon-blend': 0.15,
          'space-color': 'hsl(220, 26%, 14%)',
          'star-intensity': 0.8
        });

        // Add subtle glow effect
        map.current.setPaintProperty('sky', 'sky-atmosphere-sun-intensity', 5);
      });

      // Globe rotation animation
      const secondsPerRevolution = 180;
      const maxSpinZoom = 4;
      const slowSpinZoom = 2;
      let userInteracting = false;
      let spinEnabled = true;

      function spinGlobe() {
        if (!map.current || !spinEnabled || userInteracting) return;
        
        const zoom = map.current.getZoom();
        if (zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          map.current.easeTo({ 
            center, 
            duration: 1000, 
            easing: (n) => n 
          });
        }
      }

      // Interaction event listeners
      const handleUserInteraction = () => {
        userInteracting = true;
      };

      const handleInteractionEnd = () => {
        userInteracting = false;
        setTimeout(spinGlobe, 1000);
      };

      map.current.on('mousedown', handleUserInteraction);
      map.current.on('touchstart', handleUserInteraction);
      map.current.on('dragstart', handleUserInteraction);
      
      map.current.on('mouseup', handleInteractionEnd);
      map.current.on('touchend', handleInteractionEnd);
      map.current.on('dragend', handleInteractionEnd);

      map.current.on('moveend', () => {
        if (!userInteracting) spinGlobe();
      });

      // Start spinning
      spinGlobe();
      setIsMapLoaded(true);
      toast.success("Mapa carregado com sucesso! 🌍");

    } catch (error) {
      console.error('Erro ao inicializar o mapa:', error);
      toast.error("Erro ao carregar o mapa. Verifique seu token do Mapbox.");
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken.trim());
    } else {
      toast.error("Por favor, insira um token válido do Mapbox");
    }
  };

  const flyToLocation = (lng: number, lat: number, zoom: number = 10) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: [lng, lat],
      zoom: zoom,
      pitch: 60,
      duration: 3000,
      essential: true
    });
  };

  const resetView = () => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: [0, 20],
      zoom: 1.2,
      pitch: 45,
      bearing: 0,
      duration: 2000
    });
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isMapLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-sm border-border/50">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Globe className="h-16 w-16 text-primary animate-spin" style={{animationDuration: '3s'}} />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mapa Interativo
              </h1>
              <p className="text-muted-foreground">
                Para começar, insira seu token público do Mapbox
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Token público do Mapbox"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="bg-input/50 border-border/50"
                onKeyDown={(e) => e.key === 'Enter' && handleTokenSubmit()}
              />
              
              <Button 
                onClick={handleTokenSubmit}
                className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300"
                disabled={!mapboxToken.trim()}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Inicializar Mapa
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>Obtenha seu token em:</p>
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors underline"
              >
                mapbox.com
              </a>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Overlay with controls */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top overlay with gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/20 to-transparent pointer-events-none" />
        
        {/* Title and controls */}
        <div className="absolute top-6 left-6 pointer-events-auto">
          <Card className="p-6 bg-card/80 backdrop-blur-md border-border/50 shadow-elevation">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Mapa Interativo
            </h1>
            
            <div className="flex gap-3">
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => flyToLocation(-74.006, 40.7128, 12)}
                className="bg-secondary/80 hover:bg-secondary transition-all duration-300"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Nova York
              </Button>
              
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => flyToLocation(-47.9292, -15.7801, 12)}
                className="bg-secondary/80 hover:bg-secondary transition-all duration-300"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Brasília
              </Button>
              
              <Button 
                variant="outline"
                size="sm"
                onClick={resetView}
                className="border-border/50 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
              >
                <Compass className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </Card>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default InteractiveMap;