import axios from "axios";
import { toast } from "sonner";
import type { UseFormSetError, FieldValues, Path } from "react-hook-form";
import type { ApiResponse } from "@/types/api";

export const getApiErrorStatus = (err: unknown): number | undefined =>
  axios.isAxiosError(err) ? err.response?.status : undefined;

export const handleApiError = <T extends FieldValues>(
  err: unknown,
  setError?: UseFormSetError<T>,
) => {
  const data = axios.isAxiosError<ApiResponse<null>>(err)
    ? err.response?.data
    : null;

  if (data?.errors?.length && setError) {
    data.errors.forEach(({ field, message }) => {
      setError(field as Path<T>, { message });
    });
    return;
  }

  toast.error(data?.message ?? "Something went wrong. Please try again.");
};
