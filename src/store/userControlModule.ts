import { db } from "@/config/firebase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import type { UserControl, User, CartWine } from "./types";




const defaultUserControl: UserControl = {
    currentUser: {
        uid: "",
        displayName: "",
        email: "",
        photoURL: "",
    }
}
if (localStorage.getItem("currentUser")) {
    defaultUserControl.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
}
export const userControlModule = {
    state: () => defaultUserControl,
    mutations: {
        async setUser(state: UserControl, user: any) {
            const newUser: User = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL || "",
            }
            state.currentUser = newUser;
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            const userDocRef = doc(db, 'users', newUser.uid)
            try {
                await setDoc(userDocRef, newUser);

            } catch (error) {
                console.error(error);
            }
        },
    },
    actions: {
        async updateUserCart({ commit, state }: { commit: Function, state: UserControl }, newCart: Array<CartWine>) {
            const userRef = doc(db, 'userCarts', state.currentUser.uid);
            await updateDoc(userRef, { cart: newCart, uid: state.currentUser.uid })
            localStorage.setItem('cart', JSON.stringify(newCart))
            commit('setUser', { ...state.currentUser, cart: newCart })
        },
        async removeCart(state: UserControl) {
            localStorage.removeItem('cart')
            const userRef2 = doc(db, 'userCarts', state.currentUser.uid);
            await updateDoc(userRef2, { cart: [{}], uid: state.currentUser.uid })
        },
    }
}