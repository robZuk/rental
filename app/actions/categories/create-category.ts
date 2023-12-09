import prismadb from "@/lib/prismadb";

const getCategories = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return categories;
};

export default getCategories;
