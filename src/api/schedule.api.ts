import { apiClient } from "@/lib/apiClient";
import { ApiResponse, DoctorScheduleResponse } from "@/types/api";

export function createSchedule(payload: {
  startDateTime: string;
  endDateTime: string;
  meetingLink: string;
}) {
  return apiClient("/schedule/create-schedule", {
    method: "POST",
    body: {
      startDateTime: payload.startDateTime,
      endDateTime: payload.endDateTime,
      meetingLink: payload.meetingLink,
    },
  });
}

export function getDoctorSchedules() {
  return apiClient<ApiResponse<DoctorScheduleResponse>>(
    "/schedule/my-schedules",
  );
}

export function publishSchedule(scheduleId: string) {
  return apiClient(`/schedule/publish-schedule/${scheduleId}`, {
    method: "PATCH",
  });
}

export function deleteSchedule(scheduleId: string) {
  return apiClient(`/schedule/delete-schedule/${scheduleId}`, {
    method: "DELETE",
  });
}
