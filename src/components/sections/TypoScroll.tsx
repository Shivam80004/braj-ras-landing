import React, { useEffect, useRef } from 'react';
import './TypoScroll.css';

const itemsData = [
    {
        title: "Estatic Kirtans",
        img: "src/assets/typoScroll/kirtan.JPG",
        aspectClass: ""
    },
    {
        title: "Prasadam",
        img: "src/assets/typoScroll/prasadam.JPG",
        aspectClass: "is--3-2"
    },
    {
        title: "Enchanting treks",
        img: "src/assets/typoScroll/trek.JPG",
        aspectClass: "is--2-3"
    },
    {
        title: "Holy dips",
        img: "src/assets/typoScroll/dip.JPG",
        aspectClass: "is--1-1"
    },
    {
        title: "Felicitation ceremony",
        img: "src/assets/typoScroll/felicitation.JPG",
        aspectClass: "is--1-1"
    },
    {
        title: "Vedic Discourses",
        img: "src/assets/typoScroll/discourses.JPG",
        aspectClass: "is--3-2"
    },
    {
        title: "Sacred Yamuna",
        img: "src/assets/typoScroll/yamuna.jpeg",
        aspectClass: "is--2-3"
    },
];

const TypoScroll = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const isTouchDevice =
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            ((navigator as any).msMaxTouchPoints > 0);

        const items = container.querySelectorAll('[data-typo-scroll-item]');
        if (!items.length) return;

        if (isTouchDevice) {
            let rafId: number;
            const updateActiveItems = () => {
                const viewportCenterY = window.innerHeight / 2;
                const containerRect = container.getBoundingClientRect();

                if (viewportCenterY < containerRect.top || viewportCenterY > containerRect.bottom) {
                    items.forEach(item => item.setAttribute('data-typo-scroll-item', ''));
                    rafId = requestAnimationFrame(updateActiveItems);
                    return;
                }

                let closestItem: Element | null = null;
                let closestDistance = Infinity;

                items.forEach((item) => {
                    const rect = item.getBoundingClientRect();
                    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

                    const itemCenterY = rect.top + rect.height / 2;
                    const distance = Math.abs(viewportCenterY - itemCenterY);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestItem = item;
                    }
                });

                if (!closestItem) {
                    items.forEach(item => item.setAttribute('data-typo-scroll-item', ''));
                } else {
                    items.forEach((item) => {
                        item.setAttribute('data-typo-scroll-item', item === closestItem ? 'active' : '');
                    });
                }

                rafId = requestAnimationFrame(updateActiveItems);
            };

            rafId = requestAnimationFrame(updateActiveItems);

            return () => cancelAnimationFrame(rafId);
        } else {
            const setActive = (target: Element) => {
                items.forEach((item) => {
                    item.setAttribute('data-typo-scroll-item', item === target ? 'active' : '');
                });
            };

            const clearActive = () => {
                items.forEach((item) => {
                    item.setAttribute('data-typo-scroll-item', '');
                });
            };

            const handlers: { item: Element, handler: () => void }[] = [];
            items.forEach((item) => {
                const handler = () => setActive(item);
                item.addEventListener('mouseenter', handler);
                handlers.push({ item, handler });
            });

            container.addEventListener('mouseleave', clearActive);

            return () => {
                handlers.forEach(({ item, handler }) => item.removeEventListener('mouseenter', handler));
                container.removeEventListener('mouseleave', clearActive);
            };
        }
    }, []);

    return (
        <section ref={containerRef} data-typo-scroll-init="" className="typo-scroll py-20 relative z-10 w-full overflow-hidden">
            <div className="typo-scroll__collection">
                <div data-typo-scroll-list="" className="typo-scroll__list">
                    {itemsData.map((item, index) => (
                        <div key={index} data-typo-scroll-item="" className="typo-scroll__item">
                            <a href="#" className="typo-scroll__link" onClick={(e) => e.preventDefault()}>
                                <h3 className="typo-scroll__h text-[7.5vw] lg:text-[7vw] leading-[0.9] font-medium uppercase tracking-tighter m-0 whitespace-nowrap text-center text-[#2b2b2b]">
                                    {item.title}
                                </h3>
                                <div className={`typo-scroll__media ${item.aspectClass}`}>
                                    <img src={item.img} loading="lazy" alt={item.title} className="typo-scroll__img" />
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* The concluding hook requested by the user */}
            <div className="flex flex-col items-center justify-center pt-32 pb-16 text-center select-none">
                <p className="font-body text-foreground/60 tracking-widest uppercase text-sm mb-6">
                    And many, many more things await you...
                </p>
                <h2 className="font-heading text-6xl sm:text-7xl md:text-8xl text-gold-gradient">
                    ready to experience<br/>Braj Ras?
                </h2>
            </div>
        </section>
    );
};

export default TypoScroll;
