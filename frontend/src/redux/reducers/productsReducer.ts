import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";
import { Category } from "../../types/Category";

const initialState: {
    products: Product[],
    categories: Category[],
    product?: Product,
    loading: boolean,
    error: string
} = {
    products : [],
    categories: [],
    product: undefined,
    loading: false,
    error: ''
}

const baseURL = "https://fs15kim-ecommerce-backend.azurewebsites.net/api/v1";

export const fetchCategories = createAsyncThunk(
    'fetchCategories',
    async () => {
        try {
            const response = await axios.get<Category[]>(`${baseURL}/category`);
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
            const response = await axios.get<Product[]>(`${baseURL}/products`);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            console.log(error.code! + error.status + error.message);
            return error;
        }
    }
)

export const fetchOneProductById = createAsyncThunk(
    'fetchOneProductById',
    async (id: string) => {
        try {
            const response = await axios.get<Product>(`${baseURL}/products/${id}`);
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
                state.loading = false;
                console.log(action.payload);
            }
        })
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchCategories.rejected, (state) => {
            state.error = "can not fetch categories";
            state.loading = false;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError)
            {
                state.error = action.payload.message;
                state.products = [];
                state.loading = false;
            } else {
                state.products = action.payload;
                state.loading = false;
                console.log(action.payload);
            }
        })
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllProducts.rejected, (state) => {
            state.error = "can not fetch products";
            state.loading = false;
        })
        .addCase(fetchOneProductById.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError)
            {
                state.error = action.payload.message;
            } else {
                state.product = action.payload;
                state.loading = false;
            }
        })
        .addCase(fetchOneProductById.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchOneProductById.rejected, (state) => {
            state.error = "can not load product";
            state.loading = false;
        })
    }
})

const productsReducer = productsSlice.reducer;
export default productsReducer;