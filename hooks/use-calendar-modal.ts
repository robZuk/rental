import { create } from "zustand";

// import { Equipment } from "../types";

interface ModalCalendarProps {
  isOpen: boolean;
  data: Date[];
  initialDays: Date[];
  equipmentId?: string;
  // dates: Date[];
  onOpen: (data: Date[], initialDays: Date[], equipmentId: string) => void;
  //onClose: (dates: Date[]) => void;
  onClose: () => void;
}

const useModalCalendar = create<ModalCalendarProps>((set) => ({
  isOpen: false,
  data: [],
  initialDays: [],
  equipmentId: "",
  // dates: [],
  onOpen: (data: Date[], initialDays: Date[], equipmentId) =>
    set({ isOpen: true, data, initialDays, equipmentId }),
  //onClose: () => set({ isOpen: false, dates: [] }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalCalendar;
