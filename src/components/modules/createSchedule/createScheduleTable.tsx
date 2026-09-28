import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DoctorSchedule } from "@/types/schedule";
import { cn } from "cn";

type ScheduleStatus = "DRAFT" | "PUBLISHED";

type ScheduleRow = {
  id: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  slots: number;
  status: ScheduleStatus;
};

const mockSchedules: DoctorSchedule[] = [
  {
    id: "1",
    startDateTime: "2026-09-30",
    endDateTime: "2026-09-30",
    totalSlot: 8,
    availableSlot: 8,
    meetingLink: "https://example.com/meeting/1",
    status: "PUBLISHED",
    isDeleted: false,
    createdAt: "2026-09-30",
    updatedAt: "2026-09-30",
    doctorId: "1",
    Appointments: [],
  },
];

export default function CreateScheduleTable({
  tab,
  searchTerm,
}: {
  tab: "ALL" | ScheduleStatus;
  searchTerm: string;
}) {
  const schedules = mockSchedules.filter((schedule) => {
    const matchesTab = tab === "ALL" ? true : schedule.status === tab;
    const matchesSearch = searchTerm
      ? schedule.date.includes(searchTerm) ||
        schedule.day.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesTab && matchesSearch;
  });

  return (
    <Table className="border border-border">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Day</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead className="text-right">Slots</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {schedules.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-10">
              No schedules found.
            </TableCell>
          </TableRow>
        )}
        {schedules.map((schedule) => (
          <TableRow key={schedule.id}>
            <TableCell>{schedule.date}</TableCell>
            <TableCell>{schedule.day}</TableCell>
            <TableCell>{schedule.startTime}</TableCell>
            <TableCell>{schedule.endTime}</TableCell>
            <TableCell className="text-right">{schedule.slots}</TableCell>
            <TableCell className="text-right">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  schedule.status === "PUBLISHED"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {schedule.status === "PUBLISHED" ? "Published" : "Draft"}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
              >
                Edit
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
