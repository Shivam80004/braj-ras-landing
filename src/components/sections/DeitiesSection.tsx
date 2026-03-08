import { useScrollReveal } from "@/hooks/useScrollReveal";
import deity1 from "@/assets/deity-1.jpg";
import deity2 from "@/assets/deity-2.jpg";
import deity3 from "@/assets/deity-3.jpg";
import deity4 from "@/assets/deity-4.jpg";
import ghats from "@/assets/ghats.jpg";
import kirtan from "@/assets/kirtan.jpg";
import parikrama from "@/assets/parikrama.jpg";

const deities = [
  { name: "Śrī Bāṅke Bihārī", desc: "The playful Lord who steals hearts with His sideways glance.", image: deity1, span: "col-span-2 row-span-2" },
  { name: "Śrī Rādhā Ramaṇ", desc: "Self-manifested, radiant and intimate.", image: deity2, span: "col-span-1 row-span-1" },
  { name: "Śrī Rādhā Dāmodar", desc: "Worshiped by great ācāryas; the gateway to deeper Vraja bhāva.", image: deity3, span: "col-span-1 row-span-1" },
  { name: "Śrī Rādhā Gokulananda", desc: "A hidden jewel of devotion.", image: deity4, span: "col-span-1 row-span-2" },
  { name: "Śrī Rādhā Śyāmasundar", desc: "Divine beauty beyond poetry.", image: ghats, span: "col-span-1 row-span-1" },
  { name: "Śrī Rādhā Madan Mohan", desc: "The original establisher of bhakti in Vṛndāvan.", image: kirtan, span: "col-span-1 row-span-1" },
  { name: "Śrī Rādhā Gopīnāth", desc: "The enchanter of the gopīs.", image: parikrama, span: "col-span-2 row-span-1" },
];

export default function DeitiesSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="deities" className="py-24 px-6 relative overflow-hidden">
      {/* Animated texture background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-maroon-deep/30 to-background" />
      <div className="absolute inset-0 opacity-[0.03] bg-texture-move" />

      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            7 Deities of Śrī Vṛndāvana
          </h2>
          <p className="font-body text-xl text-foreground/50 mt-4 italic max-w-xl mx-auto">
            Each temple holds a unique rasa — a distinct flavor of devotion that has drawn seekers for centuries.
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        {/* Bento grid layout like the reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[220px] gap-3 md:gap-4">
          {deities.map((d, i) => (
            <div
              key={d.name}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ${d.span} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" }}
            >
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-heading text-xs sm:text-sm md:text-base text-primary leading-snug drop-shadow-lg">
                  {d.name}
                </h3>
                <p className="font-body text-foreground/80 text-sm md:text-base mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed line-clamp-2">
                  {d.desc}
                </p>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/40 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
