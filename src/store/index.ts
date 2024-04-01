import { persistReducer, persistStore } from "redux-persist";

import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./features/orders/orderSlice";
import productReducer from "./features/products/productSlice";
import storage from "redux-persist/lib/storage";

const persistOrderConfig = {
  key: "orders",
  version: 1,
  storage,
};

const persistedOrderReducer = persistReducer(persistOrderConfig, orderReducer);

export const store = configureStore({
  reducer: {
    orders: persistedOrderReducer,
    products: productReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
