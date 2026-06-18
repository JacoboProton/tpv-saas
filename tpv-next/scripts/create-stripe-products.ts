import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

async function createProductsAndPrices() {
  console.log('🚀 Creando productos y precios en Stripe...')

  try {
    // Crear producto para plan BASIC
    const basicProduct = await stripe.products.create({
      name: 'TPV SaaS - Plan Basic',
      description: 'Plan básico para pequeños negocios',
    })

    const basicPrice = await stripe.prices.create({
      product: basicProduct.id,
      unit_amount: 900, // $9.00 USD
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan: 'BASIC'
      }
    })

    console.log(`✅ Plan BASIC creado: ${basicPrice.id}`)

    // Crear producto para plan PRO
    const proProduct = await stripe.products.create({
      name: 'TPV SaaS - Plan Pro',
      description: 'Plan profesional para negocios en crecimiento',
    })

    const proPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 2900, // $29.00 USD
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan: 'PRO'
      }
    })

    console.log(`✅ Plan PRO creado: ${proPrice.id}`)

    // Crear producto para plan PREMIUM
    const premiumProduct = await stripe.products.create({
      name: 'TPV SaaS - Plan Premium',
      description: 'Plan premium para grandes empresas',
    })

    const premiumPrice = await stripe.prices.create({
      product: premiumProduct.id,
      unit_amount: 4900, // $49.00 USD
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
      metadata: {
        plan: 'PREMIUM'
      }
    })

    console.log(`✅ Plan PREMIUM creado: ${premiumPrice.id}`)

    console.log('\n🎉 Productos y precios creados exitosamente!')
    console.log('\n📝 Actualiza tu archivo .env con estos IDs:')
    console.log(`STRIPE_PRICE_ID_BASIC="${basicPrice.id}"`)
    console.log(`STRIPE_PRICE_ID_PRO="${proPrice.id}"`)
    console.log(`STRIPE_PRICE_ID_PREMIUM="${premiumPrice.id}"`)

  } catch (error) {
    console.error('❌ Error al crear productos y precios:', error)
    process.exit(1)
  }
}

createProductsAndPrices()