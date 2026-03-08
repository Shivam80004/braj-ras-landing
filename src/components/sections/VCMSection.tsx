import { useScrollReveal } from "@/hooks/useScrollReveal";
import kirtan from "@/assets/kirtan.jpg";
import kunda from "@/assets/kunda.jpg";
import deity2 from "@/assets/deity-2.jpg";
import prasadam from "@/assets/prasadam.jpg";
import deity3 from "@/assets/deity-3.jpg";
import yamuna from "@/assets/yamuna.jpg";

const facilities = [
  { title: "Temple Hall", desc: "Grand kīrtan and extraordinary prayers in a magnificent temple hall that resonates with centuries of devotion.", image: kirtan, span: "md:col-span-2 md:row-span-2" },
  { title: "Parks", desc: "Serene green spaces designed for japa, quiet meditation, and deep mindfulness amidst nature.", image: kunda, span: "md:col-span-1 md:row-span-1" },
  { title: "Festival", desc: "Immerse yourself in grand celebrations and joyous congregational chanting that light up the soul.", image: deity2, span: "md:col-span-1 md:row-span-1" },
  { title: "Prasādam", desc: "Honor pure, karma-free meals lovingly prepared with the finest ingredients and deepest devotion.", image: prasadam, span: "md:col-span-1 md:row-span-1" },
  { title: "Stay", desc: "Comfortable, clean accommodation within a spiritual atmosphere — rest well, rise inspired.", image: deity3, span: "md:col-span-1 md:row-span-1" },
  { title: "Yamunā Vihār", desc: "Hear the stories directly on the lap of Mother Yamunā — who witnessed the divine pastimes and still flows with their memory.", image: yamuna, span: "md:col-span-2 md:row-span-1" },
];

export default function VCMSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="vcm" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-royal/10 to-background" />
      <div className="absolute inset-0 opacity-[0.02] bg-texture-move" />

      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            The Experience
          </h2>
          <p className="font-body text-xl text-foreground/50 mt-4 italic max-w-lg mx-auto">
            Everything you need for a transformative spiritual journey, thoughtfully curated.
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-4">
          {facilities.map((f, i) => (
            <div
              key={f.title}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ${f.span} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
            >
              <img
                src={f.image}
                alt={f.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-heading text-sm sm:text-base text-primary mb-1">{f.title}</h3>
                <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
                  {f.desc}
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
