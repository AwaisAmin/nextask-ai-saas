import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { UseFormSetError, FieldValues, Path } from "react-hook-form";
import type { ApiResponse } from "@/types/api";

export function handleApiError<T extends FieldValues>(
  err: unknown,
  setError?: UseFormSetError<T>,
) {
  const data = (err as AxiosError<ApiResponse<null>>).response?.data;

  if (data?.errors?.length && setError) {
    data.errors.forEach(({ field, message }) => {
      setError(field as Path<T>, { message });
    });
    return;
  }

  toast.error(data?.message ?? "Something went wrong. Please try again.");
}
