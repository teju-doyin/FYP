// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserRole = 'customer' | 'vendor' | 'admin' | 'guest';

export interface UserData {
  id: string;
  name: string;
  email: string;
  roles: UserRole[]; // All roles assigned to the user
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  activeRole: UserRole | null;
  accessToken: string | null;  
  refreshToken: string | null; 
  loading: boolean;
  error: string | null;

  // Actions
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  login: (accessToken: string, refreshToken: string, userData: UserData, defaultRole: UserRole) => void; 
  logout: () => void;
  setActiveRole: (role: UserRole) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  initializeAuth: () => void;
}

const localStorageAuthStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      activeRole: null,
      accessToken: null,
      refreshToken: null,
      loading: true,
      error: null,

      setAuthLoading: (loading) => set({ loading }),
      setAuthError: (error) => set({ error }),

      login: (accessToken, refreshToken, userData, defaultRole) => {
        const initialActiveRole = userData.roles.includes(defaultRole) ? defaultRole : (userData.roles[0] || 'customer');
        set({
          isAuthenticated: true,
          user: userData,
          activeRole: initialActiveRole,
          accessToken,
          refreshToken,
          loading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          activeRole: null,
          accessToken: null,
          refreshToken: null,
          loading: false,
          error: null,
        });
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-storage');
        }
      },

      setActiveRole: (role) => {
        const currentUser = get().user;
        if (currentUser && currentUser.roles.includes(role)) {
          set({ activeRole: role, error: null });
        } else {
          console.warn(`Attempted to set invalid role: ${role}`);
          set({ error: `You don't have the ${role} role or user not found.` });
        }
      },

      setTokens: (accessToken, refreshToken) => { // New action
        set({ accessToken, refreshToken, isAuthenticated: true, error: null });
      },

      initializeAuth: () => {
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorageAuthStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        activeRole: state.activeRole,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('An error occurred during auth store rehydration:', error);
            state?.logout();
          } else {
            state?.setAuthLoading(false);
          }
        };
      },
    },
  ),
);

useAuthStore.getState().initializeAuth();