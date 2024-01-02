import { create } from "zustand";
import { Equipment } from "../types";

interface ModalEquipmentProps {
  isOpen: boolean;
  data?: Equipment;
  onOpen: (data: Equipment) => void;
  onClose: () => void;
}

const useModalEquipment = create<ModalEquipmentProps>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Equipment) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalEquipment;
