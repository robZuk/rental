"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, UserIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isAdmin } from "@/lib/admin";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserIcon as Avatar } from "./avatar";
// import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();

  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  //   const isCoursePage = pathname?.includes("/courses");
  //   const isSearchPage = pathname === "/search";

  return (
    <>
      {/* {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )} */}
      <div className="flex items-center gap-x-2 ml-auto">
        {/* {isAdminPage || isCoursePage ? ( */}
        {isAdminPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isAdmin(userId) ? (
          <Link href="/admin/overview">
            <Button size="sm" variant="ghost">
              Admin mode
            </Button>
          </Link>
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
          <div className="ml-6">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};
