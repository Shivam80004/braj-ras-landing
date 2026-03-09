import React, { useEffect, useRef } from 'react';
import './TypoScroll.css';

const itemsData = [
    {
        title: "OSMO SUPPLY",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879acaa2379a19c9dbc1_image%2026.avif",
        aspectClass: ""
    },
    {
        title: "Mara Lynt",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a40b0a52832601f51_image%2017.avif",
        aspectClass: "is--3-2"
    },
    {
        title: "Kavirö",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a6755543b199a941a_image%2021.avif",
        aspectClass: "is--2-3"
    },
    {
        title: "Solara Works",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a8799fb46f896d7c81f9b_image%2030.avif",
        aspectClass: "is--1-1"
    },
    {
        title: "OSMO SUPPLY",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879acaa2379a19c9dbc1_image%2026.avif",
        aspectClass: ""
    },
    {
        title: "Mara Lynt",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a40b0a52832601f51_image%2017.avif",
        aspectClass: "is--3-2"
    },
    {
        title: "Kavirö",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a6755543b199a941a_image%2021.avif",
        aspectClass: "is--2-3"
    },
    {
        title: "Solara Works",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a8799fb46f896d7c81f9b_image%2030.avif",
        aspectClass: "is--1-1"
    },
    {
        title: "OSMO SUPPLY",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879acaa2379a19c9dbc1_image%2026.avif",
        aspectClass: ""
    },
    {
        title: "Mara Lynt",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a40b0a52832601f51_image%2017.avif",
        aspectClass: "is--3-2"
    },
    {
        title: "Kavirö",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a6755543b199a941a_image%2021.avif",
        aspectClass: "is--2-3"
    },
    {
        title: "Solara Works",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a8799fb46f896d7c81f9b_image%2030.avif",
        aspectClass: "is--1-1"
    },
    {
        title: "OSMO SUPPLY",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879acaa2379a19c9dbc1_image%2026.avif",
        aspectClass: ""
    },
    {
        title: "Mara Lynt",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a40b0a52832601f51_image%2017.avif",
        aspectClass: "is--3-2"
    },
    {
        title: "Kavirö",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a6755543b199a941a_image%2021.avif",
        aspectClass: "is--2-3"
    },
    {
        title: "Solara Works",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a8799fb46f896d7c81f9b_image%2030.avif",
        aspectClass: "is--1-1"
    },
    {
        title: "OSMO SUPPLY",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879acaa2379a19c9dbc1_image%2026.avif",
        aspectClass: ""
    },
    {
        title: "Mara Lynt",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a40b0a52832601f51_image%2017.avif",
        aspectClass: "is--3-2"
    },
    {
        title: "Kavirö",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a6755543b199a941a_image%2021.avif",
        aspectClass: "is--2-3"
    },
    {
        title: "Solara Works",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a8799fb46f896d7c81f9b_image%2030.avif",
        aspectClass: "is--1-1"
    },
    {
        title: "OSMO SUPPLY",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879acaa2379a19c9dbc1_image%2026.avif",
        aspectClass: ""
    },
    {
        title: "Mara Lynt",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a40b0a52832601f51_image%2017.avif",
        aspectClass: "is--3-2"
    },
    {
        title: "Kavirö",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a879a6755543b199a941a_image%2021.avif",
        aspectClass: "is--2-3"
    },
    {
        title: "Solara Works",
        img: "https://cdn.prod.website-files.com/693a7f8f14a0becb25db9e8f/693a8799fb46f896d7c81f9b_image%2030.avif",
        aspectClass: "is--1-1"
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
                                    <p className="typo-scroll__p">[ OPEN CASE ]</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TypoScroll;
