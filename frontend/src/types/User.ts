import { Guid } from "guid-typescript";

export enum Role {
    Admin = "Admin",
    User = "User"
}

export interface User {
    id: Guid,
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    password: string;
    role: Role
}

export interface UserCreateDto {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    password: string;
}

export interface UserUpdateDto {
    firstName: string;
    lastName: string;
    email: string;
}