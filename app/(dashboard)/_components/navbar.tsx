import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export const Navbar = () => {
  return (
    <div className="h-full border-b bg-background dark:bg-background">
      <div className="flex items-center p-4">
        <MobileSidebar />
        <div className="ml-auto flex items-center space-x-4">
          <NavbarRoutes />
        </div>
      </div>
    </div>
  );
};
