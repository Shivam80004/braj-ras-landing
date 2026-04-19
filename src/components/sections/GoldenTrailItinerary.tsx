import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf } from 'lucide-react';
import './GoldenTrailItinerary.css';
import { ChevronDown } from "lucide-react";

import kamyavanImg from '@/assets/IMG 9212.JPG';
import govardhanImg from '@/assets/govardhan.jpg';
import radhaKundImg from '@/assets/radhakund.jpg';
import extraImg from '@/assets/IMG 9278 from Google Drive.JPG';

gsap.registerPlugin(ScrollTrigger);

const ITINERARY_DATA = [
  {
    id: 'kamyavan',
    title: 'KAMYAVAN',
    subtitle: 'The Forest of Fulfilled Desires',
    description: 'Venture into the oldest of Braj’s forests. Here, amidst ancient Kundas and hidden caves, Balaram and Krishna enacted their most enchanting childhood pastimes, far from the eyes of the world.',
    mainImg: kamyavanImg,
    align: 'top',
  },
  {
    id: 'govardhan',
    title: 'GOVARDHAN',
    subtitle: 'The Sacred Mountain',
    description: 'Circumambulate the very hill lifted by the Supreme Lord. Every stone and parikrama path holds the resonance of eternal devotion and miraculous protection.',
    mainImg: govardhanImg,
    align: 'bottom',
  },
  {
    id: 'radha-kund',
    title: 'RADHA KUND',
    subtitle: 'The Highest Realization',
    description: 'Bathe your consciousness in the most exalted of all sacred waters. Shyam Kund and Radha Kund represent the zenith of esoteric love and spiritual attainment.',
    mainImg: radhaKundImg,
    align: 'center',
  },
  {
    id: 'nandgaon',
    title: 'NANDGAON & BARSANA',
    subtitle: 'The Divine Childhood Villages',
    description: 'Experience the charming landscapes where Radha and Krishna’s earliest leelas unfolded. Every street and temple here vibrates with sweet, eternal devotion.',
    mainImg: extraImg,
    align: 'top',
  }
];

const GoldenTrailItinerary = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current) return;


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


    // Removed Asymmetric parallax to fix stacking overlap issues

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
    <section id="itinerary" ref={containerRef} className="iti-section">
      
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
