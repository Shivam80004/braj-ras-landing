import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalScroll.css';

gsap.registerPlugin(ScrollTrigger);

const panelsData = [
    { title: "Dolomites", img: "https://cdn.prod.website-files.com/68f8bc9dc83dc1aacaa172e7/68f8cf7185c9dcfbedc6d4aa_Dramatic%20Mountain%20Range%20at%20Sunrise.avif" },
    { title: "Patagonia", img: "https://cdn.prod.website-files.com/68f8bc9dc83dc1aacaa172e7/68f8cf71364a2fdf36e25d26_Tranquil%20Dawn%20over%20the%20Pastel%20Peak%20Range.avif" },
    { title: "Yosemite Park", img: "https://cdn.prod.website-files.com/68f8bc9dc83dc1aacaa172e7/68f8cf712f57198f963fd7eb_Majestic%20Mountain%20Landscape.avif" },
    { title: "Pyrenees", img: "https://cdn.prod.website-files.com/68f8bc9dc83dc1aacaa172e7/68f8cf71cb5249dc6ea2eb35_Subdued%20Mountain%20Serenity.avif" }
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
