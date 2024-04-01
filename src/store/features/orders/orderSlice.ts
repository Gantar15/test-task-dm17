import { Order } from "@/shared/models/order";
import { OrderStatus } from "../../../shared/models/order";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
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
