"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { Category } from "../../../../../../types";

interface CategoriesHeaderProps {
  categories: Category[];
}

const CategoriesTable: React.FC<CategoriesHeaderProps> = ({ categories }) => {
  return <DataTable searchKey="name" columns={columns} data={categories} />;
};
export default CategoriesTable;
