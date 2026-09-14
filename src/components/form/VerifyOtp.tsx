import { useVerifyEmailOtp } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { toast } from "../ui/toast";

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const OTP_LENGTH = 6;

  const { mutateAsync: verifyEmail, isPending } = useVerifyEmailOtp();
  const [otpValue, setOtpValue] = useState("");

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
    <>
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
          <legend className="sr-only">Six-digit verification code</legend>
          <InputOTP
            maxLength={OTP_LENGTH}
            value={otpValue}
            onChange={setOtpValue}
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label="Six-digit verification code"
            containerClassName="justify-center gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="size-12 text-lg font-semibold md:size-14"
              />
              <InputOTPSlot
                index={1}
                className="size-12 text-lg font-semibold md:size-14"
              />
              <InputOTPSlot
                index={2}
                className="size-12 text-lg font-semibold md:size-14"
              />
            </InputOTPGroup>
            <InputOTPSeparator className="text-muted-foreground" />
            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                className="size-12 text-lg font-semibold md:size-14"
              />
              <InputOTPSlot
                index={4}
                className="size-12 text-lg font-semibold md:size-14"
              />
              <InputOTPSlot
                index={5}
                className="size-12 text-lg font-semibold md:size-14"
              />
            </InputOTPGroup>
          </InputOTP>
        </fieldset>

        <Button
          disabled={isPending || otpValue.length !== OTP_LENGTH}
          type="submit"
          className="mt-7 w-full"
        >
          {isPending ? "Verifying..." : "Verify email"}
        </Button>
      </form>
    </>
  );
}
