import axios, { AxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export default axiosClient;
