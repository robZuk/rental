import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/container";
import prismadb from "@/lib/prismadb";
import Image from "next/image";
import { ca } from "date-fns/locale";
import { formatter } from "@/lib/utils";
import NoResults from "@/components/no-results";

const CategoriesPage = async () => {
  const categories = await prismadb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      equipments: {
        include: {
          parameters: true,
        },
      },
    },
  });

  return (
    <div className="px-4">
      <Tabs defaultValue="Excavators">
        <div className="flex flex-row">
          <TabsList className="py-8">
            {categories.map((item) => (
              <TabsTrigger key={item.id} value={item.name} className="">
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
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex flex-row gap-4 p-4">
          {categories.map(
            (category) => (
              <TabsContent key={category.id} value={category.name}>
                {category.equipments.map((equipment) => (
                  <Card>
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

export default CategoriesPage;
