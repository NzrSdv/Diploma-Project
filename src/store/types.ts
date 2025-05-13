export interface Pagination {
    currentPage: number;
    wines: Array<Wine>;
    currentWines: Array<Wine>;
    onePageMax: number;
}
export interface Wine {
    id: string;
    wine: string;
    winery: string;
    location: string;
    rating: Rating;
    image: string;
    price: number;
    type: string;
    favorite: boolean;
}
export interface Rating {
    average: number;
    reviews: string;
}
export interface CartWine extends Wine {
    id: string;
    wine: string;
    winery: string;
    location: string;
    rating: Rating;
    image: string;
    price: number;
    type: string;
    favorite: boolean;
    quantity: number;
}
export interface SortAndFilter {
    sortedAndSearchWines: Array<Wine>;
    searchText: string;
    filterKey: keyof Wine;
    ascending: string;
}
export interface WineControl {
    pagination: Pagination;
    sortAndFilter: SortAndFilter;
    pageWine: Wine
}
export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    cart: Array<CartWine>;
}
export interface UserControl {
    currentUser: User;
}
export interface CartModule {
    cart: Array<CartWine>;
    total: number
}
