import React from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import EquipmentsTable from "./_components/EquipmentsTable";

import { Separator } from "@/components/ui/separator";
import EquipmentsHeader from "./_components/EquipmentsHeader";
import { Equipment } from "../../../../../types";
import equipment from "../../(user)/categories/_components/equipment";

const EquipmentsPage = async () => {
  const equipments = await prismadb.equipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      parameters: true,
    },
  });

  // equipments.forEach((item) => {
  //   item.reservationItems.forEach((item) => console.log(item.dates));
  // });
  const equipmentsLength = equipments.length;

  const formattedEquipments: Equipment[] = equipments.map((item) => ({
    id: item.id,
    name: item.name,
    model: item.model,
    producer: item.producer,
    imageUrl: item.imageUrl,
    price: formatter.format(item.price),
    quantity: item.quantity,
    parameters: item.parameters.map((param) => ({
      id: param.id,
      equipmentId: param.equipmentId,
      name: param.name,
      unit: param.unit,
      value: param.value,
      createdAt: param.createdAt.toISOString(), // Convert Date to string
      updatedAt: param.updatedAt.toISOString(), // Convert Date to string
    })),
    categoryId: item.categoryId,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <EquipmentsHeader equipmentsLength={equipmentsLength} />
      <Separator />
      <EquipmentsTable equipments={formattedEquipments} />
    </>
  );
};

export default EquipmentsPage;
