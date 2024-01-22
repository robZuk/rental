"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CellAction } from "./cell-action";
import { ArrowUpDown } from "lucide-react";
import { EquipmentsColumn } from "@/types";

export const columns: ColumnDef<EquipmentsColumn>[] = [
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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-[100px] p-2 bg-white rounded-md">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={row.original.imageUrl}
            alt="Image"
            fill
            className="rounded-md object-contain"
          />
        </AspectRatio>
      </div>
    ),
  },
  {
    accessorKey: "producer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Producer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => `${row.original.price}/day`,
  },
  {
    accessorKey: "createdAt",
    id: "Date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="min-w-[130px]"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
