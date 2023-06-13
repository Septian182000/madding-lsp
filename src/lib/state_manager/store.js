import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./reducers/articleSlice";

export const dataStrore = configureStore({
  reducer: {
    articleData: articleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
