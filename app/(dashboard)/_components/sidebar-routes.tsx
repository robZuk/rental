"use client";

import {
  BarChart,
  Layout,
  TableProperties,
  Boxes,
  Box,
  CalendarDays,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const userRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Boxes,
    label: "Categories",
    href: "/categories",
  },
];

const adminRoutes = [
  {
    icon: BarChart,
    label: "Overview",
    href: "/admin/overview",
  },
  {
    icon: Boxes,
    label: "Categories",
    href: "/admin/categories",
  },
  {
    icon: Box,
    label: "Equipments",
    href: "/admin/equipments",
  },
  {
    icon: TableProperties,
    label: "Parameters",
    href: "/admin/parameters",
  },
  {
    icon: CalendarDays,
    label: "Reservations",
    href: "/admin/reservations",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.includes("/admin");

  const routes = isAdminPage ? adminRoutes : userRoutes;

  return (
    <div className="flex flex-col w-full pt-6">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
