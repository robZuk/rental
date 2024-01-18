import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReservationItemDetails } from "@/types";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

type ReservationTableProps = {
  reservationItems: ReservationItemDetails[];
};

const ReservationTable: React.FC<ReservationTableProps> = ({
  reservationItems,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Equipment</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservationItems?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.equipmentName}</TableCell>
            <TableCell>
              {formatter.format(Number(item.equipmentPrice))}
            </TableCell>
            <TableCell>
              <ul>
                {item.dates.map((date) => (
                  <li key={date.id}>
                    {format(new Date(date.date), "MM/dd/yyyy")}
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell className="text-right">
              {formatter.format(
                Number(item.equipmentPrice) * item.dates.length
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReservationTable;
