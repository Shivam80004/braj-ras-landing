import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Vrindavan temples at golden hour"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_72%_52%/0.08)_0%,transparent_70%)]" />
      </div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float-particle ${4 + i}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl shimmer text-gold-gradient leading-tight tracking-wide">
          BrajRas
        </h1>
        <p className="font-heading text-xl sm:text-2xl md:text-3xl text-primary/80 mt-4 tracking-[0.3em]">
          2026
        </p>
        <div className="ornament-divider max-w-xs mx-auto my-8">
          <span className="text-primary text-xl">✦</span>
        </div>
        <p className="font-body text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto italic leading-relaxed">
          The Mellows of Śrī Vṛndāvan Dhām
        </p>
      </div>

      <a
        href="#video"
        className="absolute bottom-10 z-10 text-primary/50 hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
