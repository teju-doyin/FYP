import { create } from 'zustand';

export type ToastType = "success" | "error" | "info" | "warning" | "default";
export type ToastStyleType = "filled-dark" | "minimal" | "bordered" | "soft-filled" | "gradient";
export type ToastRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';


export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  styleType?: ToastStyleType;
  duration?: number;
  borderRadius?: ToastRadius;
  closeButton?: boolean;
}


export interface DefaultToastOptions {
  styleType?: ToastStyleType;
  duration?: number;
  borderRadius?: ToastRadius;
  closeButton?: boolean;
}


interface ToastStore {
  toasts: Toast[];
  defaultToastOptions: DefaultToastOptions; 
  addToast: (toast: Omit<Toast, 'id'> & { id?: string }) => string;
  removeToast: (id: string) => void;
  setDefaultOptions: (options: DefaultToastOptions) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  defaultToastOptions: {
    duration: 5000,
    borderRadius: '2xl',
    styleType: 'minimal',
    closeButton: true,
  },
  setDefaultOptions: (options) => {
    set((state) => ({
      defaultToastOptions: { ...state.defaultToastOptions, ...options },
    }));
  },
  addToast: (newToast) => {
    const id = newToast.id || Date.now().toString();
    const currentDefaults = get().defaultToastOptions;

    const toastWithDefaults: Toast = {
      ...newToast,
      id,
      duration: newToast.duration ?? currentDefaults.duration,
      borderRadius: newToast.borderRadius ?? currentDefaults.borderRadius,
      styleType: newToast.styleType ?? currentDefaults.styleType,
      closeButton: newToast.closeButton ?? currentDefaults.closeButton,
    };

    set((state) => ({
      toasts: [...state.toasts, toastWithDefaults],
    }));

    if (toastWithDefaults.duration && toastWithDefaults.duration > 0) {
      setTimeout(() => get().removeToast(id), toastWithDefaults.duration);
    }
    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));