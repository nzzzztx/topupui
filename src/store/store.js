import { configureStore } from "@reduxjs/toolkit";
import syaratKetentuanReducer from "./syaratKetentuanSlice";

export const store = configureStore({
  reducer: {
    syaratKetentuan: syaratKetentuanReducer,
  },
});
