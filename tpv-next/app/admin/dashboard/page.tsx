import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const tenants = await prisma.tenant.count();
  const stores = await prisma.store.count();

  const activeTenants = await prisma.tenant.findMany({
    where: { plan: { not: "FREE" } },
  });

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">📊 SaaS Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="🏢 Empresas" value={tenants} />
        <Card title="🏪 Locales" value={stores} />
        <Card title="💳 Clientes activos" value={activeTenants.length} />
      </div>

      <RevenuePanel />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white shadow p-4 rounded">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}