import React from "react";
import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./_components/category-form";
import BackButton from "../../_components/BackButton";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return (
    <div className="flex-col">
      <BackButton />
      <div className="flex-1 space-y-4 p-2 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;

export async function generateStaticParams() {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories?.map((category) => ({
    categoryId: category.id.toString(),
  }));
}
