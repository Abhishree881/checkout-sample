import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: [],
  merchantLogo: "",
  merchantName: "",
  darkTheme: false,
};

const themeSlice = createSlice({
  name: "themeReducer",
  initialState,
  reducers: {
    addTheme(state, action) {
      // store the data from api
      state.theme = action.payload;
    },
    addMerchant(state, action) {
      // add logo and name
      const { merchantName, merchantLogo } = action.payload;
      state.merchantLogo = merchantLogo;
      state.merchantName = merchantName;
    },
    setTheme(state, action) {
      // set dark theme true or false
      state.darkTheme = action.payload;
    },
  },
});

export const { addTheme, addMerchant, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
