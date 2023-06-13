import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/axiosInstance";

// export const getLogin = createAsyncThunk("post/login", async () => {
//   const apiURL = "login";
//   const response = await axiosInstance.post(apiURL);
//   return response.data;
// });

export const getLogin = createAsyncThunk(
  "post/login",
  async ({ username, password }) => {
    try {
      const formRequestData = new FormData();
      formRequestData.append("username", username);
      formRequestData.append("password", password);

      const apiURL = "login";
      const response = await axiosInstance.post(apiURL, formRequestData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: {},
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(getLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getLogin.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const selectLoginData = (state) => state.loginData.data;
export const getLoginStatus = (state) => state.loginData.status;

export default loginSlice.reducer;
