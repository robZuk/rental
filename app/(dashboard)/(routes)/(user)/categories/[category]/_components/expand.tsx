"use client";
import React from "react";
import { Expand } from "lucide-react";
import { useRouter } from "next/navigation";
import useEquipmentModal from "@/hooks/use-equipment-modal";
import { Reservation, Equipment } from "@/types";

function ExpandComponent({
  params,
  equipment,
  reservations,
}: {
  params: { category: string };
  equipment: Equipment;
  reservations: Reservation[];
}) {
  const router = useRouter();
  const equipmentModal = useEquipmentModal();
  return (
    <Expand
      onClick={(event) => {
        event.stopPropagation();

        equipmentModal.setEquipment(equipment, reservations);

        router.push(
          `/categories/${params?.category}/equipments/${equipment.id}`,
          {
            scroll: true,
          }
        );
      }}
      size={32}
      className="hidden  group-hover:block  absolute bottom-[-100px] right-2 bg-gray-400 p-1 rounded-lg text-white cursor-pointer hover:scale-[115%] duration-100"
    />
  );
}

export default ExpandComponent;
