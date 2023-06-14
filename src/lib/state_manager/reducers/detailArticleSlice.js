import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axiosInstance";

export const getDetailArticle = createAsyncThunk(
  "get/detail_article",
  async ({ id }) => {
    const apiURL = `detail-article/${id}`;
    const response = await axiosInstance.get(apiURL);
    return response.data.data;
  }
);

const initialState = {
  data: {},
  status: "idle",
};

export const detailArticleSlice = createSlice({
  name: "detail_article",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(getDetailArticle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getDetailArticle.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const selectDetailArticleData = (state) => state.detailArticleData.data;
export const getDetailArticleStatus = (state) => state.detailArticleData.status;

export default detailArticleSlice.reducer;
