import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "@/lib/features/cart/checkoutReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      checkoutReducer,
    },
  });
};
