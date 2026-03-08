import { Mountain, Waves, UtensilsCrossed, Footprints } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const corners = [
  { icon: Mountain, title: "Govardhan", desc: "The sacred hill Krishna lifted with His little finger — walk its ancient parikrama path." },
  { icon: Waves, title: "Hidden Ghāts & Ancient Temples", desc: "Discover forgotten ghāts along the Yamunā and temples that hold centuries of prayer." },
  { icon: UtensilsCrossed, title: "Local Vraj Street Flavors", desc: "Taste the authentic flavors of Braj — from fresh pedā to fragrant lassi." },
  { icon: Footprints, title: "Parikrama Paths", desc: "Walk the same paths devotees have traversed for centuries, steeped in divine memory." },
];

export default function CornersSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="corners" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-royal/20 to-background" />

      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Corners of Vraj
          </h2>
          <p className="font-body text-xl text-foreground/60 mt-4 italic">We explore</p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {corners.map((c, i) => (
            <div
              key={c.title}
              className={`group flex gap-6 items-start p-8 rounded-lg gold-border gold-border-hover bg-card/30 backdrop-blur-sm transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="w-14 h-14 shrink-0 rounded-full border border-primary/30 bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <c.icon className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-base sm:text-lg text-primary mb-2">{c.title}</h3>
                <p className="font-body text-foreground/70 text-lg leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
