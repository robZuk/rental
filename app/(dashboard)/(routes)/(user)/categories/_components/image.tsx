"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import getBase64 from "@/lib/getLocalBase64";
import { Expand, CalendarPlus } from "lucide-react";
import useEquipmentModal from "@/hooks/use-equipment-modal";
import { Equipment } from ".././../../../../../types";

interface DynamicImageProps {
  equipment: Equipment;
  imageUrl: string;
  imageAlt: string;
}

export const DynamicImage: React.FC<DynamicImageProps> = async ({
  imageUrl,
  imageAlt,
  //   equipment,
}) => {
  // const myBlurDataUrl = await getBase64(imageUrl);
  //   const equipmentModal = useEquipmentModal();

  //   const [isMounted, setIsMounted] = useState(false);

  //   useEffect(() => {
  //     setIsMounted(true);
  //   }, []);

  //   if (!isMounted) {
  //     return null;
  //   }

  return (
    // <main className="min-h-screen grid place-content-center">
    //   <div className="w-[400px] rounded-2xl overflow-hidden">
    <>
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={250}
        height={200}
        //   sizes="400px"
        // placeholder="blur"
        // blurDataURL={myBlurDataUrl}
        priority
      />
      {/* <Expand
        onClick={(event) => {
          event.stopPropagation();
          equipmentModal.onOpen(equipment);
          // setOpen(true);
          // setData(equipment);
        }}
        size={32}
        className="hidden  group-hover:block  absolute bottom-[-100px] right-14 bg-gray-400 p-1 rounded-lg text-white cursor-pointer hover:scale-[115%] duration-100"
      /> */}
    </>
    //   </div>
    // </main>
  );
};
