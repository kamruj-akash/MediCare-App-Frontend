import Link from "next/link";

const routes = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
];
export default function Header() {
  return (
    <header className="w-full h-16">
      <nav className="flex items-center justify-center gap-2 h-full px-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="text-black hover:text-blue-950"
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
