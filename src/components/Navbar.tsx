import { useEffect, useState } from "react";

const links = [
  { label: "Deities", href: "#deities" },
  { label: "Vraj", href: "#corners" },
  { label: "Līlā", href: "#lila" },
  { label: "Experience", href: "#vcm" },
  { label: "Register", href: "#register" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#" className="font-heading text-lg text-primary tracking-wider">
          BrajRas
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
