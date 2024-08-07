import axios from "axios";
const url = import.meta.env.VITE_URL_FRONTEND;

export const api = axios.create({
  baseURL: `${url}/api`,
  withCredentials: true,
});
