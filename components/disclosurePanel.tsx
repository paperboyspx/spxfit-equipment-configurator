import Item from "@/components/item";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface ButtonData {
  id: string;
  color: string;
}

interface ItemData {
  label: string;
  buttonData: ButtonData[];
}

interface DisclosurePanelData {
  disclosurePanelName: string;
  items: ItemData[];
}

interface DisclosurePanelProps {
  disclosureData: DisclosurePanelData[];
  setActiveSteelImage(value: string): void;
  setActiveBenchImage(value: string): void;
  isCarouselView: boolean;
  view2: boolean;
}

interface FlattenedItemData {
  panelName: string;
  item: ItemData;
}

// Helper function to generate a unique key
const getItemKey = (panelName: string, itemLabel: string) =>
  `${panelName}-${itemLabel}`;

export default function DisclosurePanel({
  disclosureData,
  setActiveSteelImage,
  setActiveBenchImage,
  isCarouselView,
  view2,
}: DisclosurePanelProps) {
  // Flattened array of items with panel information
  const flattenedItems: FlattenedItemData[] = disclosureData.flatMap((panel) =>
    panel.items.map((item) => ({
      panelName: panel.disclosurePanelName,
      item,
    }))
  );

  // State to manage the current item index (for carousel view)
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // State to manage active buttons and colors
  const [activeButtonColors, setActiveButtonColors] = useState<{
    [key: string]: string;
  }>({});
  const [activeButtonIds, setActiveButtonIds] = useState<{
    [key: string]: string;
  }>({});

  // Handler to set active button color and ID for a specific item
  const handleSetActiveButtonColor = useCallback(
    (panelName: string, itemLabel: string, color: string, buttonId: string) => {
      const key = getItemKey(panelName, itemLabel);
      setActiveButtonColors((prevColors) => ({
        ...prevColors,
        [key]: color,
      }));
      setActiveButtonIds((prevIds) => ({
        ...prevIds,
        [key]: buttonId,
      }));
    },
    []
  );

  // State to handle upholstery stitch off or on
  const [upholsteryStitch, setUpholsteryStitch] = useState<boolean>(true);

  // Disable the previous button if at the first item
  const isPrevDisabled = currentItemIndex === 0;
  // Disable the next button if at the last item
  const isNextDisabled = currentItemIndex === flattenedItems.length - 1;

  // Function to handle going to the previous item
  const handlePrev = () => {
    if (!isPrevDisabled) {
      setCurrentItemIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Function to handle going to the next item
  const handleNext = () => {
    if (!isNextDisabled) {
      setCurrentItemIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Get the current item and panel name
  const currentItemData = flattenedItems[currentItemIndex];
  const currentPanelName = currentItemData.panelName;
  const currentItem = currentItemData.item;

  return isCarouselView ? (
    // Render all items for mobile view, but show only the current one
    <div className="flex flex-col items-center justify-center w-full h-32">
      <div className="flex flex-row justify-between w-10/12 h-1/2">
        <div>
          {/* Button to scroll to the previous item */}
          <Button
            isIconOnly
            radius="full"
            size="md"
            className={`bg-[#979f7e] ${isPrevDisabled ? "opacity-50" : ""}`}
            onPress={handlePrev}
            isDisabled={isPrevDisabled}
          >
            <Image
              alt="chevron left"
              src="/chevron-left.png"
              width={30}
              height={30}
            />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-[#979f7e] text-md font-semibold">
            {/* Display the current panel's disclosurePanelName */}
            {currentPanelName}
          </div>
          <div className="text-[#979f7e] text-md">
            {/* Display the current selected color name */}
            {activeButtonColors[
              getItemKey(currentPanelName, currentItem.label)
            ] || ""}
          </div>
        </div>
        <div>
          {/* Button to scroll to the next item */}
          <Button
            isIconOnly
            radius="full"
            size="md"
            className={`bg-[#979f7e] ${isNextDisabled ? "opacity-50" : ""}`}
            onPress={handleNext}
            isDisabled={isNextDisabled}
          >
            <Image
              alt="chevron right"
              src="/chevron-right.png"
              width={30}
              height={30}
            />
          </Button>
        </div>
      </div>
      <div
        id="scroll-container"
        className="relative flex items-center justify-center w-full overflow-x-auto h-2/3 bg-[#1d1d1d] rounded-full"
        draggable={false}
      >
        {/* Render all Item components but show only the current one */}
        {flattenedItems.map((itemData, index) => (
          <div
            key={getItemKey(itemData.panelName, itemData.item.label)}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentItemIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-center w-full h-full overflow-y-hidden">
              <div className="max-w-full p-0 overflow-x-auto">
                <Item
                  ButtonDataList={itemData.item.buttonData}
                  disclosurePanelName={itemData.panelName}
                  activeButtonId={
                    activeButtonIds[
                      getItemKey(itemData.panelName, itemData.item.label)
                    ]
                  }
                  setActiveButtonColor={(color: string, buttonId: string) =>
                    handleSetActiveButtonColor(
                      itemData.panelName,
                      itemData.item.label,
                      color,
                      buttonId
                    )
                  }
                  setActiveSteelImage={setActiveSteelImage}
                  setActiveBenchImage={setActiveBenchImage}
                  upholsteryStitch={upholsteryStitch}
                  setUpholsteryStitch={setUpholsteryStitch}
                  view2={view2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    // Render the accordion for desktop view
    <Accordion
      selectionMode="multiple"
      defaultExpandedKeys={["Steel", "Upholstery"]}
    >
      {disclosureData.map((panel) => (
        <AccordionItem
          key={panel.disclosurePanelName}
          title={panel.disclosurePanelName}
          classNames={{
            title:
              "text-center text-[#979f7e] text-xl flex items-center justify-center ml-8",
          }}
        >
          {panel.items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center mb-4"
            >
              <h3 className="mb-2 text-md text-[#979f7e] items-center justify-center ml-2">
                {/* Display the active color specific to this item */}
                {activeButtonColors[
                  getItemKey(panel.disclosurePanelName, item.label)
                ] || ""}
              </h3>
              <Item
                ButtonDataList={item.buttonData}
                disclosurePanelName={panel.disclosurePanelName}
                activeButtonId={
                  activeButtonIds[
                    getItemKey(panel.disclosurePanelName, item.label)
                  ]
                }
                setActiveButtonColor={(color: string, buttonId: string) =>
                  handleSetActiveButtonColor(
                    panel.disclosurePanelName,
                    item.label,
                    color,
                    buttonId
                  )
                }
                setActiveSteelImage={setActiveSteelImage}
                setActiveBenchImage={setActiveBenchImage}
                upholsteryStitch={upholsteryStitch}
                setUpholsteryStitch={setUpholsteryStitch}
                view2={view2}
              />
            </div>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
