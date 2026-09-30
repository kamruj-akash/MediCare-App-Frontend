"use client";

import AuthGuard from "@/components/auth/authGuard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/toast";
import { useBookAppointment } from "@/hooks/appointment.hook";
import { useGetAllDoctors } from "@/hooks/doctor.hook";
import { useGetMe } from "@/hooks/auth.hook";
import { useGetDoctorTodaySchedule } from "@/hooks/schedule.hook";
import { format } from "date-fns";
import {
  ArrowLeft,
  BriefcaseMedical,
  CalendarClock,
  GraduationCap,
  Mail,
  Phone,
  ShieldCheck,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function DoctorDetailContent({ doctorId }: { doctorId: string }) {
  const { data, isLoading, isError } = useGetAllDoctors({
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "asc",
  });
  const doctor = data?.data.data.find((doc) => doc.id === doctorId);

  const { data: meRes } = useGetMe();
  const canBookAppointment = meRes?.data?.role === "PATIENT";

  const {
    data: todayScheduleRes,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
  } = useGetDoctorTodaySchedule(doctorId);
  const todaySchedules = todayScheduleRes?.data ?? [];

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 md:py-16 lg:px-10">
      <Link
        href="/doctors"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Doctors
      </Link>

      <div className="mt-6">
        {isLoading ? (
          <DoctorHeaderSkeleton />
        ) : isError || !doctor ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">
              We couldn't find this doctor. They may no longer be available.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="relative bg-primary/5 px-6 py-10 sm:px-10">
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
                <span className="flex size-20 shrink-0 items-center justify-center rounded-3xl bg-primary/10 text-2xl font-semibold text-primary">
                  {getInitials(doctor.name)}
                </span>
                <div>
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {doctor.name}
                    </h1>
                    {doctor.verificationStatus === "APPROVE" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        <ShieldCheck className="size-3.5" aria-hidden="true" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-base font-medium text-primary">
                    {doctor.specialization}
                  </p>
                  {doctor.bio && (
                    <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                      {doctor.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-6 border-t border-border p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
              {doctor.qualification && (
                <InfoItem
                  icon={GraduationCap}
                  label="Qualification"
                  value={doctor.qualification}
                />
              )}
              <InfoItem
                icon={BriefcaseMedical}
                label="Experience"
                value={`${doctor.expYear} ${doctor.expYear === 1 ? "year" : "years"}`}
              />
              <InfoItem
                icon={Wallet}
                label="Consultation Fee"
                value={doctor.consultationFee}
              />
              <InfoItem icon={Mail} label="Email" value={doctor.email} />
              {doctor.contactNumber && (
                <InfoItem
                  icon={Phone}
                  label="Contact"
                  value={doctor.contactNumber}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarClock className="size-4.5" aria-hidden="true" />
          </span>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Today's Availability
          </h2>
        </div>

        <div className="mt-5">
          {isScheduleLoading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-28 rounded-2xl" />
              <Skeleton className="h-28 rounded-2xl" />
            </div>
          ) : isScheduleError ? (
            <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              Something went wrong while loading today's schedule.
            </p>
          ) : todaySchedules.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center">
              <Users
                className="mx-auto size-6 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="mt-3 text-sm text-muted-foreground">
                No available slots today. Please check back tomorrow.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {todaySchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      {format(new Date(schedule.startDateTime), "h:mm a")} –{" "}
                      {format(new Date(schedule.endDateTime), "h:mm a")}
                    </p>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {schedule.availableSlot}/{schedule.totalSlot} slots
                    </span>
                  </div>
                  {schedule.meetingLink && (
                    <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Video className="size-3.5 shrink-0" aria-hidden="true" />
                      Virtual consultation via secure video link
                    </p>
                  )}
                  {canBookAppointment ? (
                    <BookAppointmentButton
                      doctorId={doctorId}
                      scheduleId={schedule.id}
                      disabled={schedule.availableSlot === 0}
                    />
                  ) : (
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      Only patients can book appointments.
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BookAppointmentButton({
  doctorId,
  scheduleId,
  disabled,
}: {
  doctorId: string;
  scheduleId: string;
  disabled?: boolean;
}) {
  const { mutate, isPending } = useBookAppointment();

  const handleBook = () => {
    mutate(
      { doctorId, scheduleId },
      {
        onSuccess: (res) => {
          if (res.data) {
            window.location.href = res.data;
            return;
          }
          toast.add({
            title: "Booking failed",
            description: "No payment link was returned. Please try again.",
          });
        },
        onError: (error) => {
          toast.add({
            title: "Booking failed",
            description:
              "Something went wrong while booking your appointment. Please try again.",
          });
          console.error("Error booking appointment:", error);
        },
      },
    );
  };

  return (
    <Button
      size="sm"
      className="mt-4 w-full"
      disabled={disabled || isPending}
      onClick={handleBook}
    >
      {isPending
        ? "Redirecting to payment..."
        : disabled
          ? "Fully Booked"
          : "Book Appointment"}
    </Button>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof GraduationCap;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

function DoctorHeaderSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <div className="flex flex-col items-center gap-5 bg-primary/5 px-6 py-10 sm:flex-row sm:px-10">
        <Skeleton className="size-20 shrink-0 rounded-3xl" />
        <div className="w-full space-y-3">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>
      <div className="grid gap-6 border-t border-border p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-12" />
        ))}
      </div>
    </div>
  );
}

export default function DoctorDetail({ doctorId }: { doctorId: string }) {
  return (
    <AuthGuard roles={["ADMIN", "DOCTOR", "PATIENT", "SUPER_ADMIN"]}>
      <DoctorDetailContent doctorId={doctorId} />
    </AuthGuard>
  );
}
