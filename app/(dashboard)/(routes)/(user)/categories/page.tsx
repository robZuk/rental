import prismadb from "@/lib/prismadb";
import React from "react";
// import Categories from "./_components/categories";
import dynamic from "next/dynamic";

const Categories = dynamic(() => import("./_components/categories"), {
  ssr: false,
});

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      equipments: {
        include: {
          parameters: true,
          reservationItems: {
            include: {
              dates: true,
            },
          },
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
