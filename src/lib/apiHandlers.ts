import { toast } from "./toast";
import { AxiosResponse, AxiosError } from "axios";

export const handleApiSuccess = (
  responseData: AxiosResponse,
  fallbackMessage: string = 'Operation completed successfully.'
): string => {

  const message = responseData?.data?.message || fallbackMessage;

  toast.success(message)
  return message;
};
export const handleApiError = (
  error: unknown,
  fallbackMessage: string = 'An unexpected error occurred.'
): string => {
  if (error instanceof AxiosError && error.response?.status === 401) {
    toast.error(fallbackMessage);
    return fallbackMessage;
  }

  console.error(error);
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || fallbackMessage;
    toast.error(message);
    return message;
  } else {
    toast.error(fallbackMessage);
    return fallbackMessage;
  }
};