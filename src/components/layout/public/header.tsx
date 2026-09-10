import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import Link from "next/link";

const routes = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <HeartPulse aria-hidden="true" className="size-5" />
          </span>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            Medi<span className="text-primary">Care</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="relative py-2 text-sm font-medium text-muted-foreground transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:text-foreground hover:after:scale-x-100"
            >
              {route.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={"default"}
            size={"lg"}
            render={<Link href="/login" />}
            nativeButton={false}
          >
            Login
          </Button>
        </div>
      </nav>
    </header>
  );
}
