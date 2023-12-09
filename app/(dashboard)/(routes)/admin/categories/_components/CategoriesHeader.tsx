"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/heading";
interface CategoriesHeaderProps {
  categoriesLenght: number;
}
const CategoriesHeader: React.FC<CategoriesHeaderProps> = ({
  categoriesLenght,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-4">
      <Heading
        title={`Categories (${categoriesLenght})`}
        description="Manage categories for your store."
      />
      <Button onClick={() => router.push(`/admin/categories/new`)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
  );
};

export default CategoriesHeader;
