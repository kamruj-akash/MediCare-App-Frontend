"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isPending, isError } = useGetMe();
  const router = useRouter();
  const user = data?.data;
  if (isLoading || isPending) {
    return <div>Loading...</div>;
  }
  if (isError || !user) {
    router.push("/login");
    return;
  }
  return <div>authGuard{children}</div>;
}
