import { prisma } from "@/lib/prisma";
import { getIO } from "@/server/socket";
import { consumeStockFromTicketItem } from "@/lib/stock";

export async function POST(req: Request) {
  const { kitchenItemId, status } = await req.json();

  const updated = await prisma.kitchenItem.update({
    where: { id: kitchenItemId },
    data: { status },
    include: {
      ticketItem: true,
    },
  });

  // 🔥 SOLO CUANDO ESTÁ LISTO
  if (status === "DONE") {
    await consumeStockFromTicketItem(updated.ticketItemId);
  }

  // realtime update
  const io = getIO();

  io.emit("kds:update", {
    id: updated.id,
    status: updated.status,
  });

  return Response.json(updated);
}