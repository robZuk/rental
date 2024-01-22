"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/admin";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserIcon as Avatar } from "./avatar";
import Cart from "./cart";

export const NavbarRoutes = () => {
  const { userId } = useAuth();

  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      <div className="flex items-center gap-x-2 ml-auto">
        {userId ? (
          isAdminPage ? (
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="h-4 w-4 mr-2" />
                Exit
              </Button>
            </Link>
          ) : isAdmin(userId) ? (
            <Link href="/admin/overview" className="px-0 mx-4">
              <Button size="sm" variant="ghost" className="px-0 sm:px-2">
                Admin mode
              </Button>
            </Link>
          ) : null
        ) : null}
        <div className="flex items-center">
          {!userId && (
            <div className="flex items-center text-sm font-medium ">
              <Link href="/sign-in">
                <Button size="sm" variant="ghost">
                  Login
                </Button>
              </Link>
              <Avatar />
            </div>
          )}

          <UserButton afterSignOutUrl="/" />
          {!isAdminPage && <Cart />}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};
