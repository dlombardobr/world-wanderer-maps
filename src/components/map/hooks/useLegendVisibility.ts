
import { useState, useEffect } from 'react';

// Custom hook to handle legend visibility state and events
export const useLegendVisibility = () => {
  // Estado para visibilidade da legenda - SEMPRE ativado por padrão
  const [legendVisibility, setLegendVisibility] = useState({
    direct: true,
    indirect: true,
    hub: true,
    port: true
  });

  // Escutar eventos de mudança da legenda
  useEffect(() => {
    const handleLegendChange = (e: CustomEvent) => {
      const { id, visible } = e.detail;
      console.log(`Legend change: ${id} -> ${visible}`);
      setLegendVisibility(prev => ({
        ...prev,
        [id]: visible
      }));
    };

    const handleLegendChangeAll = (e: CustomEvent) => {
      const { visible } = e.detail;
      console.log(`Legend change all -> ${visible}`);
      setLegendVisibility({
        direct: visible,
        indirect: visible,
        hub: visible,
        port: visible
      });
    };

    // Adicionar event listeners
    document.addEventListener('legendChange', handleLegendChange as EventListener);
    document.addEventListener('legendChangeAll', handleLegendChangeAll as EventListener);

    // Limpar
    return () => {
      document.removeEventListener('legendChange', handleLegendChange as EventListener);
      document.removeEventListener('legendChangeAll', handleLegendChangeAll as EventListener);
    };
  }, []);

  return legendVisibility;
};
