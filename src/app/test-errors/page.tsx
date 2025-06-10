'use client';

import React from 'react';
import {
  useSimulateServerError,
  useSimulateNotFoundError,
  useSimulateBadRequestError,
  useSimulateForbiddenError,
  useSimulateValidationError,
  useSimulateNetworkTimeoutError,
} from './test.api';

export default function SimulateErrorsPage() {
  const { isLoading: isLoadingServerError, refetch: refetchServerError } = useSimulateServerError();
  const { isLoading: isLoadingNotFoundError, refetch: refetchNotFoundError } = useSimulateNotFoundError();
  const { isLoading: isLoadingBadRequest, refetch: refetchBadRequestError } = useSimulateBadRequestError();
  const { isLoading: isLoadingForbiddenError, refetch: refetchForbiddenError } = useSimulateForbiddenError();
  const { isLoading: isLoadingValidateError, refetch: refetchValidationError } = useSimulateValidationError();
  const { isLoading: isLoadingNetworkTimeoutError, refetch: refetchNetworkTimeoutError } = useSimulateNetworkTimeoutError();

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Simulate API Errors</h1>

      <p className="mb-8 text-center text-gray-600">
        Click the buttons below to trigger different API error types and observe your application&apos;s error handling (Blocker Page, Toasts, Redirects).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical Errors - Blocker Page */}
        <button
          onClick={() => refetchServerError()} // Use refetch()
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
          disabled={isLoadingServerError} // Use isLoading
        >
          {isLoadingServerError ? 'Simulating...' : 'Simulate 500 (Server Error)'}
        </button>

        <button
          onClick={() => refetchNetworkTimeoutError()}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
          disabled={isLoadingNetworkTimeoutError}
        >
          {isLoadingNetworkTimeoutError ? 'Simulating...' : 'Simulate Network Timeout'}
        </button>

        {/* Client Errors - Toasts / Redirects */}
        <button
          onClick={() => refetchNotFoundError()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
          disabled={isLoadingNotFoundError}
        >
          {isLoadingNotFoundError ? 'Simulating...' : 'Simulate 404 (Not Found)'}
        </button>

        <button
          onClick={() => refetchBadRequestError()} // Use refetch()
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
          disabled={isLoadingBadRequest} // Use isLoading
        >
          {isLoadingBadRequest ? 'Simulating...' : 'Simulate 400 (Bad Request)'}
        </button>

        <button
          onClick={() => refetchForbiddenError()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
          disabled={isLoadingForbiddenError}
        >
          {isLoadingForbiddenError ? 'Simulating...' : 'Simulate 403 (Forbidden)'}
        </button>

        <button
          onClick={() => refetchValidationError()} // Use refetch()
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
          disabled={isLoadingValidateError} // Use isLoading
        >
          {isLoadingValidateError ? 'Simulating...' : 'Simulate 422 (Validation Error)'}
        </button>

        {/* React Rendering Error (Not API-related) */}
        <button
          onClick={() => {
            // This error is caught by AppErrorBoundary, not axiosClient
            throw new Error("Intentional React Rendering Error!");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 md:col-span-2"
        >
          Simulate React Rendering Error
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
        <h2 className="font-semibold text-lg mb-2">Notes:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>**Critical Errors (Red Buttons):** These should trigger the full-page Blocker.</li>
          <li>**Client Errors (Orange Buttons):** These should show a Toast notification. The 403 might also redirect.</li>
          <li>**React Rendering Error (Blue Button):** This tests your `AppErrorBoundary` directly, not the API.</li>
          <li>**401 Unauthorized:** Cannot be reliably simulated with public APIs as it requires a full authentication flow. Use your backend or MSW for this.</li>
          <li>Ensure your backend API is running and your `NEXT_PUBLIC_BACKEND_API_URL` is correctly configured for other features.</li>
        </ul>
      </div>
    </div>
  );
}