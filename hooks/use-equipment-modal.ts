import { create } from "zustand";
import { Equipment, Reservation } from "../types";

interface ModalEquipmentProps {
  isOpen: boolean;
  equipment?: Equipment;
  reservations: Reservation[];

  setEquipment: (equipment: Equipment, reservations: Reservation[]) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useModalEquipment = create<ModalEquipmentProps>((set) => ({
  isOpen: false,
  equipment: undefined,
  reservations: [],
  onOpen: () => set({ isOpen: true }),
  setEquipment: (equipment, reservations) => set({ equipment, reservations }),

  onClose: () => {
    set({ isOpen: false });
    history.back();
  },
}));

export default useModalEquipment;
