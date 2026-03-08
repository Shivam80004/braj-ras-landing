import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  { quote: "Braj Ras transformed my understanding of devotion. Every moment felt like a divine embrace.", name: "Ananya D.", location: "Mumbai" },
  { quote: "Walking through the forests of Kāmyavan, I felt the presence of Krishna. Words cannot describe it.", name: "Raghav S.", location: "Delhi" },
  { quote: "The kīrtans, the prasādam, the sacred darśan — everything was beyond this world. I will return.", name: "Meera K.", location: "Bengaluru" },
];

export default function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-maroon-deep/20 to-background" />
      <div className="absolute inset-0 opacity-[0.02] bg-texture-move" />

      <div ref={ref} className="container mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-3xl sm:text-4xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Previous Experiences
          </h2>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-2xl p-8 bg-background/25 backdrop-blur-xl border border-primary/15 hover:border-primary/30 hover:bg-background/35 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
            >
              <span className="text-primary/20 text-6xl font-heading leading-none block -mb-4">"</span>
              <p className="font-body text-foreground/80 text-lg italic leading-relaxed mb-6">
                {t.quote}
              </p>
              <div className="pt-4 border-t border-primary/10">
                <p className="font-heading text-xs text-primary tracking-wider">{t.name}</p>
                <p className="font-body text-muted-foreground text-sm">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
