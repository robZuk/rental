import React from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import CategoriesTable from "./_components/CategoriesTable";

import { Separator } from "@/components/ui/separator";
import CategoriesHeader from "./_components/CategoriesHeader";
import { Category } from "../types";

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const categoriesLength = categories.length;

  const formattedCategories: Category[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.imageUrl,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
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
