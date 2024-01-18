"use client";

import { BarChart, Layout, Boxes, Box, CalendarDays } from "lucide-react";
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
  {
    icon: CalendarDays,
    label: "My reservations",
    href: "/reservations",
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
    <div className="flex flex-col w-full">
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
