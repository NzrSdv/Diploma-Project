import { createStore, Store } from "vuex";
import { db } from "./config/firebase.ts";
import { addDoc, collection, getDocs, orderBy, query, } from "firebase/firestore";
import type { InjectionKey } from "vue";

import type User from "./interfaces.ts";
export interface State {
  currentUser: Object;
  currentPage: number;
  redWines: Array<Object>;
  currentWines: Array<Object>;
  onePageMax: number;
  LastWineIndex: number;
}


export const key: InjectionKey<Store<State>> = Symbol();

const defaultState: State = {
  currentUser: {},
  currentPage: 0,
  redWines: [],
  currentWines: [],
  onePageMax: 20,
  LastWineIndex: 0
};

if (localStorage.getItem("currentUser")) {
  defaultState.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
}
if (localStorage.getItem("redWines")) {
  defaultState.redWines = JSON.parse(localStorage.getItem("redWines") || "{}")
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
      state.currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      const usersCollection = collection(db, "users");
      try {
        await addDoc(usersCollection, newUser);
        console.log("ok")
      } catch (error) {
        console.error(error);
      }
    },
    setRedWines(state: State, redWines: Array<Object>) {
      state.redWines = redWines;
      localStorage.setItem("redWines", JSON.stringify(redWines));
      console.log(state.currentWines);
    },
    setCurrentWines(state: State) {
      localStorage.removeItem("currentWines")
      state.currentWines = state.redWines.slice(state.onePageMax * (state.currentPage-1), state.onePageMax * state.currentPage)
      localStorage.setItem("currentWines", JSON.stringify(state.currentWines));
    },
    setCurrentPage(state: State, newPage: number) {
      state.currentPage = newPage;
    }
  },
  actions: {
    getRedWines({ commit }: { commit: Function }) {
      return new Promise(async (resolve: Function, reject: Function) => {
        try {
          const redWines = collection(db, "redWines");
          const pageQuery = query(redWines, orderBy("wine"));
          const data = await getDocs(pageQuery);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(filteredData);
          commit("setRedWines", filteredData);
          commit("setCurrentWines")
          resolve();
        }
        catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
    setCurrentPageWine({ commit, state }: { commit: Function, state: State }, newPage: string) {
      commit("setCurrentPage", newPage);
      commit("setCurrentWines");
    }
  },
  getters: {
    getRedWinesPages(state: State) {
      return state.redWines.length;
    }

  },
});

export default store;
