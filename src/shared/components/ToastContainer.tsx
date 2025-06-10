'use client';
import { AnimatePresence } from "framer-motion";
import ToastItem from './ToastItem';
import { useToastStore } from '../stores/toast.store'; 


const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end space-y-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;






