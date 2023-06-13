import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const config = {
  baseURL: BASE_URL,
};

export const axiosInstance = axios.create(config);