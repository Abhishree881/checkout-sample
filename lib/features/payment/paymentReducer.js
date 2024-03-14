import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upiId: "",
  cardNumber: "",
  cardCvv: "",
  expiryDate: "",
  name: "",
  disable: false,
};

const paymentSlice = createSlice({
  name: "paymentReducer",
  initialState,
  reducers: {
    addUpiDetails(state, action) {
      state.upiId = action.payload;
      state.disable = true;
      state.cardNumber = "";
      state.cardCvv = "";
      state.expiryDate = "";
      state.name = "";
    },
    addCardDetails(state, action) {
      const { cardNumber, cardCvv, expiry, name } = action.payload;
      state.disable = true;
      state.cardCvv = cardCvv;
      state.cardNumber = cardNumber;
      state.expiryDate = expiry;
      state.name = name;
      state.upiId = "";
    },
    addDisable(state, action) {
      state.disable = action.payload;
    },
  },
});

export const { addUpiDetails, addCardDetails, addDisable } =
  paymentSlice.actions;

export default paymentSlice.reducer;
