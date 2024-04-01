export interface Order {
  id: number;
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
}

export type OrderStatus = "Created" | "Completed" | "Cancelled";
