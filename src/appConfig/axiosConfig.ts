import axios, { AxiosError } from 'axios';
import config from './config';

const axiosInstance = axios.create({
  baseURL: config.backendUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error.message));
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  () => {
    // if (error.response && error.response.status === 401) {
    // //   window.location.href = '/login';
    // }
    // return Promise.reject(new Error(error.message));
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError === true;
  }


export default axiosInstance;

