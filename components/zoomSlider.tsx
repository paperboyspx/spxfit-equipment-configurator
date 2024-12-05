// components/ZoomSlider.tsx
import { useEffect, useState } from "react";
interface ZoomSliderProps {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

export default function ZoomSlider({
  zoomLevel,
  setZoomLevel,
}: ZoomSliderProps) {
  const [maxZoom, setMaxZoom] = useState(2);

  useEffect(() => {
    setMaxZoom(window.innerWidth <= 430 ? 1.21 : 2);
  }, []);

  return (
    <input
      style={{ accentColor: "black" }}
      className="absolute z-10 w-32 p-2 rounded-lg bottom-10 left-24 bg-white/80 mobile:hidden"
      max={maxZoom}
      min={1}
      step="0.01"
      type="range"
      value={zoomLevel}
      onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    />
  );
}
