"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import { EquipmentModalProvider } from "@/providers/equipment-modal-provider";
import { CalendarModalProvider } from "@/providers/calendar-modal-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

// export const metadata: Metadata = {
//   title: "Rental",
//   description: "rent equipment, machine",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <CalendarModalProvider />
            <EquipmentModalProvider />
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
