"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/constants/Logo";
import { useLogout } from "@/hooks";
import { adminRoutes } from "@/routes/admin.route";
import { doctorRoutes } from "@/routes/doctors.route";
import { patientRoutes } from "@/routes/patient.routes";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";

const sidebarRoutes = {
  ADMIN: adminRoutes,
  SUPER_ADMIN: adminRoutes,
  DOCTOR: doctorRoutes,
  PATIENT: patientRoutes,
};
export function DashboardSidebar({ role }: { role: UserRole }) {
  const userRoute = sidebarRoutes[role];
  const pathName = usePathname();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        console.log(res);
        toast.add({
          title: "Logout Successful",
          description: res?.message || "You have successfully logged out.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["getMe"] });
        router.push("/login");
      },
    });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 px-4 py-3">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {userRoute.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathName === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <Button variant="destructive" size={"lg"} onClick={handleLogout}>
        {isLogoutPending ? "Logging out..." : "Logout"}
      </Button>
    </Sidebar>
  );
}
