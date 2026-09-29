import {
  CalendarClock,
  ClipboardList,
  ShieldCheck,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Verified Doctors",
    description:
      "Every doctor is license-checked and approved before they can see patients.",
  },
  {
    icon: CalendarClock,
    title: "Easy Scheduling",
    description:
      "Browse open slots and book, reschedule, or cancel appointments in seconds.",
  },
  {
    icon: Video,
    title: "Virtual Consultations",
    description:
      "Meet your doctor from anywhere with a secure, built-in video link.",
  },
  {
    icon: ClipboardList,
    title: "Digital Records",
    description:
      "Your appointment history and prescriptions, always one click away.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Your health data is encrypted and never shared without your consent.",
  },
  {
    icon: Users,
    title: "Patient-Centered Care",
    description:
      "Tools built around you — from first booking to follow-up care.",
  },
];

export default function Services() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Why MediCare
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for better care
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            A single platform that connects patients and doctors with the
            tools both sides actually need.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
