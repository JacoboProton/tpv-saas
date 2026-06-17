import { prisma } from "./prisma";

export async function processSale(ticketItems: any[]) {
  for (const item of ticketItems) {

    // 1. obtener receta del producto
    const recipe = await prisma.recipeItem.findMany({
      where: { productId: item.productId },
      include: { ingredient: true }
    });

    // 2. aplicar stock por ingrediente
    for (const r of recipe) {
      const total = r.quantity * item.quantity;

      await prisma.ingredient.update({
        where: { id: r.ingredientId },
        data: {
          stock: {
            decrement: total
          }
        }
      });

      // 3. registrar movimiento
      await prisma.stockMovement.create({
        data: {
          ingredientId: r.ingredientId,
          quantity: -total,
          reason: `SALE_${item.productId}`
        }
      });
    }
  }
}