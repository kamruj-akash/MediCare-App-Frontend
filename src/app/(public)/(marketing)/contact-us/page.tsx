import ContactForm from "@/components/modules/contactUs/contactForm";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Wellness Avenue", "Dhaka, Bangladesh"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+880 1234 567890"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@medicare.com"],
  },
  {
    icon: Clock3,
    title: "Working Hours",
    lines: ["Sat – Thu: 9:00 AM – 8:00 PM"],
  },
];

export default function ContactUs() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
            <MessageCircle className="size-3.5" aria-hidden="true" />
            Get in Touch
          </span>
          <h1 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            We'd love to hear from you
          </h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Questions about booking, your account, or partnering with us?
            Reach out and our team will get back to you shortly.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <span className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {title}
              </h3>
              <div className="mt-1.5 space-y-0.5">
                {lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form and it'll open in your email client, ready to
            send.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
