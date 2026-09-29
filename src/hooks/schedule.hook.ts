import {
  createSchedule,
  deleteSchedule,
  getDoctorSchedules,
  publishSchedule,
} from "@/api/schedule.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules"] });
    },
  });
}

export function useGetDoctorSchedules() {
  return useQuery({
    queryKey: ["doctor-schedules"],
    queryFn: () => getDoctorSchedules(),
  });
}

export function usePublishSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publishSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules"] });
    },
  });
}
export function useDeleteSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules"] });
    },
  });
}
