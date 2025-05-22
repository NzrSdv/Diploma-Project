// @ts-nocheck
import Stripe from "stripe";
import type { CartWine } from "@/store/types";

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SK_KEY);

const baseUrl = "http://localhost:5173"

export async function createStripeProducts(Wines: Array<CartWine>, url: string) {
    let arrayOfItems: Array<Object> = [];
    for (let i = 0; i < Wines.length; i++) {
        await stripe.products.create({
            name: Wines[i].wine,
            active: true,
            url: url,
            description: `Это вино ${Wines[i].wine} сделано в ${Wines[i].location} в винодельной ${Wines[i].winery}`,
            images: [Wines[i].image],
            default_price_data: {
                currency: 'usd',
                unit_amount: Wines[i].price * 100,
            },
        }).then(data => arrayOfItems.push({ price: data.default_price, quantity: Wines[i].quantity }))
    }
    const session = await stripe.checkout.sessions.create({
        line_items: arrayOfItems,
        mode: 'payment',
        success_url: `${baseUrl}/paymentsuccess`,
        cancel_url: `${baseUrl}/paymentcancel`
    })

    window.open(`${session.url}`, '_blank')
    window.close()


}
