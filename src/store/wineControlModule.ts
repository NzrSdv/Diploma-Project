import { db } from "@/config/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";


import type { Pagination, SortAndFilter, WineControl, Wine } from "./types";
// interfaces

export type AllKey = "id" | "wine" | "winery" | "location" | "type" | "average" | "reviews" | "price" | "favorite";

// default states
const defaultPagination: Pagination = {
    currentPage: 0,
    wines: [],
    currentWines: [],
    onePageMax: 20,
}
const defaultSortAndFilter: SortAndFilter = {
    sortedAndSearchWines: [],
    searchText: '',
    filterKey: 'wine',
    ascending: 'true'
}
const defaultWineControl: WineControl = {
    pagination: defaultPagination,
    sortAndFilter: defaultSortAndFilter,
    pageWine: {
        id: '',
        wine: '',
        winery: '',
        location: '',
        rating: {},
        image: '',
        price: 0,
        type: '',
        favorite: false
    }
}

// local storage pulls
if (localStorage.getItem("redWines")) {
    defaultPagination.currentWines = JSON.parse(localStorage.getItem("redWines") || "[]")
    defaultSortAndFilter.sortedAndSearchWines = JSON.parse(localStorage.getItem("redWines") || "[]");

}
if (localStorage.getItem("currentWines")) {
    defaultPagination.currentWines = JSON.parse(localStorage.getItem("currentWines") || "[]")
}
if (localStorage.getItem("pageWine")) {
    defaultWineControl.pageWine = JSON.parse(localStorage.getItem("pageWine") || "{}")
    console.log(defaultWineControl.pageWine)
}

// pagination + sort + filtration

export const WineControlModule = {
    state: () => (defaultWineControl),
    mutations: {
        // set Wines default/current
        setRedWines(state: WineControl, redWines: Array<Wine>) {
            state.pagination.wines = redWines;

            localStorage.setItem("redWines", JSON.stringify(redWines));
        },
        setWhiteWines(state: WineControl, whiteWines: Array<Wine>) {
            state.pagination.wines = whiteWines;

            localStorage.setItem("whiteWines", JSON.stringify(whiteWines));
        },
        setRoseWines(state: WineControl, roseWines: Array<Wine>) {
            state.pagination.wines = roseWines;

            localStorage.setItem("roseWines", JSON.stringify(roseWines))
        },
        setCurrentWines(state: WineControl) {
            state.pagination.currentWines = state.sortAndFilter.sortedAndSearchWines.slice(state.pagination.onePageMax * (state.pagination.currentPage - 1), state.pagination.onePageMax * state.pagination.currentPage)
            localStorage.setItem("currentWines", JSON.stringify(state.pagination.currentWines));
        },


        // set pagination sort and filter
        setCurrentPage(state: WineControl, newPage: number) {
            state.pagination.currentPage = newPage;
        },
        setSortedAndSearched(state: WineControl) {
            state.sortAndFilter.sortedAndSearchWines.sort(sortByKey(state.sortAndFilter.filterKey, state.sortAndFilter.ascending == "true")).filter((wine: Wine) => {
                if (wine.wine.includes(state.sortAndFilter.searchText) || wine.winery.includes(state.sortAndFilter.searchText) || String(wine.price).includes(state.sortAndFilter.searchText)) {
                    return wine;
                }
            })
            console.log(state.sortAndFilter);
        },
        toggleFavorite(state: WineControl, Id: string) {
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
        setSearchText(state: WineControl, newSearch: string) {
            state.sortAndFilter.searchText = newSearch;

        },
        setFilterKey(state: WineControl, newKey: keyof Wine) {
            state.sortAndFilter.filterKey = newKey;


        },
        setAscending(state: WineControl, newState: string) {
            state.sortAndFilter.ascending = newState;
        },
        setPageWine(state: WineControl, Id: string) {
            state.pageWine = state.sortAndFilter.sortedAndSearchWines.filter((wine) => wine.id === Id)[0];
            localStorage.setItem("pageWine", JSON.stringify(state.pageWine))
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
        setCurrentPageWine({ commit }: { commit: Function }, newPage: number) {
            commit("setCurrentPage", newPage);
            commit("setSortedAndSearched")
            commit("setCurrentWines");
        },
        setWineType({ commit }: { commit: Function }, wineType: String) {
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
                    console.log("default")
                    break;
            }
            commit("setSortedAndSearched")
            commit("setCurrentWines");
        },

    }, getters: {
        getWinesPages(state: WineControl) {
            return state.sortAndFilter.sortedAndSearchWines.length;
        },
    }
}

export function sortByKey<Wine, AllKey extends keyof Wine>(
    key: AllKey,
    ascending: boolean
): (a: Wine, b: Wine) => number {
    return (a: Wine, b: Wine): number => {
        if (a[key] < b[key]) {
            return ascending ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return ascending ? 1 : -1;
        }
        return 0;
    };
}


