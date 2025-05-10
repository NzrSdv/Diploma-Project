import { createStore, Store } from "vuex";
import { db } from "./config/firebase.ts";
import { addDoc, collection, getDocs, orderBy, query, } from "firebase/firestore";
import type { InjectionKey } from "vue";

import type User from "./interfaces.ts";
import type { Wine } from "lucide-vue-next";
export interface State {
  currentUser: Object;
  currentPage: number;
  redWines: Array<Object>;
  currentWines: Array<Object>;
  onePageMax: number;
  LastWineIndex: number;
  sortedAndSearchRedWines: Array<Object>;
  searchText: string;
  filterKey: string;
  ascending: boolean;
}


export const key: InjectionKey<Store<State>> = Symbol();

const defaultState: State = {
  currentUser: {},
  currentPage: 0,
  redWines: [],
  currentWines: [],
  onePageMax: 20,
  LastWineIndex: 0,
  sortedAndSearchRedWines: [],
  searchText: '',
  filterKey: 'id',
  ascending: true

};
interface Wine {
  id: number;
  name: string;
  location: string;
  rating: Object;
  image: string;
  price: number;
  type: string;
}
if (localStorage.getItem("currentUser")) {
  defaultState.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
}
if (localStorage.getItem("redWines")) {
  defaultState.redWines = JSON.parse(localStorage.getItem("redWines") || "{}")
  defaultState.sortedAndSearchRedWines = defaultState.redWines;
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
      state.currentWines = state.sortedAndSearchRedWines.slice(state.onePageMax * (state.currentPage - 1), state.onePageMax * state.currentPage)
      localStorage.setItem("currentWines", JSON.stringify(state.currentWines));
    },
    setCurrentPage(state: State, newPage: number) {
      state.currentPage = newPage;
    },
    setSortedAndSearched(state: State) {
      state.sortedAndSearchRedWines = [...state.redWines].sort((a, b) => {
        if (state.ascending == 'true') {
          if (state.filterKey == "wine" || state.filterKey == "winery" || state.filterKey == "id") {
            return a[state.filterKey].localeCompare(b[state.filterKey])
          }
          else if (state.filterKey == "price") {
            return a[state.filterKey] - b[state.filterKey];

          }

        }
        else if (state.ascending == 'false') {

          if (state.filterKey == "wine" || state.filterKey == "winery" || state.filterKey == "id") {
            return b[state.filterKey].localeCompare(a[state.filterKey])
          }
          else if (state.filterKey == "price") {
            return b[state.filterKey] - a[state.filterKey];

          }
        }
      }).filter((wine) => {
        if (wine.wine.includes(state.searchText) || wine.winery.includes(state.searchText) || wine.location.includes(state.searchText)) {
          return wine;
        }
      })
      console.log(state.ascending)
      console.log(state.sortedAndSearchRedWines);
    },
    setSearchText(state: State, newSearch: string) {
      state.searchText = newSearch;
      console.log(state.searchText);
    },
    setFilterKey(state: State, newKey: string) {
      state.filterKey = newKey;
      console.log(state.filterKey);

    },
    setAscending(state: State, newState: boolean) {
      state.ascending = newState;
      console.log(state.ascending)
    },
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
      commit("setSortedAndSearched")
      commit("setCurrentWines");
    }
  },
  getters: {
    getRedWinesPages(state: State) {
      return state.sortedAndSearchRedWines.length;
    },
  },
});

export default store;
