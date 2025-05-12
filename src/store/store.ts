import { createStore, Store } from "vuex";
import { db } from "../config/firebase.ts";
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where, } from "firebase/firestore";
import type { InjectionKey } from "vue";

import type User from "../interfaces.ts";
export interface State {
  currentUser: User;
  currentUserDbId: string;
  pagination: Pagination;
  sortAndFilter: SortAndFilter;
  Cart: Cart,
  ProductPageProduct: Object;
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
  cart: Array<CartWine>;
  total: number
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
  cart: [],
  total: 0
}

const defaultState: State = {
  currentUser: {
    uid: '',
    displayName: '',
    email: '',
    photoURL: '',
    cart: [],
  },
  currentUserDbId: '',
  pagination: defaultPagination,
  sortAndFilter: defaultSortAndFilter,
  Cart: defaultCart,
  ProductPageProduct: {}
};
interface Wine {
  id: number;
  name: string;
  location: string;
  rating: Object;
  image: string;
  price: number;
  type: string;
  favorite: boolean;
}

interface CartWine extends Wine {
  id: number;
  name: string;
  location: string;
  rating: Object;
  image: string;
  price: number;
  type: string;
  favorite: boolean;
  quantity: number;
}

if (localStorage.getItem("currentUser")) {
  defaultState.currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const usersCollection = collection(db, 'users');
  // defaultState.currentUserDbId = await getDocs(usersCollection).then((data => {
  //   return data.docs;
  // }))
}
if (localStorage.getItem("redWines")) {
  defaultState.pagination.wines = JSON.parse(localStorage.getItem("redWines") || "{}")
  defaultState.sortAndFilter.sortedAndSearchRedWines = defaultState.pagination.wines;
}
if (localStorage.getItem("currentWines")) {
  defaultState.pagination.currentWines = JSON.parse(localStorage.getItem("currentWines") || "[]")
}
if (localStorage.getItem("cart")) {
  defaultState.Cart.cart = JSON.parse(localStorage.getItem("cart") || "{}");
  let counter = 0;
  defaultState.Cart.cart.forEach((wine) => {
    counter += (wine.quantity * wine.price)
  })
  console.log(counter);
  defaultState.Cart.total = counter;
}
if (localStorage.getItem("ProductPageProduct")) {
  defaultState.ProductPageProduct = JSON.parse(localStorage.getItem("ProductPageProduct") || "{}")
  console.log(defaultState.ProductPageProduct)
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
    async setUserCart(state: State) {
      state.currentUser.cart = state.Cart.cart;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      try {
        const userDoc = doc(db, 'users', where('uid', '==', state.currentUser.uid));
        await updateDoc(userDoc, { cart: state.Cart.cart })
        console.log(state.Cart.cart);
      } catch (e) {
        console.log(e)
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
    toggleFavorite(state: State, Id: any) {
      state.pagination.wines = [...state.pagination.wines].map((wine: Wine) => {
        if (wine.id == Id) {
          console.log(wine.favorite)
          console.log(!wine.favorite);
          return { ...wine, favorite: !wine.favorite }
        }
        else {
          return wine
        }
      })
      if (state.pagination.wines[0].type == 'red') {
        localStorage.setItem("redWines", JSON.stringify(state.pagination.wines))
      }
      else if (state.pagination.wines[0].type == 'white') {
        localStorage.setItem("whiteWines", JSON.stringify(state.pagination.wines))
      } else if (state.pagination.wines[0].type == 'rose') {
        localStorage.setItem("roseWines", JSON.stringify(state.pagination.wines))
      }
    },
    toggleFavoriteInCart(state: State, outerWine: CartWine) {
      state.Cart.cart = [...state.Cart.cart].map((wine: CartWine) => {
        if (wine.id == outerWine.id) {
          return { ...wine, favorite: !wine.favorite }
        }
        else {
          return wine;
        }
      })
      localStorage.setItem("cart", JSON.stringify(state.Cart.cart));

      if (outerWine.type == 'red') {
        localStorage.setItem("redWines", JSON.stringify([...JSON.parse(localStorage.getItem('redWines') || "{}")].map((wine: Wine) => {
          if (wine.id == outerWine.id) {

            return { ...wine, favorite: !wine.favorite }
          }
          else {
            return wine
          }
        })))
      }
      else if (outerWine.type == 'white') {
        localStorage.setItem("whiteWines", JSON.stringify(state.pagination.wines))
      } else if (outerWine.type == 'rose') {
        localStorage.setItem("roseWines", JSON.stringify(state.pagination.wines))
      }
    }
    , toggleFavoriteInMain(state: State, outerWine: Wine) {
      if (outerWine.type == 'red') {
        localStorage.setItem('redWines', JSON.stringify(JSON.parse(localStorage.getItem('redWines') || "[]").map((wine: Wine) => {
          if (wine.id == outerWine.id) {
            return { ...outerWine, favorite: !outerWine.favorite }
          }
          else {
            return wine
          }
        })))
      } else if (outerWine.type == 'white') {
        localStorage.setItem('whiteWines', JSON.stringify(JSON.parse(localStorage.getItem('whiteWines') || "[]").map((wine: Wine) => {
          if (wine.id == outerWine.id) {
            return { ...outerWine, favorite: !outerWine.favorite }
          }
          else {
            return wine
          }
        })))
      } else if (outerWine.type == 'rose') {
        localStorage.setItem('roseWines', JSON.stringify(JSON.parse(localStorage.getItem('roseWines') || "[]").map((wine: Wine) => {
          if (wine.id == outerWine.id) {
            return { ...outerWine, favorite: !outerWine.favorite }
          }
          else {
            return wine
          }
        })))
      }
    }
    , setSearchText(state: State, newSearch: string) {
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
    setCartQuantityById(state: State, { Id, newQ }: { Id: any, newQ: number }) {
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

    },
    setTotal(state: State) {
      let counter = 0;
      state.Cart.cart.forEach((wine) => {
        counter += (wine.quantity * wine.price)
      })
      console.log(counter)
      state.Cart.total = counter;
    },
    async removeCart(state: State) {
      state.Cart.cart = []
      localStorage.removeItem('cart')
      const userDoc = doc(db, 'users', state.currentUser.uid)
      await updateDoc(userDoc, { cart: [] })
    },
    removeFromCartById(state: State, Id: any) {
      state.Cart.cart = state.Cart.cart.filter(wine => {
        if (wine.id != Id) {
          return wine;
        }
      })
    },
    setProductPageProduct(state: State, Id: any) {
      state.ProductPageProduct = state.sortAndFilter.sortedAndSearchRedWines.filter((wine) => wine.id === Id)[0];
      localStorage.setItem("ProductPageProduct", JSON.stringify(state.ProductPageProduct))
    },
    removeProductPageProduct(state: State) {
      localStorage.removeItem("ProductPageProduct")
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
            favorite: false
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
            favorite: false
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
            favorite: false
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

    },
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
