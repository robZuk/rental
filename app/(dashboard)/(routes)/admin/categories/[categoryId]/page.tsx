import React from "react";
import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./_components/category-form";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-2 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
