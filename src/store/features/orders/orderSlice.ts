import { Order } from "@/shared/models/order";
import { OrderStatus } from "../../../shared/models/order";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [
    {
      id: 12345,
      client: "John Doe",
      phoneNumber: "123-456-7890",
      status: "Created",
      date: "2022.01.01",
      address: "123 Main Street",
      quantity: 2,
      productsPrice: 50.0,
      deliveryPrice: 5.0,
      totalPrice: 55.0,
      comment: "Please deliver by tomorrow.",
    },
  ],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: number; status: OrderStatus }>
    ) => {
      const order = state.orders.find(
        (order) => order.id === action.payload.id
      );
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
