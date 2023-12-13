"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Parameter } from "../../../../../../types";
interface ParametersHeaderProps {
  parameters: Parameter[];
}

// export default function CategoriesTable(categories: CategoriesHeaderProps) {
const ParametersTable: React.FC<ParametersHeaderProps> = ({ parameters }) => {
  return <DataTable searchKey="name" columns={columns} data={parameters} />;
};
export default ParametersTable;
