import { Guid } from "guid-typescript";
import { Product } from "./Product";
import { User } from "./User";

// export interface CartItem extends Product {
//     amount: number;
//     orderId: Guid;
// }

export interface CartItem {
    amount: number;
    product: Product;
}

export interface CartItemCreateDto {
    productId: Guid;
    amount: number;
}

export interface Cart {
    id: Guid;
    orderStatus: number;
    user: User;
    orderProducts: CartItem[];
    totalAmount: number;
    totalPrice: number;
}

export interface CartCreateDto {
    orderProducts: CartItemCreateDto[];
}