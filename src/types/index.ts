export interface IMenuItem {
    name: string;
    description: string;
    price: number;
    category: string;
    info: string;
    isAvailable: boolean;
    id: number;
    images: string[];
}


export interface ICategory {
    name: string;
    id: number;
}

export interface IOrder {
    id: number;
    table_no: string;
    total: number;
    kitchen_status: string;
    finance_status: string;
    customer_name: string;
    menu_items: IMenuItem[]
}


export interface IOrderRequest {
    id: number;
    table_no: string;
    total: number;
    kitchen_status: string;
    finance_status: string;
    customer_name: string;
    menu_items: string[];
}

