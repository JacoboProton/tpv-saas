import { NextResponse } from "next/server";
import { PrismaClient, Station } from "@prisma/client";

const prisma = new PrismaClient();

type TicketItemRequest = {
  productId: string;
  quantity: number;
  price: number;
  station: Station;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items }: { items: TicketItemRequest[] } = body;

    // Get first store (for demo purposes)
    const store = await prisma.store.findFirst();
    if (!store) {
      return NextResponse.json({ error: "No store found" }, { status: 400 });
    }

    // Get admin user (for demo purposes)
    const admin = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });
    if (!admin) {
      return NextResponse.json({ error: "No admin user found" }, { status: 400 });
    }

    // Calculate total
    const total = items.reduce((sum: number, item: TicketItemRequest) => sum + (item.price * item.quantity), 0);

    // Create ticket with items
    const ticket = await prisma.ticket.create({
      data: {
        total,
        status: "OPEN",
        storeId: store.id,
        createdById: admin.id,
        items: {
          create: items.map((item: TicketItemRequest) => ({
            quantity: item.quantity,
            price: item.price,
            product: {
              connect: { id: item.productId }
            },
            kitchenItems: {
              create: {
                station: item.station || "BAR",
                status: "PENDING"
              }
            }
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true,
            kitchenItems: true
          }
        }
      }
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}
