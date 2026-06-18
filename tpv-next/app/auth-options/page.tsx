import Link from "next/link"

export default function AuthOptionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Opciones de Acceso - Better Auth
          </h1>
          <p className="text-xl text-gray-600">
            Elige la opción que prefiera para acceder al sistema
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Option 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-200">
            <div className="text-green-600 text-4xl mb-4">1️⃣</div>
            <h3 className="text-xl font-bold mb-3">Nuevo Usuario</h3>
            <p className="text-gray-600 mb-4">
              Registra un nuevo usuario desde cero con tu restaurante
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-green-500 mr-2">✓</span>
                Crea tenant y store automáticamente
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-green-500 mr-2">✓</span>
                Incluye categorías y productos demo
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-green-500 mr-2">✓</span>
              Plan FREE inicial
              </div>
            </div>
            <Link
              href="/register"
              className="block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 font-semibold"
            >
              Registrar Nuevo Usuario
            </Link>
          </div>

          {/* Option 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-200">
            <div className="text-blue-600 text-4xl mb-4">2️⃣</div>
            <h3 className="text-xl font-bold mb-3">Actualizar Usuario</h3>
            <p className="text-gray-600 mb-4">
              Actualiza la contraseña del usuario demo existente
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-blue-500 mr-2">✓</span>
                Mantiene datos existentes
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-blue-500 mr-2">✓</span>
                Compatibilidad con Better Auth
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-blue-500 mr-2">✓</span>
                Rápido y sencillo
              </div>
            </div>
            <Link
              href="/update-password"
              className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Actualizar Contraseña
            </Link>
          </div>

          {/* Option 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-purple-200">
            <div className="text-purple-600 text-4xl mb-4">3️⃣</div>
            <h3 className="text-xl font-bold mb-3">Regenerar Seed</h3>
            <p className="text-gray-600 mb-4">
              Regenera completamente los datos de prueba
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-purple-500 mr-2">✓</span>
                Limpia y recrea todos los datos
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-purple-500 mr-2">✓</span>
                Usuario demo compatible
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="text-purple-500 mr-2">✓</span>
                Productos y categorías demo
              </div>
            </div>
            <button
              onClick={() => window.open('https://github.com/devin-ai-integration/devin-cli', '_blank')}
              className="block w-full bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 font-semibold"
            >
              Ver Instrucciones
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Instrucciones de Regeneración de Seed</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Para regenerar el seed:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Asegúrate de que el servidor no esté corriendo</li>
                <li>Ejecuta el comando: <code className="bg-gray-200 px-2 py-1 rounded">npm run seed</code></li>
                <li>Esto limpiará y recreará todos los datos de prueba</li>
                <li>El usuario demo será: <code className="bg-gray-200 px-2 py-1 rounded">admin@demo.com</code> / <code className="bg-gray-200 px-2 py-1 rounded">password123</code></li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-yellow-800">⚠️ Advertencia</h3>
              <p className="text-yellow-700 text-sm">
                La regeneración del seed borrará todos los datos existentes en la base de datos, incluyendo usuarios, restaurantes, productos, etc. Solo haz esto si estás en ambiente de desarrollo.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-900 font-medium"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
