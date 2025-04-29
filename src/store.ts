import { createStore, Store } from "vuex";
import { db } from "./config/firebase.ts";
import { addDoc, collection, getDocs } from "firebase/firestore";
import type { InjectionKey } from "vue";

import type User from "./interfaces.ts";

export interface State {
  currentUser: Object;
  currentPage: Object;
  redWines: Array<Object>;
}


export const key: InjectionKey<Store<State>> = Symbol();

const defaultState: State = {
  currentUser: {},
  currentPage: {},
  redWines: [],
};

if (localStorage.getItem("currentUser")) {
  defaultState.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
}

const store = createStore<State>({
  state: defaultState,
  mutations: {
    async setUser(state: State, user: User) {
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        cart: user.cart
      }
      state.currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      try {
        const usersCollection = collection(db, "users");
        await addDoc(usersCollection, newUser);
      } catch (error) {
        console.error(error);
      }
    },
    setRedWines(state: State, redWines: Array<Object>) {
      state.redWines = redWines;
      console.log(redWines);
    },
  },
  actions: {
    getRedWines({ commit }: { commit: Function }) {
      return new Promise(async (resolve: Function, reject: Function) => {
        try {
          const redWines = collection(db, "redWines");
          const data = await getDocs(redWines);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          commit("setRedWines", filteredData);
          resolve();
        }
        catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
  },
  getters: {},
});

export default store;
