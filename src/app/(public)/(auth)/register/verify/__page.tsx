"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useVerifyEmailOtp } from "@/hooks";
import { CheckCircle2, Mail, MoveLeft, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

const OTP_LENGTH = 6;
const OTP_SLOTS = ["one", "two", "three", "four", "five", "six"] as const;

export default function VerifyRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { mutateAsync: verifyEmail, isPending } = useVerifyEmailOtp();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otpValue = otp.join("");

  const updateOtp = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const digits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (!digits.length) return;

    setOtp([...digits, ...Array(OTP_LENGTH - digits.length).fill("")]);
    inputRefs.current[Math.min(digits.length, OTP_LENGTH) - 1]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      toast.add({
        title: "Email address missing",
        description: "Please register again to receive a verification code.",
        type: "error",
      });
      return;
    }
    if (otpValue.length !== OTP_LENGTH) {
      toast.add({
        title: "Enter all six digits",
        description: "Please enter the complete code from your email.",
        type: "error",
      });
      inputRefs.current[otp.findIndex((digit) => !digit)]?.focus();
      return;
    }

    try {
      const response = await verifyEmail({ email, otp: otpValue });
      toast.add({
        title: "Email verified",
        description: response?.message || "Your account is ready to use.",
        type: "success",
      });
      router.push("/login");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "The code is invalid or expired.";
      toast.add({
        title: "Verification failed",
        description: message,
        type: "error",
      });
    }
  };

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
                Verify your email
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Enter the six-digit code we sent to
                {email ? (
                  <span className="block break-all font-medium text-foreground">
                    {email}
                  </span>
                ) : (
                  " your email address"
                )}
                .
              </p>

              <form onSubmit={handleSubmit} className="mt-7">
                <fieldset>
                  <legend className="sr-only">
                    Six-digit verification code
                  </legend>
                  <div
                    className="flex justify-between gap-2"
                    onPaste={handlePaste}
                  >
                    {OTP_SLOTS.map((slot, index) => (
                      <Input
                        key={slot}
                        ref={(element) => {
                          inputRefs.current[index] = element;
                        }}
                        value={otp[index]}
                        onChange={(event) =>
                          updateOtp(index, event.target.value)
                        }
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        aria-label={`Verification code digit ${index + 1}`}
                        className="h-12 min-w-0 flex-1 px-0 text-center text-lg font-semibold md:h-14"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </fieldset>

                <Button
                  disabled={isPending || otpValue.length !== OTP_LENGTH}
                  type="submit"
                  className="mt-7 w-full"
                >
                  {isPending ? "Verifying..." : "Verify email"}
                </Button>
              </form>

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
