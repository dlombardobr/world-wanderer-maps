
import React, { useState, useEffect } from 'react';
import { RouteFilter } from './RouteFilters';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MapLanguage } from './LeafletMap';

type LegendProps = {
  activeFilter: RouteFilter;
  mapLanguage: MapLanguage;
};

type LegendItem = {
  id: string;
  visible: boolean;
  color: string;
  lineStyle?: string;
  label: string;
};

const Legend = ({ activeFilter, mapLanguage }: LegendProps) => {
  const showAll = activeFilter === 'all';
  const [isOpen, setIsOpen] = useState(true);
  
  // Inicializar itens da legenda com visibilidade padrão
  const [legendItems, setLegendItems] = useState<LegendItem[]>([
    {
      id: 'direct',
      visible: true,
      color: '#00A0DC',
      label: 'Direct Route'
    },
    {
      id: 'indirect',
      visible: true,
      color: '#FFCC33',
      lineStyle: 'dashed',
      label: 'Indirect Route'
    },
    {
      id: 'hub',
      visible: true,
      color: '#FF4A4A',
      label: 'Hub'
    },
    {
      id: 'port',
      visible: true,
      color: '#4A90E2',
      label: 'Cidade'
    }
  ]);

  // Alternar visibilidade de item da legenda
  const toggleLegendItem = (id: string) => {
    const newVisibility = !legendItems.find(item => item.id === id)?.visible;
    
    setLegendItems(items =>
      items.map(item =>
        item.id === id ? { ...item, visible: newVisibility } : item
      )
    );
    
    // Disparar evento customizado para notificar o mapa sobre mudanças na legenda
    const event = new CustomEvent('legendChange', { 
      detail: { id, visible: newVisibility }
    });
    document.dispatchEvent(event);
  };

  // Alternar todos os itens da legenda
  const toggleAllLegendItems = (visible: boolean) => {
    setLegendItems(items =>
      items.map(item => ({ ...item, visible }))
    );
    
    // Disparar evento customizado para notificar o mapa sobre todas as mudanças na legenda
    const event = new CustomEvent('legendChangeAll', { 
      detail: { visible }
    });
    document.dispatchEvent(event);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-blue-800">
          Legend
        </h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toggleAllLegendItems(true)}
            className="text-xs px-2 py-1 h-7"
          >
            Show All
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toggleAllLegendItems(false)}
            className="text-xs px-2 py-1 h-7"
          >
            Hide All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 w-7"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isOpen && (
        <div className="space-y-3">
          {legendItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center">
                {item.id === 'hub' || item.id === 'port' ? (
                  <div 
                    className="mr-2"
                    style={{
                      backgroundColor: item.color,
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: '2px solid white',
                      boxShadow: `0 0 4px ${item.color}`,
                      opacity: item.visible ? 1 : 0.3
                    }}
                  ></div>
                ) : (
                  <div 
                    className="mr-2"
                    style={{
                      backgroundColor: item.lineStyle === 'dashed' ? 'transparent' : item.color,
                      width: '20px',
                      height: '3px',
                      borderStyle: item.lineStyle === 'dashed' ? 'dashed' : 'solid',
                      borderWidth: item.lineStyle === 'dashed' ? '2px 0 0 0' : '0',
                      borderColor: item.lineStyle === 'dashed' ? item.color : 'transparent',
                      opacity: item.visible ? 1 : 0.3
                    }}
                  ></div>
                )}
                <span className={`text-sm ${!item.visible ? 'text-gray-400' : ''}`}>
                  {item.label}
                </span>
              </div>
              <Switch
                id={`toggle-${item.id}`}
                checked={item.visible}
                onCheckedChange={() => toggleLegendItem(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Legend;
