import { useVerifyEmailOtp } from "@/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "../ui/toast";

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const OTP_LENGTH = 6;
  const OTP_SLOTS = ["one", "two", "three", "four", "five", "six"] as const;

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
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {OTP_SLOTS.map((slot, index) => (
              <Input
                key={slot}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                value={otp[index]}
                onChange={(event) => updateOtp(index, event.target.value)}
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
    </>
  );
}
