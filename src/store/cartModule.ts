
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

import type { CartWine,Wine,CartModule } from "./types";
// interfaces

const defaultCart: CartModule = {
    cart: [],
    total: 0
}

if (localStorage.getItem("cart")) {
    defaultCart.cart = JSON.parse(localStorage.getItem("cart") || "{}");
    let counter = 0;
    defaultCart.cart.forEach((wine) => {
        counter += (wine.quantity * wine.price)
    })
    console.log(counter);
    defaultCart.total = counter;
}

export const CartControlModule = {
    state: () => defaultCart,
    mutations: {
        setCart(state: Cart, CartWine: Wine) {
            let status = false;
            if (state.cart.length != 0) {
                state.cart = [...state.cart].map((wine) => {
                    if (wine.id == CartWine.id) {
                        status = true;
                        return { ...wine, quantity: wine.quantity + 1 }
                    }
                    else {
                        return wine;
                    }
                })
                if (!status) {
                    state.cart.push({ ...CartWine, quantity: 1 })
                }
            }
            else {
                state.cart.push({ ...CartWine, quantity: 1 })

            }

            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        setCartQuantityById(state: Cart, { Id, newQ }: { Id: any, newQ: number }) {
            console.log(newQ);
            state.cart = [...state.cart].map((wine) => {
                console.log(wine)
                if (wine.id == Id) {
                    console.log({ ...wine, quantity: newQ })
                    return { ...wine, quantity: newQ }
                }
                else {
                    return wine
                }
            })
            localStorage.setItem("cart", JSON.stringify(state.cart))

        },
        setTotal(state: Cart) {
            let counter = 0;
            state.cart.forEach((wine) => {
                counter += (wine.quantity * wine.price)
            })
            console.log(counter)
            state.total = counter;
        },
        removeFromCartById(state: Cart, Id: any) {
            state.cart = state.cart.filter(wine => {
                if (wine.id != Id) {
                    return wine;
                }
            })
        },
    },
    getters: {
        getCartWines(state: Cart) {
            return state.cart;
        }
    }
}