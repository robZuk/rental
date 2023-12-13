"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Equipment } from "../../../../../../types";
interface EquipmentsHeaderProps {
  equipments: Equipment[];
}

// export default function CategoriesTable(equipments: EquipmentsHeaderProps) {
const EquipmentsTable: React.FC<EquipmentsHeaderProps> = ({ equipments }) => {
  return <DataTable searchKey="name" columns={columns} data={equipments} />;
};
export default EquipmentsTable;
