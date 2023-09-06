import { Guid } from "guid-typescript";
import { Category } from "./Category";

export interface Product {
    id: Guid;
    title: string;
    description: string;
    price: number;
    category: Category;
    inventory: number;
}

export interface ProductCreateDto {
    title: string;
    description: string;
    price: number;
    category: Category;
    inventory: number;
}