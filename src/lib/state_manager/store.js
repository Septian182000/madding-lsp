import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import articleReducer from "./reducers/articleSlice";
import detailArticleReducer from "./reducers/detailArticleSlice";
import comentarReducer from "./reducers/comentarSlice";

export const dataStrore = configureStore({
  reducer: {
    loginData: loginReducer,
    articleData: articleReducer,
    detailArticleData: detailArticleReducer,
    commentsData: comentarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
