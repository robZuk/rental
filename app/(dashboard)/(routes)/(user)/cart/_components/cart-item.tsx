import Image from "next/image";
import { X, CalendarDays } from "lucide-react";
import IconButton from "@/components/icon-button";
import useCart from "@/hooks/use-cart";
import { format } from "date-fns";
import { CartItem } from "@/types";
import { formatter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useModalCalendar from "@/hooks/use-calendar-modal";

interface CartItemProps {
  data: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const initialDays = data.initialDays;
  const cart = useCart();
  const calendar = useModalCalendar();

  const formattedDates = data?.dates?.map((day) => new Date(day));

  const onRemove = () => {
    cart.removeItem(data.equipmentId);
  };

  return (
    <li className="relative flex flex-col sm:flex-row max-w-[800px] xl:max-w-[1400px] py-6 border-b pr-14 ">
      <div className="absolute z-10 right-0 top-4">
        <IconButton onClick={onRemove} icon={<X size={15} />} />
      </div>
      <div className="relative w-[250px] h-[170px] bg-white rounded-md">
        <Image
          src={data.image}
          alt={data.name}
          fill
          sizes="(min-width: 80px)"
          className="object-contain p-4"
        />
      </div>
      <div className=" flex flex-1 flex-col xl:flex-row  gap-6 py-6 sm:py-0 sm:pl-12">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-x-10 gap-y-4">
          <div>
            <p className="text-medium font-semibold">{data.name}</p>
            <p>{formatter.format(Number(data.price)) + "/day"}</p>
          </div>
          <div className="">
            <p className="text-medium font-semibold">
              Reserved days: {formattedDates?.length}
            </p>
            <ul className="list-disc pl-4 ">
              {formattedDates?.map((day, index) => (
                <li key={index} className="text-">
                  {format(day, "MM/dd/yyyy")}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-medium font-semibold">
            Total:{" "}
            {formatter.format(formattedDates.length * Number(data.price))}
          </p>
        </div>

        <Button
          className=" w-32 xl:ml-16 "
          variant="outline"
          size="sm"
          onClick={() => {
            calendar.onOpen(formattedDates, initialDays, data.equipmentId);
          }}
        >
          <CalendarDays className="mx-2" size={16} /> Edit dates
        </Button>
      </div>
    </li>
  );
};

export default CartItem;
