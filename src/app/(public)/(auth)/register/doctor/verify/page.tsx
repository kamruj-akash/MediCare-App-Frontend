"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import { useApplyAsDoctor } from "@/hooks";
import { applyAsDoctorData } from "@/types/doctor";
import { DoctorVerificationZodSchema } from "@/validation/auth.validation";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  FileText,
  FileUp,
  Plus,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// type DoctorVerificationValues = z.output<typeof DoctorVerificationZodSchema>;

const defaultValues: any = {
  otp: "",
  specialization: "",
  licenseNumber: "",
  qualification: "",
  expYear: 0,
  bio: "",
  consultationFee: "",
  contactNumber: "",
  resume: null as File | null,
  additionalFiles: [] as File[],
};

export default function VerifyDoctorRegistration() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");
  const { mutate: applyAsDoctor, isPending: isApplying } = useApplyAsDoctor();

  const form = useForm({
    defaultValues,
    validators: { onSubmit: DoctorVerificationZodSchema },
    onSubmit: async ({ value }) => {
      const doctorData: applyAsDoctorData = {
        email: email as string,
        otp: value.otp,
        specialization: value.specialization,
        licenseNumber: value.licenseNumber,
        qualification: value.qualification,
        expYear: value.expYear,
        bio: value.bio,
        consultationFee: value.consultationFee,
        contactNumber: value.contactNumber,
      };
      applyAsDoctor(
        {
          body: doctorData,
          resume: value.resume,
          additionalFiles: value.additionalFiles,
        },
        {
          onSuccess: () => {
            router.push("/auth/register/doctor/success");
            toast.add({
              title: "Application submitted",
              description:
                "Your application has been submitted successfully. We will review your application and get back to you soon.",
            });
          },
          onError: (error: any) => {
            toast.add({
              title: "Application failed",
              description:
                error?.response?.data?.message ||
                "An error occurred while submitting your application. Please try again.",
            });
          },
        },
      );
    },
  });

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

        <div className="flex flex-1 items-center justify-center ">
          <div className="w-full max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_50px_-28px_rgba(15,118,110,.35)]">
              <div className="px-6 py-7 sm:px-8 sm:py-9">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                  Complete your professional profile
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                  Enter the code sent to{" "}
                  <span className="font-bold">{email}</span> to verify your
                  email, then add the details patients need to know about your
                  practice.
                </p>

                <form
                  className="mt-2 space-y-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    form.handleSubmit();
                  }}
                >
                  <form.Field name="otp">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <div className="flex items-center justify-between gap-4">
                            <FieldLabel htmlFor={field.name}>
                              Verification code
                            </FieldLabel>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock3 className="size-3.5" aria-hidden="true" />
                              Expires in 10 minutes
                            </span>
                          </div>
                          <InputOTP
                            id={field.name}
                            maxLength={6}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            aria-invalid={isInvalid}
                            aria-label="Six-digit verification code"
                            containerClassName="gap-2"
                          >
                            <InputOTPGroup>
                              <InputOTPSlot
                                index={0}
                                className="size-11 rounded-l-lg text-base sm:size-12"
                              />
                              <InputOTPSlot
                                index={1}
                                className="size-11 text-base sm:size-12"
                              />
                              <InputOTPSlot
                                index={2}
                                className="size-11 rounded-r-lg text-base sm:size-12"
                              />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot
                                index={3}
                                className="size-11 rounded-l-lg text-base sm:size-12"
                              />
                              <InputOTPSlot
                                index={4}
                                className="size-11 text-base sm:size-12"
                              />
                              <InputOTPSlot
                                index={5}
                                className="size-11 rounded-r-lg text-base sm:size-12"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>

                  <div>
                    <div className="mb-5 flex items-center gap-2">
                      <BadgeCheck
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      <h2 className="text-sm font-semibold text-foreground">
                        Professional details
                      </h2>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <form.Field name="specialization">
                        {(field) => (
                          <TextField
                            field={field}
                            label="Specialization"
                            placeholder="e.g. Cardiology"
                          />
                        )}
                      </form.Field>
                      <form.Field name="licenseNumber">
                        {(field) => (
                          <TextField
                            field={field}
                            label="License number"
                            placeholder="e.g. DOC-99887"
                          />
                        )}
                      </form.Field>
                      <form.Field name="qualification">
                        {(field) => (
                          <TextField
                            field={field}
                            label="Qualification"
                            placeholder="e.g. MBBS, FCPS"
                          />
                        )}
                      </form.Field>
                      <form.Field name="expYear">
                        {(field) => (
                          <TextField
                            field={field}
                            label="Experience (years)"
                            placeholder="e.g. 8"
                            type="number"
                          />
                        )}
                      </form.Field>
                      <form.Field name="consultationFee">
                        {(field) => (
                          <TextField
                            field={field}
                            label="Consultation fee (৳)"
                            placeholder="e.g. 1500"
                            inputMode="decimal"
                          />
                        )}
                      </form.Field>
                      <form.Field name="contactNumber">
                        {(field) => (
                          <TextField
                            field={field}
                            label="Contact number"
                            placeholder="e.g. 01711111111"
                            type="tel"
                          />
                        )}
                      </form.Field>
                    </div>
                  </div>

                  <form.Field name="bio">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <div className="flex items-center justify-between gap-4">
                            <FieldLabel htmlFor={field.name}>
                              Professional bio
                            </FieldLabel>
                            <span className="text-xs text-muted-foreground">
                              {field.state.value.length}/1000
                            </span>
                          </div>
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(event) =>
                              field.handleChange(event.target.value)
                            }
                            placeholder="Briefly describe your clinical experience and areas of care."
                            maxLength={1000}
                            aria-invalid={isInvalid}
                            className="min-h-10 w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>

                  <form.Field name="resume">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      const file = field.state.value;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Resume</FieldLabel>

                          <div className="flex items-center gap-3 border border-dashed border-border bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground">
                            {file ? (
                              <span className="flex items-center gap-2 border">
                                <FileText size={16} color="green" />
                                {file.name}{" "}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    field.handleChange(null);
                                  }}
                                >
                                  <X />
                                </Button>
                              </span>
                            ) : (
                              <>
                                <Button
                                  render={
                                    <label htmlFor={field.name}>
                                      <FileUp size={4} /> Upload resume
                                    </label>
                                  }
                                  nativeButton={false}
                                  variant={"outline"}
                                >
                                  <FileUp size={4} /> Upload resume
                                </Button>

                                <input
                                  className="sr-only"
                                  id={field.name}
                                  name={field.name}
                                  type="file"
                                  onBlur={field.handleBlur}
                                  aria-invalid={isInvalid}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    field.handleChange(file);
                                    e.target.value = "";
                                  }}
                                />
                              </>
                            )}
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>

                  <form.Field name="additionalFiles">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      const files = field.state.value;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Additional Files
                          </FieldLabel>

                          <div className="flex items-center gap-3 border border-dashed border-border bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground">
                            <Button
                              render={
                                <label htmlFor={field.name}>
                                  <Plus size={4} /> Add Files
                                </label>
                              }
                              nativeButton={false}
                              variant={"outline"}
                            >
                              <Plus size={4} /> Add Files
                            </Button>

                            <input
                              className="sr-only"
                              id={field.name}
                              name={field.name}
                              type="file"
                              multiple
                              onBlur={field.handleBlur}
                              aria-invalid={isInvalid}
                              onChange={(e) => {
                                const selectedFiles = Array.from(
                                  e.target.files || [],
                                );
                                field.handleChange([
                                  ...files,
                                  ...selectedFiles,
                                ]);
                                field.handleBlur();
                              }}
                            />
                            {files.length > 0 && (
                              <ul className="flex flex-wrap gap-2">
                                {files.map((file: any, index: number) => {
                                  return (
                                    <li
                                      key={`${file.name}-${index}`}
                                      className="flex items-center gap-1 border"
                                    >
                                      <FileText size={16} color="green" />
                                      <span>{file.name}</span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          const updatedFiles = files.filter(
                                            (_: any, i: number) => i !== index,
                                          );
                                          field.handleChange(updatedFiles);
                                        }}
                                      >
                                        <X />
                                      </Button>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>

                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  </form.Field>

                  <Button
                    type="submit"
                    disabled={isApplying}
                    className="h-11 w-full text-sm"
                  >
                    {isApplying
                      ? "Submitting application..."
                      : "Verify and submit application"}
                    {!isApplying && (
                      <ArrowRight className="size-4" aria-hidden="true" />
                    )}
                  </Button>
                </form>
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
              Care begins with a trusted connection.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-7 text-primary-foreground/75">
              Complete this quick step to securely activate your MediCare
              professional profile.
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

function TextField({
  field,
  label,
  placeholder,
  type = "text",
  inputMode,
}: {
  field: AnyFieldApi;
  label: string;
  placeholder: string;
  type?: "text" | "number" | "tel";
  inputMode?: "decimal";
}) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={String(field.state.value)}
        onBlur={field.handleBlur}
        onChange={(event) =>
          field.handleChange(
            type === "number" ? Number(event.target.value) : event.target.value,
          )
        }
        aria-invalid={isInvalid}
        className="h-10 rounded-lg text-sm"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
