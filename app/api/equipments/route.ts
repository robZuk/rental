import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      name,
      imageUrl,
      producer,
      model,
      quantity,
      price,
      parameters,
      categoryId,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!producer) {
      return new NextResponse("Producer is required", { status: 400 });
    }

    if (!model) {
      return new NextResponse("Model is required", { status: 400 });
    }

    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!parameters) {
      return new NextResponse("Parameters is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("CategorId is required", { status: 400 });
    }

    const equipment = await prismadb.equipment.create({
      data: {
        name,
        imageUrl,
        producer,
        model,
        quantity,
        price,
        parameters: {
          createMany: {
            data: [
              ...parameters.map(
                (parameter: { name: string; value: string; unit: string }) =>
                  parameter
              ),
            ],
          },
        },
        categoryId,
      },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.log("[EQUIPMENTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const categories = await prismadb.category.findMany({});

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[WQUIPMENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
