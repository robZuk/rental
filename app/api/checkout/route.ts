import Stripe from "stripe";
import { NextResponse } from "next/server";
import { useAuth } from "@clerk/nextjs";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";
import { ca } from "date-fns/locale";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

export async function POST(req: Request) {
  const body = await req.json();

  const { cartData } = body;

  // console.log(cartData);

  if (!cartData) {
    return new NextResponse("Cart data are required", { status: 400 });
  }

  // const equipmentIds = cartData.cartItems.map((item: any) => item.equipmentId);

  // const equipments = await prismadb.equipment.findMany({
  //   where: {
  //     id: {
  //       in: equipmentIds,
  //     },
  //   },
  // });

  // console.log(cartData);

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  cartData.cartItems.forEach((equipment: any) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: equipment.equipmentName,
        },
        unit_amount: equipment.equipmentPrice * 100 * equipment.dates?.length,
      },
    });
  });

  const reservation = await prismadb.reservation.create({
    data: {
      isPayed: false,
      userId: cartData.userId,

      // reservationItems: {
      //   create: cartData.map((item: any) => {
      //     ({
      //       reservationId: reservation.id,
      //       equipmentId: item.equipmentId,
      //       dates: {
      //         create: item.dates.map((date: any) => {
      //           ({
      //             date: date,
      //           });
      //         }),
      //       },
      //     });
      //   }),
      // },
      reservationItems: {
        create: cartData.cartItems.map((item: any) => {
          return {
            equipmentId: item.equipmentId,
            dates: {
              create: item.dates.map((date: any) => {
                return {
                  date: date,
                };
              }),
            },
          };
        }),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },

    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      reservationId: reservation.id,
    },
  });

  return NextResponse.json(
    { url: session.url }
    // {
    //   headers: corsHeaders,
    // }
  );
}
