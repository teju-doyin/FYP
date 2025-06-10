import { useToastStore, DefaultToastOptions } from '../shared/stores/toast.store';


export const toast = {
  success: (message: string, overrides?: Partial<DefaultToastOptions>) =>
    useToastStore.getState().addToast({
      message,
      type: 'success',
      ...overrides,
    }),

  error: (message: string, overrides?: Partial<DefaultToastOptions>) =>
    useToastStore.getState().addToast({
      message,
      type: 'error',
      ...overrides,
    }),

  info: (message: string, overrides?: Partial<DefaultToastOptions>) =>
    useToastStore.getState().addToast({
      message,
      type: 'info',
      ...overrides,
    }),
  warning: (message: string, overrides?: Partial<DefaultToastOptions>) =>
    useToastStore.getState().addToast({
      message,
      type: 'warning',
      ...overrides,
    }),

  default: (message: string, overrides?: Partial<DefaultToastOptions>) =>
    useToastStore.getState().addToast({
      message,
      type: 'default',
      ...overrides,
    }),

  dismiss: (toastId?: string) => {
    const { removeToast, toasts } = useToastStore.getState();
    if (toastId) {
      removeToast(toastId);
    } else {
      toasts.forEach(t => removeToast(t.id));
    }
  },
};