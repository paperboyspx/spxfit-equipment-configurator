// components/OverlayImages.tsx
import { useState, useEffect } from "react";

interface OverlayImagesProps {
  activeSteelImage: string;
  activeBenchImage: string;
  zoomLevel: number;
}

export default function OverlayImages({
  zoomLevel,
  activeSteelImage,
  activeBenchImage,
}: OverlayImagesProps) {
  // Local state to manage the images currently being displayed
  const [currentImages, setCurrentImages] = useState<{
    steel: string;
    bench: string;
  }>({
    steel: activeSteelImage,
    bench: activeBenchImage,
  });

  useEffect(() => {
    let isMounted = true;

    // Helper function to preload an image
    const preloadImage = (src: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
    };

    // Preload both images and update the state only when both are loaded
    Promise.all([
      preloadImage(activeSteelImage),
      preloadImage(activeBenchImage),
    ])
      .then(([loadedSteelImage, loadedBenchImage]) => {
        if (isMounted) {
          setCurrentImages({
            steel: loadedSteelImage,
            bench: loadedBenchImage,
          });
        }
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        // Optionally handle errors, e.g., keep displaying the previous images
      });

    // Cleanup function to avoid setting state if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [activeSteelImage, activeBenchImage]);

  return (
    <>
      <img
        alt="Metal"
        className="object-contain w-full h-full transform pointer-events-none select-none mobile:scale-215 mobile:px-1 mobile:pb-32"
        src={currentImages.steel}
        draggable={false}
      />
      <img
        alt="Upholstery"
        className="absolute top-0 left-0 object-contain w-full h-full transform pointer-events-none select-none mobile:scale-215 mobile:px-1 mobile:pb-32"
        src={currentImages.bench}
        draggable={false}
      />
    </>
  );
}
