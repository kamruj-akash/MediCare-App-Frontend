import { applyAsDoctor, getAllDoctors } from "@/api";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useApplyAsDoctor() {
  return useMutation({
    mutationFn: applyAsDoctor,
  });
}

export function useGetAllDoctors() {
  return useQuery({
    queryKey: ["all-doctors"],
    queryFn: getAllDoctors,
  });
}
export function useSuspendedGetAllDoctors() {
  return useSuspenseQuery({
    queryKey: ["all-doctors"],
    queryFn: getAllDoctors,
  });
}
