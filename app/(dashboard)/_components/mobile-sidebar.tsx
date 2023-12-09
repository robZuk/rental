"use client";
import React, { useContext } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { SheetContext } from "../../context/SheetContext";

export const MobileSidebar = () => {
  const [open, setOpen] = React.useState(false);

  //  const SheetContext = React.createContext(setOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
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
