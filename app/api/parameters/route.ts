import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value, unit } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const parameter = await prismadb.parameter.create({
      data: {
        name,
        value,
        unit,
        Equipment: {}, // Add the required Equipment
      },
    });

    return NextResponse.json(parameter);
  } catch (error) {
    console.log("[PARAMETERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const parameters = await prismadb.parameter.findMany({});

    return NextResponse.json(parameters);
  } catch (error) {
    console.log("[PARAMETERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
