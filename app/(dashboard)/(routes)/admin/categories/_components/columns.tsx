"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";
import { Category } from "../../../../../../types";

export const columns: ColumnDef<Category>[] = [
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
  {
    accessorKey: "image",
    header: "Image",
    // cell: ({ row }) => row.original.image,
    cell: ({ row }) => (
      <div style={{ position: "relative", width: "80px", height: "50px" }}>
        <Image
          src={row.original.image}
          alt=""
          fill
          sizes="(min-width: 108px) 50vw, 100vw"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
