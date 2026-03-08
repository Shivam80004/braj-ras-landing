import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-deep via-background to-maroon-deep opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_72%_52%/0.06)_0%,transparent_70%)]" />

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
