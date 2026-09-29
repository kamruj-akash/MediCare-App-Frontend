import CtaBanner from "@/components/modules/homePage/ctaBanner";
import {
  Award,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: HeartHandshake,
    title: "Patient First",
    description:
      "Every decision we make starts with what's best for the people who trust us with their health.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "Every doctor on our platform is license-verified, and your data is always encrypted and private.",
  },
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "Healthcare shouldn't be complicated. We keep booking, records, and follow-ups effortless.",
  },
  {
    icon: Award,
    title: "Quality Care",
    description:
      "We partner only with qualified, experienced specialists across every major field of medicine.",
  },
];

const stats = [
  { label: "Founded", value: "2023" },
  { label: "Verified doctors", value: "500+" },
  { label: "Patients served", value: "10k+" },
  { label: "Specialties covered", value: "30+" },
];

export default function AboutUs() {
  return (
    <div>
      <section className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute -top-32 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
              <Target className="size-3.5" aria-hidden="true" />
              Our Story
            </span>

            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Making healthcare simpler, one appointment at a time.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              MediCare was built to close the gap between patients and the
              care they need — connecting people with verified doctors,
              wherever they are, without the usual friction of clinic visits
              and paperwork.
            </p>

            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
              Today, we support thousands of patients and doctors with tools
              for scheduling, virtual consultations, and secure health
              records — all in one place.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-4xl bg-primary/5" />
            <div className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(15,118,110,.35)]">
              <Image
                src="/login-image.png"
                alt="Doctors collaborating on patient care"
                width={1240}
                height={1040}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40 py-12">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-5 sm:px-8 md:grid-cols-4 lg:px-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What we stand for
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our core values
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
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

      <section className="bg-muted/40 py-16 sm:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-5 text-center sm:px-8 lg:px-10">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users className="size-5" aria-hidden="true" />
          </span>
          <h2 className="max-w-2xl font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Built by a team that cares about getting healthcare right
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            We're a small team of engineers, clinicians, and designers
            working to make quality care accessible to everyone — no matter
            where they live or how busy their schedule is.
          </p>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
