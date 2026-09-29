import { CalendarCheck, UserPlus, Video } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create your account",
    description: "Sign up as a patient in minutes — no paperwork required.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Find & book a doctor",
    description:
      "Browse verified specialists and pick a time that works for you.",
  },
  {
    icon: Video,
    step: "03",
    title: "Get care",
    description:
      "Join your appointment, chat with your doctor, and get your prescription.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get care in three simple steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          <div
            aria-hidden="true"
            className="absolute top-9 right-0 left-0 hidden h-px bg-border sm:block"
          />

          {steps.map(({ icon: Icon, step, title, description }) => (
            <div key={step} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex size-[4.5rem] items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="mt-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground">
                STEP {step}
              </span>
              <h3 className="mt-2 text-base font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
