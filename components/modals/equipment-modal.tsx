import React, { useEffect } from "react";
import { MouseEventHandler } from "react";
import { redirect } from "next/navigation";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { formatter } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import useModalEquipment from "@/hooks/use-equipment-modal";
import useCart from "@/hooks/use-cart";
import { CalendarComponent } from "@/components/calendar";

export const EquipmentModal = () => {
  const modalEquipment = useModalEquipment();
  const equipment = useModalEquipment((state) => state.equipment);
  const reservations = useModalEquipment((state) => state.reservations);
  const isOpen = useModalEquipment((state) => state.isOpen);

  const { toast } = useToast();
  const { user } = useUser();

  const router = useRouter();

  const cart = useCart();

  const initialDays: Date[] = [];

  const payedReservations = reservations.filter(
    (reservation) => reservation.isPayed
  );

  equipment?.reservationItems?.forEach((item) => {
    payedReservations.forEach((reservation) => {
      if (reservation.id === item.reservationId) {
        item.dates.forEach((date) => initialDays.push(new Date(date.date)));
      }
    });
  });

  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

  useEffect(() => {
    isOpen && setDays([]);
    isOpen &&
      !user &&
      toast({
        variant: "info",
        title: "Sign In before reservation!",
        duration: 3000,

        action: (
          <ToastAction altText="Sign in">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setTimeout(() => modalEquipment.onClose(), 1000);
                window.location.href = "/sign-in";
              }}
            >
              Login
            </Button>
          </ToastAction>
        ),
      });
  }, [isOpen, user, modalEquipment, toast]);

  const formattedDays = days?.map((day) => new Date(day));

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation(),
      // await axios.post(`/api/users`), //create new user in database
      equipment && formattedDays && user
        ? cart.addItem({
            userId: user.id,
            equipmentId: equipment.id,
            name: equipment.name,
            price: equipment.price,
            image: equipment.imageUrl,
            dates: formattedDays,
            initialDays: initialDays,
            createdAt: new Date(),
          })
        : null,
      modalEquipment.onClose();
  };

  return (
    <Dialog open={modalEquipment.isOpen} onOpenChange={modalEquipment.onClose}>
      <DialogContent className="max-h-full max-w-[650px] flex justify-center  py-4">
        <div className="overflow-y-auto no-scrollbar">
          <DialogHeader>
            <DialogTitle className="pb-4">{equipment?.name}</DialogTitle>
            <div className="flex flex-col md:flex-row gap-8  p-2">
              <div className="min-w-[200px]">
                <div className="relative w-[200px] sm:w-[250px] p-2 bg-white rounded-md">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={equipment?.imageUrl as string}
                      alt={equipment?.name as string}
                      fill
                      sizes="(min-width: 80px)"
                    />
                  </AspectRatio>
                </div>

                <div className="flex gap-2 py-2">
                  <p>{equipment?.producer}</p>
                  <p> {equipment?.model}</p>
                </div>
                <ul className="pt-4">
                  {equipment?.parameters?.map((item, index) => (
                    <li
                      key={item.name}
                      className={`flex justify-between max-w-[300px] p-1 text-sm rounded-sm ${
                        index % 2 === 0 ? "bg-secondary" : ""
                      }`}
                    >
                      <p>{item.name}</p>
                      <p>{item.value + " " + item.unit}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <p className="pb-4 text-lg font-semibold">
                  {formatter.format(Number(equipment?.price))}/day
                </p>
                <p className="self-start pb-2">Reservation</p>
                <CalendarComponent
                  initialDays={initialDays}
                  days={days}
                  setDays={setDays}
                />
                <div className="flex flex-row justify-between self-start pt-4 w-full ">
                  <p>Together:</p>
                  <p className="font-semibold">
                    {equipment?.price !== undefined &&
                    days?.length !== undefined
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
              disabled={!days?.length || !user}
              onClick={onAddToCart}
            >
              <ShoppingCart size={24} className="mr-2 h-4 w-4" />
              Add to cart
            </Button>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};
