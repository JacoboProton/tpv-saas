import { getMRR } from "@/lib/revenue";

export default async function RevenuePanel() {
  const { mrr } = await getMRR();

  return (
    <div className="bg-green-50 p-6 rounded">
      <h2 className="text-lg font-bold">💰 Ingresos mensuales (MRR)</h2>
      <p className="text-3xl font-bold text-green-600">
        €{mrr}
      </p>
    </div>
  );
}