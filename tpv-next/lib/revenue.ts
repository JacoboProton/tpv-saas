import { prisma } from "@/lib/prisma";

export async function getMRR() {
  const pro = await prisma.tenant.count({
    where: { plan: "PRO" },
  });

  const basic = await prisma.tenant.count({
    where: { plan: "BASIC" },
  });

  const premium = await prisma.tenant.count({
    where: { plan: "PREMIUM" },
  });

  return {
    mrr:
      pro * 29 +
      basic * 9 +
      premium * 49,
  };
}