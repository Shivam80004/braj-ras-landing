import { useScrollReveal } from "@/hooks/useScrollReveal";

const deities = [
  { name: "Śrī Bāṅke Bihārī", desc: "The playful Lord who steals hearts with His sideways glance." },
  { name: "Śrī Rādhā Ramaṇ", desc: "Self-manifested, radiant and intimate." },
  { name: "Śrī Rādhā Dāmodar", desc: "Worshiped by great ācāryas; the gateway to deeper Vraja bhāva." },
  { name: "Śrī Rādhā Gokulananda", desc: "A hidden jewel of devotion." },
  { name: "Śrī Rādhā Śyāmasundar", desc: "Divine beauty beyond poetry." },
  { name: "Śrī Rādhā Madan Mohan", desc: "The original establisher of bhakti in Vṛndāvan." },
  { name: "Śrī Rādhā Gopīnāth", desc: "The enchanter of the gopīs." },
];

export default function DeitiesSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="deities" className="py-24 px-6 bg-gradient-to-b from-background via-maroon-deep/30 to-background">
      <div ref={ref} className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            7 Deities of Śrī Vṛndāvana
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {deities.map((d, i) => (
            <div
              key={d.name}
              className={`group gold-border gold-border-hover rounded-lg p-8 bg-card/50 backdrop-blur-sm transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${i === 6 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""}`}
              style={{ transitionDelay: visible ? `${i * 100}ms` : "0ms" }}
            >
              {/* Deity icon placeholder */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-primary/30 bg-primary/5 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                <span className="text-primary text-2xl">🙏</span>
              </div>
              <h3 className="font-heading text-base sm:text-lg text-primary text-center mb-3 leading-snug">
                {d.name}
              </h3>
              <p className="font-body text-foreground/70 text-center text-lg italic leading-relaxed">
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
