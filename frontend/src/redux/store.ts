import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './reducers/productsReducer';
import usersReducer from './reducers/usersReducer';
import favoritesReducer from './reducers/favoritesReducer';
import cartReducer from './reducers/cartReducer';

const preloadedUser = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")!) : "";
const preloadedCartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")!) : "";
const preloadedFavItems = localStorage.getItem("favItems") ? JSON.parse(localStorage.getItem("favItems")!) : "";

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
        favoritesReducer,
        cartReducer,
        preloadedUser,
        preloadedCartItems,
        preloadedFavItems
    }
})

store.subscribe(() => {
    sessionStorage.setItem("currentUser", JSON.stringify(store.getState().usersReducer));
    localStorage.setItem("cartItems", JSON.stringify(store.getState().cartReducer));
    localStorage.setItem("favItems", JSON.stringify(store.getState().cartReducer));
})

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;