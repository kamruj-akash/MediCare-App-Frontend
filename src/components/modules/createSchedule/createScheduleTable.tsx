import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import {
  useDeleteSchedule,
  useGetDoctorSchedules,
  usePublishSchedule,
} from "@/hooks/schedule.hook";
import { DoctorSchedule } from "@/types/schedule";
import { cn } from "cn";
import { format } from "date-fns";
import { useState } from "react";

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
  const { data, isLoading } = useGetDoctorSchedules();
  const schedules = data?.data?.data || [];

  // publish schedules
  const { mutate: publishSchedule } = usePublishSchedule();
  const handlePublishSchedule = (scheduleId: string) => {
    publishSchedule(scheduleId, {
      onSuccess: () => {
        toast.add({
          title: "Schedule Published",
          description: "The schedule has been published successfully.",
        });
      },
      onError: (error) => {
        console.error("Error publishing schedule:", error);
      },
    });
  };

  // delete schedules
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { mutate: deleteSchedule } = useDeleteSchedule();
  const handleDeleteSchedule = (scheduleId: string) => {
    deleteSchedule(scheduleId, {
      onSuccess: () => {
        toast.add({
          title: "Schedule Deleted",
          description: "The schedule has been deleted successfully.",
        });
      },
      onError: (error) => {
        console.log("Error deleting schedule:", error);
      },
    });
  };

  return (
    <Table className="border border-border">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
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
            <TableCell>
              {format(new Date(schedule.startDateTime), "MMM dd, yyyy")}
            </TableCell>
            <TableCell>
              {format(new Date(schedule.startDateTime), "h:mm a")}
            </TableCell>
            <TableCell>
              {format(new Date(schedule.endDateTime), "h:mm a")}
            </TableCell>
            <TableCell className="text-right">{`${schedule.availableSlot}/${schedule.totalSlot}`}</TableCell>
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
              {deleteConfirm === schedule.id ? (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  {schedule.status === "DRAFT" && (
                    <Button
                      onClick={() => handlePublishSchedule(schedule.id)}
                      variant="outline"
                      className="mr-2"
                    >
                      Publish
                    </Button>
                  )}
                  {schedule.availableSlot === schedule.totalSlot && (
                    <Button
                      variant="destructive"
                      onClick={() => setDeleteConfirm(schedule.id)}
                    >
                      Delete
                    </Button>
                  )}
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
