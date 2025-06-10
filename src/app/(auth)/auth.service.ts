import { useAuthStore, UserData } from './auth.store';
import axiosClient from '@/lib/axiosClient';


interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | PromiseLike<string>) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      if (token !== null) {
        prom.resolve(token);
      } else {
        prom.reject(new Error('No token available.'));
      }
    }
  });
  failedQueue = [];
};

export const refreshAccessToken = async (): Promise<string> => {
  const authStore = useAuthStore.getState();
  const currentRefreshToken = authStore.refreshToken;

  if (!currentRefreshToken) {
    authStore.logout(); // No refresh token, force logout
    return Promise.reject(new Error('No refresh token available.'));
  }

  // If a refresh is already in progress, add the current request to the queue
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject });

    if (!isRefreshing) {
      isRefreshing = true;
      // *** Use axiosClient here. The request interceptor will correctly NOT attach the access token ***
      axiosClient.post<RefreshTokenResponse>('/auth/refresh-token', { refreshToken: currentRefreshToken })
        .then(response => {
          const { accessToken, refreshToken } = response.data;
          
          authStore.setTokens(accessToken, refreshToken);
          // authStore.setUser(user); // Uncomment if your backend sends updated user data
          
          processQueue(null, accessToken); // Resolve all queued requests with the new token
          resolve(accessToken); // Resolve the current refresh request
        })
        .catch(async err => {
          console.error('Failed to refresh token:', err);
          authStore.logout(); // Force logout if refresh token is invalid/expired
          
          // Redirect to login (client-side)
          if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname + window.location.search;
            window.location.href = `/login?sessionExpired=true&callbackUrl=${encodeURIComponent(currentPath)}`;
          }
          
          processQueue(new Error('Session expired. Please log in again.')); // Reject all queued requests
          reject(new Error('Failed to refresh token.')); // Reject the current refresh request
        })
        .finally(() => {
          isRefreshing = false;
        });
    }
  });
};