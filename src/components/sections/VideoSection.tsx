import { Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";

export default function VideoSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="video" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-texture-move" />

      <div
        ref={ref}
        className={`container mx-auto max-w-4xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer bg-background/30 backdrop-blur-xl border border-primary/20">
          <img
            src={heroBg}
            alt="Video placeholder"
            className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/40" />

          {/* Glassmorphism play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-background/30 backdrop-blur-xl border border-primary/40 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/60 transition-all duration-500 group-hover:scale-110">
              <Play className="text-primary ml-1" size={36} />
            </div>
          </div>
        </div>
        <p className="text-center font-body text-muted-foreground mt-6 text-lg italic">
          A glimpse into the divine land of Vraja
        </p>
      </div>
    </section>
  );
}
