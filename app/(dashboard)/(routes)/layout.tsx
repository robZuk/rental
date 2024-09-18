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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
