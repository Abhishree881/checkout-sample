import { configureStore } from "@reduxjs/toolkit";
import checkoutReducer from "@/lib/features/cart/checkoutReducer";
import paymentReducer from "./features/payment/paymentReducer";
import themeReducer from "./features/theme/themeReducer";
// all the reducers combined
export const makeStore = () => {
  return configureStore({
    reducer: {
      checkoutReducer,
      paymentReducer,
      themeReducer,
    },
  });
};
