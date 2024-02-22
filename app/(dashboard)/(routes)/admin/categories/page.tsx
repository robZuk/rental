import React, { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import CategoriesTable from "./_components/CategoriesTable";

import { Separator } from "@/components/ui/separator";
import CategoriesHeader from "./_components/CategoriesHeader";
import { CategoriesColumn } from "@/types";

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const categoriesLength = categories.length;

  const formattedCategories: CategoriesColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.imageUrl,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <>
      <CategoriesHeader categoriesLenght={categoriesLength} />
      <Separator />
      <CategoriesTable categories={formattedCategories} />
    </>
  );
};

export default CategoriesPage;
