"use client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/debounce.hook";
import { DoctorVerificationStatus, GetAllDoctorsParams } from "@/types";
import { Suspense, useState } from "react";
import DoctorApprovalTable from "./doctorApprovalTable";
import DoctorApprovalTableSkeleton from "./doctorApprovalTableSkeleton";

const verificationStatusTabs: (DoctorVerificationStatus | "ALL")[] = [
  "ALL",
  "APPROVE",
  "PENDING",
  "REJECTED",
];
const toTitleCase = (text: string) => {
  return text.charAt(0) + text.slice(1).toLowerCase();
};
export default function DoctorApprovalTabs() {
  const [tab, setTab] = useState<DoctorVerificationStatus | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [page, setPage] = useState<number>(1);
  const queryParams: GetAllDoctorsParams = {
    status: tab === "ALL" ? undefined : tab,
    page: page,
    searchTerm: debouncedSearchTerm,
    // limit: 1,
  };

  return (
    <Tabs
      value={tab}
      onValueChange={(value) =>
        setTab(value as DoctorVerificationStatus | "ALL")
      }
    >
      <div className="flex items-center justify-between mb-4">
        <Input
          className="w-lg"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TabsList>
          {verificationStatusTabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {toTitleCase(tab)}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <Suspense fallback={<DoctorApprovalTableSkeleton />}>
        <DoctorApprovalTable setPage={setPage} queryParams={queryParams} />
      </Suspense>
    </Tabs>
  );
}
