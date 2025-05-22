// @ts-nocheck
import type { CartWine, CartModule, Wine } from "./types";
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
        initCart(state: CartModule, cart: Array<CartWine>) {
            state.cart = cart;
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        setCart(state: CartModule, CartWine: CartWine) {
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
        setCartQuantityById(state: CartModule, { Id, newQ }: { Id: any, newQ: number }) {
            console.log(newQ);
            console.log(state.cart)
            state.cart = [...state.cart].map((wine) => {
                console.log(wine)
                if (wine.id == Id) {
                    return { ...wine, quantity: newQ }
                }
                else {
                    return wine
                }
            })
            console.log(state.cart)
            localStorage.setItem("cart", JSON.stringify(state.cart))

        },
        setTotal(state: CartModule) {
            let counter = 0;
            state.cart.forEach((wine) => {
                counter += (wine.quantity * wine.price)
            })
            console.log(counter)
            state.total = counter;
        },
        removeFromCartById(state: CartModule, Id: any) {
            state.cart = state.cart.filter(wine => {
                if (wine.id != Id) {
                    return wine;
                }
            })
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
    },
    getters: {
        getCartWines(state: CartModule) {
            return state.cart;
        },
    }
}