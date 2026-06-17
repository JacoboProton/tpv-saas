import { prisma } from "@/lib/prisma";
import { getIO } from "@/server/socket";

export async function POST(req: Request) {
  const { ticketId } = await req.json();

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!ticket) {
    return new Response("Ticket not found", { status: 404 });
  }

  const io = getIO();

  for (const item of ticket.items) {
    const kitchenItem = await prisma.kitchenItem.create({
      data: {
        ticketItemId: item.id,
        station: getStation(item.product.name),
        status: "PENDING",
      },
      include: {
        ticketItem: true,
      },
    });

    // 🔥 ENVIAR A KDS EN TIEMPO REAL
    io.emit("kds:new", {
      id: kitchenItem.id,
      ticketId: ticket.id,
      productName: item.product.name,
      quantity: item.quantity,
      status: kitchenItem.status,
      station: kitchenItem.station,
    });
  }

  return Response.json({ ok: true });
}

// 🍳 lógica simple de estación
function getStation(productName: string) {
  const name = productName.toLowerCase();

  if (name.includes("burger") || name.includes("pizza"))
    return "KITCHEN";

  if (name.includes("coca") || name.includes("beer"))
    return "BAR";

  return "KITCHEN";
}