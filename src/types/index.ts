export interface MenuItem {
    name: string;
    description: string;
    price: number;
    category: string;
    info: string;
    isAvailable: boolean;
    id: number;
    images: string[];
}


export interface Category {
    name: string;
    id: number;
}

export interface Order {
    id: number;
    table_no: string;
    total: number;
    kitchen_status: string;
    finance_status: string;
    customer_name: string;
}

