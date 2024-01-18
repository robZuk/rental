import React, { useEffect } from "react";
import { MouseEventHandler } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import useModalCalendar from "@/hooks/use-calendar-modal";
import useCart from "@/hooks/use-cart";

import { CalendarComponent } from "../calendar";

import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";

export const CalendarModal = () => {
  const modalCalendar = useModalCalendar();
  const reservedDays = useModalCalendar((state) => state.data);
  const cart = useCart();
  const initialDays = modalCalendar?.initialDays?.map((day) => new Date(day));
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

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
      <DialogContent className="max-h-full flex justify-center max-w-sm border-0">
        <div className="flex flex-col gap-y-4 items-center overflow-y-auto no-scrollbar ">
          <DialogHeader></DialogHeader>
          <CalendarComponent
            initialDays={initialDays}
            days={days}
            setDays={setDays}
          />
          <Button
            className="w-36 self-start"
            disabled={!days?.length}
            onClick={onAddToCart}
          >
            <CalendarDays size={24} className="mr-2 h-4 w-4" />
            Reserve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
