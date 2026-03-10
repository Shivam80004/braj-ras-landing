import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CascadingPerks.css';

gsap.registerPlugin(ScrollTrigger);

const PERKS_DATA = [
  {
    themeClass: 'is--green',
    label: 'Collection of Premium Living Spaces',
    title: 'Residences',
    description: 'VCM provides a rare opportunity to reside inside a magnificent temple complex — fusing world-class hospitality with spiritual tranquility.',
    image: '/gellery-img/gallery-img-1.jpg',
    number: '01 / 05',
    // ── CARD 1 POSITIONS ─────────────────────────────────────────────────────
    // Change these to reposition the title and description on this card.
    titlePos:  { bottom: '12%', right: '6%' },   // Title: bottom-right corner
    descPos:   { bottom: '8%',  left:  '5%' },   // Description: bottom-left corner
  },
  {
    themeClass: 'is--purple',
    label: 'Lightness of Breathing',
    title: 'Nature',
    description: 'Sacred forests and pristine Kundas surround the temple — offering a meditative backdrop unlike anything else in the world.',
    image: '/gellery-img/gallery-img-2.webp',
    number: '02 / 05',
    // ── CARD 2 POSITIONS ─────────────────────────────────────────────────────
    titlePos:  { top: '30%',  left: '5%' },      // Title: mid-left
    descPos:   { bottom: '9%', right: '5%' },    // Description: bottom-right
  },
  {
    themeClass: 'is--blue',
    label: 'Essence of Contemplation',
    title: 'Temple Hall',
    description: 'Thousands gather in a climate-controlled, acoustically perfect grand sanctuary. Pure devotion resonates in every corner.',
    image: '/gellery-img/gallery-img-3.jpg',
    number: '03 / 05',
    // ── CARD 3 POSITIONS ─────────────────────────────────────────────────────
    titlePos:  { bottom: '10%', right: '6%' },   // Title: bottom-right corner
    descPos:   { top: '12%',    left: '5%' },    // Description: top-left corner
  },
  {
    themeClass: 'is--brown',
    label: 'Recharging Consciousness',
    title: 'Festivals',
    description: 'Immersive festivities, spectacular kirtans, and ecstatic congregational chanting keep the soul invigorated throughout the retreat.',
    image: '/gellery-img/gallery-img-4.jpeg',
    number: '04 / 05',
    // ── CARD 4 POSITIONS ─────────────────────────────────────────────────────
    titlePos:  { top: '20%', left: '5%' },       // Title: upper-left area
    descPos:   { bottom: '8%', right: '5%' },    // Description: bottom-right
  },
  {
    themeClass: 'is--red',
    label: 'Divine Nourishment',
    title: 'Darshan',
    description: 'Behold the magnificent altar. Savor Mahaprasadam — prepared with devotion and unmatched purity — that nourishes the soul.',
    image: '/gellery-img/gallery-img-5.png',
    number: '05 / 05',
    // ── CARD 5 POSITIONS ─────────────────────────────────────────────────────
    titlePos:  { bottom: '12%', right: '6%' },   // Title: bottom-right
    descPos:   { bottom: '9%',  left: '5%' },    // Description: bottom-left
  },
];

export default function CascadingPerks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-stacking-cards-item]');
      if (cards.length < 2) return;

      cards.forEach((card, i) => {
        // Skip over the first section
        if (i === 0) return;

        // When current section is in view, target the PREVIOUS one
        const previousCard = cards[i - 1];
        if (!previousCard) return;

        // Find any element inside the previous card
        const previousCardImage = previousCard.querySelector('[data-stacking-cards-img]');
        if (!previousCardImage) return;

        let tl = gsap.timeline({
          defaults: {
            ease: "none",
            duration: 1
          },
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true
          }
        });

        tl.fromTo(previousCard, { yPercent: 0 }, { yPercent: 50 })
          .fromTo(previousCardImage, { yPercent: 0 }, { yPercent: -15 }, "<");
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
              {/* Background Image & Overlay */}
              <img
                src={item.image}
                data-stacking-cards-img="true"
                alt={item.title}
                className="stacking-cards__item-bg"
              />
              <div className="stacking-cards__item-overlay" />

              {/* ── TITLE ── absolute position controlled per-card via titlePos in PERKS_DATA above */}
              <h3 className="stacking-cards__item-h" style={item.titlePos}>
                <span className="stacking-card__heading-faded">{item.label}</span>
                {item.title}
              </h3>

              {/* ── DESCRIPTION ── absolute position controlled per-card via descPos in PERKS_DATA above */}
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
