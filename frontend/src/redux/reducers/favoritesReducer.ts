import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";

const initialState: {
    favProducts: Product[],
    totalFavorites: number
} = {
    favProducts: [],
    totalFavorites: 0
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<Product>) => {
            const isExisted = state.favProducts.find(p => p.id === action.payload.id);
            if (isExisted) return;
            else {
                state.favProducts.push(action.payload);
                state.totalFavorites++;
            }

            localStorage.setItem("favItems", JSON.stringify({
                items: state.favProducts
            }));
        },
        removeFromFavorites: (state, action: PayloadAction<Product>) => {
            const isExisted = state.favProducts.find(p => p.id === action.payload.id);
            if (!isExisted) return;
            else {
                const productIndex = state.favProducts.findIndex(p => p.id === action.payload.id);
                state.favProducts.splice(productIndex, 1);
                state.totalFavorites--;
            }

            localStorage.setItem("favItems", JSON.stringify({
                items: state.favProducts
            }));
        },
        emptyFavorites: (state) => {
            state.favProducts = [];
            state.totalFavorites = 0;

            localStorage.removeItem("favItems");
        }
    }
})

export const { addToFavorites, removeFromFavorites, emptyFavorites } = favoritesSlice.actions;
const favoritesReducer = favoritesSlice.reducer;
export default favoritesReducer;