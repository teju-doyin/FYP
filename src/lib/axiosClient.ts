import axios, { AxiosError } from 'axios';
import { useErrorStore } from '@/shared/stores/error.store';
import { toast } from './toast';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isAuthEndpoint = (url: string | undefined) => {
  if (!url) return false;
  return (
    url.includes('/auth/') ||
    url.endsWith('/login') ||
    url.endsWith('/register')
  );
};

// Request interceptor: attach token only on non-auth routes
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token && !isAuthEndpoint(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: separate critical vs non-critical
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error(error)
    const setCriticalError = useErrorStore.getState().setCriticalError;
    const status = error.response?.status;
    const serverMessageRaw =
      error.response?.data ||
      error.message ||
      'Something went wrong. Try again!';
    const serverMessage =
      typeof serverMessageRaw === 'string'
        ? serverMessageRaw
        : (typeof serverMessageRaw === 'object' && serverMessageRaw !== null && 'message' in serverMessageRaw
            ? (serverMessageRaw as { message: string }).message
            : JSON.stringify(serverMessageRaw));

    // No response => network issue
    if (!error.response) {
      setCriticalError({
        type: 'network_error',
        message: 'Network error. Please check your connection.',
      });
      return Promise.reject(error);
    }

    // Critical errors
    if ([401, 403].includes(status!)) {
      setCriticalError({
        type: 'authentication_error',
        message:
          status === 401
            ? 'Your session has expired. Please log in again.'
            : 'You are not authorized to access this resource.',
        statusCode: status,
      });
      return Promise.reject(error);
    }
    if (status! >= 500) {
      setCriticalError({
        type: 'server_error',
        message: 'Internal server error. Please try again later.',
        statusCode: status,
      });
      return Promise.reject(error);
    }
    toast.error(serverMessage);

    return Promise.reject(error);
  }
);

export default axiosClient;
