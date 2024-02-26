import { create } from "zustand";
import { toast } from "@/components/ui/use-toast";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  updateDates: (equipmentId: string, newDates: Date[]) => void;
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
          return toast({
            variant: "success",
            title: "Item already in cart.",
            duration: 3000,
          });
        }

        set({ items: [...get().items, data] });
        toast({
          variant: "success",
          title: "Item added to cart.",
          duration: 3000,
        });
      },
      updateDates: (equipmentId: string, newDates: Date[]) => {
        const updatedItems = get().items.map((item) => {
          if (item.equipmentId === equipmentId) {
            return { ...item, dates: [...newDates] };
          }
          return item;
        });

        set({ items: updatedItems });
        toast({
          variant: "success",
          title: "Dates updated.",
          duration: 3000,
        });
      },

      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.equipmentId !== id)],
        });
        toast({
          variant: "success",
          title: "Item removed from cart.",
          duration: 3000,
        });
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
