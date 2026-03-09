import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CascadingSlider.css';

const breakpoints = [
  { maxWidth: 479, activeWidth: 0.78, siblingWidth: 0.08 },
  { maxWidth: 767, activeWidth: 0.70, siblingWidth: 0.10 },
  { maxWidth: 991, activeWidth: 0.60, siblingWidth: 0.10 },
  { maxWidth: Infinity, activeWidth: 0.60, siblingWidth: 0.13 },
];

const initialSlides = [
  { title: "Annual overview", img: "https://cdn.prod.website-files.com/699ecbb03f86e84bad7a74f3/699eea7d454cb9d5091ac8ce_cascading-carousel-3.avif" },
  { title: "Sustainability efforts", img: "https://cdn.prod.website-files.com/699ecbb03f86e84bad7a74f3/699eec227ff9240c1e047cf3_cascading-carousel-2.avif" },
  { title: "Product development", img: "https://cdn.prod.website-files.com/699ecbb03f86e84bad7a74f3/699eea7d6333786f72559958_cascading-carousel-5.avif" },
  { title: "Infrastructure", img: "https://cdn.prod.website-files.com/699ecbb03f86e84bad7a74f3/699eea7d9bf91f87ca962997_cascading-carousel-1.avif" },
  { title: "Enterprises", img: "https://cdn.prod.website-files.com/699ecbb03f86e84bad7a74f3/699eea7d882b31c7ce3a35be_cascading-carousel-4.avif" }
];

// Duplicate slides to meet the minimum requirement of 9 slides without DOM cloning by JS script
const slides = [...initialSlides, ...initialSlides];

const CascadingSlider = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const wrapper = wrapperRef.current;
    
    const duration = 0.65;
    const ease = 'power3.inOut';

    const viewport = wrapper.querySelector('[data-cascading-viewport]');
    const prevButton = wrapper.querySelector('[data-cascading-slider-prev]');
    const nextButton = wrapper.querySelector('[data-cascading-slider-next]');
    const slideElements = Array.from(viewport?.querySelectorAll('[data-cascading-slide]') || []) as HTMLElement[];
    let totalSlides = slideElements.length;

    if (totalSlides === 0) return;

    let activeIndex = 0;
    let isAnimating = false;
    let slideWidth = 0;
    let slotCenters: Record<string, number> = {};
    let slotWidths: Record<string, number> = {};

    function readGap() {
      if (!viewport) return 0;
      const raw = getComputedStyle(viewport).getPropertyValue('--gap').trim();
      if (!raw) return 0;
      const temp = document.createElement('div');
      temp.style.width = raw;
      temp.style.position = 'absolute';
      temp.style.visibility = 'hidden';
      viewport.appendChild(temp);
      const px = temp.offsetWidth;
      viewport.removeChild(temp);
      return px;
    }

    function getSettings() {
      const windowWidth = window.innerWidth;
      for (let i = 0; i < breakpoints.length; i++) {
        if (windowWidth <= breakpoints[i].maxWidth) return breakpoints[i];
      }
      return breakpoints[breakpoints.length - 1];
    }

    function getOffset(slideIndex: number, fromIndex?: number) {
      if (fromIndex === undefined) fromIndex = activeIndex;
      let distance = slideIndex - fromIndex;
      const half = totalSlides / 2;
      if (distance > half) distance -= totalSlides;
      if (distance < -half) distance += totalSlides;
      return distance;
    }

    function measure() {
      if (!viewport) return;
      const settings = getSettings();
      const viewportWidth = (viewport as HTMLElement).offsetWidth;
      const gap = readGap();

      const activeSlideWidth = viewportWidth * settings.activeWidth;
      const siblingSlideWidth = viewportWidth * settings.siblingWidth;
      const farSlideWidth = Math.max(0, (viewportWidth - activeSlideWidth - 2 * siblingSlideWidth - 4 * gap) / 2);

      slideWidth = activeSlideWidth;

      const visibleSlots = [
        { slot: -2, width: farSlideWidth },
        { slot: -1, width: siblingSlideWidth },
        { slot: 0, width: activeSlideWidth },
        { slot: 1, width: siblingSlideWidth },
        { slot: 2, width: farSlideWidth },
      ];

      let x = 0;
      visibleSlots.forEach(function(def, i) {
        slotCenters[String(def.slot)] = x + def.width / 2;
        slotWidths[String(def.slot)] = def.width;
        if (i < visibleSlots.length - 1) x += def.width + gap;
      });

      slotCenters['-3'] = slotCenters['-2'] - farSlideWidth / 2 - gap - farSlideWidth / 2;
      slotWidths['-3'] = farSlideWidth;
      slotCenters['3'] = slotCenters['2'] + farSlideWidth / 2 + gap + farSlideWidth / 2;
      slotWidths['3'] = farSlideWidth;

      slideElements.forEach(function(slide) {
        slide.style.width = slideWidth + 'px';
      });
    }

    function getSlideProps(offset: number) {
      const clamped = Math.max(-3, Math.min(3, offset));
      const slotWidth = slotWidths[String(clamped)];
      const clipAmount = Math.max(0, (slideWidth - slotWidth) / 2);
      const translateX = slotCenters[String(clamped)] - slideWidth / 2;

      return {
        x: translateX,
        '--clip': clipAmount,
        zIndex: 10 - Math.abs(clamped),
      };
    }

    function layout(animate: boolean, previousIndex?: number) {
      slideElements.forEach(function(slide, index) {
        const offset = getOffset(index);

        if (offset < -3 || offset > 3) {
          if (animate && previousIndex !== undefined) {
            const previousOffset = getOffset(index, previousIndex);
            if (previousOffset >= -2 && previousOffset <= 2) {
              const exitSlot = previousOffset < 0 ? -3 : 3;
              gsap.to(slide, Object.assign({}, getSlideProps(exitSlot), {
                duration: duration,
                ease: ease,
                overwrite: true,
              }));
              return;
            }
          }

          const parkSlot = offset < 0 ? -3 : 3;
          gsap.set(slide, getSlideProps(parkSlot));
          return;
        }

        const props = getSlideProps(offset);
        slide.setAttribute('data-status', offset === 0 ? 'active' : 'inactive');

        if (animate) {
          gsap.to(slide, Object.assign({}, props, {
            duration: duration,
            ease: ease,
            overwrite: true,
          }));
        } else {
          gsap.set(slide, props);
        }
      });
    }

    function goTo(targetIndex: number) {
      const normalizedTarget = ((targetIndex % totalSlides) + totalSlides) % totalSlides;
      if (isAnimating || normalizedTarget === activeIndex) return;
      isAnimating = true;

      const previousIndex = activeIndex;
      const travelDirection = getOffset(normalizedTarget, previousIndex) > 0 ? 1 : -1;

      slideElements.forEach(function(slide, index) {
        const currentOffset = getOffset(index, previousIndex);
        const nextOffset = getOffset(index, normalizedTarget);
        const wasInRange = currentOffset >= -3 && currentOffset <= 3;
        const willBeVisible = nextOffset >= -2 && nextOffset <= 2;

        if (!wasInRange && willBeVisible) {
          const entrySlot = travelDirection > 0 ? 3 : -3;
          gsap.set(slide, getSlideProps(entrySlot));
        }

        const wasInvisible = Math.abs(currentOffset) >= 3;
        const willBeStaging = Math.abs(nextOffset) === 3;
        const crossesSides = currentOffset * nextOffset < 0;
        if (wasInvisible && willBeStaging && crossesSides) {
          gsap.set(slide, getSlideProps(nextOffset > 0 ? 3 : -3));
        }
      });

      activeIndex = normalizedTarget;
      layout(true, previousIndex);
      gsap.delayedCall(duration + 0.05, function() { isAnimating = false; });
    }

    const onPrevClick = () => goTo(activeIndex - 1);
    const onNextClick = () => goTo(activeIndex + 1);

    if (prevButton) prevButton.addEventListener('click', onPrevClick);
    if (nextButton) nextButton.addEventListener('click', onNextClick);

    const slideClickHandlers = slideElements.map((slide, index) => {
      const handler = () => {
        if (index !== activeIndex) goTo(index);
      };
      slide.addEventListener('click', handler);
      return handler;
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (event.key === 'ArrowRight') goTo(activeIndex + 1);
    };
    document.addEventListener('keydown', onKeyDown);

    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function() {
        measure();
        layout(false);
      }, 100);
    };
    window.addEventListener('resize', onResize);

    measure();
    layout(false);

    // Cleanup function
    return () => {
      if (prevButton) prevButton.removeEventListener('click', onPrevClick);
      if (nextButton) nextButton.removeEventListener('click', onNextClick);
      slideElements.forEach((slide, index) => {
        slide.removeEventListener('click', slideClickHandlers[index]);
      });
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className="py-20 w-full overflow-hidden bg-background">
      <div data-cascading-slider-wrap className="cascading-slider" aria-label="Featured content" aria-roledescription="carousel" ref={wrapperRef}>
        <div className="cascading-slider__collection">
          <div data-cascading-viewport className="cascading-slider__list">
            {slides.map((slide, i) => (
              <div key={i} aria-roledescription="slide" data-cascading-slide role="group" className="cascading-slider__item">
                <div className="cascading-slider__item-inner">
                  <div className="cascading-slider__item-bg">
                    <img src={slide.img} loading={i === 0 ? "eager" : "lazy"} draggable="false" className="cascading-slider__img" alt={slide.title} />
                  </div>
                  <div className="cascading-slider__item-content">
                    <h3 className="cascading-slider__h">{slide.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <nav aria-label="slider navigation" className="cascading-slider__nav">
          <button data-cascading-slider-prev aria-label="previous slide" className="cascading-slider__button">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="cascading-slider__button-arrow is--prev">
              <path d="M14 19L21 12L14 5" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5"></path>
              <path d="M21 12H2" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5"></path>
            </svg>
          </button>
          <button data-cascading-slider-next aria-label="next slide" className="cascading-slider__button">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="cascading-slider__button-arrow">
              <path d="M14 19L21 12L14 5" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5"></path>
              <path d="M21 12H2" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5"></path>
            </svg>
          </button>
        </nav>
      </div>
    </section>
  );
};

export default CascadingSlider;
