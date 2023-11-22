import { Guid } from "guid-typescript";
import { Product } from "./Product";
import { User } from "./User";

export interface CartItem extends Product {
    amount: number;
    orderId: Guid;
}

export interface Cart {
    id: Guid;
    orderStatus: number;
    user: User;
    orderProducts: CartItem[];
    totalAmount: number;
    totalPrice: number;
}