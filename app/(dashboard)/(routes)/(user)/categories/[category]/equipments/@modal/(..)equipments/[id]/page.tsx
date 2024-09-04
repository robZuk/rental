"use client";
import { useEffect } from "react";
import useModalEquipment from "@/hooks/use-equipment-modal";
function EquipmentModalPage() {
  const equipmentModal = useModalEquipment();

  useEffect(() => {
    equipmentModal.onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default EquipmentModalPage;
