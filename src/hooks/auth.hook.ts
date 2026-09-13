import { getMe, googleOAuth, userLogin, userLogout, userRegister } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleOAuth,
  });
}
export function useGetMe() {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    retry: false,
  });
}
