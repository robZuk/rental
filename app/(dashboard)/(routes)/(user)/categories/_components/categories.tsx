"use client";

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

import useEquipmentModal from "@/hooks/use-equipment-modal";
import { formatter } from "@/lib/utils";
import NoResults from "@/components/no-results";
import getBase64 from "@/lib/getLocalBase64";
// import { DynamicImage } from "./image";

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

const Categories = async ({ categories }: CategoriesProps) => {
  const equipmentModal = useEquipmentModal();
  // const myBlurDataUrl = await getBase64("/logo.webp");

  return (
    <div className="px-4 w-full">
      {/* <Image
        src={"/logo`.webp"}
        alt={"logo"}
        width={250}
        height={200}
        priority={true}
        placeholder="blur"
        blurDataURL={myBlurDataUrl}
        sizes="(min-width: 80px)"
        // fill
        // className="object-cover"
      /> */}
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
                  {category.equipments.map(async (equipment, index) => (
                    <Card key={index} className="group">
                      <CardHeader>
                        {/* <DynamicImage
                          // equipment={equipment}
                          imageUrl={equipment.imageUrl}
                          imageAlt={equipment.name}
                        /> */}
                        <div className="relative w-[250px] h-[200px]">
                          <Image
                            src={equipment.imageUrl}
                            alt={equipment.name}
                            width={250}
                            height={200}
                            priority={true}
                            // placeholder="blur"
                            // blurDataURL={await getBase64(equipment.imageUrl)}
                            sizes="(min-width: 80px)"
                            // fill
                            // className="object-cover"
                          />
                          <Expand
                            onClick={(event) => {
                              event.stopPropagation();
                              equipmentModal.onOpen(equipment);
                              // setOpen(true);
                              // setData(equipment);
                            }}
                            size={32}
                            className="hidden  group-hover:block  absolute bottom-[-100px] right-14 bg-gray-400 p-1 rounded-lg text-white cursor-pointer hover:scale-[115%] duration-100"
                          />
                          <CalendarPlus
                            size={32}
                            className="hidden group-hover:block absolute bottom-[-100px] right-2 bg-gray-400 p-1 rounded-lg text-white cursor-pointer    hover:scale-[115%] duration-100"
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
