
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { MapLanguage } from '@/components/LeafletMap';

type MapStyle = 'light' | 'dark' | 'satellite';

type MapSettingsProps = {
  mapLanguage: MapLanguage;
  mapStyle: MapStyle;
  setMapStyle: (style: MapStyle) => void;
};

const MapSettings = ({
  mapStyle,
  setMapStyle
}: MapSettingsProps) => {
  // Map style labels
  const styleLabels = {
    light: 'Light Map',
    dark: 'Dark Map',
    satellite: 'Satellite Map'
  };

  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <div className="flex justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-200 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              {styleLabels[mapStyle]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Map Style</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setMapStyle('light')}>
              {styleLabels.light}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMapStyle('dark')}>
              {styleLabels.dark}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMapStyle('satellite')}>
              {styleLabels.satellite}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MapSettings;
