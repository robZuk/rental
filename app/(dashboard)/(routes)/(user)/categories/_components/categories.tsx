"use client";
import { useState, useEffect } from "react";
import { Expand } from "lucide-react";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import useEquipmentModal from "@/hooks/use-equipment-modal";
import { formatter } from "@/lib/utils";
import NoResults from "@/components/no-results";

import { Category, Reservation } from "@/types";

type CategoriesProps = {
  categories: Category[];
  reservations: Reservation[];
};

const Categories = ({ categories, reservations }: CategoriesProps) => {
  const equipmentModal = useEquipmentModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex w-full ">
      <Tabs defaultValue="Excavators" className="w-full">
        <TabsList className="flex justify-center bg-background px-0">
          {categories.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.name}
              className="flex flex-col"
            >
              <div className="relative w-[60px] h-[30px]">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(min-width: 60px)"
                  className="object-contain"
                />
              </div>
              <p>{item.name}</p>
            </TabsTrigger>
          ))}
        </TabsList>
        <div>
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.name}>
              {category.equipments.length === 0 ? (
                <NoResults />
              ) : (
                <div className="flex justify-center flex-wrap gap-4 w-full pt-4 ">
                  {category.equipments.map(async (equipment, index) => (
                    <Card key={index} className="group">
                      <CardHeader>
                        <div className="relative w-[200px] sm:w-[250px] p-4 bg-white my-2 rounded-md">
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={equipment.imageUrl}
                              alt={equipment.name}
                              fill
                              priority
                              sizes="(min-width: 200px)"
                            />
                          </AspectRatio>

                          <Expand
                            onClick={(event) => {
                              event.stopPropagation();
                              equipmentModal.onOpen(equipment, reservations);
                            }}
                            size={32}
                            className="hidden  group-hover:block  absolute bottom-[-100px] right-2 bg-gray-400 p-1 rounded-lg text-white cursor-pointer hover:scale-[115%] duration-100"
                          />
                        </div>

                        <CardTitle>{equipment.name}</CardTitle>
                        <CardDescription className="flex gap-2">
                          {equipment.producer} {equipment.model}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{formatter.format(equipment.price)}/day</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Categories;
