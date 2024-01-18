import { create } from "zustand";
import { Equipment, Reservation } from "../types";

interface ModalEquipmentProps {
  isOpen: boolean;
  equipment?: Equipment;
  reservations: Reservation[];
  onOpen: (equipment: Equipment, reservations: Reservation[]) => void;
  onClose: () => void;
}

const useModalEquipment = create<ModalEquipmentProps>((set) => ({
  isOpen: false,
  equipment: undefined,
  reservations: [],
  onOpen: (equipment: Equipment, reservations: Reservation[]) =>
    set({ isOpen: true, equipment, reservations }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalEquipment;
