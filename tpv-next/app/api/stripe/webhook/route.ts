import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const tenantId = session.metadata.tenantId;
    const plan = session.metadata.plan;

    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        plan,
      },
    });
  }

  return new Response("ok");
}