export interface IMenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  info: string;
  isAvailable: boolean;
  id: number;
  images: string[];
  quantity?: number;
  note?: string;
}

export interface IDrinkItem {
  name: string;
  description: string;
  price: number;
  category: string;
  containerType: string;
  isAvailable: boolean;
  id: number;
  images: string[];
  quantity?: number;
}

export interface IIventoryItem {
  name: string;
  brand: string;
  category: string;
  expiration_date: string;
  unit_of_measurement: string;
  quantity: number;
  upper_quantity_bound: number;
  lower_quantity_bound: number;
  supplier?: string;
  description: string;
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
  kitchen_status: "pending" | "ready" | "cancelled";
  finance_status: "paid" | "pending";
  customer_name: string;
  menu_items: IMenuItem[];
}

export interface IOrderRequest {
  id: number;
  table_no: string;
  total: number;
  kitchen_status: string;
  finance_status: string;
  customer_name: string;
  menu_items: IMenuItem[];
}

export interface IRentalItem {
  name: string;
  description: string;
  price: number;
  category: string;
  info: string;
  id: number;
  images: string[];
  quantity: number;
  isAvailable: boolean;
}
