import { useScrollReveal } from "@/hooks/useScrollReveal";
import kamyavan from "@/assets/kamyavan.jpg";
import kunda from "@/assets/kunda.jpg";
import fields from "@/assets/fields.jpg";
import govardhan from "@/assets/govardhan.jpg";

const subItems = [
  { title: "Sacred Kuṇḍas", desc: "Hidden ponds scattered through the forests where the divine boys played their eternal pastimes — each one holds a unique story, a unique prayer.", image: kunda },
  { title: "Fields of Vraja", desc: "Open meadows where cows once roamed freely under Krishna's loving care. The golden light here feels different — warmer, older, more alive.", image: fields },
  { title: "Childhood Abodes", desc: "The very places where Krishna & Balarām spent their enchanting childhood — Gokul, Nandagaon, Barsana — each village pulses with living memory.", image: govardhan },
];

export default function LilaSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="lila" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-maroon-deep/30 to-background" />

      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Where Līlā Still Echoes
          </h2>
          <p className="font-body text-xl text-foreground/50 mt-4 italic max-w-xl mx-auto">
            The forests of Vraj hold memory.
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        {/* Kamyavan — full-width immersive */}
        <div
          className={`group relative rounded-xl overflow-hidden h-[450px] md:h-[550px] mb-8 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <img
            src={kamyavan}
            alt="Mystical forests of Kamyavan"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl p-8 md:p-14">
              <h3 className="font-heading text-2xl md:text-4xl text-primary mb-4">Kāmyavan</h3>
              <p className="font-body text-xl md:text-2xl text-foreground/80 leading-relaxed italic">
                Wander through the mystical forests of Kāmyavan. Walk the very grounds where Krishna and Balarām played, herded cows, and enchanted the universe.
              </p>
              <p className="font-body text-foreground/50 mt-4 text-lg">
                Every rustling leaf whispers a forgotten story. Every shaft of light through the canopy feels like darśan.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-500" />
        </div>

        {/* Three sub-items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subItems.map((item, i) => (
            <div
              key={item.title}
              className={`group relative rounded-xl overflow-hidden h-[350px] transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${(i + 2) * 150}ms` : "0ms" }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-sm sm:text-base text-primary mb-2">{item.title}</h3>
                <p className="font-body text-foreground/70 text-base leading-relaxed">{item.desc}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
