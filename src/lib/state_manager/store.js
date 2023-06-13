import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./reducers/articleSlice";
import loginReducer from "./reducers/loginSlice";

export const dataStrore = configureStore({
  reducer: {
    articleData: articleReducer,
    loginData: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
