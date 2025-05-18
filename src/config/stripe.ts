import Stripe from "stripe";
import type { CartWine } from "@/store/types";
import redWinePhoto from "@/assets/img/RedWine_photo.png"
import whiteWinePhoto from "@/assets/img/WhiteWine_photo.png";
import roseWinePhoto from "@/assets/img/RoseWine_photo.jpg";
import router from "@/router";

const stripe = new Stripe('sk_test_51RLRGv33g5Hd1wYQqhw7ujj1P80VlcxDaOiUcYbHcmLKElSDomRCZvHAsRuGTVO2Y9AP2qqhVaIG26Mf9HXJNK7F00S60rPhvW');

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
        success_url: "https://www.youtube.com/intl/en_my/ads/resources/success-stories/",
        cancel_url: "https://stackoverflow.com/questions/76833634/when-is-the-cancel-url-called-by-stripe"
    })

    window.open(`${session.url}`, '_blank')


}
