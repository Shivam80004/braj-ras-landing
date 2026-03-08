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
  },
  {
    title: "Hidden Ghāts & Ancient Temples",
    desc: "Discover forgotten ghāts along the Yamunā and centuries-old temples that hold the prayers of countless devotees.",
    image: ghats,
  },
  {
    title: "Local Vraj Street Flavors",
    desc: "Taste the authentic flavors of Braj — from fresh Mathura pedā to fragrant lassi, from crispy kachoris to the sweetest jalebis.",
    image: streetFood,
  },
  {
    title: "Parikrama Paths",
    desc: "Walk the same dusty paths that devotees have traversed for centuries. Every footstep is a prayer, every turn reveals a new vista of devotion.",
    image: parikrama,
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

        {/* Govardhan — hero card */}
        <div
          className={`group relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] mb-6 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <img
            src={corners[0].image}
            alt={corners[0].title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto md:max-w-lg">
            <div className="bg-background/40 backdrop-blur-xl border border-primary/20 rounded-xl p-6 md:p-8">
              <h3 className="font-heading text-xl md:text-2xl text-primary mb-3">{corners[0].title}</h3>
              <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed">{corners[0].desc}</p>
            </div>
          </div>
        </div>

        {/* Middle two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {corners.slice(1, 3).map((c, i) => (
            <div
              key={c.title}
              className={`group relative rounded-2xl overflow-hidden h-[350px] md:h-[400px] transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${(i + 1) * 150}ms` : "0ms" }}
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-background/30 backdrop-blur-xl border border-primary/15 rounded-xl p-5">
                  <h3 className="font-heading text-sm md:text-base text-primary mb-2">{c.title}</h3>
                  <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Parikrama — full width */}
        <div
          className={`group relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "450ms" }}
        >
          <img
            src={corners[3].image}
            alt={corners[3].title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-lg p-8 md:p-12">
              <div className="bg-background/30 backdrop-blur-xl border border-primary/15 rounded-xl p-6 md:p-8">
                <h3 className="font-heading text-xl md:text-2xl text-primary mb-3">{corners[3].title}</h3>
                <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed">{corners[3].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
