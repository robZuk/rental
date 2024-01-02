import React, { useEffect } from "react";
import { MouseEventHandler } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useModalCalendar from "@/hooks/use-calendar-modal";
import useCart from "@/hooks/use-cart";

import { CalendarComponent } from "../calendar";
import { formatter } from "@/lib/utils";
import { ShoppingCart, CalendarDays } from "lucide-react";
import { Button } from "../ui/button";

export const CalendarModal = () => {
  const modalCalendar = useModalCalendar();
  const reservedDays = useModalCalendar((state) => state.data);
  const isOpen = useModalCalendar((state) => state.isOpen);

  // const initialDays: Date[] = [];

  const cart = useCart();
  const initialDays = modalCalendar?.initialDays?.map((day) => new Date(day));

  console.log(modalCalendar);

  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

  useEffect(() => {
    isOpen && setDays(initialDays);
  }, [isOpen]);

  useEffect(() => {
    setDays(reservedDays);
  }, [reservedDays]);

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (days && modalCalendar.equipmentId) {
      cart.updateDates(modalCalendar.equipmentId, days);
      modalCalendar.onClose();
    }
  };

  return (
    <Dialog open={modalCalendar.isOpen} onOpenChange={modalCalendar.onClose}>
      <DialogContent className="max-w-[660px] flex justify-center">
        <DialogHeader>
          <CalendarComponent
            initialDays={initialDays}
            days={days}
            setDays={setDays}
          />

          <Button
            className="w-36"
            disabled={!days?.length}
            onClick={onAddToCart}
          >
            <CalendarDays size={24} className="mr-2 h-4 w-4" />
            Reserve
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
