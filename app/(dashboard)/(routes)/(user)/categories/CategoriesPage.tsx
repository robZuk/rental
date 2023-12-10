"use client";
import React from "react";
import Categories from "./page";
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
import { formatter } from "@/lib/utils";
import NoResults from "@/components/no-results";

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

const CategoriesPage = ({ categories }: CategoriesProps) => {
  return (
    <div className="px-4 w-full">
      <Tabs defaultValue="Excavators">
        {/* <div className="flex flex-row"> */}
        <TabsList className="bg-white">
          {categories.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.name}
              className="flex flex-col"
            >
              <div
                style={{
                  position: "relative",
                  width: "80px",
                  height: "40px",
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(min-width: 80px)"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <p>{item.name}</p>
            </TabsTrigger>
          ))}
        </TabsList>
        {/* </div> */}

        <div>
          {categories.map(
            (category) => (
              <TabsContent key={category.id} value={category.name}>
                {category.equipments.length === 0 ? (
                  <NoResults />
                ) : (
                  <div className="flex flex-wrap gap-4 pt-4">
                    {category.equipments.map((equipment, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <div
                            style={{
                              position: "relative",
                              width: "250px",
                              height: "200px",
                            }}
                          >
                            <Image
                              src={equipment.imageUrl}
                              alt={equipment.name}
                              sizes="(min-width: 80px)"
                              fill
                              style={{
                                objectFit: "contain",
                              }}
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
            )
            // category.equipments.map((equipment) => (
            //     <div>1</div>
            //   <TabsContent key={equipment.id} value={category.name}>
            //     <Card>
            //       <CardHeader>
            //         <div
            //           style={{
            //             position: "relative",
            //             width: "250px",
            //             height: "200px",
            //           }}
            //         >
            //           <Image
            //             src={equipment.imageUrl}
            //             alt={equipment.name}
            //             sizes="(min-width: 80px)"
            //             fill
            //             style={{
            //               objectFit: "contain",
            //             }}
            //           />
            //         </div>
            //         <CardTitle>{equipment.name}</CardTitle>
            //         <CardDescription className="flex gap-2">
            //           {equipment.producer}
            //           {equipment.model}
            //         </CardDescription>
            //       </CardHeader>
            //       <CardContent>
            //         <p>{formatter.format(equipment.price)}/day</p>
            //       </CardContent>
            //     </Card>
            //   </TabsContent>
            // ))
          )}
        </div>
      </Tabs>
    </div>
  );
};

// const CategoriesPage (props: Props) => {
//   return <div>CategoriesPage</div>;
// };

export default CategoriesPage;
