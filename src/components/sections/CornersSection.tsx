import { useScrollReveal } from "@/hooks/useScrollReveal";
import govardhan from "@/assets/govardhan.jpg";
import ghats from "@/assets/ghats.jpg";
import streetFood from "@/assets/street-food.jpg";
import parikrama from "@/assets/parikrama.jpg";

const corners = [
  {
    title: "Govardhan",
    desc: "The sacred hill Krishna lifted with His little finger to protect the inhabitants of Vraja from the wrath of Indra. Walk its ancient 21-kilometer parikrama path at dawn and feel the timeless devotion embedded in every stone.",
    image: govardhan,
    large: true,
  },
  {
    title: "Hidden Ghāts & Ancient Temples",
    desc: "Discover forgotten ghāts along the Yamunā and centuries-old temples that hold the prayers of countless devotees. Each step reveals a new layer of Vraja's spiritual history.",
    image: ghats,
    large: false,
  },
  {
    title: "Local Vraj Street Flavors",
    desc: "Taste the authentic flavors of Braj — from fresh Mathura pedā to fragrant lassi, from crispy kachoris to the sweetest jalebis. Every bite is an offering.",
    image: streetFood,
    large: false,
  },
  {
    title: "Parikrama Paths",
    desc: "Walk the same dusty paths that devotees have traversed for centuries. Every footstep is a prayer, every turn reveals a new vista of devotion steeped in divine memory.",
    image: parikrama,
    large: true,
  },
];

export default function CornersSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="corners" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-royal/10 to-background" />
      <div className="absolute inset-0 opacity-[0.02] bg-texture-move" />

      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Corners of Vraj
          </h2>
          <p className="font-body text-xl text-foreground/50 mt-4 italic">We explore</p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div className="space-y-6">
          {corners.map((c, i) => (
            <div
              key={c.title}
              className={`group relative rounded-xl overflow-hidden transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${c.large ? "h-[400px] md:h-[500px]" : ""}`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
            >
              {c.large ? (
                // Full-width immersive card
                <div className="relative h-full">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-lg p-8 md:p-12">
                      <h3 className="font-heading text-2xl md:text-3xl text-primary mb-4">{c.title}</h3>
                      <p className="font-body text-foreground/80 text-lg md:text-xl leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-500" />
                </div>
              ) : null}
            </div>
          ))}

          {/* Two smaller cards in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corners.filter(c => !c.large).map((c, i) => (
              <div
                key={c.title}
                className={`group relative rounded-xl overflow-hidden h-[350px] transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: visible ? `${(i + 2) * 150}ms` : "0ms" }}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="font-heading text-lg md:text-xl text-primary mb-2">{c.title}</h3>
                  <p className="font-body text-foreground/70 text-base md:text-lg leading-relaxed">{c.desc}</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
