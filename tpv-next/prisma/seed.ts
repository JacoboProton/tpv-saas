import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Creando datos de prueba con Better Auth...')

  try {
    // Clean existing data
    await prisma.session.deleteMany({})
    await prisma.ticketItem.deleteMany({})
    await prisma.kitchenItem.deleteMany({})
    await prisma.ticket.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.store.deleteMany({})
    await prisma.tenant.deleteMany({})

    // Create a demo tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Demo Restaurant',
        plan: 'PRO',
      }
    })

    console.log('✅ Tenant creado:', tenant.name)

    // Create a demo store
    const store = await prisma.store.create({
      data: {
        name: 'Main Location',
        address: '123 Main Street',
        tenantId: tenant.id,
      }
    })

    console.log('✅ Store creado:', store.name)

    // Create demo user with Better Auth compatible password
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    const user = await prisma.user.create({
      data: {
        email: 'admin@demo.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'OWNER',
        tenantId: tenant.id,
        storeId: store.id,
      }
    })

    console.log('✅ User creado:', user.email)

    // Create some demo categories
    const drinksCategory = await prisma.category.create({
      data: {
        name: 'Drinks',
      }
    })

    const foodCategory = await prisma.category.create({
      data: {
        name: 'Food',
      }
    })

    console.log('✅ Categorías creadas')

    // Create some demo products
    await prisma.product.createMany({
      data: [
        {
          name: 'Coca Cola',
          price: 2.50,
          cost: 1.00,
          categoryId: drinksCategory.id,
        },
        {
          name: 'Beer',
          price: 3.00,
          cost: 1.50,
          categoryId: drinksCategory.id,
        },
        {
          name: 'Burger',
          price: 8.00,
          cost: 4.00,
          categoryId: foodCategory.id,
        },
        {
          name: 'Fries',
          price: 3.50,
          cost: 1.00,
          categoryId: foodCategory.id,
        },
      ]
    })

    console.log('✅ Productos creados')

    console.log('\n🎉 Seed data creada exitosamente!')
    console.log('\n📝 Credenciales de demo:')
    console.log('   Email: admin@demo.com')
    console.log('   Password: password123')
    console.log('\n💡 Puedes iniciar sesión en /login')

  } catch (error) {
    console.error('❌ Error al crear seed data:', error)
    process.exit(1)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
