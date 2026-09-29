"use client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/debounce.hook";
import { GetDoctorSchedulesParams, ScheduleStatus } from "@/types/schedule";
import { Suspense, useState } from "react";
import CreateScheduleDialog from "./createScheduleDialog";
import CreateScheduleTable from "./createScheduleTable";
import CreateScheduleTableSkeleton from "./createScheduleTableSkeleton";

const scheduleStatusTabs: (ScheduleStatus | "ALL")[] = [
  "ALL",
  "DRAFT",
  "PUBLISHED",
];

const toTitleCase = (text: string) => {
  return text.charAt(0) + text.slice(1).toLowerCase();
};

export default function CreateScheduleTabs() {
  const [tab, setTab] = useState<ScheduleStatus | "ALL">("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [page, setPage] = useState<number>(1);

  const queryParams: GetDoctorSchedulesParams = {
    status: tab === "ALL" ? undefined : tab,
    page: page,
    searchTerm: debouncedSearchTerm,
  };

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => {
        setTab(value as ScheduleStatus | "ALL");
        setPage(1);
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <Input
          className="w-lg"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <CreateScheduleDialog />
      </div>

      <TabsList className="mb-4">
        {scheduleStatusTabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab === "PUBLISHED" ? "Publish" : toTitleCase(tab)}
          </TabsTrigger>
        ))}
      </TabsList>

      <Suspense fallback={<CreateScheduleTableSkeleton />}>
        <CreateScheduleTable setPage={setPage} queryParams={queryParams} />
      </Suspense>
    </Tabs>
  );
}
