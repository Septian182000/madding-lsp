import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axiosInstance";

export const getArticle = createAsyncThunk("get/article", async () => {
  const apiURL = "article";
  const response = await axiosInstance(apiURL);
  return response.data;
});

const initialState = {
  data: {},
  status: "idle",
};

export const articleSlice = createSlice({
  name: "article",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(getArticle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getArticle.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const selectArticleData = (state) => state.articleData.data;
export const getArticleStatus = (state) => state.articleData.status;

export default articleSlice.reducer;
