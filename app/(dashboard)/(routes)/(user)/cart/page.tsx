"use client";

import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import Summary from "./_components/summary";
import CartItem from "./_components/cart-item";
import { useAuth } from "@clerk/nextjs";
import { CartItem as CartItemType } from "@/types";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const { userId } = useAuth();

  const userCart = [] as CartItemType[];
  cart.items.map((item) => item.userId === userId && userCart.push(item));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
        <h1 className="text-2xl lg:text-3xl font-bold">Shopping Cart</h1>
        <div className="flex-col gap-12 max-w-[1400px]">
          <div className="py-6">
            {userCart?.length === 0 && (
              <p className="text-neutral-500">No items added to cart.</p>
            )}
            <ul className="">
              {userCart.map(
                (item) =>
                  item.userId === userId && (
                    <CartItem key={item.equipmentId} data={item} />
                  )
              )}
            </ul>
          </div>
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
