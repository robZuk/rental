"use client";
import { useContext } from "react";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { SheetContext } from "../../context/SheetContext";
import { SignedIn } from "@clerk/nextjs";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const setOpen = useContext(SheetContext);

  const onClick = () => {
    router.push(href);
    window.innerWidth <= 768 && setOpen(false); // close sidebar on mobile
  };

  return href == "/reservations" ? (
    <SignedIn>
      <button
        onClick={onClick}
        type="button"
        className={cn(
          "flex items-center gap-x-2 text-sm text-gray-900 pl-6 transition-all  hover:bg-slate-100/50 hover-text-muted",
          isActive && "bg-slate-100/50 hover:bg-slate-100/50"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon size={22} className={cn()} />
          {label}
        </div>
        <div
          className={cn(
            "ml-auto opacity-0 border-2 border-slate-600 h-full transition-all",
            isActive && "opacity-100"
          )}
        />
      </button>
    </SignedIn>
  ) : (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-sm text-gray-900 pl-6 transition-all  hover:bg-slate-100/50 hover-text-muted",
        isActive && "bg-slate-100/50 hover:bg-slate-100/50"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn()} />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-600 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
