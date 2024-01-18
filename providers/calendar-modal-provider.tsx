"use client";
import { useEffect, useState } from "react";
import { CalendarModal } from "@/components/modals/calendar-modal";
export const CalendarModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CalendarModal />
    </>
  );
};
