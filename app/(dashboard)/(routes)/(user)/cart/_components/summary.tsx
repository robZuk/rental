"use client";
import axios from "axios";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { formatter } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

import { add } from "date-fns";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const router = useRouter();
  const { toast } = useToast();
  const { userId } = useAuth();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast({
        variant: "success",
        title: "Payment completed.",
        duration: 3000,
      });
      router.push("/categories");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast({
        variant: "destructive",
        title: "Something wet wrong.",
        duration: 3000,
      });
      router.push("/cart");
    }
  }, [searchParams, removeAll, toast, router]);

  const cartItems = useMemo(() => {
    const itemsArray: {
      userId: string;
      equipmentId: string;
      equipmentName: string;
      equipmentPrice: number | string;
      dates: Date[];
    }[] = [];

    items.map(
      (item) =>
        item.userId === userId &&
        itemsArray.push({
          userId: item.userId,
          equipmentId: item.equipmentId,
          equipmentName: item.name,
          equipmentPrice: item.price,
          dates: item.dates,
        })
    );

    return itemsArray;
  }, [items, userId]);

  const cartData = {
    userId,
    cartItems,
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + Number(item.equipmentPrice) * item.dates.length;
    }, 0);
  }, [cartItems]);

  const checkoutMutation = useMutation((data: any) =>
    axios.post("/api/checkout", data)
  );

  const onCheckout = async () => {
    const response = await checkoutMutation.mutateAsync({ cartData });
    window.location = response.data.url;
  };

  return (
    <div className="max-w-[500px] h-56  mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border">
      <h2 className="text-lg font-medium">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="">Order total</div>
          <p>{formatter.format(totalPrice)}</p>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={cartItems.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
