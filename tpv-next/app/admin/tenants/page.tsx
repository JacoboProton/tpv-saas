import { prisma } from "@/lib/prisma";

export default async function TenantsPage() {
  const tenants = await prisma.tenant.findMany({
    include: {
      stores: true,
      users: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🏢 Empresas</h1>

      <div className="grid gap-3">
        {tenants.map((t) => (
          <div key={t.id} className="bg-white p-4 shadow rounded">
            <p className="font-bold">{t.name}</p>
            <p>Plan: {t.plan}</p>
            <p>Locales: {t.stores.length}</p>
            <p>Usuarios: {t.users.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}