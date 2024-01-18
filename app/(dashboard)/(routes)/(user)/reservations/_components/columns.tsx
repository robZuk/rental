import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";
import { UserReservationsColumn } from "@/types";

export const columns: ColumnDef<UserReservationsColumn>[] = [
  {
    accessorKey: "amount",
    id: "Amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => `${row.original.amount}`,
  },
  {
    accessorKey: "isPayed",
    id: "Is payed",
    header: "Is payed",
    cell: ({ row }) => row.original.isPayed,
  },
  {
    accessorKey: "createdAt",
    id: "Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => row.original.createdAt,
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
