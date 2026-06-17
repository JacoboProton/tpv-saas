export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🔥 Admin SaaS</h1>

      <div className="grid grid-cols-3 gap-4 mt-6">

        <div className="bg-white p-4 shadow rounded">
          <h2>Restaurantes</h2>
          <p>128 activos</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2>Ingresos</h2>
          <p>€12.430 / mes</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2>Tickets</h2>
          <p>45.230</p>
        </div>

      </div>
    </div>
  );
}