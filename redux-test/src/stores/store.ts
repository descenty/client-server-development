import { configureStore } from "@reduxjs/toolkit";
import termsOfUseReducer from "./termsOfUseSlice";

export const store = configureStore({
  reducer: {
    termsOfUse: termsOfUseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
