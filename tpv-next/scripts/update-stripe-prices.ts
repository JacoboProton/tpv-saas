import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

async function updatePrices(prices: { [key: string]: number }) {
  console.log('🔄 Actualizando precios en Stripe...')

  try {
    // Current price IDs from env
    const priceIds = {
      BASIC: process.env.STRIPE_PRICE_ID_BASIC!,
      PRO: process.env.STRIPE_PRICE_ID_PRO!,
      PREMIUM: process.env.STRIPE_PRICE_ID_PREMIUM!,
    }

    // Update each price
    for (const [plan, amount] of Object.entries(prices)) {
      const priceId = priceIds[plan as keyof typeof priceIds]
      
      // Note: Stripe doesn't allow updating existing price amounts
      // We need to create new prices and update the env variables
      
      const product = await stripe.products.create({
        name: `TPV SaaS - Plan ${plan}`,
        description: `Plan ${plan} para TPV SaaS`,
      })

      const newPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: amount,
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
        metadata: {
          plan,
        }
      })

      console.log(`✅ ${plan}: Nuevo precio creado - $${amount / 100}/mes`)
      console.log(`   New Price ID: ${newPrice.id}`)
      
      // Archive old price
      await stripe.prices.update(priceId, { active: false })
      console.log(`   Old price archived`)
    }

    console.log('\n⚠️ IMPORTANTE: Actualiza tu archivo .env con los nuevos Price IDs')
    
  } catch (error) {
    console.error('❌ Error al actualizar precios:', error)
    process.exit(1)
  }
}

// Example: Update prices
// Basic: $5, Pro: $25, Premium: $45
updatePrices({
  BASIC: 500,   // $5.00
  PRO: 2500,    // $25.00
  PREMIUM: 4500 // $45.00
})