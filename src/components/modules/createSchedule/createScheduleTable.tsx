import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/tablePagination";
import { toast } from "@/components/ui/toast";
import {
  useDeleteSchedule,
  usePublishSchedule,
  useSuspendedGetDoctorSchedules,
} from "@/hooks/schedule.hook";
import { GetDoctorSchedulesParams } from "@/types/schedule";
import { cn } from "cn";
import { format } from "date-fns";
import { useState } from "react";
import ScheduleViewSheet from "./scheduleViewSheet";

export default function CreateScheduleTable({
  setPage,
  queryParams,
}: {
  setPage: (page: number) => void;
  queryParams: GetDoctorSchedulesParams;
}) {
  const { data } = useSuspendedGetDoctorSchedules(queryParams);
  const schedules = data.data.data;
  const totalPages = data.data.meta.totalPages;

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
    <>
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
                <ScheduleViewSheet schedule={schedule} />
                {deleteConfirm === schedule.id ? (
                  <>
                    <Button
                      variant="destructive"
                      className="ml-2"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2"
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
                        className="ml-2"
                      >
                        Publish
                      </Button>
                    )}
                    {schedule.availableSlot === schedule.totalSlot && (
                      <Button
                        variant="destructive"
                        className="ml-2"
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

      <TablePagination setPage={setPage} totalPages={totalPages} />
    </>
  );
}
