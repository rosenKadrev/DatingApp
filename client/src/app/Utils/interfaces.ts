export interface LoginRes {
    username: string;
    token: string;
}

export interface RegisterRes {
    username: string;
    token: string;
}

export interface LoginReq {
    username: string;
    password: string;
}

export interface User {
    id: number;
    passwordHash: string;
    passwordSalt: string;
    userName: string;
}