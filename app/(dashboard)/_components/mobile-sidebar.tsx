"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { SheetContext } from "../../context/SheetContext";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden px-2 sm:pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetContext.Provider value={setOpen}>
          <Sidebar />
        </SheetContext.Provider>
      </SheetContent>
    </Sheet>
  );
};
