import { authApi } from "./services/auth";
import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/product";
import { cartReducer } from "./reducers/cart";
import { orderApi } from "./services/orders";

export const store = configureStore({
  reducer: {
    authApi: authApi.reducer,
    productsApi: productsApi.reducer,
    orderApi: orderApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(productsApi.middleware)
      .concat(orderApi.middleware),
});
