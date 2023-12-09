import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export const Navbar = () => {
  return (
    <div className="border-b bg-white dark:bg-slate-950">
      <div className="flex h-16 items-center px-4">
        <MobileSidebar />
        <div className="ml-auto flex items-center space-x-4">
          <NavbarRoutes />
        </div>
      </div>
    </div>
  );
};
