import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { tenantId, plan } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `Plan TPV ${plan}`,
          },
          unit_amount: plan === "PRO" ? 2999 : 999,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
    metadata: {
      tenantId,
      plan,
    },
  });

  return Response.json({ url: session.url });
}