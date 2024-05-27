export interface User {
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    role: string;
}

export interface Book {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface Order {
    id: string;
    address: string;
    status: string;
    total: number;
    creationDate: string;
}