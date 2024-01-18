import React from "react";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import EquipmentsTable from "./_components/EquipmentsTable";

import { Separator } from "@/components/ui/separator";
import EquipmentsHeader from "./_components/EquipmentsHeader";
import { EquipmentsColumn } from "@/types";

const EquipmentsPage = async () => {
  const equipments = await prismadb.equipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const equipmentsLength = equipments.length;

  const formattedEquipments: EquipmentsColumn[] = equipments.map((item) => ({
    id: item.id,
    name: item.name,
    model: item.model,
    producer: item.producer,
    imageUrl: item.imageUrl,
    price: formatter.format(item.price),

    categoryId: item.categoryId,
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
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
