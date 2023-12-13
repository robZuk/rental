"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";
import { Parameter } from "../../../../../../types";

export const columns: ColumnDef<Parameter>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "unit",
  //   header: "Unit",
  // },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
