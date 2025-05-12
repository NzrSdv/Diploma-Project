import { db } from "@/config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import type { UserControl, User } from "./types";




const defaultUserControl: UserControl = {
    currentUser: {
        dbId: "",
        uid: "",
        displayName: "",
        email: "",
        photoURL: "",
        cart: [],
    }
}
if (localStorage.getItem("currentUser")) {
    defaultUserControl.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    //   const usersCollection = collection(db, 'users');
    // defaultState.currentUserDbId = await getDocs(usersCollection).then((data => {
    //   return data.docs;
    // }))
}
export const userControlModule = {
    state: () => defaultUserControl,
    mutations: {
        async setUser(state: UserControl, user: User) {
            const newUser = {
                dbId: user.dbId,
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL || "",
                cart: user.cart,
            }
            state.currentUser = newUser;
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            const usersCollection = collection(db, "users");
            try {
                await addDoc(usersCollection, newUser);

            } catch (error) {
                console.error(error);
            }
        },
        async removeCart(state: UserControl) {
            localStorage.removeItem('cart')
            const userDoc = doc(db, 'users', state.currentUser.uid)
            await updateDoc(userDoc, { cart: [] })
        },
    }
}