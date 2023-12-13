import { create } from "zustand";

import { Equipment } from "../types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Equipment;
  onOpen: (data: Equipment) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Equipment) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
