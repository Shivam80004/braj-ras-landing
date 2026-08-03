import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CascadingPerks.css';

import templeImg from '@/assets/VCM-tallest-temple.jpg';
import deitiesImg from '@/assets/VCM-deities.jpg';
import parksImg from '@/assets/VCM-parks.JPG';
import festivalImg from '@/assets/VCM-festival.jpg';
import trekImg from '@/assets/VCM-trek.JPG';

gsap.registerPlugin(ScrollTrigger);

const PERKS_DATA = [
  {
    themeClass: 'is--dark-green',
    label: 'World-Class Accommodation',
    title: 'The Stay',
    description: 'VCM provides a rare opportunity to reside inside a magnificent temple complex — fusing premium hospitality with spiritual tranquility.',
    bgText: 'RESIDENCES',
    number: '01 / 05',
    titlePos: { top: '12%', right: '8%' },
    descPos: { bottom: '7%', left: '60%' },
    images: [
      {
        src: templeImg,
        style: { width: '26vw', top: '35%', left: '8%' },
        parallaxSpeed: -16
      },
      {
        src: 'src/assets/hotel.jpg',
        style: { width: '12vw', bottom: '7%', right: '45%' },
        parallaxSpeed: -25
      }
    ]
  },
  {
    themeClass: 'is--dark-purple',
    label: 'Essence of Contemplation',
    title: 'Temple Hall',
    description: 'Hundreds gather in a acoustically perfect grand temple hall. Holy Name of the Lord resonates in every corner.',
    bgText: 'SANCTUARY',
    number: '02 / 05',
    titlePos: { top: '12%', left: '8%' },
    descPos: { bottom: '10%', right: '30%' },
    images: [
      {
        src: 'src/assets/mth.JPG',
        style: { width: '15vw', top: '60%', right: '8%' },
        parallaxSpeed: -20
      },
      {
        src: deitiesImg,
        style: { width: '20vw', bottom: '15%', left: '12%' },
        parallaxSpeed: -40
      }
    ]
  },
  {
    themeClass: 'is--dark-blue',
    label: 'Lightness of Breathing',
    title: 'Parks & Kundas',
    description: 'Parks and Kundas surround the temple that offers a serene meditative backdrop.',
    bgText: 'NATURE',
    number: '03 / 05',
    titlePos: { top: '12%', left: '8%' },
    descPos: { bottom: '10%', right: '25%' },
    images: [
      {
        src: parksImg,
        style: { width: '24vw', bottom: '10%', left: '25%' },
        parallaxSpeed: -10
      },
      {
        src: 'src/assets/parks.JPG',
        style: { width: '22vw', top: '38%', right: '10%' },
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
    titlePos: { top: '12%', right: '8%' },
    descPos: { top: '80%', left: '15%' },
    images: [
      {
        src: festivalImg,
        style: { width: '26vw', bottom: '15%', right: '15%' },
        parallaxSpeed: -25
      },
      {
        src: 'src/assets/festivals1.jpg',
        style: { width: '30vw', top: '22%', left: '15%' },
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
    titlePos: { top: '12%', left: '8%' },
    descPos: { bottom: '10%', left: '8%' },
    images: [
      {
        src: trekImg,
        style: { width: '26vw', top: '35%', right: '18%' },
        parallaxSpeed: -20
      },
      {
        src: 'src/assets/boatRide.JPG',
        style: { width: '20vw', bottom: '20%', left: '12%' },
        parallaxSpeed: -45
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
    <section id="vcm" className="bg-background relative z-10" ref={containerRef}>
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
