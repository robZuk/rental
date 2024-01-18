import React from "react";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import ReservationsTable from "./_components/ReservationsTable";
import { Separator } from "@/components/ui/separator";
import ReservationsHeader from "./_components/ReservationsHeader";
import { auth } from "@clerk/nextjs";

const ReservationsPage = async () => {
  const { userId } = auth();

  const reservations = await prismadb.reservation.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: String(userId),
    },
    include: {
      reservationItems: { include: { dates: true } },
      customerClient: true,
    },
  });

  const reservationsLength = reservations.length;

  const formattedReservations = reservations?.map((item) => ({
    id: item.id,
    isPayed: item.isPayed ? "Yes" : "No",
    amount: formatter.format(
      item.reservationItems
        .map((item) => item.equipmentPrice * item.dates.length)
        .reduce((acc, curr) => acc + curr, 0)
    ),
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <div className="px-2">
      <ReservationsHeader reservationsLenght={reservationsLength} />
      <Separator />
      <ReservationsTable reservations={formattedReservations} />
    </div>
  );
};

export default ReservationsPage;
