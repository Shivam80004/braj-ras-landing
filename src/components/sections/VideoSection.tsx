import { Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function VideoSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="video" className="py-24 px-6">
      <div
        ref={ref}
        className={`container mx-auto max-w-4xl transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative aspect-video rounded-lg gold-border overflow-hidden bg-muted/30 group cursor-pointer">
          {/* Ornate corner accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/60 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/60 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/60 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/60 rounded-br-lg" />

          <div className="absolute inset-0 flex items-center justify-center bg-background/40">
            <div className="w-20 h-20 rounded-full border-2 border-primary/60 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
              <Play className="text-primary ml-1" size={32} />
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
