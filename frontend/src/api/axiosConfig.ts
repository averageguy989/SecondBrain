import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from './auth';

// Define proper types for better error handling
interface FailedQueueItem {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

// Extend the request config to include _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  withCredentials: true, // send cookies like refreshToken
});

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as CustomAxiosRequestConfig;

    // Handle 401 errors (unauthorized) - try to refresh token
    if (err.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, add to queue
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        // Try to refresh the token
        await refreshAccessToken();
    
        // Process queued requests with success
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to signin
        processQueue(new Error('Authentication failed'));
        window.location.href = '/signin';
        return Promise.reject(new Error('Authentication failed'));
      } finally {
        isRefreshing = false;
      }
    }

    // For all other errors, just reject with a simple message
    return Promise.reject(new Error('Request failed'));
  }
);

export default api;
