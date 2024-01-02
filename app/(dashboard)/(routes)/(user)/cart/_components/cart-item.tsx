// "use client";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { X, CalendarDays } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import IconButton from "@/components/icon-button";
// import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { CartItem } from "@/types";
import { formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useModalCalendar from "@/hooks/use-calendar-modal";
import { da } from "date-fns/locale";

interface CartItemProps {
  data: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  // const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const calendar = useModalCalendar();
  // console.log(calendar);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return null;
  // }

  const initialDays = data.initialDays;
  const formattedDates = data?.dates?.map((day) => new Date(day));

  const onRemove = () => {
    cart.removeItem(data.equipmentId);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative w-[200px] h-[100px]">
        <Image
          src={data.image}
          alt={data.name}
          fill
          sizes="(min-width: 80px)"
          className="object-contain"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{data.name}</p>
          </div>

          <div className="font-semibold">
            {formatter.format(Number(data.price)) + "/day"}
          </div>
          <div>
            Reserved days: {formattedDates?.length}
            <ul className="list-disc pl-4">
              {formattedDates?.map((day, index) => (
                <li key={index} className=" text-sm">
                  {day.toLocaleString().slice(0, 10)}
                </li>
              ))}
            </ul>
            <p className="pt-2 text-gray-500">
              Together:{" "}
              {formatter.format(formattedDates.length * Number(data.price))}
            </p>
          </div>
          <Button
            className="w-32"
            variant="outline"
            size="sm"
            onClick={() => {
              // console.log(data.equipmentId, initialDays, formattedDates);
              calendar.onOpen(formattedDates, initialDays, data.equipmentId);
            }}
          >
            <CalendarDays className="mx-2" size={16} /> Edit dates
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
// {format(parseISO(day?.toString()), "eeee, MMMM dd, yyyy")}
