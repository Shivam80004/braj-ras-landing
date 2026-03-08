import { Trees, Droplets, Sun } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function LilaSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="lila" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-maroon-deep/40 to-background" />

      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Where Līlā Still Echoes
          </h2>
          <p className="font-body text-xl text-foreground/60 mt-4 italic max-w-xl mx-auto">
            The forests of Vraj hold memory.
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        {/* Kamyavan — featured */}
        <div
          className={`gold-border gold-border-hover rounded-lg p-10 md:p-14 bg-card/40 backdrop-blur-sm mb-12 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <Trees className="text-primary" size={28} />
            <h3 className="font-heading text-xl sm:text-2xl text-primary">Kāmyavan</h3>
          </div>
          <p className="font-body text-xl md:text-2xl text-foreground/80 leading-relaxed italic">
            Wander through the mystical forests of Kāmyavan. Walk the very grounds where Krishna and Balarām played, herded cows, and enchanted the universe.
          </p>
        </div>

        {/* Three smaller items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Droplets, title: "Sacred Kuṇḍas", desc: "Hidden ponds where the divine boys played their eternal pastimes." },
            { icon: Sun, title: "Fields of Vraja", desc: "Open meadows where cows once roamed freely under Krishna's loving care." },
            { icon: Trees, title: "Childhood Abodes", desc: "The very places where Krishna & Balarām spent their enchanting childhood." },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`gold-border gold-border-hover rounded-lg p-8 bg-card/30 backdrop-blur-sm transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${(i + 2) * 150}ms` : "0ms" }}
            >
              <item.icon className="text-primary mb-4" size={24} />
              <h3 className="font-heading text-sm sm:text-base text-primary mb-2">{item.title}</h3>
              <p className="font-body text-foreground/70 text-lg leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
