import { prisma } from "@/lib/prisma";
import { getIO } from "@/server/socket";

export async function POST(req: Request) {
  const body = await req.json();

  const ticket = await prisma.ticket.create({
    data: {
      total: body.total,
      storeId: body.storeId,
      createdById: body.userId,
      items: {
        create: body.items.map((i: any) => ({
          productId: i.id,
          quantity: i.qty,
          price: i.price,
        })),
      },
    },
    include: { items: true },
  });

  // 🔥 ENVIAR A COCINA EN TIEMPO REAL
  const io = getIO();

  ticket.items.forEach((item) => {
    io.emit("kds:new", {
      ticketId: ticket.id,
      item,
      station: "KITCHEN",
    });
  });

  return Response.json(ticket);
}