import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { equipmentId: string } }
) {
  try {
    if (!params.equipmentId) {
      return new NextResponse("Equipment id is required", { status: 400 });
    }

    const equipment = await prismadb.equipment.findUnique({
      where: {
        id: params.equipmentId,
      },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.log("[EQUIPMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { equipmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.equipmentId) {
      return new NextResponse("Equipment id is required", { status: 400 });
    }

    const equipment = await prismadb.equipment.delete({
      where: {
        id: params.equipmentId,
      },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.log("[EQUIPMENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { equipmentId: string } }
) {
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
    if (!parameters) {
      return new NextResponse("Parameters is required", { status: 400 });
    }
    if (!params.equipmentId) {
      return new NextResponse("Equipment id is required", { status: 400 });
    }

    await prismadb.equipment.update({
      where: {
        id: params.equipmentId,
      },
      data: {
        name,
        imageUrl,
        producer,
        model,
        quantity,
        price,
        parameters: { deleteMany: {} },
        categoryId,
      },
    });

    const equipment = await prismadb.equipment.update({
      where: {
        id: params.equipmentId,
      },
      data: {
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
      },
    });

    return NextResponse.json(equipment);
  } catch (error) {
    console.log("[EQUIPMENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
