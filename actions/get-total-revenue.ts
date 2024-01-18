import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async () => {
  const paidResevations = await prismadb.reservation.findMany({
    where: {
      isPayed: true,
    },
    include: {
      reservationItems: {
        include: {
          dates: true,
        },
      },
    },
  });

  const totalRevenue = paidResevations.reduce((total, reservation) => {
    const orderTotal = reservation.reservationItems.reduce(
      (reservationSum, item) => {
        return reservationSum + item.equipmentPrice * item.dates.length;
      },
      0
    );
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
