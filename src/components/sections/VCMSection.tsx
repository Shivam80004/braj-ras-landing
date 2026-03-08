import { Church, TreePine, PartyPopper, Utensils, Bed, Waves } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const facilities = [
  { icon: Church, title: "Temple Hall", desc: "Grand kīrtan and extraordinary prayers in a magnificent temple hall." },
  { icon: TreePine, title: "Parks", desc: "Serene green spaces for japa, meditation, and mindfulness." },
  { icon: PartyPopper, title: "Festival", desc: "Immerse yourself in grand celebrations and joyous congregational chanting." },
  { icon: Utensils, title: "Prasādam", desc: "Honor pure, karma-free meals prepared with love and devotion." },
  { icon: Bed, title: "Stay", desc: "Comfortable accommodation within a spiritual atmosphere." },
  { icon: Waves, title: "Yamunā Vihār", desc: "Hear the stories on the lap of Mother Yamunā, who witnessed the divine pastimes." },
];

export default function VCMSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="vcm" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-royal/15 to-background" />

      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            The Experience
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f, i) => (
            <div
              key={f.title}
              className={`group gold-border gold-border-hover rounded-lg p-8 bg-card/40 backdrop-blur-sm transition-all duration-700 hover:bg-card/60 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="w-14 h-14 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <f.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-base sm:text-lg text-primary mb-3">{f.title}</h3>
              <p className="font-body text-foreground/70 text-lg leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
