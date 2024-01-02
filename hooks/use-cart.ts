import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

import { CartItem } from "@/types";
import { AlertTriangle } from "lucide-react";

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  updateDates: (equipmentId: string, newDates: Date[]) => void; // New method signature

  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.equipmentId === data.equipmentId
        );

        if (existingItem) {
          return toast.error("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      updateDates: (equipmentId: string, newDates: Date[]) => {
        const updatedItems = get().items.map((item) => {
          if (item.equipmentId === equipmentId) {
            return { ...item, dates: [...newDates] };
          }
          return item;
        });

        set({ items: updatedItems });
        toast.success("Dates updated.");
      },

      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.equipmentId !== id)],
        });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
