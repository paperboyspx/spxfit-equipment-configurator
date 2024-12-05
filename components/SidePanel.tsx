// components/SidePanel.tsx
import { Divider } from "@nextui-org/divider";
import DisclosurePanel from "@/components/disclosurePanel";
import disclosureData from "@/data/disclosureData.json";
import { useState, useEffect } from "react";

interface SidePanelProps {
  setActiveSteelImage(value: string): void;
  setActiveBenchImage(value: string): void;
  view2: boolean;
}

export default function SidePanel({
  setActiveSteelImage,
  setActiveBenchImage,
  view2,
}: SidePanelProps) {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobileView ? (
    <>
      <section className="fixed z-20 flex flex-col items-center justify-center w-full p-4 top-40">
        <h1 className="text-2xl text-[#979f7e] pt-2 ">Chest Press PL</h1>
        <Divider className="w-10/12 h-[1px] my-1 bg-[#979f7e]" />
      </section>
      <section className="fixed bottom-0 z-20 flex items-center justify-center w-full p-4">
        {/* Mobile View Carousel */}
        <DisclosurePanel
          disclosureData={disclosureData}
          setActiveSteelImage={setActiveSteelImage}
          setActiveBenchImage={setActiveBenchImage}
          isCarouselView={true}
          view2={view2}
        />
      </section>
    </>
  ) : (
    <section className="absolute right-40 top-1/2 transform -translate-y-1/2 flex flex-col items-center justify-center gap-4 py-5 wizard md:py-5 bg-[#1d1d1d] w-80 rounded-lg shadow-[6px_6px_10px_rgba(0,0,0,0.5)]">
      <h1 className="text-2xl text-[#979f7e] pt-2 flex items-center justify-center">
        Chest Press PL
      </h1>
      <Divider className="w-10/12 h-[1px] my-1 bg-[#979f7e]" />
      <DisclosurePanel
        disclosureData={disclosureData}
        setActiveSteelImage={setActiveSteelImage}
        setActiveBenchImage={setActiveBenchImage}
        isCarouselView={false}
        view2={view2}
      />
    </section>
  );
}
