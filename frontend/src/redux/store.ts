import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './reducers/productsReducer';
import usersReducer from './reducers/usersReducer';
import favoritesReducer from './reducers/favoritesReducer';
import cartReducer from './reducers/cartReducer';

const preloadedState = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")!) : ""

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
        favoritesReducer,
        cartReducer,
        preloadedState
    }
})

store.subscribe(() => {
    sessionStorage.setItem("currentUser", JSON.stringify(store.getState().usersReducer));
})

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;