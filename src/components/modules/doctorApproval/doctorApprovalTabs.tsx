"use client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorVerificationStatus } from "@/types";
import { Suspense, useState } from "react";
import DoctorApprovalTable from "./doctorApprovalTable";
import DoctorApprovalTableSkeleton from "./doctorApprovalTableSkeleton";

const verificationStatusTabs: (DoctorVerificationStatus | "ALL")[] = [
  "ALL",
  "APPROVE",
  "PENDING",
  "REJECT",
];
const toTitleCase = (text: string) => {
  return text.charAt(0) + text.slice(1).toLowerCase();
};
export default function DoctorApprovalTabs() {
  const [tab, setTab] = useState<DoctorVerificationStatus | "ALL">("ALL");
  console.log(tab);
  return (
    <Tabs
      defaultValue={tab}
      onValueChange={(value) =>
        setTab(value as DoctorVerificationStatus | "ALL")
      }
    >
      <div className="flex items-center justify-between mb-4">
        <Input className="w-lg" placeholder="Search..." />
        <TabsList>
          {verificationStatusTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {toTitleCase(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value="ALL">
        <Suspense fallback={<DoctorApprovalTableSkeleton />}>
          <DoctorApprovalTable />
        </Suspense>
      </TabsContent>
      <TabsContent value="APPROVE">Approve</TabsContent>
      <TabsContent value="PENDING">Pending</TabsContent>
      <TabsContent value="REJECT">Rejected</TabsContent>
    </Tabs>
  );
}
