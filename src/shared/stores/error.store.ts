import { create } from 'zustand';

export type CriticalErrorType = 
  | 'server_error' 
  | 'network_error' 
  | 'unknown_error' 
  | 'render_error' 
  | 'authentication_error'; 

export interface CriticalError {
  type: CriticalErrorType;
  message: string;
  statusCode?: number;
  timestamp: string;
  componentStack?: string;
}

interface ErrorStore {
  hasCriticalError: boolean;
  criticalError: CriticalError | null;
  setCriticalError: (error: Omit<CriticalError, 'timestamp'>) => void;
  clearCriticalError: () => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  hasCriticalError: false,
  criticalError: null,
  setCriticalError: (error) => {
    console.log('Setting critical error:', error); 
    set({
      hasCriticalError: true,
      criticalError: { ...error, timestamp: new Date().toISOString() },
    });
  },
  clearCriticalError: () => {
    console.log('Clearing critical error'); 
    set({
      hasCriticalError: false,
      criticalError: null,
    });
  },
}));