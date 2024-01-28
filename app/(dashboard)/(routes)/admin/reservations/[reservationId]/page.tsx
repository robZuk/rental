import React from "react";
import prismadb from "@/lib/prismadb";
import { Heading } from "@/components/heading";

import ReservationsTable from "./_components/ReservationTable";
import { formatter } from "@/lib/utils";

const ReservationPage = async ({
  params,
}: {
  params: { reservationId: string };
}) => {
  const reservation = await prismadb.reservation.findUnique({
    where: {
      id: params.reservationId,
    },
    include: {
      reservationItems: { include: { dates: true } },
      customerClient: true,
    },
  });

  const equipments = await prismadb.equipment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedReservationDetails = reservation?.reservationItems
    ? reservation?.reservationItems.map((item) => {
        return {
          id: item.id,
          dates: item.dates,
          equipmentPrice: item.equipmentPrice,
          equipmentName:
            equipments.find((e) => e.id === item.equipmentId)?.name ?? "",
          amount: item.equipmentPrice * item.dates.length,
        };
      })
    : [];

  const amount = Number(
    reservation?.reservationItems
      ? reservation?.reservationItems
          .map((item) => item.equipmentPrice * item.dates.length)
          .reduce((acc, curr) => acc + curr, 0)
      : 0
  );

  if (reservation?.reservationItems) {
    return (
      <div className="flex flex-col gap-y-4 pt-4">
        <Heading
          title="Reservation details."
          description={`id:${reservation?.id}`}
        />
        <div>
          <p className="text-md">{`${reservation.customerClient.firstName} ${reservation.customerClient.lastName}`}</p>
          <p className="text-sm text-muted-foreground">{`${reservation.customerClient.email}`}</p>
        </div>
        <div>
          <p>{`Amount: ${formatter.format(amount)}`}</p>
          <p className="text-sm text-muted-foreground">{`Is payed: ${
            reservation?.isPayed ? "yes" : "no"
          }`}</p>
        </div>
        <ReservationsTable reservationItems={formattedReservationDetails} />
      </div>
    );
  }

  return null;
};

export default ReservationPage;

export async function generateStaticParams() {
  const reservations = await prismadb.reservation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return reservations.map((reservation) => ({
    reservationId: reservation.id.toString(),
  }));
}
