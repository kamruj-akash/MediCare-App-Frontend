import { HeartPulse } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-svh w-full flex-col items-center justify-center gap-4 bg-background px-4"
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <HeartPulse aria-hidden="true" className="size-6 animate-pulse" />
      </span>

      <div className="flex items-center gap-2">
        <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-primary" />
      </div>

      <span className="sr-only">Loading, please wait.</span>
    </div>
  );
}
