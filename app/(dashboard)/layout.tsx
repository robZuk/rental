"use client";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Footer } from "./_components/footer";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import useCart from "@/hooks/use-cart";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const cart = useCart();
  const pathname = usePathname();
  const { userId } = useAuth();

  //clera cart after SignOut
  useEffect(() => {
    !userId && cart.removeAll();
  }, [userId, cart]);

  return (
    <div className="h-full bg-background pb-8">
      <div className="h-[80px] md:pl-56 fixed w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main
        className="md:pl-56 pt-[80px] h-dvh min-h-[100vh] bg-background"
        style={{
          paddingBottom: pathname === "/" ? "0px" : "20px",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
