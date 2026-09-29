import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import { BriefcaseMedical, GraduationCap, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-4">
        {doctor.user?.profileImage ? (
          <Image
            src={doctor.user.profileImage}
            alt={doctor.name}
            className="size-14 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary">
            {getInitials(doctor.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">
            {doctor.name}
          </h3>
          <p className="truncate text-sm text-primary">
            {doctor.specialization}
          </p>
        </div>
      </div>

      {doctor.bio && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {doctor.bio}
        </p>
      )}

      <div className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm text-muted-foreground">
        {doctor.qualification && (
          <p className="flex items-center gap-2.5">
            <GraduationCap
              className="size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            {doctor.qualification}
          </p>
        )}
        <p className="flex items-center gap-2.5">
          <BriefcaseMedical
            className="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          {doctor.expYear} {doctor.expYear === 1 ? "year" : "years"} of
          experience
        </p>
        <p className="flex items-center gap-2.5">
          <Wallet className="size-4 shrink-0 text-primary" aria-hidden="true" />
          {doctor.consultationFee} consultation fee
        </p>
      </div>

      <Button
        className="mt-6 h-10 w-full text-sm"
        render={<Link href={`/doctors/${doctor.id}`} />}
        nativeButton={false}
      >
        Book Appointment
      </Button>
    </div>
  );
}
