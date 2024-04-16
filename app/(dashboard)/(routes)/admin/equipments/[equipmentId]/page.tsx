import React from "react";
import prismadb from "@/lib/prismadb";
import { EquipmentForm } from "./_components/equipment-form";

const EquipmentPage = async ({
  params,
}: {
  params: { equipmentId: string };
}) => {
  const equipment = await prismadb.equipment?.findUnique({
    where: {
      id: params.equipmentId,
    },

    include: {
      parameters: true,
    },
  });

  const categories = await prismadb.category?.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-2 pt-6">
        <EquipmentForm initialData={equipment} categories={categories} />
      </div>
    </div>
  );
};

export default EquipmentPage;

// export async function generateStaticParams() {
//   const equipments = await prismadb.equipment?.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return equipments?.map((equipment) => ({
//     equipmentId: equipment.id.toString(),
//   }));
// }
