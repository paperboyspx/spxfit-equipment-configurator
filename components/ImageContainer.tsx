// components/ImageContainer.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import OverlayImages from "@/components/overlayImages";
import ZoomSlider from "@/components/zoomSlider";

interface ImageContainerProps {
  activeSteelImage: string;
  activeBenchImage: string;
}

export default function ImageContainer({
  activeSteelImage,
  activeBenchImage,
}: ImageContainerProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const isDragging = useRef(false);
  const imagePosition = useRef({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const prevZoomLevel = useRef(zoomLevel);

  const updateTransform = () => {
    const { x, y } = imagePosition.current;
    const transform = `translate(${x}px, ${y}px) scale(${zoomLevel})`;
    setTransformStyle(transform);
  };

  useEffect(() => {
    const zoomRatio = zoomLevel / prevZoomLevel.current;
    imagePosition.current.x *= zoomRatio;
    imagePosition.current.y *= zoomRatio;
    clampImagePosition();
    updateTransform();
    prevZoomLevel.current = zoomLevel;
  }, [zoomLevel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || zoomLevel <= 1) return;

    isDragging.current = true;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };

    // Set cursor to grabbing when mouse is down
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - lastMousePosition.current.x;
    const deltaY = e.clientY - lastMousePosition.current.y;

    imagePosition.current.x += deltaX;
    imagePosition.current.y += deltaY;

    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    requestAnimationFrame(updateTransform);
  };

  const handleMouseUp = () => {
    isDragging.current = false;

    // Set cursor to grab when mouse is released
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    clampImagePosition();
  };

  const clampImagePosition = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      const contentWidth = containerWidth * zoomLevel;
      const contentHeight = containerHeight * zoomLevel;

      const maxX = (contentWidth - containerWidth) / 2;
      const maxY = (contentHeight - containerHeight) / 2;

      imagePosition.current.x = Math.max(
        -maxX,
        Math.min(maxX, imagePosition.current.x)
      );
      imagePosition.current.y = Math.max(
        -maxY,
        Math.min(maxY, imagePosition.current.y)
      );

      updateTransform();
    }
  };

  useEffect(() => {
    // Set initial cursor based on zoom level
    if (containerRef.current) {
      containerRef.current.style.cursor = zoomLevel > 1 ? "grab" : "default";
    }
  }, [zoomLevel]);

  // Handle keyboard interactions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (zoomLevel <= 1) return;

    if (e.key === "Enter" || e.key === " ") {
      // Simulate mouse down
      e.preventDefault();
      isDragging.current = true;
      lastMousePosition.current = {
        x: e.currentTarget.offsetLeft,
        y: e.currentTarget.offsetTop,
      };

      // Set cursor to grabbing when activated via keyboard
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      role="button" // Assign role to indicate interactivity
      tabIndex={0} // Make div focusable via keyboard
      onKeyDown={handleKeyDown} // Handle keyboard interactions
      aria-pressed={isDragging.current} // ARIA attribute to indicate state if applicable
    >
      <div
        className="absolute inset-0"
        style={{ transform: transformStyle, willChange: "transform" }}
      >
        <OverlayImages
          zoomLevel={zoomLevel}
          activeSteelImage={activeSteelImage}
          activeBenchImage={activeBenchImage}
        />
      </div>
      <ZoomSlider zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
    </div>
  );
}
