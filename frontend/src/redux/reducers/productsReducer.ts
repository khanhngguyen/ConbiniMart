import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";
import { Category } from "../../types/Category";

const initialState: {
    products: Product[],
    categories: Category[],
    loading: boolean,
    error: string
} = {
    products : [],
    categories: [],
    loading: false,
    error: ''
}

export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async () => {
        try {
            const response = await axios.get<Category[]>('https://kim-fs15-ecommerce-backend.azurewebsites.net/api/v1/category');
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const fetchAllProducts = createAsyncThunk(
    'fetchAllProducts',
    async () => {
        try {
            const response = await axios.get<Product[]>('https://kim-fs15-ecommerce-backend.azurewebsites.net/api/v1/products');
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addCase(fetchCategories.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
                state.categories = [];
            } else {
                state.categories = action.payload;
                console.log(action.payload);
            }
        })
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCategories.rejected, (state) => {
            state.error = "can not fetch categories";
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError)
            {
                state.error = action.payload.message;
            } else {
                state.products = action.payload;
                console.log(action.payload);
            }
        })
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllProducts.rejected, (state) => {
            state.error = "can not fetch products";
        })
    }
})

const productsReducer = productsSlice.reducer;
export default productsReducer;