import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-4xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full border border-primary-foreground/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full border border-primary-foreground/10" />

          <span className="relative mx-auto flex size-12 items-center justify-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm">
            <Stethoscope className="size-5" aria-hidden="true" />
          </span>

          <h2 className="relative mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to take control of your health?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm leading-6 text-primary-foreground/80 sm:text-base">
            Join thousands of patients getting faster, simpler access to
            trusted doctors — or apply to bring your practice online.
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-11 w-full px-6 text-sm sm:w-auto"
              render={<Link href="/register" />}
              nativeButton={false}
            >
              Book an Appointment
            </Button>
            <Button
              size="lg"
              className="h-11 w-full border border-primary-foreground/30 bg-primary-foreground/10 px-6 text-sm text-primary-foreground hover:bg-primary-foreground/20 sm:w-auto"
              render={<Link href="/register/doctor" />}
              nativeButton={false}
            >
              Join as a Doctor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
