"use client";
import { useEffect, useState } from "react";
import { EquipmentModal } from "@/components/modals/equipment-modal";

export const EquipmentModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <EquipmentModal />
    </>
  );
};
