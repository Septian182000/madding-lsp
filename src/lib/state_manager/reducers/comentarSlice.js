import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axiosInstance";

export const getComments = createAsyncThunk("get/comments", async ({ id }) => {
  const apiURL = `comments/${id}`;
  const response = await axiosInstance.get(apiURL);
  return response.data;
});

export const storeComment = createAsyncThunk(
  "post/comment",
  async ({ newData, rejectedWithValue }) => {
    try {
      const apiURL = "comments/create";
      const response = await axiosInstance.post(apiURL, newData);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const deteleComment = createAsyncThunk(
  "delete/comment",
  async ({ id, rejectedWithValue }) => {
    try {
      const apiURL = `comments/delete/${id}`;
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

export const comentarSlice = createSlice({
  name: "comments",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(getComments.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(storeComment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(storeComment.rejected, (state) => {
        state.status = "failed store";
      })
      .addCase(deteleComment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(deteleComment.rejected, (state) => {
        state.status = "failed delete";
      });
  },
});

export const selectCommentsData = (state) => state.commentsData.data;
export const getCommentsStatus = (state) => state.commentsData.status;

export default comentarSlice.reducer;
