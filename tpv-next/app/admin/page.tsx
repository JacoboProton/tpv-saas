import { auth } from "@/lib/auth.config"
import { redirect } from "next/navigation"
import Link from "next/link"
import SignOutButton from "@/components/SignOutButton"

async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await new Headers(),
  })

  if (!session) {
    redirect("/login")
  }

  // Get user details from database
  const { prisma } = await import("@/lib/prisma")
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { tenant: true, store: true }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TPV SaaS - Admin</h1>
              <p className="text-sm text-gray-600">Bienvenido, {session.user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Rol: {user?.role}
              </span>
              <span className="text-sm text-gray-600">
                Plan: {user?.tenant?.plan}
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Panel Principal</h2>
            <p className="text-gray-600">Resumen de tu negocio</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="bg-indigo-600 text-white p-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-2">Dashboard</h2>
            <p className="text-indigo-100">Ver estadísticas</p>
          </Link>
          <Link
            href="/admin/tenants"
            className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors"
          >
            <h2 className="text-lg font-semibold mb-2">Mis Restaurantes</h2>
            <p className="text-green-100">Gestionar locales</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/tpv"
            className="bg-blue-600 text-white p-8 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <h2 className="text-2xl font-bold mb-2">🛒 TPV</h2>
            <p className="text-blue-100">Sistema de punto de venta</p>
          </Link>
          <Link
            href="/kds"
            className="bg-orange-600 text-white p-8 rounded-lg shadow-md hover:bg-orange-700 transition-colors"
          >
            <h2 className="text-2xl font-bold mb-2">👨‍🍳 KDS</h2>
            <p className="text-orange-100">Sistema de cocina digital</p>
          </Link>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Funcionalidades Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Gestión de Pedidos</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Control de Inventario</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>KDS Digital</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Gestión de Usuarios</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Reportes y Estadísticas</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Integración Stripe</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminPage