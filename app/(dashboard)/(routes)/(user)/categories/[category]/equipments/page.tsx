import prismadb from "@/lib/prismadb";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ExpandComponent from "../_components/expand";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatter } from "@/lib/utils";
import NoResults from "@/components/no-results";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryName = params.category.replace(/-/g, " ");
  const category = await prismadb.category.findFirst({
    where: {
      name:
        categoryName.replace(/-/g, " ").charAt(0).toUpperCase() +
        categoryName.slice(1),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      equipments: {
        include: {
          parameters: true,
          reservationItems: {
            include: {
              dates: true,
            },
          },
        },
      },
    },
  });

  const reservations = await prismadb.reservation.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reservationItems: {
        include: {
          dates: true,
        },
      },
    },
  });

  return (
    <div>
      {category?.equipments.length === 0 ? (
        <NoResults />
      ) : (
        <div className="flex justify-center flex-wrap gap-4 w-full pt-4 ">
          {category?.equipments.map(async (equipment, index) => (
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
                  <ExpandComponent
                    params={params}
                    equipment={equipment}
                    reservations={reservations}
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
    </div>
  );
}
