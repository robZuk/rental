"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

type CategoriesProps = {
  categories: Category[];
};

const Categories = ({ categories }: CategoriesProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex w-full justify-center gap-8 my-6 flex-wrap">
      {categories.map((category) => (
        <div key={category.id} className="">
          <Link
            key={category.id}
            href={`/categories/${category.name
              .replace(" ", "-")
              .toLowerCase()}/equipments`}
            className={`flex flex-col justify-center items-center px-4 py-2 rounded-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 ${
              pathname ===
              `/categories/${category.name
                .replace(" ", "-")
                .toLowerCase()}/equipments`
                ? "bg-slate-200 dark:bg-slate-700"
                : ""
            }`}
          >
            <div className="relative w-[60px] h-[30px]">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="(min-width: 60px)"
                className="object-contain"
              />
            </div>
            <p>{category.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
