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
          reservationItems: {
            include: {
              dates: true,
            },
          },
        },
      },
    },
  });
  // await prismadb.reservation.deleteMany();
  const reservations = await prismadb.reservation.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reservationItems: {
        include: {
          dates: true,
        },
      },
    },
  });

  return (
    <div>
      <Categories categories={categories} reservations={reservations} />
    </div>
  );
};

export default CategoriesPage;
