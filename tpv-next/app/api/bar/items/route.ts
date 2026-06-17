import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const barItems = await prisma.kitchenItem.findMany({
      where: {
        station: 'BAR',
        status: {
          in: ['PENDING', 'IN_PROGRESS']
        }
      },
      include: {
        ticketItem: {
          include: {
            product: true,
            ticket: {
              include: {
                createdBy: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(barItems);
  } catch (error) {
    console.error("Error fetching bar items:", error);
    return NextResponse.json(
      { error: "Failed to fetch bar items" },
      { status: 500 }
    );
  }
}
