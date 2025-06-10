'use client';

import { useEffect } from 'react';
import ToastContainer from '../components/ToastContainer';
import { useToastStore, DefaultToastOptions } from '../stores/toast.store';

interface ToastProviderProps {
  children: React.ReactNode;
  defaultOptions?: DefaultToastOptions;
}

export default function ToastProvider({ children, defaultOptions }: ToastProviderProps) {
  const setDefaultOptions = useToastStore((state) => state.setDefaultOptions);
  useEffect(() => {
    if (defaultOptions) {
      setDefaultOptions(defaultOptions);
    }
  }, [defaultOptions, setDefaultOptions]);

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}