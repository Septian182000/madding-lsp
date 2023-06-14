import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import articleReducer from "./reducers/articleSlice";
import detailArticleReducer from "./reducers/detailArticleSlice";

export const dataStrore = configureStore({
  reducer: {
    loginData: loginReducer,
    articleData: articleReducer,
    detailArticleData: detailArticleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
