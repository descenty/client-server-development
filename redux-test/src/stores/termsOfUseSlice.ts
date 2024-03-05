import { createSlice } from "@reduxjs/toolkit";

export const termsOfUseSlice = createSlice({
  name: "termsOfUse",
  initialState: {
    isOpen: true,
  },
  reducers: {
    setOpened: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpened } = termsOfUseSlice.actions;

export default termsOfUseSlice.reducer;
