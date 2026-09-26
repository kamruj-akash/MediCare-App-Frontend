import AuthGuard from "@/components/auth/authGuard";

export default function layout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
