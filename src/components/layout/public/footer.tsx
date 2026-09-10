import { Globe2, HeartPulse, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  company: [
    { name: "About us", href: "/about-us" },
    { name: "Contact us", href: "/contact-us" },
  ],
  account: [
    { name: "Log in", href: "/login" },
    { name: "Create account", href: "/register" },
  ],
};

const socialLinks = [
  { name: "Community", Icon: Globe2 },
  { name: "Updates", Icon: Send },
  { name: "Contact", Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-300">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:px-10">
        <div className="max-w-sm">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse aria-hidden="true" className="size-5" />
            </span>
            <span className="font-heading text-xl font-bold tracking-tight text-white">
              Medi<span className="text-emerald-400">Care</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            Making quality healthcare simpler, more personal, and accessible for
            everyone.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ name, Icon }) => (
              <Link
                key={name}
                href="#"
                aria-label={name}
                className="flex size-9 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition-colors hover:border-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-400"
              >
                <Icon aria-hidden="true" className="size-4" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <div className="mt-5 space-y-3">
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-slate-400 transition-colors hover:text-emerald-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Your account</h2>
          <div className="mt-5 space-y-3">
            {footerLinks.account.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-slate-400 transition-colors hover:text-emerald-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">Get in touch</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-400">
            <p className="flex items-start gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-emerald-400"
              />
              <span>123 Wellness Avenue, Dhaka, Bangladesh</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone
                aria-hidden="true"
                className="size-4 shrink-0 text-emerald-400"
              />
              <span>+880 1234 567890</span>
            </p>
            <p className="flex items-center gap-3">
              <Mail
                aria-hidden="true"
                className="size-4 shrink-0 text-emerald-400"
              />
              <span>hello@medicare.com</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} MediCare. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="transition-colors hover:text-slate-300">
              Privacy policy
            </Link>
            <Link href="#" className="transition-colors hover:text-slate-300">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
