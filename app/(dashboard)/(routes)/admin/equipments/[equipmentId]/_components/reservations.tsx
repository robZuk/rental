import React from "react";
import { Calendar } from "@/components/ui/calendar";

type Props = {};

const Reservations = (props: Props) => {
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  console.log(days);

  const footer = days && days.length > 0 && (
    <p>Reserved {days.length} day(s).</p>
  );
  return (
    <>
      <p className="pt-4">Reservations</p>
      <div>
        <Calendar
          mode="multiple"
          min={1}
          selected={days}
          onSelect={setDays}
          footer={footer}
        />
      </div>
    </>
  );
};

export default Reservations;
