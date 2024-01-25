"use client";
import React from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import CategoriesTable from "./_components/CategoriesTable";
import { useQuery } from "react-query";
import { Separator } from "@/components/ui/separator";
import CategoriesHeader from "./_components/CategoriesHeader";
import { CategoriesColumn } from "@/types";
import { GETCATEGORIES } from "../../../../api/categories/route";

const CategoriesPage = () => {
  const { data: categories } = useQuery("categories", GETCATEGORIES);

  const categoriesLength = categories?.length ?? 0;

  const formattedCategories: CategoriesColumn[] = categories
    ? categories.map((item) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        createdAt: format(item.createdAt, "MM/dd/yyyy"),
      }))
    : [];

  return (
    <>
      <CategoriesHeader categoriesLenght={categoriesLength} />
      <Separator />
      <CategoriesTable categories={formattedCategories} />
    </>
  );
};

export default CategoriesPage;
