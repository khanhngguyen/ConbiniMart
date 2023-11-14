import { Guid } from "guid-typescript";
import { Category } from "./Category";
import { Image } from "./Image";

export interface Product {
    id: Guid;
    title: string;
    description: string;
    price: number;
    category: number;
    inventory: number;
    image: Image
}

export interface ProductCreateDto {
    title: string;
    description: string;
    price: number;
    category: number;
    inventory: number;
    image: Image
}

export interface ProductUpdateDto {
    id: Guid;
    update: {
        title: string;
        description: string;
        price: number;
        category: number;
        inventory: number;
        image: Image
    }
}