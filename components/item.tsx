// Item.tsx
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";

interface ButtonData {
  id: string;
  color: string;
  src_stitch?: string;
  src_nostitch?: string;
  src_stitch_view2?: string;
  src_nostitch_view2?: string;
}

interface ItemProps {
  ButtonDataList: ButtonData[];
  disclosurePanelName: string;
  upholsteryStitch: boolean;
  activeButtonId?: string;
  setActiveButtonColor: (color: string, buttonId: string) => void;
  setActiveSteelImage(value: string): void;
  setActiveBenchImage(value: string): void;
  setUpholsteryStitch(value: boolean): void;
  view2: boolean;
}

export default function Item({
  ButtonDataList,
  disclosurePanelName,
  activeButtonId,
  upholsteryStitch,
  view2,
  setActiveButtonColor,
  setActiveSteelImage,
  setActiveBenchImage,
  setUpholsteryStitch,
}: ItemProps) {
  const [localActiveButtonId, setLocalActiveButtonId] = useState<string | null>(
    null
  );
  const currentActiveButtonId = activeButtonId || localActiveButtonId;

  // Prevent default dragging for all buttons within this Item component
  useEffect(() => {
    const handleDragStart = (e: Event) => {
      e.preventDefault();
    };
    // Select all buttons within this Item component
    const buttons = document.querySelectorAll(`button[data-item-id]`);
    buttons.forEach((button) =>
      button.addEventListener("dragstart", handleDragStart)
    );
    // Cleanup
    return () => {
      buttons.forEach((button) =>
        button.removeEventListener("dragstart", handleDragStart)
      );
    };
  }, [ButtonDataList]);

  // Set the default active button when the component mounts
  useEffect(() => {
    if (ButtonDataList.length > 0 && !currentActiveButtonId) {
      // Set to "btn21" (Stitch On) by default if it exists
      const stitchOnButton = ButtonDataList.find((btn) => btn.id === "btn21");
      if (stitchOnButton) {
        setLocalActiveButtonId(stitchOnButton.id);
        setUpholsteryStitch(true); // Stitch is on by default
        setActiveButtonColor(stitchOnButton.color, stitchOnButton.id);
      } else {
        // If "btn21" doesn't exist, set the first button as active
        const firstButton = ButtonDataList[0];
        setLocalActiveButtonId(firstButton.id);
        setActiveButtonColor(firstButton.color, firstButton.id);
      }
    }
    // We can exclude 'setActiveButtonColor' and 'setUpholsteryStitch' because they are stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ButtonDataList]);

  // Update bench image when upholsteryStitch or active button changes
  useEffect(() => {
    if (disclosurePanelName === "Upholstery" && currentActiveButtonId) {
      if (currentActiveButtonId === "btn21") {
        // Stitch On
        setUpholsteryStitch(true);
      } else if (currentActiveButtonId === "btn22") {
        // Stitch Off
        setUpholsteryStitch(false);
      } else {
        // For upholstery color buttons
        const currentButton = ButtonDataList.find(
          (btn) => btn.id === currentActiveButtonId
        );
        if (
          currentButton &&
          (currentButton.src_stitch || currentButton.src_nostitch)
        ) {
          setActiveBenchImage(
            upholsteryStitch
              ? view2
                ? currentButton.src_stitch_view2!
                : currentButton.src_stitch!
              : view2
                ? currentButton.src_nostitch_view2!
                : currentButton.src_nostitch!
          );
          setActiveButtonColor(currentButton.color, currentButton.id);
        }
      }
    }

    if (disclosurePanelName === "Steel" && currentActiveButtonId) {
      const currentButton = ButtonDataList.find(
        (btn) => btn.id === currentActiveButtonId
      );
      if (currentButton && currentButton.src_stitch) {
        setActiveSteelImage(
          view2
            ? (currentButton.src_stitch_view2 ?? "")
            : (currentButton.src_stitch ?? "")
        );
        setActiveButtonColor(currentButton.color, currentButton.id);
      }
    }
    // Exclude functions from dependencies
  }, [
    upholsteryStitch,
    currentActiveButtonId,
    ButtonDataList,
    disclosurePanelName,
    view2,
  ]);

  // Updated gradientColorMap with specified colors
  const gradientColorMap: { [key: string]: { start: string; end: string } } = {
    Black: { start: "#000000", end: "#000000" },
    "Fir Green": { start: "#3e4827", end: "#3e4827" },
    Brown: { start: "#4e3629", end: "#4e3629" },
    Grey: { start: "#888b8d", end: "#888b8d" },
    Ivory: { start: "#e3deca", end: "#e3deca" },
    Charcoal: { start: "#4b4f54", end: "#4b4f54" },
    White: { start: "#FFFFFF", end: "#FFFFFF" },
    Navy: { start: "#002855", end: "#002855" },
    Bronze: { start: "#84754e", end: "#84754e" },
    "Pastel Blue": { start: "#7da1c4", end: "#7da1c4" },
    "Wine Red": { start: "#300505", end: "#300505" },
    "Tactical Green": { start: "#98a07f", end: "#98a07f" },
  };

  // Added colorMap with specified colors
  const colorMap: { [key: string]: string } = {
    "Black Leather": "#1c1c1c",
    "Champagne Leather": "#a38658",
    "Grey Leather": "#5c5c5c",
    "Navy Leather": "#202A44",
    "Green Leather": "#65735a",
    "Rustic Leather": "#6e3f1f",
    "Burnt Orange Leather": "#CC5500",
    "Light Brown Leather": "#97572b",
  };

  const handleButtonClick = (
    buttonDataObject: ButtonData,
    panelName: string
  ) => {
    setLocalActiveButtonId(buttonDataObject.id);

    if (buttonDataObject.id === "btn21") {
      // Stitch On
      setUpholsteryStitch(true);
      setActiveButtonColor(buttonDataObject.color, buttonDataObject.id);
    } else if (buttonDataObject.id === "btn22") {
      // Stitch Off
      setUpholsteryStitch(false);
      setActiveButtonColor(buttonDataObject.color, buttonDataObject.id);
      console.log("Stitch Off");
    } else {
      // For upholstery color buttons
      if (panelName === "Upholstery") {
        setActiveBenchImage(
          upholsteryStitch
            ? view2
              ? buttonDataObject.src_stitch_view2!
              : buttonDataObject.src_stitch!
            : view2
              ? buttonDataObject.src_nostitch_view2!
              : buttonDataObject.src_nostitch!
        );
        setActiveButtonColor(buttonDataObject.color, buttonDataObject.id);
      }

      if (panelName === "Steel") {
        setActiveSteelImage(
          view2
            ? (buttonDataObject.src_stitch_view2 ?? "")
            : (buttonDataObject.src_stitch ?? "")
        );
        setActiveButtonColor(buttonDataObject.color, buttonDataObject.id);
      }
    }
  };

  return (
    <div
      className="
              flex 
              flex-wrap 
              justify-center
              gap-4 
              px-16
              py-2
              mobile:px-4 
              mobile:py-6 
              mobile:min-h-[4rem] 
              mobile:flex-row 
              mobile:flex-nowrap 
              mobile:justify-start 
              mobile:items-center 
              mobile:overflow-x-auto
      "
    >
      {ButtonDataList.map((button) => {
        const gradientColors = gradientColorMap[button.color];
        const isGradient = !!gradientColors;

        const isActiveButton = currentActiveButtonId === button.id;

        const gradientStyle = isGradient
          ? {
              background: `radial-gradient(108.76% 95.18% at 20.89% 30.38%, ${gradientColors!.start} 22.5%, ${gradientColors!.end} 100%)`,
              transform: isActiveButton ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.2s ease-in-out",
            }
          : {
              backgroundColor: colorMap[button.color] || "transparent",
              transform: isActiveButton ? "scale(1.2)" : "scale(1)",
              transition: "transform 0.2s ease-in-out",
            };

        return (
          <Button
            key={button.id}
            isIconOnly
            className={`
              ring-1 ring-slate-200 shadow-lg
              ${isActiveButton ? "ring-4 ring-[#979f7e]" : ""}
            `}
            style={gradientStyle}
            radius="full"
            size="sm"
            onPress={() => handleButtonClick(button, disclosurePanelName)}
            draggable={false}
            data-item-id={button.id}
            aria-pressed={isActiveButton}
          >
            {button.id === "btn21" ? (
              <Image alt="Stitch On Image" src="/stitch.png" priority fill />
            ) : null}
          </Button>
        );
      })}
    </div>
  );
}
