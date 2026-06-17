import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ======================
  // 🏪 TENANT + STORE
  // ======================
  const tenant = await prisma.tenant.create({
    data: {
      name: "Restaurante Demo",
      stores: {
        create: {
          name: "Bar Central",
          address: "Centro"
        }
      }
    }
  });

  const store = await prisma.store.findFirst();

  // ======================
  // 👤 USUARIO ADMIN
  // ======================
  const admin = await prisma.user.create({
    data: {
      email: "admin@tpv.com",
      name: "Admin",
      role: "ADMIN",
      tenantId: tenant.id,
      storeId: store!.id
    }
  });

  // ======================
  // 📦 CATEGORÍAS
  // ======================
  const categories = await prisma.category.createMany({
    data: [
      { name: "Cafés" },
      { name: "Bebidas" },
      { name: "Bocadillos" },
      { name: "Desayunos" },
      { name: "Menú del día" },
      { name: "Postres" }
    ]
  });

  const cats = await prisma.category.findMany();

  const getCat = (name: string) =>
    cats.find(c => c.name === name)!;

  // ======================
  // 🍔 PRODUCTOS
  // ======================
  await prisma.product.createMany({
    data: [
      // CAFÉS
      { name: "Café solo", price: 1.2, categoryId: getCat("Cafés").id },
      { name: "Café con leche", price: 1.5, categoryId: getCat("Cafés").id },
      { name: "Cappuccino", price: 2.2, categoryId: getCat("Cafés").id },

      // BEBIDAS
      { name: "Coca Cola", price: 2.0, categoryId: getCat("Bebidas").id },
      { name: "Agua", price: 1.0, categoryId: getCat("Bebidas").id },
      { name: "Cerveza", price: 2.5, categoryId: getCat("Bebidas").id },

      // BOCADILLOS
      { name: "Bocadillo jamón", price: 4.5, categoryId: getCat("Bocadillos").id },
      { name: "Bocadillo tortilla", price: 4.0, categoryId: getCat("Bocadillos").id },

      // DESAYUNOS
      { name: "Tostada + café", price: 2.5, categoryId: getCat("Desayunos").id },

      // MENÚ
      { name: "Menú del día", price: 10.0, categoryId: getCat("Menú del día").id },

      // POSTRES
      { name: "Tarta queso", price: 3.5, categoryId: getCat("Postres").id }
    ]
  });

  const products = await prisma.product.findMany();

  const getProduct = (name: string) =>
    products.find(p => p.name === name)!;

  // ======================
  // 🎫 TICKET + ITEMS
  // ======================
  const ticket = await prisma.ticket.create({
    data: {
      total: 0,
      status: "OPEN",
      storeId: store!.id,
      createdById: admin.id,
      items: {
        create: [
          {
            quantity: 2,
            price: 2.0,
            productId: getProduct("Coca Cola").id,
            kitchenItems: {
              create: {
                station: "BAR",
                status: "PENDING"
              }
            }
          },
          {
            quantity: 1,
            price: 2.5,
            productId: getProduct("Cerveza").id,
            kitchenItems: {
              create: {
                station: "BAR",
                status: "IN_PROGRESS"
              }
            }
          },
          {
            quantity: 1,
            price: 4.5,
            productId: getProduct("Bocadillo jamón").id,
            kitchenItems: {
              create: {
                station: "KITCHEN",
                status: "PENDING"
              }
            }
          }
        ]
      }
    }
  });

  console.log("✅ SEED COMPLETO");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());