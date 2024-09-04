"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function CategoriesPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/categories/lifts/equipments");
  });
}

export default CategoriesPage;
