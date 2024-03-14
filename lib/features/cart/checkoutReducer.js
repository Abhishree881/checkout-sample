import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  paymentMethods: [],
  totalRawAmount: 0,
  totalPayableAmount: 0,
  discount: 0,
  deliveryCharge: 0,
  paymentType: null,
};

const cartSlice = createSlice({
  name: "checkoutReducer",
  initialState,
  reducers: {
    addCartProducts(state, action) {
      state.cartProducts = action.payload;
      state.totalRawAmount = calculateTotalRawAmount(action.payload);
      if (state.cartProducts.length !== 0) state.deliveryCharge = 10;
      state.totalPayableAmount = calculateTotalPayableAmount(
        state.totalRawAmount,
        state.discount,
        state.deliveryCharge
      );
    },
    addPaymentMethods(state, action) {
      state.paymentMethods = action.payload;
    },
    increaseQuantity(state, action) {
      const { id } = action.payload;
      const product = state.cartProducts.find((item) => item.id === id);
      if (product) {
        product.quantity += 1;
        state.totalRawAmount += product.price;
        state.totalPayableAmount += product.price;
      }
    },
    decreaseQuantity(state, action) {
      const { id } = action.payload;
      const product = state.cartProducts.find((item) => item.id === id);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
        state.totalRawAmount -= product.price;
        state.totalPayableAmount -= product.price;
        if (product.quantity === 0) {
          state.cartProducts = state.cartProducts.filter(
            (item) => item.id !== id
          );
        }
        if (state.cartProducts.length === 0) {
          state.deliveryCharge = 0;
          state.discount = 0;
          state.totalRawAmount = 0;
          state.totalPayableAmount = 0;
        }
      }
    },
    removeProduct(state, action) {
      const { id, price, quantity } = action.payload;
      state.cartProducts = state.cartProducts.filter((item) => item.id !== id);
      state.totalRawAmount -= price * quantity;
      state.totalPayableAmount -= price * quantity;
      if (state.cartProducts.length === 0) {
        state.deliveryCharge = 0;
        state.discount = 0;
        state.totalPayableAmount = 0;
      }
    },
    updateDiscount(state, action) {
      state.discount = action.payload;
      state.totalPayableAmount =
        state.totalRawAmount - action.payload + state.deliveryCharge;
    },
    updateDeliveryCharge(state, action) {
      state.deliveryCharge = action.payload;
      state.totalPayableAmount =
        state.totalRawAmount + state.discount - action.payload;
    },
    updatePaymentType(state, action) {
      state.paymentType = action.payload;
    },
  },
});

const calculateTotalRawAmount = (cartProducts) => {
  return cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

const calculateTotalPayableAmount = (
  totalRawAmount,
  discount,
  deliveryCharge
) => {
  return totalRawAmount + deliveryCharge - discount;
};

export const {
  addCartProducts,
  addPaymentMethods,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  updateDeliveryCharge,
  updateDiscount,
  updatePaymentType,
} = cartSlice.actions;

export default cartSlice.reducer;
