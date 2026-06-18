# Personalización de Precios - TPV SaaS

## Precios Actuales

- **BASIC**: $9.00 USD/mes
- **PRO**: $29.00 USD/mes  
- **PREMIUM**: $49.00 USD/mes

## Cómo Personalizar los Precios

### Opción 1: Usar el Script Automatizado

1. Abre el archivo `scripts/update-stripe-prices.ts`
2. Modifica los valores en la función `updatePrices()` al final del archivo:
   ```typescript
   updatePrices({
     BASIC: 1500,   // $15.00
     PRO: 3500,    // $35.00
     PREMIUM: 5500 // $55.00
   })
   ```
3. Ejecuta el script:
   ```bash
   npm run stripe:update-prices
   ```
4. Actualiza tu archivo `.env` con los nuevos Price IDs que se muestran en la consola

### Opción 2: Manual desde Dashboard de Stripe

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com/test/products)
2. Encuentra los productos creados (TPV SaaS - Plan Basic/Pro/Premium)
3. Crea nuevos precios para cada producto con los montos deseados
4. Copia los nuevos Price IDs
5. Actualiza tu archivo `.env`:
   ```env
   STRIPE_PRICE_ID_BASIC="price_new_basic_id"
   STRIPE_PRICE_ID_PRO="price_new_pro_id"
   STRIPE_PRICE_ID_PREMIUM="price_new_premium_id"
   ```

### Opción 3: Actualizar Solo el Frontend

Si solo quieres cambiar los precios mostrados en la página principal sin afectar los cargos reales:

1. Abre `app/page.tsx`
2. Modifica los precios en la sección de planes:
   ```tsx
   <p className="text-4xl font-bold text-gray-900 mb-4">$15<span className="text-lg text-gray-600">/mes</span></p>
   ```

## Consideraciones Importantes

- **Stripe no permite modificar precios existentes**, siempre crea nuevos
- Los precios antiguos se archivan automáticamente al usar el script
- Asegúrate de actualizar los Price IDs en `.env` después de crear nuevos precios
- Los cambios en precios solo afectan a nuevas suscripciones
- Las suscripciones existentes mantienen su precio original

## Configuración de Webhooks de Stripe

Para que el sistema funcione correctamente con los pagos, necesitas configurar webhooks:

1. Ve a [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click en "Add endpoint"
3. URL: `https://tu-dominio.com/api/stripe/webhook` (para desarrollo: `http://localhost:3000/api/stripe/webhook`)
4. Selecciona los eventos:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copia el webhook secret y actualízalo en tu `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_tu_nuevo_webhook_secret"
   ```

## Prueba de Pagos

Para probar el sistema de pagos en modo desarrollo:

1. Usa las tarjetas de prueba de Stripe:
   - Éxito: `4242 4242 4242 4242`
   - Falla: `4000 0000 0000 9999`
2. Completa el proceso de checkout
3. Verifica que el plan del usuario se actualiza en la base de datos
4. Revisa los eventos en el dashboard de Stripe