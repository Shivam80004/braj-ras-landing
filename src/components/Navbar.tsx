import { useEffect, useState, useRef } from "react";

const links = [
  { label: "Journey", href: "#itinerary" },
  { label: "Experiences", href: "#vcm" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Register", href: "#register" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // Use a ref to track scroll position without triggering re-renders or effect re-runs
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        
        // Handle navbar background transparency
        setScrolled(currentScrollY > 60);

        // Handle navbar visibility
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down & past threshold
          setIsVisible(false);
        } else {
          // Scrolling up or at top
          setIsVisible(true);
        }

        // Remember current page location to use in the next move
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-background/30 backdrop-blur-xl border-b border-primary/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#" className="font-heading text-2xl tracking-widest uppercase" style={{
          background: 'linear-gradient(135deg, hsl(43 80% 70% / 0.5), hsl(43 72% 52% / 0.5), hsl(43 65% 35% / 0.5))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
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
