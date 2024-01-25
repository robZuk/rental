"use client";
import React from "react";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { format } from "date-fns";
import CategoriesTable from "./_components/CategoriesTable";
import { useQuery } from "react-query";
import { Separator } from "@/components/ui/separator";
import CategoriesHeader from "./_components/CategoriesHeader";
import { CategoriesColumn } from "@/types";

const CategoriesPage = () => {
  const getCategories = async () => {
    return await axios.get(`/api/categories`);
  };

  const {
    isLoading,
    isError,
    data: categories,
    error,
  } = useQuery("categories", getCategories);

  const categoriesLength = categories?.data.length ?? 0;

  const formattedCategories: CategoriesColumn[] = categories
    ? categories.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        createdAt: format(new Date(item.createdAt), "MM/dd/yyyy"),
      }))
    : [];

  return (
    <>
      <CategoriesHeader categoriesLenght={categoriesLength} />
      <Separator />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CategoriesTable categories={formattedCategories} />
      )}
    </>
  );
};

export default CategoriesPage;
