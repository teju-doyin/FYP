'use client';

import { useErrorStore } from '../stores/error.store';
import { MdErrorOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const BlockerPage = () => {
  const { criticalError, clearCriticalError } = useErrorStore();
  const router = useRouter();

  const handleRetry = () => {
    clearCriticalError(); 
    router.refresh();
  };
  const errorMessage = criticalError?.message || 'An unexpected critical error occurred.';
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <MdErrorOutline className="text-red-500 text-6xl mb-6" />
      <h1 className="text-3xl font-bold mb-3 text-center">
        {criticalError?.type === 'network_error' ? 'Network Disconnected' : 'Something Went Wrong!'}
      </h1>
      <p className="text-lg text-center mb-4 max-w-xl">
        {errorMessage}
      </p>
      {criticalError && (
        <p className="text-sm text-gray-600 mb-6 text-center">
          Error Type: {criticalError.type.replace(/_/g, ' ')}
          {criticalError.statusCode && ` (Code: ${criticalError.statusCode})`}
          <br />
          Timestamp: {new Date(criticalError.timestamp).toLocaleString()}
        </p>
      )}
      <button
        onClick={handleRetry}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-colors duration-200"
      >
        Try Again
      </button>
      <p className="mt-4 text-sm text-gray-500">
        If the problem persists, please contact support.
      </p>
    </div>
  );
};

export default BlockerPage;