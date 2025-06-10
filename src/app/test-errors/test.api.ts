import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';

// Simulates a 500 Internal Server Error
const fetchSimulated500 = async () => {
  const { data } = await axiosClient.get("500");
  return data;
};

// Simulates a 404 Not Found error
const fetchSimulated404 = async () => {
  const { data } = await axiosClient.get('404');
  return data;
};

// Simulates a 400 Bad Request error
const fetchSimulated400 = async () => {
  const { data } = await axiosClient.get('400');
  return data;
};

// Simulates a 403 Forbidden error
const fetchSimulated403 = async () => {
  const { data } = await axiosClient.get('403');
  return data;
};

// Simulates a 422 Unprocessable Entity (Validation Error)
const fetchSimulated422 = async () => {
  const { data } = await axiosClient.get('422');
  return data;
};


const fetchSimulatedNetworkTimeout = async () => {
  const originalTimeout = axiosClient.defaults.timeout;
  axiosClient.defaults.timeout = 100; 

  try {
    const { data } = await axiosClient.get("408");
    return data;
  } finally {
    axiosClient.defaults.timeout = originalTimeout;
  }
};

export const useSimulateServerError = () => {
  return useQuery({
    queryKey: ['simulateServerError'],
    queryFn: fetchSimulated500,
    enabled: false,
    retry: false,
  });
};

export const useSimulateNotFoundError = () => {
  return useQuery({
    queryKey: ['simulateNotFoundError'],
    queryFn: fetchSimulated404,
    enabled: false,
    retry: false,
  });
};

export const useSimulateBadRequestError = () => {
  return useQuery({
    queryKey: ["simulateBadRequestError"], // Typo fixed here
    queryFn: fetchSimulated400,
    enabled: false, // Added for consistency
    retry: false,
  });
};

export const useSimulateForbiddenError = () => {
  return useQuery({
    queryKey: ['simulateForbiddenError'],
    queryFn: fetchSimulated403,
    enabled: false,
    retry: false,
  });
};

export const useSimulateValidationError = () => {
  // Converted from useMutation to useQuery
  return useQuery({
    queryKey: ['simulateValidationError'], // Added queryKey
    queryFn: fetchSimulated422,
    enabled: false, // Added for consistency
    retry: false,
  });
};

export const useSimulateNetworkTimeoutError = () => {
  return useQuery({
    queryKey: ['simulateNetworkTimeout'],
    queryFn: fetchSimulatedNetworkTimeout,
    enabled: false,
    retry: false,
  });
};


// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// const fetchSimulated500 = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/500`);
//     console.log('✅ Success Response (500):', response);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error Response (500):', error);
//     throw error;
//   }
// };

// const fetchSimulated404 = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/404`);
//     console.log('✅ Success Response (404):', response);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error Response (404):', error);
//     throw error;
//   }
// };

// const fetchSimulated400 = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/400`);
//     console.log('✅ Success Response (400):', response);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error Response (400):', error);
//     throw error;
//   }
// };

// const fetchSimulated403 = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/403`);
//     console.log('✅ Success Response (403):', response);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error Response (403):', error);
//     throw error;
//   }
// };

// const fetchSimulated422 = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/422`);
//     console.log('✅ Success Response (422):', response);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error Response (422):', error);
//     throw error;
//   }
// };

// const fetchSimulatedNetworkTimeout = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/408`, {
//       timeout: 100,
//     });
//     console.log('✅ Success Response (408 timeout):', response);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Timeout Error Response (408):', error);
//     throw error;
//   }
// };

// export const useSimulateServerError = () =>
//   useQuery({
//     queryKey: ['simulateServerError'],
//     queryFn: fetchSimulated500,
//     enabled: false,
//     retry: false,
//   });

// export const useSimulateNotFoundError = () =>
//   useQuery({
//     queryKey: ['simulateNotFoundError'],
//     queryFn: fetchSimulated404,
//     enabled: false,
//     retry: false,
//   });

// export const useSimulateBadRequestError = () =>
//   useQuery({
//     queryKey: ['simulateBadRequestError'],
//     queryFn: fetchSimulated400,
//     enabled: false,
//     retry: false,
//   });

// export const useSimulateForbiddenError = () =>
//   useQuery({
//     queryKey: ['simulateForbiddenError'],
//     queryFn: fetchSimulated403,
//     enabled: false,
//     retry: false,
//   });

// export const useSimulateValidationError = () =>
//   useQuery({
//     queryKey: ['simulateValidationError'],
//     queryFn: fetchSimulated422,
//     enabled: false,
//     retry: false,
//   });

// export const useSimulateNetworkTimeoutError = () =>
//   useQuery({
//     queryKey: ['simulateNetworkTimeout'],
//     queryFn: fetchSimulatedNetworkTimeout,
//     enabled: false,
//     retry: false,
//   });
