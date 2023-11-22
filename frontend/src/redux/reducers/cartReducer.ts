import { createSlice } from "@reduxjs/toolkit";
import { Guid } from "guid-typescript";

import { CartItem } from "../../types/Cart";
import { User } from "../../types/User";

const initialState: {
    id?: Guid,
    orderStatus?: number,
    user?: User,
    orderProducts: CartItem[],
    totalAmount: number,
    totalPrice: number,
} = {
    orderProducts: [],
    totalAmount: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

    }
})

const cartReducer = cartSlice.reducer;
export default cartReducer;