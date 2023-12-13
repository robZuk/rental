"use client";
import React, { useState } from "react";
import { Expand, CalendarPlus } from "lucide-react";
import { Equipment } from "@prisma/client";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EquipmentModal } from "@/components/modals/equipment-modal";

import { formatter } from "@/lib/utils";
import NoResults from "@/components/no-results";
import { set } from "date-fns";

interface Category {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  equipments: Equipment[];
}

type CategoriesProps = {
  categories: Category[];
};

const Categories = ({ categories }: CategoriesProps) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Equipment>();

  return (
    <div className="px-4 w-full">
      <EquipmentModal open={open} setOpen={setOpen} data={data} />
      <Tabs defaultValue="Excavators">
        <TabsList className="bg-background">
          {categories.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.name}
              className="flex flex-col"
            >
              <div className="relative w-[80px] h-[40px]">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(min-width: 80px)"
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
                <div className="flex flex-wrap gap-4 pt-4">
                  {category.equipments.map((equipment, index) => (
                    <Card key={index} className="group">
                      <CardHeader>
                        <div className="relative w-[250px] h-[200px]">
                          <Image
                            src={equipment.imageUrl}
                            alt={equipment.name}
                            sizes="(min-width: 80px)"
                            fill
                            className="object-contain"
                          />
                          <Expand
                            onClick={() => {
                              setOpen(true);
                              setData(equipment);
                            }}
                            size={32}
                            className="hidden  group-hover:block  absolute bottom-[-100px] right-14 bg-gray-300 p-1 rounded-lg text-white cursor-pointer hover:scale-[115%] duration-100"
                          />
                          <CalendarPlus
                            size={32}
                            className="hidden group-hover:block absolute bottom-[-100px] right-2 bg-gray-300 p-1 rounded-lg text-white cursor-pointer    hover:scale-[115%] duration-100"
                          />
                        </div>

                        <CardTitle>{equipment.name}</CardTitle>
                        <CardDescription className="flex gap-2">
                          {equipment.producer}
                          {equipment.model}
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
