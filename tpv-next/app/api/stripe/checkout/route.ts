import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const planPrices: Record<string, string> = {
  BASIC: process.env.STRIPE_PRICE_ID_BASIC!,
  PRO: process.env.STRIPE_PRICE_ID_PRO!,
  PREMIUM: process.env.STRIPE_PRICE_ID_PREMIUM!,
};

export async function POST(req: Request) {
  const { plan, tenantId } = await req.json();

  const priceId = planPrices[plan];
  if (!priceId) {
    return Response.json({ error: "Invalid plan" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: {
      tenantId,
      plan,
    },
  });

  return Response.json({ url: session.url });
}