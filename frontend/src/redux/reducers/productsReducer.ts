import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { Product, ProductCreateDto, ProductUpdateDto } from "../../types/Product";
import { Category } from "../../types/Category";
import { QueryOptions } from "../../types/QueryOptions";

const initialState: {
    products: Product[],
    categories: Category[],
    product?: Product,
    loading: boolean,
    error: string
} = {
    products : [],
    categories: [],
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
    async (query: QueryOptions | undefined) => {
        try {
            if (query)
            {
                const response = await axios.get<Product[]>(`${baseURL}/products`, { params: query });
                return response.data;
            } else {
                const response = await axios.get<Product[]>(`${baseURL}/products`);
                return response.data;
            }
            // const response = await axios.get<Product[]>(`${baseURL}/products`, { params: query });
            // return response.data;
        } catch (e) {
            const error = e as AxiosError;
            console.log(error.code! + error.status + error.message);
            return error;
        }
    }
)

export const fetchProductsByCategory = createAsyncThunk(
    'fetchProductsByCategory',
    async (category: string) => {
        // const query = { ...defaultQuery, category: category } as Partial<QueryOptions>;
        // delete query["search"];
        const query = { category: category };
        try {
            const response = await axios.get<Product[]>(`${baseURL}/products`, 
            {
                params: query
            });
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

            localStorage.setItem("productId", response.data.id.toString());

            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const createNewProduct = createAsyncThunk(
    'createNewProduct',
    async (newProduct : ProductCreateDto) => {
        try {
            // const token = localStorage.getItem("token");
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${baseURL}/products`,
                newProduct,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const updateProduct = createAsyncThunk(
    'updateProduct',
    async (update : ProductUpdateDto) => {
        try {
            // const token = localStorage.getItem("token");
            const token = sessionStorage.getItem("token");
            const response = await axios.patch(`${baseURL}/products/${update.id}`,
                update.update,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'deleteProduct',
    async (id : string) => {
        try {
            // const token = localStorage.getItem("token");
            const token = sessionStorage.getItem("token");
            const response = await axios.delete(`${baseURL}/products/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return { response: response.data, id: id };
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
            state.loading = false;
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
            } else {
                state.products = action.payload;
                console.log(action.payload);
            }
            state.loading = false;
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
                console.log(action.payload);
            }
            state.loading = false;
        })
        .addCase(fetchOneProductById.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchOneProductById.rejected, (state) => {
            state.error = "can not load product";
            state.loading = false;
        })
        .addCase(createNewProduct.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError)
            {
                state.error = action.payload.message;
            } else {
                state.products.push(action.payload);
                state.error = "";
                alert(`${action.payload.title} has been created successfully`);
            }
            state.loading = false;
        })
        .addCase(createNewProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(createNewProduct.rejected, (state) => {
            state.error = "can not create new product";
            state.loading = false;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError)
            {
                state.error = action.payload.message;
            } else {
                const updatedProducts = state.products.map(p => {
                    if (p.id === action.payload.id) {
                        return { ...p, ...action.payload };
                    }
                    return p;
                })
                state.products = updatedProducts;
                alert(`${action.payload.title} has been updated successfully, reload page to see changes`);
            }
            state.loading = false;
        })
        .addCase(updateProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateProduct.rejected, (state) => {
            state.error = "can not update product";
            state.loading = false;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError)
            {
                state.error = action.payload.message;
            } else {
                const isDeleted = action.payload.response;
                if (isDeleted) {
                    const deleteProductId = action.payload.id;
                    state.products = state.products.filter(
                        p => p.id.toString() !== deleteProductId
                    );
                    alert(`Product with Id: ${action.payload.id} has been deleted successfully`);

                } else {
                    alert("Invalid Id, please try another Id");
                }
            }
            state.loading = false;
        })
        .addCase(deleteProduct.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteProduct.rejected, (state) => {
            state.error = "can not delete product";
            state.loading = false;
        })
        .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError)
            {
                state.error = action.payload.message;
                state.products = [];
            } else {
                state.products = action.payload;
                console.log(action.payload);
            }
            state.loading = false;
        })
        .addCase(fetchProductsByCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProductsByCategory.rejected, (state) => {
            state.error = "can not fetch products";
            state.loading = false;
        })
    }
})

const productsReducer = productsSlice.reducer;
export default productsReducer;