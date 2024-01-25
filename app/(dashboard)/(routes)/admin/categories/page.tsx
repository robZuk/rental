"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import CategoriesTable from "./_components/CategoriesTable";
import { useQuery } from "react-query";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CategoriesHeader from "./_components/CategoriesHeader";
import { CategoriesColumn } from "@/types";

const CategoriesPage = () => {
  const { toast } = useToast();

  const getCategories = async () => {
    return await axios.get(`/api/categories`);
  };

  const {
    isLoading,
    isError,
    data: categories,
    error,
  } = useQuery("categories", getCategories);

  useEffect(() => {
    isError &&
      toast({
        variant: "destructive",
        title: String(error ?? "Error fetching categories."),
        duration: 3000,
      });
  }, [error, isError, toast]);

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
        <div>
          <div className="flex flex-col items-start gap-2 sm:flex-row justify-between sm:items-center mb-4 pt-4">
            <Skeleton className="h-10 w-[380px]" />
            <Skeleton className="h-10 w-[100px] self-end sm:self-auto" />
          </div>
          <div className="">
            <Skeleton className="w-full h-[70vh]" />
          </div>
        </div>
      ) : (
        <CategoriesTable categories={formattedCategories} />
      )}
    </>
  );
};

export default CategoriesPage;
