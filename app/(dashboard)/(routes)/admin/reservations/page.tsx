import React from "react";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import ReservationsTable from "./_components/ReservationsTable";
import { Separator } from "@/components/ui/separator";
import ReservationsHeader from "./_components/ReservationsHeader";
import { format } from "date-fns";

const ReservationsPage = async () => {
  const reservations = await prismadb.reservation.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      reservationItems: { include: { dates: true } },
      customerClient: true,
    },
  });

  const reservationsLength = reservations.length;

  const formattedReservations = reservations?.map((item) => ({
    id: item.id,
    userId: item.userId,
    userFirstName: item.customerClient?.firstName!,
    userLastName: item.customerClient?.lastName!,
    userEmail: item.customerClient?.email!,
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
