import { createSlice } from "@reduxjs/toolkit";

const initialUserAgree = () => {
  const userAgree = localStorage.getItem("user_agree");
  if (userAgree) return JSON.parse(userAgree);
  return false;
};

export const termsOfUseSlice = createSlice({
  name: "termsOfUse",
  initialState: {
    userAgree: initialUserAgree(),
  },
  reducers: {
    setUserAgree: (state, action) => {
      state.userAgree = action.payload;
      localStorage.setItem("user_agree", action.payload.toString());
    },
  },
});

export const { setUserAgree } = termsOfUseSlice.actions;

export default termsOfUseSlice.reducer;
