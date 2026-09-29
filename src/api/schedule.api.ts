import { apiClient } from "@/lib/apiClient";
import { ApiResponse, DoctorScheduleResponse } from "@/types/api";
import { GetDoctorSchedulesParams } from "@/types/schedule";

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

export function getDoctorSchedules(params?: GetDoctorSchedulesParams) {
  return apiClient<ApiResponse<DoctorScheduleResponse>>(
    "/schedule/my-schedules",
    {
      method: "GET",
      params,
    },
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
