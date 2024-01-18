import React from "react";
import { Heading } from "@/components/heading";
interface ReservationsHeaderProps {
  reservationsLenght: number;
}
const ReservationsHeader: React.FC<ReservationsHeaderProps> = ({
  reservationsLenght,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 pt-4">
      <Heading
        title={`Reservations (${reservationsLenght})`}
        description="List of reservations for your store."
      />
    </div>
  );
};

export default ReservationsHeader;
