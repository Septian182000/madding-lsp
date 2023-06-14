import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axiosInstance";

export const getArticle = createAsyncThunk(
  "get/article",
  async ({ search }) => {
    const apiURL = "article";
    const request = `?search=${search}`;

    if (search) {
      const response = await axiosInstance.get(apiURL + request);
      return response.data;
    }

    const response = await axiosInstance.get(apiURL);
    return response.data;
  }
);

export const storeArticle = createAsyncThunk(
  "post/article",
  async ({ newData, rejectedWithValue }) => {
    try {
      const apiURL = "article/create";
      const response = await axiosInstance.post(apiURL, newData);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const editArticle = createAsyncThunk(
  "edit/article",
  async ({ id, newData, rejectedWithValue }) => {
    try {
      const apiURL = `article/update/${id}`;
      const response = await axiosInstance.put(apiURL, newData);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "delete/article",
  async ({ id, rejectedWithValue }) => {
    try {
      const apiURL = `article/delete/${id}`;
      const response = await axiosInstance.delete(apiURL);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

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
      })
      .addCase(storeArticle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(storeArticle.rejected, (state) => {
        state.status = "failed store";
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(deleteArticle.rejected, (state) => {
        state.status = "failed delete";
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(editArticle.rejected, (state) => {
        state.status = "failed edit";
      });
  },
});

export const selectArticleData = (state) => state.articleData.data;
export const getArticleStatus = (state) => state.articleData.status;

export default articleSlice.reducer;
