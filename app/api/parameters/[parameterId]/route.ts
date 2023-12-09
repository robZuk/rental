import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { parameterId: string } }
) {
  try {
    if (!params.parameterId) {
      return new NextResponse("Parameter id is required", { status: 400 });
    }

    const parameter = await prismadb.parameter.findUnique({
      where: {
        id: params.parameterId,
      },
    });

    return NextResponse.json(parameter);
  } catch (error) {
    console.log("[PARAMETER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { parameterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.parameterId) {
      return new NextResponse("Parameter id is required", { status: 400 });
    }

    const parameter = await prismadb.parameter.delete({
      where: {
        id: params.parameterId,
      },
    });

    return NextResponse.json(parameter);
  } catch (error) {
    console.log("[PARAMETER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { parameterId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, unit } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!unit) {
      return new NextResponse("Unit is required", { status: 400 });
    }

    if (!params.parameterId) {
      return new NextResponse("Parameter id is required", { status: 400 });
    }

    const parameter = await prismadb.parameter.update({
      where: {
        id: params.parameterId,
      },
      data: {
        name,
        unit,
      },
    });

    return NextResponse.json(parameter);
  } catch (error) {
    console.log("[PARAMETER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
