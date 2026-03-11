import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CascadingPerks.css';

gsap.registerPlugin(ScrollTrigger);

const PERKS_DATA = [
  {
    themeClass: 'is--dark-green',
    label: 'World-Class Accommodation',
    title: 'The Stay',
    description: 'VCM provides a rare opportunity to reside inside a magnificent temple complex — fusing premium hospitality with spiritual tranquility.',
    bgText: 'RESIDENCES',
    number: '01 / 05',
    titlePos:  { top: '35%', right: '15%' },
    descPos:   { bottom: '20%', left: '15%' },
    images: [
      {
        src: '/src/assets/VCM-tallest-temple.jpg',
        style: { width: '25vw', top: '15%', left: '10%' },
        parallaxSpeed: -15
      },
      {
        src: '/gellery-img/gallery-img-1.jpg',
        style: { width: '18vw', bottom: '10%', right: '25%' },
        parallaxSpeed: -30
      }
    ]
  },
  {
    themeClass: 'is--dark-purple',
    label: 'Essence of Contemplation',
    title: 'Temple Hall',
    description: 'Thousands gather in a climate-controlled, acoustically perfect grand sanctuary. Pure devotion resonates in every corner.',
    bgText: 'SANCTUARY',
    number: '02 / 05',
    titlePos:  { top: '20%', left: '10%' },
    descPos:   { bottom: '15%', right: '15%' },
    images: [
      {
        src: '/gellery-img/gallery-img-3.jpg',
        style: { width: '28vw', top: '25%', right: '10%' },
        parallaxSpeed: -20
      },
      {
        src: '/src/assets/VCM-deities.jpg',
        style: { width: '20vw', bottom: '10%', left: '20%' },
        parallaxSpeed: -40
      }
    ]
  },
  {
    themeClass: 'is--dark-blue',
    label: 'Lightness of Breathing',
    title: 'Parks & Kundas',
    description: 'Sacred forests and pristine Kundas surround the temple — offering a meditative backdrop unlike anything else in the world.',
    bgText: 'NATURE',
    number: '03 / 05',
    titlePos:  { bottom: '30%', left: '15%' },
    descPos:   { bottom: '25%', right: '15%' },
    images: [
      {
        src: '/src/assets/VCM-parks.JPG',
        style: { width: '30vw', top: '10%', left: '50%', transform: 'translateX(-50%)' },
        parallaxSpeed: -10
      },
      {
        src: '/gellery-img/gallery-img-2.webp',
        style: { width: '15vw', top: '30%', right: '10%' },
        parallaxSpeed: -50
      }
    ]
  },
  {
    themeClass: 'is--dark-brown',
    label: 'Recharging Consciousness',
    title: 'Festivals',
    description: 'Immersive festivities, spectacular kirtans, and ecstatic congregational chanting keep the soul invigorated throughout the retreat.',
    bgText: 'CELEBRATE',
    number: '04 / 05',
    titlePos:  { top: '15%', right: '15%' },
    descPos:   { top: '35%', right: '15%' },
    images: [
      {
        src: '/src/assets/VCM-festival.heic',
        style: { width: '26vw', bottom: '10%', left: '15%' },
        parallaxSpeed: -25
      },
      {
        src: '/gellery-img/gallery-img-4.jpeg',
        style: { width: '22vw', bottom: '5%', right: '35%' },
        parallaxSpeed: -15
      }
    ]
  },
  {
    themeClass: 'is--dark-red',
    label: 'Adventure & Exploration',
    title: 'Treks & Boat Rides',
    description: 'Explore the hidden gems of Braj. Traverse ancient trekking trails and experience serene boat rides along the sacred Yamuna.',
    bgText: 'EXPLORE',
    number: '05 / 05',
    titlePos:  { top: '30%', left: '10%' },
    descPos:   { bottom: '20%', left: '10%' },
    images: [
      {
        src: '/src/assets/VCM-trek.JPG',
        style: { width: '28vw', top: '20%', right: '15%' },
        parallaxSpeed: -20
      },
      {
        src: '/gellery-img/gallery-img-5.png',
        style: { width: '18vw', bottom: '15%', right: '45%' },
        parallaxSpeed: -45
      },
      {
        src: '/gellery-img/gallery-img-6.png',
        style: { width: '15vw', top: '15%', right: '45%' },
        parallaxSpeed: -10
      }
    ]
  },
];

export default function CascadingPerks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-stacking-cards-item]');
      if (cards.length < 2) return;

      cards.forEach((card, i) => {
        // Skip over the first section's cascade trigger
        if (i !== 0) {
          const previousCard = cards[i - 1];
          if (previousCard) {
            gsap.fromTo(previousCard, 
              { yPercent: 0 }, 
              { 
                yPercent: 50,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                  invalidateOnRefresh: true
                }
              }
            );
          }
        }
      });

      // ── Generic Parallax for ALL images (including last card) ──
      const parallaxImages = gsap.utils.toArray<HTMLElement>('[data-parallax-img]');
      parallaxImages.forEach((img) => {
        const speed = img.getAttribute('data-speed') || "-15";
        gsap.to(img, {
          yPercent: Number(speed),
          ease: "none",
          scrollTrigger: {
            trigger: img.closest('[data-stacking-cards-item]'), // Parallax over the course of its parent card
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef); // Scope to container to avoid conflicting with other sections

    return () => ctx.revert(); // Proper cleanup
  }, []);

  return (
    <section className="bg-background relative z-10" ref={containerRef}>
      <div className="stacking-cards__collection">
        <div className="stacking-cards__list">
          {PERKS_DATA.map((item, index) => (
            <div
              key={index}
              data-stacking-cards-item="true"
              className={`stacking-cards__item ${item.themeClass}`}
            >
              {/* ── MASSIVE BACKGROUND WATERMARK ── */}
              <div className="stacking-cards__item-bgText">
                {item.bgText}
              </div>

              {/* ── PORTRAIT IMAGES ── */}
              {item.images.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={img.src}
                  alt={`${item.title} image ${imgIndex + 1}`}
                  className="stacking-cards__item-portrait"
                  style={img.style}
                  data-parallax-img="true"
                  data-speed={img.parallaxSpeed}
                />
              ))}

              {/* ── TITLE ── absolute position controlled per-card */}
              <h3 className="stacking-cards__item-h" style={item.titlePos}>
                <span className="stacking-card__heading-faded">{item.label}</span>
                {item.title}
              </h3>

              {/* ── DESCRIPTION ── absolute position controlled per-card */}
              <p className="stacking-cards__item-desc" style={item.descPos}>
                {item.description}
              </p>

              {/* Top Navigation Bar */}
              <div className="stacking-cards__item-top">
                <span className="stacking-card__top-span">VCM Experience</span>
                <span className="stacking-card__top-span">{item.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
