import { prisma } from "@/lib/prisma";

export async function consumeStockFromTicketItem(ticketItemId: string) {
  const item = await prisma.ticketItem.findUnique({
    where: { id: ticketItemId },
    include: {
      product: {
        include: {
          recipeItems: {
            include: {
              ingredient: true,
            },
          },
        },
      },
    },
  });

  if (!item) return;

  for (const recipe of item.product.recipeItems) {
    const totalQty = recipe.quantity * item.quantity;

    // 🔥 1. actualizar stock
    await prisma.ingredient.update({
      where: { id: recipe.ingredientId },
      data: {
        stock: {
          decrement: totalQty,
        },
      },
    });

    // 🔥 2. registrar movimiento
    await prisma.stockMovement.create({
      data: {
        ingredientId: recipe.ingredientId,
        quantity: -totalQty,
        reason: `Venta ticket ${item.ticketId}`,
      },
    });
  }
}