"use client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CreateScheduleDialog from "./createScheduleDialog";
import CreateScheduleTable from "./createScheduleTable";

const scheduleStatusTabs: ("ALL" | "DRAFT" | "PUBLISHED")[] = [
  "ALL",
  "DRAFT",
  "PUBLISHED",
];

type ScheduleStatus = "ALL" | "DRAFT" | "PUBLISHED";
const toTitleCase = (text: string) => {
  return text.charAt(0) + text.slice(1).toLowerCase();
};

export default function CreateScheduleTabs() {
  const [tab, setTab] = useState<ScheduleStatus>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as "ALL" | "DRAFT" | "PUBLISHED")}
    >
      <div className="flex items-center justify-between mb-4">
        <Input
          className="w-lg"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      <CreateScheduleTable tab={tab} searchTerm={searchTerm} />
    </Tabs>
  );
}
