import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.reservationId) {
      return new NextResponse("Reservation id is required", { status: 400 });
    }

    const reservation = await prismadb.reservation.delete({
      where: {
        id: params.reservationId,
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[RESERVATION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
