import React, { useRef, useLayoutEffect } from 'react';
import './MasonryGallery.css';

import img1 from '@/assets/footerPhotos/BrajRas Jan 30 to Feb 3 2026.JPG';
import img2 from '@/assets/footerPhotos/BrajRas Jan 30 to Feb 3 2026 (1).JPG';
import img3 from '@/assets/footerPhotos/BrajRas Jan 30 to Feb 3 2026 (2).JPG';
import img4 from '@/assets/footerPhotos/BrajRas Jan 30 to Feb 3 2026 (3).JPG';
import img5 from '@/assets/footerPhotos/WhatsApp Image 2026-03-11 at 16.51.35.jpeg';
import img6 from '@/assets/footerPhotos/WhatsApp Image 2026-03-11 at 16.51.36.jpeg';
import img7 from '@/assets/footerPhotos/WhatsApp Image 2026-03-11 at 16.51.37.jpeg';
import img8 from '@/assets/footerPhotos/WhatsApp Image 2026-03-11 at 16.51.50.jpeg';
import img9 from '@/assets/footerPhotos/WhatsApp Image 2026-03-11 at 16.52.01.jpeg';
import img10 from '@/assets/footerPhotos/WhatsApp Image 2026-03-11 at 16.52.06.jpeg';

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10
];

// Helper to determine aspect ratio class based on index to mimic the provided layout
const getAspectClass = (index: number) => {
  if (index === 1) return 'is--wide';
  if ([3, 4, 9].includes(index)) return 'is--square';
  if (index === 5) return 'is--tall';
  return '';
};

export default function MasonryGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cols: number, gapPx: number, colHeights: number[];
    const shuffle = container.dataset.masonryShuffle !== 'false';

    const getVars = () => {
      const cs = getComputedStyle(container);
      cols = parseInt(cs.getPropertyValue('--masonry-col')) || 4;
      const rawGap = cs.getPropertyValue('--masonry-gap').trim() || '16px';

      if (rawGap.endsWith('px')) {
        gapPx = parseFloat(rawGap);
      } else if (rawGap.endsWith('em')) {
        gapPx = parseFloat(rawGap) * parseFloat(cs.fontSize);
      } else if (rawGap.endsWith('rem')) {
        gapPx = parseFloat(rawGap) * parseFloat(getComputedStyle(document.documentElement).fontSize);
      } else {
        gapPx = parseFloat(rawGap);
      }
    };

    const layout = () => {
      getVars();
      const wCalc = `(100% - ${(cols - 1)} * var(--masonry-gap)) / ${cols}`;
      colHeights = Array(cols).fill(0);
      container.style.position = 'relative';
      const items = Array.from(container.children) as HTMLElement[];

      items.forEach(el => {
        el.style.position = 'absolute';
        el.style.width = `calc(${wCalc})`;
      });

      items.forEach((el, i) => {
        const h = el.offsetHeight;
        const idx = shuffle
          ? colHeights.indexOf(Math.min(...colHeights))
          : (i % cols);
        el.style.top = `${colHeights[idx]}px`;
        el.style.left = `calc(${wCalc} * ${idx} + var(--masonry-gap) * ${idx})`;
        colHeights[idx] += h + gapPx;
      });
      container.style.height = `${Math.max(...colHeights, 0)}px`;
    };

    const debounce = (fn: Function, delay: number) => {
      let t: any;
      return () => {
        clearTimeout(t);
        t = setTimeout(fn, delay);
      };
    };

    const onResize = debounce(layout, 100);
    window.addEventListener('resize', onResize);

    const debouncedLayout = debounce(layout, 50);
    const imgLoad = () => {
      container.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', debouncedLayout, { once: true });
          img.addEventListener('error', debouncedLayout, { once: true });
        }
      });
    };

    // Give a tiny tick for the DOM to paint initial sizes
    setTimeout(() => {
      layout();
      imgLoad();
    }, 10);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="masonry-wrap w-full max-w-7xl mx-auto opacity-70 hover:opacity-100 transition-opacity duration-700">
      <div className="masonry-collection">
        <div ref={containerRef} data-masonry-list="" className="masonry-list">
          {images.map((src, idx) => (
            <div key={idx} className="masonry-item">
              <div className={`masonry-item__visual ${getAspectClass(idx)}`}>
                <img src={src} alt={`Masonry ${idx}`} className="masonry-item__visual-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
