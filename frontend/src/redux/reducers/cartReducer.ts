import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Guid } from "guid-typescript";
import axios, { AxiosError } from "axios";

import { Cart, CartCreateDto, CartItem } from "../../types/Cart";
import { User } from "../../types/User";
import { Product } from "../../types/Product";

const initialState: {
    id?: Guid,
    orderStatus?: number,
    user?: User,
    items: CartItem[],
    totalAmount: number,
    totalPrice: number,
    orders: Cart[],
    loading: boolean,
    error: string
} = {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    orders: [],
    loading: false,
    error: ''
}

const baseURL = "https://fs15kim-ecommerce-backend.azurewebsites.net/api/v1";

export const placeOrder = createAsyncThunk(
    'placeOrder',
    async (order : CartCreateDto) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(`${baseURL}/orders`,
                order,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const fetchAllOrderByUserId = createAsyncThunk(
    'fetchAllOrdersByUderId',
    async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get<Cart[]>(`${baseURL}/orders/all`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const isExisted = state.items.find(i => i.product.id === action.payload.id);
            if (isExisted) {
                isExisted.amount++;
                state.totalPrice += isExisted.product.price * isExisted.amount;
            } else {
                const item: CartItem = {
                    product: action.payload,
                    amount: 1,
                    // orderId: Guid.create()
                };
                state.items.push(item);
                state.totalPrice += action.payload.price;
            }
            state.totalAmount++;
            // state.totalPrice += (isExisted?.amount * isExisted?.price)

            localStorage.setItem("cartItems", JSON.stringify({
                items: state.items,
                totalAmount: state.totalAmount,
                totalPrice: state.totalPrice
            }));
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            const isExisted = state.items.find(i => i.product.id === action.payload.id);
            if (!isExisted) return;
            else {
                const productIndex = state.items.findIndex(p => p.product.id === action.payload.id);
                state.items.splice(productIndex, 1);
                state.totalAmount -= isExisted.amount;
                state.totalPrice -= isExisted.amount * isExisted.product.price
            }

            localStorage.setItem("cartItems", JSON.stringify({
                items: state.items,
                totalAmount: state.totalAmount,
                totalPrice: state.totalPrice
            }));
        },
        emptyCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.totalPrice = 0;

            localStorage.removeItem("cartItems");
        },
        increaseAmount: (state, action: PayloadAction<Guid>) => {
            const isExisted = state.items.find(i => i.product.id === action.payload);
            if (isExisted && isExisted.amount < isExisted.product.inventory) {
                isExisted.amount++;
                state.totalAmount++;
                state.totalPrice += isExisted.product.price;
            } else {
                alert("Can not add into cart, item is not available anymore in inventory");
            }

            localStorage.setItem("cartItems", JSON.stringify({
                items: state.items,
                totalAmount: state.totalAmount,
                totalPrice: state.totalPrice
            }));
        },
        decreaseAmount: (state, action: PayloadAction<Guid>) => {
            const isExisted = state.items.find(i => i.product.id === action.payload);
            if (isExisted) {
                if (isExisted.amount === 1) {
                    state.items = state.items.filter(i => i.product.id !== action.payload);
                } else {
                    isExisted.amount--;
                }
                state.totalAmount--;
                state.totalPrice -= isExisted.product.price;
            } else {
                return;
            }

            localStorage.setItem("cartItems", JSON.stringify({
                items: state.items,
                totalAmount: state.totalAmount,
                totalPrice: state.totalPrice
            }));
        },
        addToCartWithAmount: (state, action: PayloadAction<CartItem>) => {
            const isExisted = state.items.find(i => i.product.id === action.payload.product.id);
            if (isExisted) {
                isExisted.amount += action.payload.amount;
                state.totalPrice += isExisted.product.price * isExisted.amount;
            } else {
                // const item: CartItem = {
                //     product: action.payload.product,
                //     amount: action.payload.amount,
                //     // orderId: Guid.create()
                // };
                // const item: CartItem = action.payload;
                state.items.push(action.payload);
                state.totalPrice += action.payload.product.price * action.payload.amount;
            }
            state.totalAmount += action.payload.amount;

            localStorage.setItem("cartItems", JSON.stringify({
                items: state.items,
                totalAmount: state.totalAmount,
                totalPrice: state.totalPrice
            }));
        }
    },
    extraReducers: (build) => {
        build.addCase(placeOrder.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                state.orders.push(action.payload);
                state.items = [];
                state.totalAmount = 0;
                state.totalPrice = 0;
                alert("New order has been placed");
            }
            state.loading = false;
            // console.log("place order fulfilled");
            state.items = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
            alert("New order has been placed, go to Profile --> Orders to see all orders");
        })
        .addCase(placeOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(placeOrder.rejected, (state) => {
            state.error = "Can not place order";
            state.loading = false;
        })
        .addCase(fetchAllOrderByUserId.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                state.orders = action.payload;
                // console.log(state.orders);
            }
            state.loading = false;
        })
        .addCase(fetchAllOrderByUserId.pending, (state) => {
            state.loading = false;
        })
        .addCase(fetchAllOrderByUserId.rejected, (state) => {
            state.error = "Can not fetch orders";
            state.loading = false;
        })
    }
})

export const { 
    addToCart, 
    removeFromCart, 
    emptyCart, 
    increaseAmount, 
    decreaseAmount,
    addToCartWithAmount
} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;