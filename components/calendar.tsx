"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

interface CalendarProps {
  initialDays?: Date[];
  days?: Date[] | undefined;
  setDays?: React.Dispatch<React.SetStateAction<Date[] | undefined>>;
}

export const CalendarComponent: React.FC<CalendarProps> = ({
  initialDays,
  days,
  setDays,
}) => {
  return (
    <Calendar
      mode="multiple"
      disabled={initialDays}
      selected={days}
      onSelect={setDays}
      className="rounded-md border"
    />
  );
};
