import { createSchedule } from "@/api/schedule.api";
import { useMutation } from "@tanstack/react-query";

export function useCreateSchedule() {
  return useMutation({
    mutationFn: createSchedule,
  });
}
