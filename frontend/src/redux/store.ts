import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/productsReducer';
import usersReducer from './reducers/usersReducer';

const preloadedState = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")!) : ""

const store = configureStore({
    reducer: {
        productsReducer,
        usersReducer,
        preloadedState
    }
})

store.subscribe(() => {
    sessionStorage.setItem("currentUser", JSON.stringify(store.getState().usersReducer));
})

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;