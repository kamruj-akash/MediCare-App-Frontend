import { applyAsDoctor, approveDoctor, getAllDoctors } from "@/api";
import { GetAllDoctorsParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}

export function useGetAllDoctors(params?: GetAllDoctorsParams) {
  return useQuery({
    queryKey: ["all-doctors", params],
    queryFn: () => getAllDoctors(params),
  });
}
export function useSuspendedGetAllDoctors(params?: GetAllDoctorsParams) {
  return useSuspenseQuery({
    queryKey: ["all-doctors", params],
    queryFn: () => getAllDoctors(params),
  });
}

export function useDoctorApprovalActions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-doctors"] });
    },
  });
}
