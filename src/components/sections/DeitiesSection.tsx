import { useScrollReveal } from "@/hooks/useScrollReveal";
import bankeBihari from "@/assets/banke-bihari.jpg";
import radhaRaman from "@/assets/radha-raman.jpg";
import radhaDamodar from "@/assets/radha-damodar.jpg";
import radhaGokulananda from "@/assets/radha-gokulananda.jpg";
import radhaShyamsundar from "@/assets/radha-shyamsundar.jpg";
import madanMohan from "@/assets/madan-mohan.jpg";
import radhaGopinath from "@/assets/radha-gopinath.jpg";

const deities = [
  { name: "Śrī Bāṅke Bihārī", desc: "The playful Lord who steals hearts with His sideways glance.", image: bankeBihari },
  { name: "Śrī Rādhā Ramaṇ", desc: "Self-manifested, radiant and intimate.", image: radhaRaman },
  { name: "Śrī Rādhā Dāmodar", desc: "Worshiped by great ācāryas; the gateway to deeper Vraja bhāva.", image: radhaDamodar },
  { name: "Śrī Rādhā Gokulananda", desc: "A hidden jewel of devotion.", image: radhaGokulananda },
  { name: "Śrī Rādhā Śyāmasundar", desc: "Divine beauty beyond poetry.", image: radhaShyamsundar },
  { name: "Śrī Rādhā Madan Mohan", desc: "The original establisher of bhakti in Vṛndāvan.", image: madanMohan },
  { name: "Śrī Rādhā Gopīnāth", desc: "The enchanter of the gopīs.", image: radhaGopinath },
];

export default function DeitiesSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="deities" className="py-24 px-6 relative overflow-hidden">
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

        {/* Featured deity — large card */}
        <div
          className={`group relative rounded-2xl overflow-hidden h-[400px] md:h-[500px] mb-6 transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <img
            src={deities[0].image}
            alt={deities[0].name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          {/* Glassmorphism card */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-auto md:max-w-md">
            <div className="bg-background/40 backdrop-blur-xl border border-primary/20 rounded-xl p-6 md:p-8">
              <h3 className="font-heading text-lg md:text-2xl text-primary mb-2">
                {deities[0].name}
              </h3>
              <p className="font-body text-foreground/80 text-base md:text-lg leading-relaxed">
                {deities[0].desc}
              </p>
            </div>
          </div>
        </div>

        {/* 3-column grid for next 3 deities */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          {deities.slice(1, 4).map((d, i) => (
            <div
              key={d.name}
              className={`group relative rounded-2xl overflow-hidden h-[320px] sm:h-[380px] transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${(i + 1) * 120}ms` : "0ms" }}
            >
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
              {/* Glassmorphism label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/30 backdrop-blur-xl border border-primary/15 rounded-lg p-4">
                  <h3 className="font-heading text-xs sm:text-sm text-primary leading-snug mb-1">
                    {d.name}
                  </h3>
                  <p className="font-body text-foreground/70 text-sm leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3-column grid for last 3 deities */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {deities.slice(4, 7).map((d, i) => (
            <div
              key={d.name}
              className={`group relative rounded-2xl overflow-hidden h-[320px] sm:h-[380px] transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${(i + 4) * 120}ms` : "0ms" }}
            >
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
              {/* Glassmorphism label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/30 backdrop-blur-xl border border-primary/15 rounded-lg p-4">
                  <h3 className="font-heading text-xs sm:text-sm text-primary leading-snug mb-1">
                    {d.name}
                  </h3>
                  <p className="font-body text-foreground/70 text-sm leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
