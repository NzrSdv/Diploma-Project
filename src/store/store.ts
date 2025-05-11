import { createStore, Store } from "vuex";
import { db } from "../config/firebase.ts";
import { addDoc, collection, getDocs, orderBy, query, } from "firebase/firestore";
import type { InjectionKey } from "vue";

import type User from "../interfaces.ts";
export interface State {
  currentUser: Object;
  pagination: Pagination;
  sortAndFilter: SortAndFilter;
  Cart: Cart
}

interface Pagination {
  currentPage: number;
  wines: Array<Object>;
  currentWines: Array<Object>;
  onePageMax: number;
}
interface SortAndFilter {
  sortedAndSearchRedWines: Array<Object>;
  searchText: string;
  filterKey: string;
  ascending: string;
}

interface Cart {
  cart: Array<CartWine>
}

export const key: InjectionKey<Store<State>> = Symbol();

const defaultSortAndFilter: SortAndFilter = {
  sortedAndSearchRedWines: [],
  searchText: '',
  filterKey: 'id',
  ascending: 'true'
}
const defaultPagination: Pagination = {
  currentPage: 0,
  wines: [],
  currentWines: [],
  onePageMax: 20,
}

const defaultCart: Cart = {
  cart: []
}

const defaultState: State = {
  currentUser: {},
  pagination: defaultPagination,
  sortAndFilter: defaultSortAndFilter,
  Cart: defaultCart
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

interface CartWine extends Wine {
  id: number;
  name: string;
  location: string;
  rating: Object;
  image: string;
  price: number;
  type: string;
  quantity: number;
}

if (localStorage.getItem("currentUser")) {
  defaultState.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
}
if (localStorage.getItem("redWines")) {
  defaultState.pagination.wines = JSON.parse(localStorage.getItem("redWines") || "{}")
  defaultState.sortAndFilter.sortedAndSearchRedWines = defaultState.pagination.wines;
}
if (localStorage.getItem("cart")) {
  defaultState.Cart.cart = JSON.parse(localStorage.getItem("cart") || "{}")
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

      } catch (error) {
        console.error(error);
      }
    },
    setRedWines(state: State, redWines: Array<Object>) {
      state.pagination.wines = redWines;

      localStorage.setItem("redWines", JSON.stringify(redWines));
    },
    setWhiteWines(state: State, whiteWines: Array<Object>) {
      state.pagination.wines = whiteWines;

      localStorage.setItem("whiteWines", JSON.stringify(whiteWines));
    },
    setRoseWines(state: State, roseWines: Array<Object>) {
      state.pagination.wines = roseWines;

      localStorage.setItem("roseWines", JSON.stringify(roseWines))
    },
    setCurrentWines(state: State) {
      localStorage.removeItem("currentWines")
      state.pagination.currentWines = state.sortAndFilter.sortedAndSearchRedWines.slice(state.pagination.onePageMax * (state.pagination.currentPage - 1), state.pagination.onePageMax * state.pagination.currentPage)
      localStorage.setItem("currentWines", JSON.stringify(state.pagination.currentWines));
    },
    setCurrentPage(state: State, newPage: number) {
      state.pagination.currentPage = newPage;
    },
    setSortedAndSearched(state: State) {
      state.sortAndFilter.sortedAndSearchRedWines = [...state.pagination.wines].sort((a, b) => {
        if (state.sortAndFilter.ascending == 'true') {
          if (state.sortAndFilter.filterKey == "wine" || state.sortAndFilter.filterKey == "winery" || state.sortAndFilter.filterKey == "id") {
            return a[state.sortAndFilter.filterKey].localeCompare(b[state.sortAndFilter.filterKey])
          }
          else if (state.sortAndFilter.filterKey == "price") {
            return a[state.sortAndFilter.filterKey] - b[state.sortAndFilter.filterKey];

          }

        }
        else if (state.sortAndFilter.ascending == 'false') {

          if (state.sortAndFilter.filterKey == "wine" || state.sortAndFilter.filterKey == "winery" || state.sortAndFilter.filterKey == "id") {
            return b[state.sortAndFilter.filterKey].localeCompare(a[state.sortAndFilter.filterKey])
          }
          else if (state.sortAndFilter.filterKey == "price") {
            return b[state.sortAndFilter.filterKey] - a[state.sortAndFilter.filterKey];

          }
        }
      }).filter((wine) => {
        if (wine.wine.includes(state.sortAndFilter.searchText) || wine.winery.includes(state.sortAndFilter.searchText) || wine.location.includes(state.searchText)) {
          return wine;
        }
      })

    },
    setSearchText(state: State, newSearch: string) {
      state.sortAndFilter.searchText = newSearch;

    },
    setFilterKey(state: State, newKey: string) {
      state.sortAndFilter.filterKey = newKey;


    },
    setAscending(state: State, newState: string) {
      state.sortAndFilter.ascending = newState;
    },
    setCart(state: State, CartWine: Wine) {
      let status = false;
      if (state.Cart.cart.length != 0) {
        state.Cart.cart = [...state.Cart.cart].map((wine) => {
          if (wine.id == CartWine.id) {
            status = true;
            return { ...wine, quantity: wine.quantity + 1 }
          }
          else {
            return wine;
          }
        })
        if (!status) {
          state.Cart.cart.push({ ...CartWine, quantity: 1 })
        }
      }
      else {
        state.Cart.cart.push({ ...CartWine, quantity: 1 })

      }

      localStorage.setItem("cart", JSON.stringify(state.Cart.cart))
    },
    setCartQuantityById(state: State, { Id, newQ } : {Id:any,newQ:number}) {
      console.log(newQ);
      state.Cart.cart = [...state.Cart.cart].map((wine) => {
        console.log(wine)
        if (wine.id == Id) {
          console.log({ ...wine, quantity: newQ })
          return { ...wine, quantity: newQ }
        }
        else {
          return wine
        }
      })
      localStorage.setItem("cart", JSON.stringify(state.Cart.cart))

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
    getWhiteWines({ commit }: { commit: Function }) {
      return new Promise(async (resolve: Function, reject: Function) => {
        try {
          const whiteWines = collection(db, "whiteWines");
          const pageQuery = query(whiteWines, orderBy("wine"));
          const data = await getDocs(pageQuery);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          commit("setWhiteWines", filteredData);
          commit("setCurrentWines")
          resolve();
        }
        catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
    getRoseWines({ commit }: { commit: Function }) {
      return new Promise(async (resolve: Function, reject: Function) => {
        try {
          const roseWines = collection(db, "roseWines");
          const pageQuery = query(roseWines, orderBy("wine"));
          const data = await getDocs(pageQuery);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          commit("setRoseWines", filteredData);
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
    },
    setWineType({ commit, state }: { commit: Function, state: State }, wineType: String) {
      switch (wineType) {
        case "red":
          commit(
            "setRedWines",
            JSON.parse(localStorage.getItem("redWines") || "[]")
          );
          break;
        case "white":
          commit(
            "setWhiteWines",
            JSON.parse(localStorage.getItem("whiteWines") || "[]")
          );
          break;
        case "rose":
          commit(
            "setRoseWines",
            JSON.parse(localStorage.getItem("roseWines") || "[]")
          );

          break;
        default:

          break;
      }
      commit("setSortedAndSearched")
      commit("setCurrentWines");

    }
  },
  getters: {
    getWinesPages(state: State) {
      return state.sortAndFilter.sortedAndSearchRedWines.length;
    },
    getCartWines(state: State) {
      return state.Cart.cart;
    }
  },
});

export default store;
