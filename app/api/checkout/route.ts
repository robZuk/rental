import Stripe from "stripe";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json();

  const { cartData } = body;
  const user = await currentUser();

  if (!cartData) {
    return new NextResponse("Cart data are required", { status: 400 });
  }

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
      reservationItems: {
        create: cartData.cartItems.map((item: any) => {
          return {
            equipmentId: item.equipmentId,
            equipmentPrice: item.equipmentPrice,
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

  //Stripe
  let stripeCustomer = await prismadb.stripeCustomer.findUnique({
    where: {
      userId: user?.id,
    },
    select: {
      stripeCustomerId: true,
    },
  });

  if (!stripeCustomer) {
    const customer = await stripe.customers.create({
      email: user?.emailAddresses[0].emailAddress,
    });

    if (user?.id) {
      stripeCustomer = await prismadb.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomer?.stripeCustomerId,
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

  return NextResponse.json({ url: session.url });
}
