import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "@/lib/features/cart/checkoutReducer";
import paymentReducer from "./features/payment/paymentReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      checkoutReducer,
      paymentReducer,
    },
  });
};
