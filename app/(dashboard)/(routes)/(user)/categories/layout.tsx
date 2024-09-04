import prismadb from "@/lib/prismadb";
import React from "react";
import Categories from "./_components/categories";

const CategoriesLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
      {children}
    </div>
  );
};

export default CategoriesLayout;
