
export interface User {
    id: number;
    name: string;
    password: string;
    email: string;
    role: string;
    date: string;
}

export interface LoginInfo {
    username: string;
    password: string;
    role: string;
}

export interface Register {
    username: string;
    password: string;
    email: string;
    role: string;
}