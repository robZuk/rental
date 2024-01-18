import prismadb from "@/lib/prismadb";

export const getReservationsCount = async () => {
  const salesCount = await prismadb.reservation.count({
    where: {
      isPayed: true,
    },
  });

  return salesCount;
};
