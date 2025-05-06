import { createStore, Store } from "vuex";
import { db } from "./config/firebase.ts";
import { addDoc, collection, getDocs, limit, orderBy, query, } from "firebase/firestore";
import type { InjectionKey } from "vue";

import type User from "./interfaces.ts";
const onePageMax = 20;
export interface State {
  currentUser: Object;
  currentPage: Object;
  redWines: Array<Object>;
  lastVisibleWine: object;
}
const usersCollection = collection(db, "users");


export const key: InjectionKey<Store<State>> = Symbol();

const defaultState: State = {
  currentUser: {},
  currentPage: {},
  redWines: [],
  lastVisibleWine: {},
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
        displayName: user.displayName,
        photoURL: user.photoURL || "",
        cart: user.cart
      }
      console.log(user);
      console.log(newUser);
      state.currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      try {
        await addDoc(usersCollection, user);
      } catch (error) {
        console.error(error);
      }
    },
    setRedWines(state: State, redWines: Array<Object>) {
      state.redWines = redWines;
      localStorage.setItem("redWines", JSON.stringify(redWines));
      console.log(redWines);
    },
    setLastVisibleWine(state: State, Wine: object) {
      state.lastVisibleWine = Wine;
    }
  },
  actions: {
    getRedWines({ commit }: { commit: Function }) {
      return new Promise(async (resolve: Function, reject: Function) => {
        try {
          const redWines = collection(db, "redWines");
          const pageQuery = query(redWines, orderBy("wine"), limit(onePageMax))
          const data = await getDocs(pageQuery);
          commit("setLastVisibleWine", data.docs[data.docs.length - 1])
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
