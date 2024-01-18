import React from "react";
import prismadb from "@/lib/prismadb";
import { Heading } from "@/components/heading";
import { CalendarComponent } from "@/components/calendar";

const equipmentReservationsPage = async ({
  params,
}: {
  params: { equipmentId: string };
}) => {
  const equipment = await prismadb.equipment.findUnique({
    where: {
      id: params.equipmentId,
    },
    include: {
      reservationItems: { include: { dates: true } },
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

  const reservedDays: Date[] = [];

  const payedReservations = reservations.filter(
    (reservation) => reservation.isPayed
  );

  equipment?.reservationItems?.forEach((item) => {
    payedReservations.forEach((reservation) => {
      if (reservation.id === item.reservationId) {
        item.dates.forEach((date) => reservedDays.push(new Date(date.date)));
      }
    });
  });

  console.log(reservedDays);

  return (
    <div className="px-2 pt-4">
      {equipment && (
        <Heading
          title={equipment.name}
          description={`Reserved days (${reservedDays.length}).`}
        />
      )}
      <div className="flex py-4">
        <CalendarComponent days={reservedDays} />
      </div>
    </div>
  );
};

export default equipmentReservationsPage;
