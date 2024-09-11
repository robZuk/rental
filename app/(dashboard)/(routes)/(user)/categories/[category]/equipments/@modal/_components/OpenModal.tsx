"use client";
import { useEffect } from "react";
import useModalEquipment from "@/hooks/use-equipment-modal";

function OpenModal() {
  const equipmentModal = useModalEquipment();

  useEffect(() => {
    equipmentModal.onOpen();
    if (equipmentModal.equipment?.name) {
      document.title = equipmentModal.equipment.name;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default OpenModal;
