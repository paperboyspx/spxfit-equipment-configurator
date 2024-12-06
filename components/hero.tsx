// components/Hero.tsx
"use client";

import { useState, useEffect } from "react";
import ImageContainer from "@/components/ImageContainer";
import SidePanel from "@/components/SidePanel";
import NextImage from "next/image"; // Renamed import
import Head from "next/head";
import disclosureData from "@/data/disclosureData.json"; // Adjust the path accordingly
import { Button } from "@nextui-org/button";
import Link from "next/link";

interface ButtonData {
  id: string;
  color: string;
  src_stitch?: string;
  src_nostitch?: string;
  src_stitch_view2?: string;
  src_nostitch_view2?: string;
}

interface ItemData {
  label: string;
  buttonData: ButtonData[];
}

interface DisclosurePanelData {
  disclosurePanelName: string;
  items: ItemData[];
}

export default function Hero() {
  const [activeSteelImage, setActiveSteelImage] = useState<string>(
    "/Metal/Metal_Black.webp"
  );
  const [activeBenchImage, setActiveBenchImage] = useState<string>(
    "/Bench_Stitch/Bench_Black_Stitch.webp"
  );

  // State to track whether to display steel and bench images in side-view or not.
  const [view2, setView2] = useState<boolean>(false);

  const handleViewButtonClick = () => {
    setView2((prevView2) => {
      const newView2 = !prevView2;
      // Update steel image
      const steelPath = activeSteelImage
        .replace("/Metal/", "/Metal_View2/")
        .replace(".webp", "_View2.webp");
      const regularSteelPath = activeSteelImage
        .replace("/Metal_View2/", "/Metal/")
        .replace("_View2.webp", ".webp");
      setActiveSteelImage(newView2 ? steelPath : regularSteelPath);

      // Update bench image
      const benchPath = activeBenchImage.includes("_Stitch")
        ? activeBenchImage
            .replace("/Bench_Stitch/", "/Bench_Stitch_View2/")
            .replace(".webp", "_View2.webp")
        : activeBenchImage
            .replace("/Bench_NoStitch/", "/Bench_NoStitch_View2/")
            .replace(".webp", "_View2.webp");
      const regularBenchPath = activeBenchImage.includes("_Stitch_View2")
        ? activeBenchImage
            .replace("/Bench_Stitch_View2/", "/Bench_Stitch/")
            .replace("_View2.webp", ".webp")
        : activeBenchImage
            .replace("/Bench_NoStitch_View2/", "/Bench_NoStitch/")
            .replace("_View2.webp", ".webp");
      setActiveBenchImage(newView2 ? benchPath : regularBenchPath);

      return newView2;
    });
  };

  const handleSaveButtonClick = async () => {
    try {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = 3840; // Adjust based on your image dimensions
      canvas.height = 2160; // Adjust based on your image dimensions

      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Failed to get canvas context");
        return;
      }

      // Load the images
      const [steelImage, benchImage] = await Promise.all([
        loadImage(activeSteelImage),
        loadImage(activeBenchImage),
      ]);

      // Draw the images onto the canvas
      context.drawImage(steelImage, 0, 0, canvas.width, canvas.height);
      context.drawImage(benchImage, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL("image/png");

      // Generate a human-readable filename
      const steelImageName = getImageName(activeSteelImage);
      const benchImageName = getImageName(activeBenchImage);
      const fileName = `Chest Press PL ${steelImageName} - ${benchImageName}.png`;

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  // Helper function to load an image and return a promise
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // This is important for cross-origin images
      img.onload = () => resolve(img);
      img.onerror = (err: Event | string) => reject(err); // Adjusted parameter type
      img.src = src;
    });
  };

  // Helper function to extract a human-readable name from the image path
  const getImageName = (imagePath: string): string => {
    // Extract the filename from the path
    const pathParts = imagePath.split("/");
    const filename = pathParts[pathParts.length - 1]; // e.g., "Metal_Black.webp"
    // Remove the extension
    const dotIndex = filename.lastIndexOf(".");
    const filenameWithoutExt =
      dotIndex !== -1 ? filename.substring(0, dotIndex) : filename;
    // Replace underscores with spaces
    const nameWithSpaces = filenameWithoutExt.replace(/_/g, " ");
    // Remove redundant words (e.g., "Metal Metal Black" -> "Metal Black")
    const words = nameWithSpaces.split(" ");
    const uniqueWords = Array.from(new Set(words));
    const humanReadableName = uniqueWords.join(" ");
    return humanReadableName;
  };

  // Extract all image paths from disclosureData.json
  const imagePaths: string[] = [];

  disclosureData.forEach((panel: DisclosurePanelData) => {
    panel.items.forEach((item: ItemData) => {
      item.buttonData.forEach((button: ButtonData) => {
        if (button.src_stitch) {
          imagePaths.push(button.src_stitch);
        }
        if (button.src_nostitch) {
          imagePaths.push(button.src_nostitch);
        }
        if (button.src_stitch_view2) {
          imagePaths.push(button.src_stitch_view2);
        }
        if (button.src_nostitch_view2) {
          imagePaths.push(button.src_nostitch_view2);
        }
        // Add any additional imageSrc properties here if present
      });
    });
  });

  // Optionally, add any static images you want to preload
  const staticImagePaths: string[] = [
    "/Logo.png",
    // Add more static image paths here if needed
  ];

  return (
    <div className="relative flex w-screen h-screen overflow-hidden">
      {/* Preload Images */}
      <Head>
        {imagePaths.map((src, index) => (
          <link key={index} rel="preload" as="image" href={src} />
        ))}
        {staticImagePaths.map((src, index) => (
          <link key={`static-${index}`} rel="preload" as="image" href={src} />
        ))}
      </Head>

      {/* Main Content */}
      <section className="w-full h-full">
        <ImageContainer
          activeSteelImage={activeSteelImage}
          activeBenchImage={activeBenchImage}
        />
      </section>

      {/* Side Panel with Buttons */}
      <SidePanel
        setActiveSteelImage={setActiveSteelImage}
        setActiveBenchImage={setActiveBenchImage}
        view2={view2}
      />

      {/* Controls Section */}
      <section className="absolute z-10 flex items-center justify-center p-3 bottom-20 left-20 mobile:bottom-64 mobile:left-32 w-44 mobile:w-36">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col items-center justify-center">
            <Button
              isIconOnly
              className="bg-transparent"
              size="md"
              onPress={handleViewButtonClick}
            >
              <NextImage
                alt="view button"
                src="/view.png"
                width={65}
                height={64}
                className="mobile:w-6 mobile:h-6"
              />
            </Button>
            <p className="text-[#1d1d1d] text-xs">View</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Button
              isIconOnly
              className="bg-transparent"
              size="md"
              onPress={handleSaveButtonClick}
            >
              <NextImage
                alt="save button"
                src="/save.png"
                width={65}
                height={64}
                className="mobile:w-6 mobile:h-6"
              />
            </Button>
            <p className="text-[#1d1d1d] text-xs">Save</p>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="absolute flex items-center justify-center p-3 -top-20 mobile:-top-20 mobile:left-1">
        <Link
          href="https://www.spxfit.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NextImage
            alt="SPX Logo"
            className="object-contain w-56 h-56 mobile:w-28 mobile:h-44"
            src="/Logo.png"
            width={437}
            height={106}
            priority // Ensures the logo loads immediately
          />
        </Link>
      </section>
    </div>
  );
}
