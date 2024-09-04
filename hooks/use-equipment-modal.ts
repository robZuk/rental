import { create } from "zustand";
import { Equipment, Reservation } from "../types";
import { redirect } from "next/navigation";

interface ModalEquipmentProps {
  isOpen: boolean;
  equipment?: Equipment;
  reservations: Reservation[];
  // onOpen: (equipment: Equipment, reservations: Reservation[]) => void;
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
  // onOpen: (equipment: Equipment, reservations: Reservation[]) =>
  // set({ isOpen: true, equipment, reservations }),
  // set({ equipment, reservations }),
  onClose: () => {
    set({ isOpen: false });
    history.back();
  },
}));

export default useModalEquipment;
