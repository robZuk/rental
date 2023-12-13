import prismadb from "@/lib/prismadb";
import React from "react";
import Categories from "./_components/categories";

const CategoriesPage = async () => {
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
      <Categories categories={categories} />
    </div>
  );
};

export default CategoriesPage;
