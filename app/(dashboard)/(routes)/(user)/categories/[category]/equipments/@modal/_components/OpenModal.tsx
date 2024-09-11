"use client";
import { useEffect } from "react";
import useModalEquipment from "@/hooks/use-equipment-modal";

function OpenModal() {
  const equipmentModal = useModalEquipment();

  useEffect(() => {
    if (equipmentModal.equipment?.name) {
      document.title = equipmentModal.equipment.name;
    }
    equipmentModal.onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (equipmentModal.isOpen && equipmentModal.equipment?.name) {
      document.title = equipmentModal.equipment.name;
    } else {
      document.title = "Rental";
    }
  }, [equipmentModal.isOpen, equipmentModal.equipment?.name]);

  return null;
}
export default OpenModal;
