import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { plan, tenantId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: `TPV Plan ${plan}`,
          },
          unit_amount: plan === "PRO" ? 2900 : 7900,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    metadata: {
      tenantId,
    },
  });

  return Response.json({ url: session.url });
}