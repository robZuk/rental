import prismadb from "@/lib/prismadb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Metadata } from "next";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { formatter } from "@/lib/utils";
import NoResults from "@/components/no-results";
import ExpandComponent from "../../_components/expand";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const { id } = params;
  const equipment = await prismadb.equipment.findUnique({
    where: {
      id: id,
    },
  });
  return {
    title: `${equipment?.name}`,
  };
};

async function EquipmentPage({
  params,
}: {
  params: { id: string; category: string };
}) {
  const equipment = await prismadb.equipment.findUnique({
    where: {
      id: params.id,
    },
    include: {
      parameters: true,
      reservationItems: {
        include: {
          dates: true,
        },
      },
    },
  });

  if (!equipment) {
    return <NoResults />;
  }

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
    <div className="flex justify-center flex-wrap gap-4 w-full pt-4 ">
      <Card className="group">
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
    </div>
  );
}

export default EquipmentPage;
