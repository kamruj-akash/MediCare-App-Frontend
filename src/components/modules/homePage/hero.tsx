import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Verified doctors", value: "500+" },
  { label: "Patients served", value: "10k+" },
  { label: "Specialties", value: "30+" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Trusted virtual care
          </span>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            Quality healthcare,{" "}
            <span className="text-primary">right when you need it.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            Book appointments with verified doctors, manage your schedule,
            and get care from anywhere — all in one simple, secure platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 px-6 text-sm"
              render={<Link href="/register" />}
              nativeButton={false}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-6 text-sm"
              render={<Link href="/about-us" />}
              nativeButton={false}
            >
              Learn More
            </Button>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Licensed doctors, verified before they ever see a patient.
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-4xl bg-primary/5" />
          <div className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(15,118,110,.35)]">
            <Image
              src="/login-image.png"
              alt="A doctor and a clinician reviewing a patient's health record"
              width={1240}
              height={1040}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:-left-10">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-4.5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Appointment confirmed
              </p>
              <p className="text-xs text-muted-foreground">
                Dr. Alam · Today, 3:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
