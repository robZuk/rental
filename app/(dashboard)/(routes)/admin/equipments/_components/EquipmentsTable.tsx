"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { EquipmentsColumn } from "@/types";
interface EquipmentsHeaderProps {
  equipments: EquipmentsColumn[];
}

const EquipmentsTable: React.FC<EquipmentsHeaderProps> = ({ equipments }) => {
  return (
    <DataTable
      searchKey="name"
      searchValue="name"
      columns={columns}
      data={equipments}
    />
  );
};
export default EquipmentsTable;
