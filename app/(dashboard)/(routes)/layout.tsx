"use client";
import { useEffect } from "react";
import useCart from "@/hooks/use-cart";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function RoutesLayuot({ children }: { children: React.ReactNode }) {
  const cart = useCart();
  const { userId } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    !userId && cart.removeAll();
  }, [userId, cart]);

  return (
    <div
      style={{
        paddingBottom: pathname === "/" ? "0px" : "20px",
      }}
    >
      {children}
    </div>
  );
}

export default RoutesLayuot;
