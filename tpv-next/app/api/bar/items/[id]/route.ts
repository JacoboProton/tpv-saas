import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    const updatedItem = await prisma.kitchenItem.update({
      where: { id: params.id },
      data: { status }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating bar item:", error);
    return NextResponse.json(
      { error: "Failed to update bar item" },
      { status: 500 }
    );
  }
}
