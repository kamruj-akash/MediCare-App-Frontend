import {
  createSchedule,
  deleteSchedule,
  getDoctorSchedules,
  getDoctorTodaySchedule,
  publishSchedule,
} from "@/api/schedule.api";
import { GetDoctorSchedulesParams } from "@/types/schedule";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useCreateSchedule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-schedules"] });
    },
  });
}

export function useGetDoctorSchedules(params?: GetDoctorSchedulesParams) {
  return useQuery({
    queryKey: ["doctor-schedules", params],
    queryFn: () => getDoctorSchedules(params),
  });
}

export function useSuspendedGetDoctorSchedules(
  params?: GetDoctorSchedulesParams,
) {
  return useSuspenseQuery({
    queryKey: ["doctor-schedules", params],
    queryFn: () => getDoctorSchedules(params),
  });
}

export function useGetDoctorTodaySchedule(doctorId: string) {
  return useQuery({
    queryKey: ["doctor-today-schedule", doctorId],
    queryFn: () => getDoctorTodaySchedule(doctorId),
    enabled: !!doctorId,
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
