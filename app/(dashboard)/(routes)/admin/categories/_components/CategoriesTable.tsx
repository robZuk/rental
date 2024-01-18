"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { CategoriesColumn } from "@/types";

interface CategoriesHeaderProps {
  categories: CategoriesColumn[];
}

const CategoriesTable: React.FC<CategoriesHeaderProps> = ({ categories }) => {
  return (
    <DataTable
      searchKey="name"
      searchValue="name"
      columns={columns}
      data={categories}
    />
  );
};
export default CategoriesTable;
