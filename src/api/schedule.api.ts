import { apiClient } from "@/lib/apiClient";

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
