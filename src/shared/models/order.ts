export interface Order {
  id: string;
  client: string;
  phoneNumber: string;
  status: OrderStatus;
  date: string;
  address: string;
  quantity: number;
  productsPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  comment?: string;
  products: number[];
}

export type OrderStatus = "Created" | "Completed" | "Cancelled";
