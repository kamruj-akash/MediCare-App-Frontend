import AuthGuard from "@/components/auth/authGuard";
import DashboardShell from "@/components/dashboard/dashboardShell";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard roles={["DOCTOR"]}>
      <DashboardShell role="DOCTOR">{children}</DashboardShell>
    </AuthGuard>
  );
}
