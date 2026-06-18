import { NextResponse } from "next/server"
import { auth } from "@/lib/auth.config"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, password, restaurantName } = await req.json()

    // Check if user already exists using Better Auth
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      )
    }

    // Create user with Better Auth
    const newUser = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    })

    if (!newUser) {
      return NextResponse.json(
        { error: "Error al crear usuario" },
        { status: 500 }
      )
    }

    // Get the created user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: "Error al recuperar usuario creado" },
        { status: 500 }
      )
    }

    // Create tenant
    const tenant = await prisma.tenant.create({
      data: {
        name: restaurantName,
        plan: "FREE",
      }
    })

    // Create store
    const store = await prisma.store.create({
      data: {
        name: restaurantName,
        tenantId: tenant.id,
      }
    })

    // Update user with tenant and store
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        role: "OWNER",
        tenantId: tenant.id,
        storeId: store.id,
      }
    })

    // Create demo categories
    const drinksCategory = await prisma.category.create({
      data: {
        name: 'Bebidas',
      }
    })

    const foodCategory = await prisma.category.create({
      data: {
        name: 'Comida',
      }
    })

    // Create demo products
    await prisma.product.create({
      data: {
        name: 'Refresco',
        price: 2.50,
        cost: 1.00,
        categoryId: drinksCategory.id,
      }
    })

    await prisma.product.create({
      data: {
        name: 'Cerveza',
        price: 3.00,
        cost: 1.50,
        categoryId: drinksCategory.id,
      }
    })

    await prisma.product.create({
      data: {
        name: 'Hamburguesa',
        price: 8.00,
        cost: 4.00,
        categoryId: foodCategory.id,
      }
    })

    await prisma.product.create({
      data: {
        name: 'Papas Fritas',
        price: 3.50,
        cost: 1.00,
        categoryId: foodCategory.id,
      }
    })

    return NextResponse.json({ 
      message: "Usuario registrado exitosamente",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      }
    })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    )
  }
}