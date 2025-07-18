
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

type ExportButtonProps = {
  targetRef: React.RefObject<HTMLDivElement>;
  children?: ReactNode;
};

const ExportButton = ({ targetRef, children }: ExportButtonProps) => {
  const exportAsImage = async () => {
    if (!targetRef.current) return;
    
    try {
      toast.info("Preparing your map for export...");
      
      // Temporarily hide controls
      const leafletControls = document.querySelectorAll('.leaflet-control-container');
      leafletControls.forEach(control => {
        if (control instanceof HTMLElement) {
          control.style.display = 'none';
        }
      });
      
      const canvas = await html2canvas(targetRef.current, {
        scale: 2, // Higher scale for better quality
        backgroundColor: null,
        logging: false,
        // Include these options to better handle the Leaflet map
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => {
          // Ignore export button and controls when capturing
          return element.classList.contains('leaflet-control-container');
        }
      });
      
      // Restore controls visibility
      leafletControls.forEach(control => {
        if (control instanceof HTMLElement) {
          control.style.display = '';
        }
      });
      
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = "maritime-routes-map.png";
      link.href = image;
      link.click();
      
      toast.success("Map exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export the map. Please try again.");
    }
  };

  return (
    <div onClick={exportAsImage}>
      {children ? children : (
        <Button 
          className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md animate-zoom-fade-in z-[1001]"
          style={{ animationDelay: '0.4s' }}
        >
          <Download className="mr-2 h-4 w-4" />
          Export as Image
        </Button>
      )}
    </div>
  );
};

export default ExportButton;
