import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.API_URL,
});
axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
