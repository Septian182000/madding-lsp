import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axiosInstance";

export const register = createAsyncThunk(
  "post/register",
  async ({ newData, rejectedWithValue }) => {
    try {
      const apiURL = "register";
      const response = await axiosInstance.post(apiURL, newData);
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

export const registerSlice = createSlice({
  name: "register",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const selectRegisterData = (state) => state.registerData.data;
export const getRegisterStatus = (state) => state.registerData.status;

export default registerSlice.reducer;
