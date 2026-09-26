import { HeartPulse } from "lucide-react";

export default function Logo() {
  return (
    <>
      {" "}
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
        <HeartPulse aria-hidden="true" className="size-5" />
      </span>
      <span className="font-heading text-xl font-bold tracking-tight text-foreground">
        Medi<span className="text-primary">Care</span>
      </span>
    </>
  );
}
