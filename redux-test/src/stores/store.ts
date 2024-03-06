import { configureStore } from "@reduxjs/toolkit";
import termsOfUseReducer from "./termsOfUseSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    termsOfUse: termsOfUseReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
