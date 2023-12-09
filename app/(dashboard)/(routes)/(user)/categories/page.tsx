import prismadb from "@/lib/prismadb";
import React from "react";
import CategoriesPage from "./CategoriesPage";

const Categories = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      equipments: {
        include: {
          parameters: true,
        },
      },
    },
  });

  return (
    <div>
      <CategoriesPage categories={categories} />
    </div>
  );
};

export default Categories;
