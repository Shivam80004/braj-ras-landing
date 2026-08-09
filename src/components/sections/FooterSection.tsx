import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MasonryGallery from '../ui/MasonryGallery';
import './FooterSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerWrapRef = useRef<HTMLDivElement>(null);
  const footerInnerRef = useRef<HTMLElement>(null);
  const footerDarkRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!footerWrapRef.current || !footerInnerRef.current || !footerDarkRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerWrapRef.current,
          start: 'clamp(top bottom)',
          end: 'clamp(top top)',
          scrub: true
        }
      });

      tl.from(footerInnerRef.current, {
        yPercent: -20,
        ease: 'none'
      });

      tl.from(footerDarkRef.current, {
        opacity: 0.6,
        ease: 'none'
      }, '<');
    }, footerWrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={footerWrapRef} className="footer-wrap">
      <footer ref={footerInnerRef} className="relative bg-[#120E15] pt-24 overflow-hidden flex flex-col min-h-[110vh]">
        {/* Background Texture matching the site theme */}
        <div className="absolute inset-0 opacity-[0.02] bg-texture-move pointer-events-none" />

        <div className="relative flex-grow flex flex-col justify-center">
          {/* 1. The Masonry Grid Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30 flex justify-center items-center overflow-hidden">
            <MasonryGallery />
          </div>

          {/* 2. The Sitemap & Details */}
          <div className="container mx-auto px-6 relative z-10 max-w-7xl py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-8">

              {/* Brand/Logo Column */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start space-y-6">
                <h3 className="font-heading text-4xl sm:text-5xl text-primary mb-2">Braj Ras</h3>
                <p className="font-body text-white/80 text-lg italic max-w-sm text-center md:text-left drop-shadow-md">
                  The culmination of the soul’s journey in Śrī Vṛndāvan Dhām.
                </p>
              </div>

              {/* Sitemap Column */}
              <div className="flex flex-col items-center md:items-start space-y-4 font-bold drop-shadow-md">
                <h4 className="font-heading text-xl text-primary uppercase tracking-widest mb-4">Sitemap</h4>
                <a href="#hero" className="font-body text-white hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/50">Home</a>
                <a href="#itinerary" className="font-body text-white hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/50">Journey</a>
                <a href="#vcm" className="font-body text-white hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/50">Experiences</a>
                <a href="#testimonials" className="font-body text-white hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/50">Testimonials</a>
                <a href="#register" className="font-body text-white hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/50">Register</a>
              </div>

              {/* Contact Column */}
              <div className="flex flex-col items-center md:items-start space-y-4 font-bold drop-shadow-md">
                <h4 className="font-heading text-xl text-primary uppercase tracking-widest mb-4">Contact</h4>
                <p className="font-body text-white text-center md:text-left leading-relaxed">
                  Ancient AI<br />
                  Mumbai, MH, India
                </p>
                <a href="mailto:contact@ancientai.in" className="font-body text-primary hover:text-primary/80 transition-colors uppercase tracking-widest text-sm mt-4 hover:underline underline-offset-4 decoration-primary/50">
                  contact@ancientai.in
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* 3. The Copyright Bar */}
        <div className="container mx-auto px-6 relative z-10 max-w-7xl footer-bottom-bar bg-[#120E15]">
          <div className="flex flex-col md:flex-row justify-between items-center text-center">
            <p className="font-body text-muted-foreground text-sm uppercase tracking-widest mb-4 md:mb-0">
              © 2026 Braj Ras. All rights reserved.
            </p>
          </div>
        </div>

        {/* 4. Massive Typography */}
        <div className="footer-huge-text-wrapper relative z-0">
          <h1 className="footer-huge-text">Braj Ras</h1>
        </div>

      </footer>
      <div ref={footerDarkRef} className="footer-wrap__dark"></div>
    </div>
  );
}
