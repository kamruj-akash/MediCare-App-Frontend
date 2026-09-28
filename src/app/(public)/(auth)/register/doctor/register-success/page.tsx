import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock3,
  Mail,
  ShieldCheck,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    icon: Mail,
    title: "Confirmation received",
    description: "We've emailed you a copy of your submitted application.",
  },
  {
    icon: UserCheck,
    title: "Credential review",
    description:
      "Our team verifies your license and qualifications, usually within 1-2 business days.",
  },
  {
    icon: ShieldCheck,
    title: "Account activation",
    description:
      "Once approved, you'll get an email to set up your password and start accepting patients.",
  },
];

export default function DoctorRegisterSuccessPage() {
  return (
    <main className="grid min-h-svh bg-background lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,.95fr)]">
      <section className="flex min-w-0 flex-col px-5 py-6 sm:px-8 md:px-12 md:py-10">
        <Link
          href="/"
          className="flex w-fit items-center gap-2.5 text-sm font-semibold tracking-tight"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/25">
            <ShieldCheck className="size-4.5" aria-hidden="true" />
          </span>
          MediCare
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_50px_-28px_rgba(15,118,110,.35)]">
              <div className="px-6 py-7 sm:px-8 sm:py-9">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CheckCircle2 className="size-7" aria-hidden="true" />
                </div>

                <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                  Application submitted
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                  Thanks for applying to join MediCare. Our team will review
                  your credentials and get back to you soon.
                </p>

                <div className="mt-8 space-y-5 border-t border-border pt-7">
                  {steps.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex items-start gap-4">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                        <Icon className="size-4.5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {title}
                        </p>
                        <p className="mt-0.5 text-sm leading-6 text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row">
                  <Button
                    render={<Link href="/login" />}
                    className="h-11 flex-1 text-sm"
                  >
                    Go to login
                  </Button>
                  <Button
                    variant="outline"
                    render={<Link href="/" />}
                    className="h-11 flex-1 text-sm"
                  >
                    Back to home
                  </Button>
                </div>

                <p className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  Typical review time is 1-2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-primary lg:block">
        <Image
          src="/login-image.png"
          alt="Healthcare professional reviewing a patient's medical record"
          fill
          sizes="50vw"
          className="object-cover opacity-35 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/95 to-[oklch(0.32_0.07_167)]" />
        <div className="absolute -right-24 -top-20 size-96 rounded-full border border-primary-foreground/10" />
        <div className="absolute -bottom-32 -left-24 size-120 rounded-full border border-primary-foreground/10" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground xl:p-16">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm">
            <Stethoscope className="size-5" aria-hidden="true" />
          </div>
          <div className="max-w-md">
            <div className="mb-6 h-px w-14 bg-primary-foreground/60" />
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/70">
              For clinicians
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              You're one step closer to joining our network.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-primary-foreground/75">
              We'll notify you by email as soon as your profile is reviewed
              and approved.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-foreground/75">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/10">
              <CheckCircle2 className="size-4" aria-hidden="true" />
            </span>
            Secure registration for healthcare professionals
          </div>
        </div>
      </aside>
    </main>
  );
}
