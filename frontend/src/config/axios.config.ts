import axios, { AxiosInstance } from "axios";
import Cookies from 'js-cookie';

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASIC_URL}`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
  }
});

instance.interceptors.request.use(config => {
  const token = Cookies.get('jwt');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  console.error("Request error:", error);
  return Promise.reject(error);
});

instance.interceptors.response.use(
  response => response,
  error => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default instance;