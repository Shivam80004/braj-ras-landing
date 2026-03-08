import { Music, MapPin, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const perks = [
  { icon: Music, title: "Soul-Stirring Kīrtans", desc: "Experience kīrtans that move the very core of your being." },
  { icon: MapPin, title: "Discover Vraj", desc: "Guided journeys through the sacred land of Vraja." },
  { icon: Sparkles, title: "Curated Experiences", desc: "Thoughtfully designed moments that connect you to the divine." },
];

export default function PerksSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-20 px-6">
      <div ref={ref} className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2
            className={`font-heading text-2xl sm:text-3xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Trip Perks
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-8 justify-center">
          {perks.map((p, i) => (
            <div
              key={p.title}
              className={`flex-1 text-center p-8 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-primary/40 flex items-center justify-center bg-primary/5">
                <p.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-heading text-sm sm:text-base text-primary mb-2">{p.title}</h3>
              <p className="font-body text-foreground/60 text-lg">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
