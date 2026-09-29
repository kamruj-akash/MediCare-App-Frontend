import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DoctorSchedule } from "@/types/schedule";
import { cn } from "cn";
import { format } from "date-fns";
import { useState } from "react";

export default function ScheduleViewSheet({
  schedule,
}: {
  schedule: DoctorSchedule;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm">
            View
          </Button>
        }
      />

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Schedule Details</SheetTitle>
          <SheetDescription>
            Details of the schedule on{" "}
            {format(new Date(schedule.startDateTime), "MMM dd, yyyy")}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2 p-5">
          <p>
            <strong>Date:</strong>{" "}
            {format(new Date(schedule.startDateTime), "MMM dd, yyyy")}
          </p>
          <p>
            <strong>Start Time:</strong>{" "}
            {format(new Date(schedule.startDateTime), "h:mm a")}
          </p>
          <p>
            <strong>End Time:</strong>{" "}
            {format(new Date(schedule.endDateTime), "h:mm a")}
          </p>
          <p>
            <strong>Meeting Link:</strong> {schedule.meetingLink}
          </p>
          <p>
            <strong>Slots:</strong> {schedule.availableSlot}/
            {schedule.totalSlot}
          </p>
          <p>
            <strong>Status:</strong>{" "}
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
          </p>

          <div>
            <p>
              <strong>Appointments:</strong>
            </p>
            {schedule.Appointments.length === 0 ? (
              <p className="text-muted-foreground">No appointments booked.</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {schedule.Appointments.map((appointment) => (
                  <li key={appointment.id}>
                    {appointment.Patient.name} — {appointment.status}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
