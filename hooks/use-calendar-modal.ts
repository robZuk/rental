import { create } from "zustand";

interface ModalCalendarProps {
  isOpen: boolean;
  data: Date[];
  initialDays: Date[];
  equipmentId?: string;
  onOpen: (data: Date[], initialDays: Date[], equipmentId: string) => void;
  onClose: () => void;
}

const useModalCalendar = create<ModalCalendarProps>((set) => ({
  isOpen: false,
  data: [],
  initialDays: [],
  equipmentId: "",

  onOpen: (data: Date[], initialDays: Date[], equipmentId) =>
    set({ isOpen: true, data, initialDays, equipmentId }),
  onClose: () => set({ isOpen: false }),
}));

export default useModalCalendar;
