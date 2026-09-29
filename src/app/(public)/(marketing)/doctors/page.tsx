import DoctorsList from "@/components/modules/doctorsPage/doctorsList";

export default function DoctorsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Our Doctors
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Find the right doctor for you
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Browse our network of verified specialists and book an appointment
          that fits your schedule.
        </p>
      </div>

      <div className="mt-12">
        <DoctorsList />
      </div>
    </div>
  );
}
