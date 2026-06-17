import { prisma } from "@/lib/prisma";

export default async function Subscriptions() {
  const tenants = await prisma.tenant.findMany();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">💳 Suscripciones</h1>

      {tenants.map((t) => (
        <div key={t.id} className="border p-3 mt-2">
          <p>{t.name}</p>
          <p>Plan: {t.plan}</p>
          <p>Status: {t.plan === "FREE" ? "❌ Free" : "✅ Activo"}</p>
        </div>
      ))}
    </div>
  );
}