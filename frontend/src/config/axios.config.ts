import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASIC_URL}`,
  headers: {
    "Content-Type": "application/json", // Content type for JSON requests
    "Access-Control-Allow-Headers": "*", // Allow CORS headers
  }
});