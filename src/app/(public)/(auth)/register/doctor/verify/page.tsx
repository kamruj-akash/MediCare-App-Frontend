"use client";

import { CheckCircle2, Mail, MoveLeft, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

/**  {"email":"{{newDoctorEmail}}",
 * "otp":"{{otp}}",
 * "specialization":"Cardiology",
 * "licenseNumber":"DOC-99887",
 * "qualification":"MBBS, FCPS",
 * "expYear":8,
 * "bio":"Cardiologist with 8 years of experience.",
 * "consultationFee":"1500",
 * "contactNumber":"01711111111"} */

export default function VerifyDoctorRegistration() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <section className="flex flex-col p-6 md:p-10">
        <Link href="/" className="flex w-fit items-center gap-2 font-medium">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="size-4" aria-hidden="true" />
          </span>
          MediCare
        </Link>

        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="border border-border bg-card p-7 shadow-sm md:p-9">
              <div className="mb-7 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="size-6" aria-hidden="true" />
              </div>
              <p className="mb-2 text-sm font-medium text-primary">
                One last step
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">
                Verify your email and complete your registration
              </h1>
              <Suspense
                fallback={
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Loading...
                  </p>
                }
              >
                {/* <VerifyOtp /> */}
              </Suspense>

              <div className="my-7 flex gap-3 border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p>
                  The code expires shortly. Check your spam or promotions folder
                  if you can&apos;t find it.
                </p>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Entered the wrong email?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Register again
                </Link>
              </p>
            </div>

            <Link
              href="/register"
              className="mt-6 flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <MoveLeft className="size-4" aria-hidden="true" />
              Back to registration
            </Link>
          </div>
        </div>
      </section>

      <aside className="relative hidden bg-muted lg:block">
        <Image
          src="/login-image.png"
          alt="Healthcare professional reviewing a patient's medical record"
          fill
          sizes="50vw"
          className="object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
        <div className="absolute inset-0 bg-primary/15" />
      </aside>
    </main>
  );
}
