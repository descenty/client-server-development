import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppUser } from "../schemas";

const initialUser = (): AppUser | null => {
  const userData = localStorage.getItem("user");
  if (userData) return JSON.parse(userData);
  return null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: initialUser(),
  },
  reducers: {
    setUser: (state, action: PayloadAction<AppUser | null>) => {
      state.data = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
