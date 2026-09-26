import { HeartPulse, Loader2 } from "lucide-react";

export default function AuthLoading() {
  return (
    <div
      //   role="status"
      aria-live="polite"
      className="flex min-h-svh w-full flex-col items-center justify-center gap-6 bg-background px-4"
    >
      <span className="relative flex size-14 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <HeartPulse aria-hidden="true" className="size-7 animate-pulse" />
        <Loader2
          aria-hidden="true"
          className="absolute -inset-2 size-[calc(100%+1rem)] animate-spin text-primary/40"
          strokeWidth={1.5}
        />
      </span>

      <div className="space-y-1 text-center">
        <p className="font-heading text-lg font-bold tracking-tight text-foreground">
          Medi<span className="text-primary">Care</span>
        </p>
        <p className="text-sm text-muted-foreground">Verifying your session…</p>
      </div>

      <span className="sr-only">Checking authentication, please wait.</span>
    </div>
  );
}
