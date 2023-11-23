import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Guid } from "guid-typescript";

import { CartItem } from "../../types/Cart";
import { User } from "../../types/User";
import { Product } from "../../types/Product";

const initialState: {
    id?: Guid,
    orderStatus?: number,
    user?: User,
    items: CartItem[],
    totalAmount: number,
    totalPrice: number,
} = {
    items: [],
    totalAmount: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const isExisted = state.items.find(i => i.id === action.payload.id);
            if (isExisted) {
                isExisted.amount++;
                state.totalPrice += isExisted.price * isExisted.amount;
            } else {
                const item: CartItem = {
                    ...action.payload,
                    amount: 1,
                    orderId: Guid.create()
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
            const isExisted = state.items.find(i => i.id === action.payload.id);
            if (!isExisted) return;
            else {
                const productIndex = state.items.findIndex(p => p.id === action.payload.id);
                state.items.splice(productIndex, 1);
                state.totalAmount -= isExisted.amount;
                state.totalPrice -= isExisted.amount * isExisted.price
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
            const isExisted = state.items.find(i => i.id === action.payload);
            if (isExisted && isExisted.amount < isExisted.inventory) {
                isExisted.amount++;
                state.totalAmount++;
                state.totalPrice += isExisted.price;
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
            const isExisted = state.items.find(i => i.id === action.payload);
            if (isExisted) {
                if (isExisted.amount === 1) {
                    state.items = state.items.filter(i => i.id !== action.payload);
                } else {
                    isExisted.amount--;
                }
                state.totalAmount--;
                state.totalPrice -= isExisted.price;
            } else {
                return;
            }

            localStorage.setItem("cartItems", JSON.stringify({
                items: state.items,
                totalAmount: state.totalAmount,
                totalPrice: state.totalPrice
            }));
        }
    }
})

export const { addToCart, removeFromCart, emptyCart, increaseAmount, decreaseAmount } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;