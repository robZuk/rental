import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// export async function POST(req: Request) {
//   const user = await currentUser();

//   try {
//     let customer = await prismadb.customerClient.findUnique({
//       where: {
//         userId: user?.id,
//       },
//     });

//     if (!customer) {
//       if (user && user?.id && user?.firstName && user?.lastName) {
//         await prismadb.customerClient.create({
//           data: {
//             userId: user.id,
//             email: user?.emailAddresses[0].emailAddress,
//             imageUrl: user?.imageUrl,
//             firstName: user?.firstName,
//             lastName: user?.lastName as string,
//           },
//         });
//       }
//     }

//     return NextResponse.json(customer);
//   } catch (error) {
//     console.log("[USERS_POST]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

export async function POST(user: any) {
  // const user = await currentUser();

  try {
    // let customer = await prismadb.customerClient.findUnique({
    //   where: {
    //     userId: user?.id,
    //   },
    // });

    // if (!customer) {
    //   if (user && user?.id && user?.firstName && user?.lastName) {
    const customer = await prismadb.customerClient.create(user);

    return NextResponse.json(customer);
  } catch (error) {
    console.log("[USERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
