import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TestimonialsSection.css';

import manojImg from '@/assets/manoj.JPG';
import devImg from '@/assets/dev.jpg';
import parthImg from '@/assets/parth.jpeg';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { 
    quote: "Braj Ras transformed my understanding of devotion. Every moment felt like a divine embrace.", 
    name: "Manoj", 
    affiliation: "Jaipur",
    img: manojImg
  },
  { 
    quote: "Walking through the forests of Kāmyavan, I felt the presence of Krishna. Words cannot describe it.", 
    name: "Dev", 
    affiliation: "Varanasi",
    img: devImg
  },
  { 
    quote: "The kīrtans, the prasādam, the sacred darśan — everything was beyond this world. I will return.", 
    name: "Partha", 
    affiliation: "Mumbai",
    img: parthImg
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in the textual elements as each block reaches viewport center
      blocksRef.current.forEach((block) => {
        if (!block) return;
        
        const quote = block.querySelector('.test-quote');
        const card = block.querySelector('.test-card');

        gsap.fromTo(quote, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top center",
              end: "bottom center",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        gsap.fromTo(card, 
          { opacity: 0, y: 100 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top center",
              end: "bottom center",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={containerRef} className="test-section">
      {/* Massive Background Sticky Text */}
      <div className="test-bg-container">
        <h2 className="test-bg-text">EXPERIENCES</h2>
      </div>

      <div className="test-content-wrapper">
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className="test-block"
            ref={(el) => (blocksRef.current[i] = el)}
          >
            <div className="test-block__inner">
              
              {/* Text / Quote Section on Left */}
              <div className="test-quote-wrapper">
                <span className="test-quote-mark">“</span>
                <p className="test-quote">
                  {t.quote}
                </p>
              </div>

              {/* Card Section on Right */}
              <div className="test-card-wrapper">
                <div className="test-card">
                  <div className="test-card__img-container">
                    <img src={t.img} alt={`Testimony from ${t.name}`} className="test-card__img" />
                    {/* Dark gradient overlay to match the reference pic vibe */}
                    <div className="test-card__img-overlay"></div>
                  </div>
                  
                  <div className="test-card__bottom">
                    <h3 className="test-card__name">{t.name}</h3>
                    <p className="test-card__affiliation">{t.affiliation}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
