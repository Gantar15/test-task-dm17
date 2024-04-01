export interface Product {
  id: number;
  title: string;
  article: string;
  quantity: number;
  price: number;
  comment?: string;
  orderId: number;
}
