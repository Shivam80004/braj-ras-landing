import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf } from 'lucide-react';
import './GoldenTrailItinerary.css';
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ITINERARY_DATA = [
  {
    id: 'kamyavan',
    title: 'KAMYAVAN',
    subtitle: 'The Forest of Fulfilled Desires',
    description: 'Venture into the oldest of Braj’s forests. Here, amidst ancient Kundas and hidden caves, Balaram and Krishna enacted their most enchanting childhood pastimes, far from the eyes of the world.',
    mainImg: '/gellery-img/gallery-img-2.webp',
    subImg: '/src/assets/VCM-parks.JPG',
    align: 'top',
  },
  {
    id: 'govardhan',
    title: 'GOVARDHAN',
    subtitle: 'The Sacred Mountain',
    description: 'Circumambulate the very hill lifted by the Supreme Lord. Every stone and parikrama path holds the resonance of eternal devotion and miraculous protection.',
    mainImg: '/src/assets/VCM-deities.jpg',
    subImg: '/src/assets/VCM-festival.heic',
    align: 'bottom',
  },
  {
    id: 'radha-kund',
    title: 'RADHA KUND',
    subtitle: 'The Highest Realization',
    description: 'Bathe your consciousness in the most exalted of all sacred waters. Shyam Kund and Radha Kund represent the zenith of esoteric love and spiritual attainment.',
    mainImg: '/gellery-img/gallery-img-5.png',
    subImg: '/src/assets/VCM-trek.JPG',
    align: 'center',
  }
];

const GoldenTrailItinerary = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current || !textPathRef.current || !clipRectRef.current) return;

      const textPath = textPathRef.current;
      const clipRect = clipRectRef.current;
      
      // Initialize the clip rectangle to width 0 (hiding the text)
      gsap.set(clipRect, {
        attr: { width: 0 }
      });

      // Start text at the very beginning of the string
      gsap.set(textPath, {
        attr: { startOffset: '0%' }
      });

    // ── 2. Horizontal Scroll Timeline ──
    // Calculate the total scrollable distance based on track width minus viewport width
    const getScrollAmount = () => {
      let trackWidth = trackRef.current ? trackRef.current.scrollWidth : 0;
      return -(trackWidth - window.innerWidth);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1, 
        invalidateOnRefresh: true, 
      }
    });

    // ── SCROLL PHASES ──
    // Phase 1: Fade out the hook text rapidly
    tl.to('.iti-hook', {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.15
    }, 0);

    // Phase 2: Pan the track left to reveal the itinerary locations
    tl.to(trackRef.current, {
      x: getScrollAmount,
      ease: 'none',
      duration: 0.85
    }, 0.15); // Start after fade

    // Reveal text by sweeping the clip-path rect across the canvas
    tl.to(clipRect, {
      attr: { width: 4500 }, // Full viewBox width
      ease: 'none',
      duration: 0.85
    }, 0.15);

    // Concurrently slowly drift the text forward within the revealed area
    tl.to(textPath, {
      attr: { startOffset: '8%' }, // Slow forward drift
      ease: 'none',
      duration: 0.85
    }, 0.15);

    // ── 3. 20% Asymmetric Parallax within Scenes ──
    // Add subtle independent parallax to images as they scroll horizontally
    scenesRef.current.forEach((scene) => {
      if (!scene) return;
      const subImg = scene.querySelector('.iti-scene__sub-img');
      if (subImg) {
        gsap.to(subImg, {
          x: 100, // Move slightly right creating depth against the leftward horizontal scroll
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            containerAnimation: tl, // Hook into the horizontal timeline!
            start: 'left right',
            end: 'right left',
            scrub: true,
          }
        });
      }
    });

      return () => {
        ScrollTrigger.getAll().forEach(t => {
          if (t.vars.trigger === containerRef.current || t.vars.containerAnimation === tl) {
            t.kill();
          }
        });
      };
    }); // Close ctx
    
    return () => ctx.revert(); // Revert everything on unmount
  }, []);

  return (
    <section ref={containerRef} className="iti-section">
      
      {/* ── The Cinematic Hook ── */}
      <div className="iti-hook">
        <div className="iti-hook__text-container">
            <div className="iti-hook__static">READY TO INDULGE?<br/>IN</div>
            <div className="iti-hook__highlight">KRISHNA</div>
        </div>
        <div className="iti-hook__scroll-indicator">
          <span>Scroll</span>
          <a
        href=""
        className="absolute bottom-10 z-10 text-primary/50 hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
        </div>
      </div>

      {/* ── The Horizontal Track ── */}
      <div ref={trackRef} className="iti-track">
        
        {/* Intro spacer so the hook is alone on screen initially */}
        <div className="iti-scene iti-intro-spacer" style={{ width: '100vw', height: '100vh', pointerEvents: 'none' }}></div>

        {/* The Golden Trail SVG Text Path */}
        <div className="iti-svg-container">
          <svg preserveAspectRatio="none" viewBox="0 0 4500 800" className="iti-svg">
            <defs>
              <clipPath id="text-reveal-clip">
                {/* Rect starts near the 100vw scroll mark so it emerges as soon as we pan */}
                <rect ref={clipRectRef} x="500" y="0" width="0" height="800" />
              </clipPath>
            </defs>
            {/* The Invisible Guide Path */}
            <path 
              id="the-trail"
              className="iti-svg-guide"
              /* We start it right at the edge of the first scene so it emerges immediately as it pans */
              d="M 600,400 C 1200,400 1600,200 2400,200 C 3000,200 3200,600 3800,600 C 4200,600 4400,400 4600,400" 
            />
            {/* The Text flowing along the Guide, revealed by the sweep */}
            <text className="iti-svg-text" clipPath="url(#text-reveal-clip)">
              <textPath 
                href="#the-trail" 
                ref={textPathRef}
              >
                {/* The JS timeline will slowly drift startOffset here */}
                {"Hare Krishna Hare Krishna Krishna Krishna Hare Hare   Hare Rama Hare Rama Rama Rama Hare Hare  ".repeat(20)}
              </textPath>
            </text>
          </svg>
        </div>

        {/* The Locations */}
        {ITINERARY_DATA.map((loc, index) => (
          <div 
            key={loc.id} 
            className={`iti-scene iti-scene--${loc.align}`}
            ref={el => scenesRef.current[index] = el}
          >
            {/* Massive Background Typography */}
            <div className="iti-scene__bg-text">{loc.title}</div>

            {/* Content Structure (80% Structured) */}
            <div className="iti-scene__content">
              
              <div className="iti-scene__text-col">
                <div className="iti-scene__badge">
                  <Leaf className="w-4 h-4" />
                  <span>Stop 0{index + 1}</span>
                </div>
                <h3 className="iti-scene__title">{loc.title}</h3>
                <h4 className="iti-scene__subtitle">{loc.subtitle}</h4>
                <p className="iti-scene__desc">{loc.description}</p>
              </div>

              <div className="iti-scene__img-col">
                <img src={loc.mainImg} alt={loc.title} className="iti-scene__main-img" />
                {/* 20% Asymmetry - The floating parallax sub-image */}
                <img src={loc.subImg} alt={`${loc.title} detail`} className="iti-scene__sub-img" />
              </div>

            </div>
          </div>
        ))}
        
        {/* Spacer at the end so the last scene fully enters view before unpinning */}
        <div className="iti-spacer"></div>

      </div>
    </section>
  );
};

export default GoldenTrailItinerary;
