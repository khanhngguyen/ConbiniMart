import { Guid } from "guid-typescript";

export enum Role {
    Admin = "Admin",
    User = "User"
}

export interface User {
    id: Guid;
    firstName: string;
    lastname: string;
    email: string;
    avatar: string;
    password: string
    role: Role
}

export interface UserCreateDto {
    firstName: string;
    lastName: string;
    email: string;
    avatar: {
        link: string
    }
    password: string;
}

export interface UserUpdateDto {
    id: Guid;
    update: {
        firstName: string;
        lastName: string;
        email: string;
    }
}

export interface UserUpdatePassword {
    id: Guid;
    password: string,
    confirm: string
}