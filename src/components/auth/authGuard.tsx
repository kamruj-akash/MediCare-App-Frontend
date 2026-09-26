"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import AuthLoading from "./AuthLoading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isPending, isError } = useGetMe();
  const router = useRouter();
  const user = data?.data;
  if (isLoading || isPending) {
    return <AuthLoading />;
  }
  if (isError || !user) {
    router.push("/login");
    return;
  }
  return <div>authGuard{children}</div>;
}
