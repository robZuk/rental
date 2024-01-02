import React, { useEffect, useState } from "react";
import { MouseEventHandler } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatter } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import useModalEquipment from "@/hooks/use-equipment-modal";
import useCart from "@/hooks/use-cart";
import { CalendarComponent } from "../calendar";

export const EquipmentModal = () => {
  const modalEquipment = useModalEquipment();
  const equipment = useModalEquipment((state) => state.data);
  const isOpen = useModalEquipment((state) => state.isOpen);

  const { user } = useUser();

  const cart = useCart();

  const initialDays: Date[] = [];

  equipment?.reservationItems?.forEach((item) =>
    item.dates.forEach((date) => initialDays.push(new Date(date.date)))
  );

  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

  useEffect(() => {
    isOpen && setDays([]);
  }, [isOpen]);

  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  const formattedDays = days?.map((day) => new Date(day));

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    if (equipment && formattedDays && user) {
      cart.addItem({
        userId: user.id,
        equipmentId: equipment.id,
        name: equipment.name,
        price: equipment.price,
        image: equipment.imageUrl,
        dates: formattedDays,
        initialDays: initialDays,
        createdAt: new Date(),
      });
    }

    modalEquipment.onClose();
  };

  return (
    <Dialog open={modalEquipment.isOpen} onOpenChange={modalEquipment.onClose}>
      <DialogContent className="max-w-[660px] flex justify-center">
        <DialogHeader>
          <DialogTitle className="pb-4">{equipment?.name}</DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
          <div className="flex gap-8">
            <div className="min-w-[300px]">
              <div className="relative w-[200px] h-[100px]">
                <Image
                  src={equipment?.imageUrl as string}
                  alt={equipment?.name as string}
                  fill
                  sizes="(min-width: 80px)"
                  className="object-contain"
                />
              </div>

              <div className="relative w-[200px] h-[100px]"></div>

              <div className="flex gap-2 py-2">
                <p>{equipment?.producer}</p>
                <p> {equipment?.model}</p>
              </div>
              <ul>
                {equipment?.parameters?.map((item, index) => (
                  <li
                    key={item.name}
                    className={`flex justify-between max-w-[300px] px-1 ${
                      index % 2 === 0 ? "bg-secondary" : ""
                    }`}
                  >
                    <p>{item.name}</p>
                    <p>{item.value + " " + item.unit}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-primary pb-4 text-lg font-semibold">
                {formatter.format(Number(equipment?.price))}/day
              </p>
              <p className="self-start pb-2">Reservation</p>
              <CalendarComponent
                initialDays={initialDays}
                days={days}
                setDays={setDays}
              />
              <div className="flex flex-row justify-between self-start pt-4 w-full text-primary">
                <p>Together:</p>
                <p className="font-semibold">
                  {equipment?.price !== undefined && days?.length !== undefined
                    ? formatter.format(
                        Number(equipment?.price) * (days?.length || 0)
                      )
                    : 0}
                </p>
              </div>
              <p className="self-start pt-2">Reserved days: {days?.length}</p>
            </div>
          </div>
          <Button
            className="w-36"
            disabled={!days?.length}
            onClick={onAddToCart}
          >
            <ShoppingCart size={24} className="mr-2 h-4 w-4" />
            Add to cart
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
