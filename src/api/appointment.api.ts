import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/api";
import { BookAppointmentPayload } from "@/types/appointment";

export function bookAppointment(payload: BookAppointmentPayload) {
  return apiClient<ApiResponse<string>>("/appointment/booking", {
    method: "POST",
    body: payload,
  });
}
