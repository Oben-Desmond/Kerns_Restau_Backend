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

export interface IInventoryItem {
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

export interface IPurchaseOrder {
  id: string;
  item_name: string;
  item_id: string;
  supplier: string;
  quantity: number;
  purchase_cost: number;
  purchase_date: string;
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

export interface IRentalOrder {
  id: number;
  customer_name: string;
  customer_id_number: number;
  rental_agreement: string;
  total: number;
  rental_status: "still out" | "returned";
  finance_status: "paid" | "pending";
  rental_date: string;
  return_date: string;
  rental_items: IRentalItem[];
}

export interface IUser {
  name: string;
  phoneNumber: string;
  password: string;
  lastLogin: string;
  //  jwt token refresh after 12AM everyday
  joken: string;
  role: "admin" | "waiter" | "finance" | "inventory" | "rental" | "kitchen";
  id: number;
  status: "active" | "disabled";
}

// Table for user logs
export interface IUserLogTable {
  id: string;
  description: string;
  category: "auth" | "mutation";
  user: IUser;
}

interface INotification {
  id: string;
  source: string;
  destination: string;
  message: string;
  type: "order" | "menu" | "rental";
  type_id: string;
  titles: string;
  is_read: string[];
}
