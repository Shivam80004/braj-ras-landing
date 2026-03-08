import { Music, MapPin, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import yamuna from "@/assets/yamuna.jpg";

const perks = [
  { icon: Music, title: "Soul-Stirring Kīrtans", desc: "Experience kīrtans that move the very core of your being — ancient melodies that unlock the heart." },
  { icon: MapPin, title: "Discover Vraj", desc: "Guided journeys through the sacred land, with storytelling that brings every stone and river alive." },
  { icon: Sparkles, title: "Curated Experiences", desc: "Thoughtfully designed moments — from sunrise ārati to evening boat rides on the Yamunā." },
];

export default function PerksSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={yamuna} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-background/88" />
      </div>

      <div ref={ref} className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <h2
            className={`font-heading text-2xl sm:text-3xl md:text-4xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Trip Perks
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {perks.map((p, i) => (
            <div
              key={p.title}
              className={`text-center p-8 rounded-2xl bg-background/25 backdrop-blur-xl border border-primary/15 hover:border-primary/30 hover:bg-background/35 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 flex items-center justify-center">
                <p.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-heading text-sm sm:text-base text-primary mb-3">{p.title}</h3>
              <p className="font-body text-foreground/60 text-lg leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
