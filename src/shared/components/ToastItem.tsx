'use client';

import { motion } from "framer-motion";
import { useToastStore, Toast, ToastType, ToastStyleType, ToastRadius } from "../stores/toast.store";
import { LuX } from "react-icons/lu";
import { AiOutlineInfo } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";
import { FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import clsx from 'clsx';

const ToastItem = ({ toast }: { toast: Toast }) => {
  const { removeToast } = useToastStore();

  const baseStyleClasses: Record<ToastStyleType, string> = {
    "filled-dark": "bg-gray-800 text-white",
    "minimal": "bg-white text-gray-800 border border-gray-200",
    "bordered": "bg-white text-gray-800",
    "soft-filled": "text-gray-900",
    "gradient": "text-white",
  };

  const typeSpecificClasses: Record<ToastStyleType, Record<ToastType, string>> = {
    "filled-dark": {
      "success": "bg-green-700",
      "error": "bg-red-700",
      "info": "bg-blue-700",
      "warning": "bg-yellow-700",
      "default": "bg-gray-800",
    },
    "minimal": {
      "success": "border-green-500",
      "error": "border-red-500",
      "info": "border-blue-500",
      "warning": "border-yellow-500",
      "default": "border-gray-500",
    },
    "bordered": {
      "success": "border-l-4 border-green-500 shadow-md",
      "error": "border-l-4 border-red-500 shadow-md",
      "info": "border-l-4 border-blue-500 shadow-md",
      "warning": "border-l-4 border-yellow-500 shadow-md",
      "default": "border-l-4 border-gray-500 shadow-md",
    },
    "soft-filled": {
      "success": "bg-green-100",
      "error": "bg-red-100",
      "info": "bg-blue-100",
      "warning": "bg-yellow-100",
      "default": "bg-gray-100",
    },
    "gradient": {
      "success": "bg-gradient-to-r from-green-500 to-green-600",
      "error": "bg-gradient-to-r from-red-500 to-red-600",
      "info": "bg-gradient-to-r from-blue-500 to-blue-600",
      "warning": "bg-gradient-to-r from-yellow-500 to-yellow-600",
      "default": "bg-gradient-to-r from-gray-500 to-gray-600",
    },
  };

  const iconColors: Record<ToastStyleType, Record<ToastType, string>> = {
    "filled-dark": {
      "success": "text-white", "error": "text-white", "info": "text-white",
      "warning": "text-white", "default": "text-white",
    },
    "minimal": {
      "success": "text-green-500", "error": "text-red-500", "info": "text-blue-500",
      "warning": "text-yellow-500", "default": "text-gray-500",
    },
    "bordered": {
      "success": "text-green-500", "error": "text-red-500", "info": "text-blue-500",
      "warning": "text-yellow-500", "default": "text-gray-500",
    },
    "soft-filled": {
      "success": "text-green-600", "error": "text-red-600", "info": "text-blue-600",
      "warning": "text-yellow-600", "default": "text-gray-600",
    },
    "gradient": {
      "success": "text-white", "error": "text-white", "info": "text-white",
      "warning": "text-white", "default": "text-white",
    },
  };

  const closeButtonColors: Record<ToastStyleType, Record<ToastType, string>> = {
    "filled-dark": {
      "success": "text-white hover:text-gray-200", "error": "text-white hover:text-gray-200",
      "info": "text-white hover:text-gray-200", "warning": "text-white hover:text-gray-200",
      "default": "text-white hover:text-gray-200",
    },
    "minimal": {
      "success": "text-gray-500 hover:text-gray-700", "error": "text-gray-500 hover:text-gray-700",
      "info": "text-gray-500 hover:text-gray-700", "warning": "text-gray-500 hover:text-gray-700",
      "default": "text-gray-500 hover:text-gray-700",
    },
    "bordered": {
      "success": "text-gray-500 hover:text-gray-700", "error": "text-gray-500 hover:text-gray-700",
      "info": "text-gray-500 hover:text-gray-700", "warning": "text-gray-500 hover:text-gray-700",
      "default": "text-gray-500 hover:text-gray-700",
    },
    "soft-filled": {
      "success": "text-gray-600 hover:text-gray-800", "error": "text-gray-600 hover:text-gray-800",
      "info": "text-gray-600 hover:text-gray-800", "warning": "text-gray-600 hover:text-gray-800",
      "default": "text-gray-600 hover:text-gray-800",
    },
    "gradient": {
      "success": "text-white hover:text-gray-200", "error": "text-white hover:text-gray-200",
      "info": "text-white hover:text-gray-200", "warning": "text-white hover:text-gray-200",
      "default": "text-white hover:text-gray-200",
    },
  };


  const currentStyleType = toast.styleType || 'minimal';
  const currentToastType = toast.type || 'default';

  const getIcon = () => {
    const iconColorClass = iconColors[currentStyleType]?.[currentToastType] || 'text-gray-500';

    switch (currentToastType) {
      case "success":
        return <FaCircleCheck size={25} className={iconColorClass} />;
      case "error":
        return <FaTimesCircle size={25} className={iconColorClass} />;
      case "info":
        return <FaCircleInfo size={25} className={iconColorClass} />;
      case "warning":
        return <IoWarning size={25} className={iconColorClass} />;
      default:
        return (
          <div className={clsx("w-6 h-6 flex items-center justify-center rounded-md",
            currentStyleType === 'minimal' || currentStyleType === 'bordered' || currentStyleType === 'soft-filled' ? 'bg-gray-100' : 'bg-white',
            iconColorClass
          )}>
            <AiOutlineInfo size={18} />
          </div>
        );
    }
  };

  const getRadiusClass = (radiusType: ToastRadius | undefined) => {
    if (!radiusType) return 'rounded-2xl'; 

    const radiusMap: Record<ToastRadius, string> = {
      'none': 'rounded-none',
      'sm': 'rounded-sm',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl',
      '2xl': 'rounded-2xl',
      '3xl': 'rounded-3xl',
      'full': 'rounded-full',
    };
    return radiusMap[radiusType];
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8,
        duration: 0.3,
      }}
      className={clsx(
        "flex px-4 py-4 shadow-lg w-80 max-w-sm sm:max-w-md lg:w-96 items-center",
        baseStyleClasses[currentStyleType],
        typeSpecificClasses[currentStyleType]?.[currentToastType],
        getRadiusClass(toast.borderRadius)
      )}
    >
      {getIcon()}

      <span className="flex-1 ml-3 text-sm md:text-base break-words">{toast.message}</span>

     
      {toast.closeButton && (
        <button
          onClick={() => removeToast(toast.id)}
          className={clsx(
            "ml-3 flex-shrink-0 p-1 rounded-full",
            closeButtonColors[currentStyleType]?.[currentToastType] || 'text-gray-600 hover:text-gray-800'
          )}
          aria-label="Close toast"
        >
          <LuX size={20} />
        </button>
      )}
    </motion.div>
  );
};

export default ToastItem;