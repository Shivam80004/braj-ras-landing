import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";
import vrindavanVideo from "@/assets/Vrindavan Folk Trip 2022.mp4";

export default function VideoSection() {
  const { ref, visible } = useScrollReveal();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="video" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-texture-move cursor-default pointer-events-none" />

      <div
        ref={ref}
        className={`container mx-auto max-w-4xl transition-all duration-1000 relative z-10 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden group shadow-2xl bg-background/30 backdrop-blur-xl border border-primary/20 pointer-events-none">
          <video
            ref={videoRef}
            src={vrindavanVideo}
            poster={heroBg}
            className="w-full h-full object-cover transition-transform duration-700"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <p className="text-center font-body text-muted-foreground mt-6 text-lg italic pointer-events-auto">
          A glimpse into the divine land of Vraja
        </p>
      </div>
    </section>
  );
}
