import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: { app: appReducer, modal: modalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
