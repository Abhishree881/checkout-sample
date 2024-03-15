import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upiId: "",
  cardNumber: "",
  cardCvv: "",
  expiryDate: "",
  name: "",
};

const paymentSlice = createSlice({
  name: "paymentReducer",
  initialState,
  reducers: {
    addUpiDetails(state, action) {
      // if upi details are added remove card details
      state.upiId = action.payload;
      state.cardNumber = "";
      state.cardCvv = "";
      state.expiryDate = "";
      state.name = "";
    },
    addCardDetails(state, action) {
      // if card details are added remove upi details
      const { cardNumber, cardCvv, expiry, name } = action.payload;
      state.cardCvv = cardCvv;
      state.cardNumber = cardNumber;
      state.expiryDate = expiry;
      state.name = name;
      state.upiId = "";
    },
  },
});

export const { addUpiDetails, addCardDetails } = paymentSlice.actions;

export default paymentSlice.reducer;
