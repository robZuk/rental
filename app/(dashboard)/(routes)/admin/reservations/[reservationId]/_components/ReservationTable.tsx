import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReservationItemDetails } from "@/types";
import { formatter } from "@/lib/utils";

type ReservationTableProps = {
  reservationItems: ReservationItemDetails[];
};

const ReservationTable: React.FC<ReservationTableProps> = ({
  reservationItems,
}) => {
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
                    {String(date.date.toLocaleString().slice(0, 10))}
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
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
};

export default ReservationTable;
