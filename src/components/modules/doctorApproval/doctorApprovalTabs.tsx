"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignLeft } from "lucide-react";
import { Suspense } from "react";
import DoctorApprovalTable from "./doctorApprovalTable";

export default function DoctorApprovalTabs() {
  const tabs = [
    { value: "All", label: "All", icon: <AlignLeft /> },
    { value: "Pending", label: "Pending", icon: <AlignLeft /> },
    { value: "Approved", label: "Approved", icon: <AlignLeft /> },
    { value: "Rejected", label: "Rejected", icon: <AlignLeft /> },
  ];
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="All">
        <Suspense fallback={<div>Loading...</div>}>
          <DoctorApprovalTable />
        </Suspense>
      </TabsContent>
      <TabsContent value="Pending">Pending</TabsContent>
      <TabsContent value="Approved">Approved</TabsContent>
      <TabsContent value="Rejected">Rejected</TabsContent>
    </Tabs>
  );
}
