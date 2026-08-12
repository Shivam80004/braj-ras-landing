import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/all";
import heroBg from "@/assets/hero-bg.jpg";
import vrindavanVideo from "@/assets/Vrindavan Folk Trip 2022.webm";
import "./VideoSection.css";

gsap.registerPlugin(ScrollTrigger, Flip);

export default function VideoSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    // Desktop only. Mobile keeps the plain static video the CSS already lays
    // out, so nothing is registered and there is no scroll cost there.
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const wrappers = gsap.utils.toArray<HTMLElement>(
        "[data-flip-element='wrapper']",
        root
      );
      const target = root.querySelector<HTMLElement>("[data-flip-element='target']");
      if (wrappers.length < 2 || !target) return;

      let tl: gsap.core.Timeline | null = null;

      const build = () => {
        tl?.scrollTrigger?.kill();
        tl?.kill();
        gsap.set(target, { clearProps: "all" });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrappers[0],
            start: "center center",
            endTrigger: wrappers[wrappers.length - 1],
            end: "center center",
            scrub: 0.25,
          },
        });

        // Distance between waypoint centres drives the tween duration, so the
        // growth stays linear against scroll no matter how tall the gap is.
        wrappers.forEach((el, i) => {
          const next = wrappers[i + 1];
          if (!next) return;
          const centre = (n: HTMLElement) =>
            n.getBoundingClientRect().top + window.scrollY + n.offsetHeight / 2;
          // Flip.fit returns a Tween whenever a duration is supplied.
          tl!.add(
            Flip.fit(target, next, {
              duration: centre(next) - centre(el),
              ease: "none",
            }) as gsap.core.Tween
          );
        });
      };

      build();

      // Flip.fit bakes measurements in at creation, so a resize needs a rebuild.
      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 100);
      };
      window.addEventListener("resize", onResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        tl?.scrollTrigger?.kill();
        tl?.kill();
        gsap.set(target, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="video" ref={rootRef} className="video-scale">
      <div className="absolute inset-0 opacity-[0.02] bg-texture-move cursor-default pointer-events-none" />

      <div className="video-scale__intro">
        <div className="video-scale__small-box">
          <div className="video-scale__ratio" />
          <div data-flip-element="wrapper" className="video-scale__wrapper">
            <div data-flip-element="target" className="video-scale__card">
              <video
                src={vrindavanVideo}
                poster={heroBg}
                className="video-scale__video"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>

        <p className="video-scale__caption font-body">
          A glimpse into the divine land of Vraja
        </p>
      </div>

      <div className="video-scale__outro">
        <div className="video-scale__big-box">
          <div className="video-scale__ratio" />
          <div data-flip-element="wrapper" className="video-scale__wrapper" />
        </div>
      </div>
    </section>
  );
}
