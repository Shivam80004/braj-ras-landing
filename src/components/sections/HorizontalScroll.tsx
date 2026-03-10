import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalScroll.css';
import VCMTallestTemple from "@/assets/VCM-tallest-temple-4k.png"
import SriSriRadhaVrindavanchandra from "@/assets/VCM-deities.jpg"
import VCMfestivals from "@/assets/VCM-festival.heic"
import Parks from "@/assets/VCM-parks.JPG"



gsap.registerPlugin(ScrollTrigger);

const panelsData = [
    { title: "World's Tallest Temple", img: VCMTallestTemple },
    { title: "Sri Sri Radha Vrindavanchandra", img: SriSriRadhaVrindavanchandra },
    { title: "Festivals", img: VCMfestivals },
    { title: "Parks", img: Parks }
];

const HorizontalScroll = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const wrap = sectionRef.current;

        const mm = gsap.matchMedia();

        mm.add(
            {
                isMobile: "(max-width:479px)",
                isMobileLandscape: "(max-width:767px)",
                isTablet: "(max-width:991px)",
                isDesktop: "(min-width:992px)"
            },
            (context) => {
                const { isMobile, isMobileLandscape, isTablet } = context.conditions as any;

                const ctx = gsap.context(() => {
                    // optional disable logic per breakpoint
                    const disable = wrap.getAttribute("data-horizontal-scroll-disable");
                    if (
                        (disable === "mobile" && isMobile) ||
                        (disable === "mobileLandscape" && isMobileLandscape) ||
                        (disable === "tablet" && isTablet)
                    ) {
                        return; // skip this wrapper on specified breakpoint
                    }

                    const panels = gsap.utils.toArray("[data-horizontal-scroll-panel]", wrap) as HTMLElement[];
                    if (panels.length < 2) return;

                    gsap.to(panels, {
                        x: () => -(wrap.scrollWidth - window.innerWidth),
                        ease: "none",
                        scrollTrigger: {
                            trigger: wrap,
                            start: "top top",
                            end: () => "+=" + (wrap.scrollWidth - window.innerWidth),
                            scrub: true,
                            pin: true,
                            invalidateOnRefresh: true,
                        },
                    });
                }, wrap);

                return () => ctx.revert(); // cleanup
            }
        );

        return () => mm.revert();

    }, []);

    return (
        <section
            ref={sectionRef}
            className="horizontal__wrap bg-background text-white"
            data-horizontal-scroll-wrap
            data-horizontal-scroll-disable="mobileLandscape"
        >
            {panelsData.map((panel, index) => (
                <div key={index} data-horizontal-scroll-panel className="horizontal__panel">
                    <div className="horizontal__panel-inner">
                        <div className="demo-card">
                            <div className="demo-card__bg">
                                <img src={panel.img} alt={panel.title} className="demo-card__bg-img" />
                            </div>
                            <div className="demo-card__inner">
                                <h2 className="demo-header__h1">{panel.title}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default HorizontalScroll;
