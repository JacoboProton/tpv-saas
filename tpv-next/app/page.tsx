import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">TPV SaaS</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="text-indigo-600 hover:text-indigo-900 font-medium"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium"
              >
                Registrarse
              </Link>
            </div>
            <div className="flex space-x-2">
              <Link
                href="/auth-options"
                className="text-sm text-indigo-600 hover:text-indigo-900 underline"
              >
                Opciones de acceso
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Sistema TPV para Restaurantes
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Gestión completa de pedidos, cocina, bar y suscripciones
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Comenzar Gratis
              </Link>
              <Link
                href="/login"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border border-indigo-600"
              >
                Demo
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">TPV Móvil</h3>
              <p className="text-gray-600">
                Gestiona pedidos desde cualquier dispositivo con nuestra interfaz intuitiva
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-3xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-semibold mb-2">KDS Digital</h3>
              <p className="text-gray-600">
                Sistema de cocina digital para optimizar la preparación de pedidos
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-3xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-2">Pagos Integrados</h3>
              <p className="text-gray-600">
                Procesamiento de pagos seguro con Stripe y múltiples métodos de pago
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Planes y Precios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-200">
                <h4 className="text-xl font-semibold mb-2">Básico</h4>
                <p className="text-4xl font-bold text-gray-900 mb-4">$9<span className="text-lg text-gray-600">/mes</span></p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>✓ 1 Usuario</li>
                  <li>✓ 1 Local</li>
                  <li>✓ TPV Básico</li>
                  <li>✓ Soporte Email</li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 font-semibold"
                >
                  Empezar
                </Link>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-indigo-600 relative">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                  Popular
                </div>
                <h4 className="text-xl font-semibold mb-2">Pro</h4>
                <p className="text-4xl font-bold text-gray-900 mb-4">$29<span className="text-lg text-gray-600">/mes</span></p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>✓ 5 Usuarios</li>
                  <li>✓ 3 Locales</li>
                  <li>✓ KDS Digital</li>
                  <li>✓ Gestión Inventario</li>
                  <li>✓ Soporte Prioritario</li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 font-semibold"
                >
                  Empezar
                </Link>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-200">
                <h4 className="text-xl font-semibold mb-2">Premium</h4>
                <p className="text-4xl font-bold text-gray-900 mb-4">$49<span className="text-lg text-gray-600">/mes</span></p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>✓ Usuarios Ilimitados</li>
                  <li>✓ Locales Ilimitados</li>
                  <li>✓ Todas las funciones</li>
                  <li>✓ API Access</li>
                  <li>✓ Soporte 24/7</li>
                </ul>
                <Link
                  href="/register"
                  className="block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 font-semibold"
                >
                  Empezar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 TPV SaaS. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
