import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './FeaturePills.css';

const FeaturePills = () => {
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapRef.current) return;
        const wrap = wrapRef.current;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const items = Array.from(wrap.querySelectorAll("[data-feature-pills-item]")) as HTMLElement[];
        const visuals = Array.from(wrap.querySelectorAll("[data-feature-pills-visual]")) as HTMLElement[];
        const cover = wrap.querySelector("[data-feature-pills-cover]") as HTMLElement;
        const closeBtn = wrap.querySelector("[data-feature-pills-close]") as HTMLButtonElement;
        if (!items.length) return;

        if (visuals.length && visuals.length !== items.length) {
            console.warn(
                `[ExpandingFeaturePills] items (${items.length}) and visuals (${visuals.length}) mismatch. Visual syncing uses index order.`
            );
        }

        const uidBase = `feature-pills-react`;
        const ease = "back.out(2)";
        const animationDuration = 0.5;

        const getExpandedWidth = () =>
            getComputedStyle(wrap).getPropertyValue("--content-item-expanded").trim() || "";

        const getActiveIndex = () => {
            const active = items.find((it) => it.getAttribute("data-active") === "true");
            return active ? Number(active.getAttribute("data-feature-pills-index")) : null;
        };

        const setWrapActive = (isActive: boolean) => {
            wrap.setAttribute("data-feature-pills-active", isActive ? "true" : "false");
            if (closeBtn) closeBtn.setAttribute("aria-hidden", isActive ? "false" : "true");
            if (cover) {
                cover.setAttribute("data-active", isActive ? "false" : "true");
                cover.setAttribute("aria-hidden", isActive ? "true" : "false");
            }
        };

        const setVisualActive = (indexOrNull: number | null) => {
            if (!visuals.length) return;
            visuals.forEach((v) => {
                const idx = Number(v.getAttribute("data-feature-pills-index"));
                const isActive = indexOrNull !== null && idx === indexOrNull;
                v.setAttribute("data-active", isActive ? "true" : "false");
                v.setAttribute("aria-hidden", isActive ? "false" : "true");
            });
        };

        const setItemA11y = (item: HTMLElement, isOpen: boolean) => {
            const btn = item.querySelector("[data-feature-pills-button]");
            const content = item.querySelector("[data-feature-pills-content]");
            if (!btn || !content) return;
            btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            content.setAttribute("aria-hidden", isOpen ? "false" : "true");
        };

        const measureButtonH = (item: HTMLElement) => {
            const btn = item.querySelector("[data-feature-pills-button]");
            return btn ? Math.ceil(btn.getBoundingClientRect().height) : 0;
        };

        const measureInnerH = (item: HTMLElement, expandedW: string) => {
            const inner = item.querySelector("[data-feature-pills-inner]") as HTMLElement;
            if (!inner) return 0;

            const mask = item.querySelector(".feature-pills__item-mask") as HTMLElement;

            const prevMaskOverflow = mask ? mask.style.overflow : null;
            if (mask) mask.style.overflow = "visible";

            const prevMaxW = inner.style.maxWidth;
            if (expandedW) inner.style.maxWidth = expandedW;

            const h = Math.ceil(inner.getBoundingClientRect().height);

            if (expandedW) inner.style.maxWidth = prevMaxW || "";
            if (mask) mask.style.overflow = prevMaskOverflow || "";

            return h;
        };

        const getHeights = (item: HTMLElement, expandedW: string) => {
            const buttonH = measureButtonH(item);
            const innerH = measureInnerH(item, expandedW);
            const openH = Math.max(buttonH, innerH);
            return { buttonH, openH };
        };

        const collapsedWidthPx = new Map<HTMLElement, number>();

        const captureCollapsedWidths = () => {
            items.forEach((item) => {
                const prev = item.style.width;
                item.style.width = "";
                collapsedWidthPx.set(item, Math.ceil(item.getBoundingClientRect().width));
                item.style.width = prev;
            });
        };

        const animateBox = (el: HTMLElement, vars: any) => {
            gsap.killTweensOf(el);
            if (prefersReducedMotion) {
                if (vars.height != null) el.style.height = `${vars.height}px`;
                if (vars.width != null) el.style.width = typeof vars.width === "number" ? `${vars.width}px` : vars.width;
                return;
            }
            gsap.to(el, { ...vars, duration: animationDuration, ease, overwrite: true });
        };

        const openItem = (item: HTMLElement) => {
            const expandedW = getExpandedWidth();
            const { openH } = getHeights(item, expandedW);

            item.setAttribute("data-active", "true");
            setItemA11y(item, true);
            setWrapActive(true);

            const targetW = expandedW || `${collapsedWidthPx.get(item) || Math.ceil(item.getBoundingClientRect().width)}px`;
            animateBox(item, { height: openH, width: targetW });
        };

        const closeItem = (item: HTMLElement) => {
            const expandedW = getExpandedWidth();
            const { buttonH } = getHeights(item, expandedW);

            item.setAttribute("data-active", "false");
            setItemA11y(item, false);

            const targetW = collapsedWidthPx.get(item) || Math.ceil(item.getBoundingClientRect().width);
            animateBox(item, { height: buttonH, width: targetW });
        };

        const switchTo = (nextIndex: number) => {
            const current = getActiveIndex();
            if (current === nextIndex) return;

            const nextItem = items[nextIndex];
            if (!nextItem) return;

            if (current !== null) closeItem(items[current]);
            openItem(nextItem);

            setVisualActive(nextIndex);
        };

        const closeAll = () => {
            const current = getActiveIndex();
            if (current === null) return;
            closeItem(items[current]);
            setVisualActive(null);
            setWrapActive(false);
        };

        items.forEach((item, i) => {
            item.setAttribute("data-feature-pills-index", String(i));
            if (!item.hasAttribute("data-active")) item.setAttribute("data-active", "false");

            const btn = item.querySelector("[data-feature-pills-button]") as HTMLButtonElement;
            const content = item.querySelector("[data-feature-pills-content]");
            if (btn) {
                btn.setAttribute("data-feature-pills-index", String(i));
                btn.type = "button";
                const triggerId = `${uidBase}-trigger-${i}`;
                if (!btn.id) btn.id = triggerId;
            }
            if (content && btn) {
                content.setAttribute("data-feature-pills-index", String(i));
                const panelId = `${uidBase}-panel-${i}`;
                if (!content.id) content.id = panelId;
                btn.setAttribute("aria-controls", content.id);
                content.setAttribute("role", "region");
                content.setAttribute("aria-labelledby", btn.id);
                if (!content.hasAttribute("aria-hidden")) content.setAttribute("aria-hidden", "true");
                if (!btn.hasAttribute("aria-expanded")) btn.setAttribute("aria-expanded", "false");
            }
        });

        visuals.forEach((v, i) => v.setAttribute("data-feature-pills-index", String(i)));

        if (closeBtn) {
            closeBtn.type = "button";
            if (!closeBtn.hasAttribute("aria-hidden")) closeBtn.setAttribute("aria-hidden", "true");
            closeBtn.addEventListener("click", closeAll);
        }

        items.forEach((item) => {
            const h = measureButtonH(item);
            item.style.height = `${h}px`;
        });

        setWrapActive(false);
        setVisualActive(null);

        const clickHandlers = items.map((item, i) => {
            const btn = item.querySelector("[data-feature-pills-button]");
            const handler = () => switchTo(i);
            if (btn) btn.addEventListener("click", handler);
            return { btn, handler };
        });

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeAll();
        };
        wrap.addEventListener("keydown", onKeyDown);

        const debounce = (fn: any, wait = 150) => {
            let t: number;
            return (...args: any[]) => {
                clearTimeout(t);
                t = window.setTimeout(() => fn(...args), wait);
            };
        };

        const handleResize = () => {
            const current = getActiveIndex();

            items.forEach((item) => {
                if (item.getAttribute("data-active") !== "true") item.style.width = "";
            });

            captureCollapsedWidths();

            if (current !== null) {
                const item = items[current];
                const expandedW = getExpandedWidth();
                const { openH } = getHeights(item, expandedW);
                const targetW = expandedW || "";

                if (prefersReducedMotion) {
                    item.style.height = `${openH}px`;
                    if (targetW) item.style.width = targetW;
                } else {
                    const fallbackW = `${Math.ceil(item.getBoundingClientRect().width)}px`;
                    const widthForActive = targetW || fallbackW;

                    gsap.set(item, { height: openH, width: widthForActive });
                    if (targetW) item.style.width = targetW;
                }
            } else {
                items.forEach((item) => {
                    const h = measureButtonH(item);
                    item.style.height = `${h}px`;
                });
            }
        };

        const debouncedResize = debounce(handleResize, 200);

        captureCollapsedWidths();
        window.addEventListener("resize", debouncedResize, { passive: true });

        return () => {
            if (closeBtn) closeBtn.removeEventListener("click", closeAll);
            clickHandlers.forEach(({ btn, handler }) => {
                if (btn) btn.removeEventListener("click", handler);
            });
            wrap.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", debouncedResize);
        };
    }, []);

    return (
        <section className="py-20 w-full bg-background flex justify-center items-center px-4">
            <div data-feature-pills-active="false" aria-label="product features" data-feature-pills-init="" data-edit-mode="false" className="feature-pills__wrap" ref={wrapRef}>
                <div className="feature-pills__layout">
                    <div className="feature-pills__col">
                        <div data-feature-pills-collection="" className="feature-pills__info-collection">
                            <ul role="list" data-feature-pills-list="" className="feature-pills__info-list">
                                {[
                                    { title: "Effortless movement", text: "Four-way stretch and a tuned cut move with you — so every stride, reach, and turn feels natural." },
                                    { title: "Breathes when you push", text: "Air-mapped fabric releases heat fast, keeping you cool through climbs, sprints, and long sessions." },
                                    { title: "Storm-ready waterproofing", text: "A sealed outer layer sheds rain on contact, with water beading off before it ever soaks in." },
                                    { title: "Built for high output", text: "Lightweight where it matters, durable where it counts — engineered to perform at speed, under load." },
                                    { title: "Protection, without bulk", text: "Reinforced panels take the hits and abrasion, while the rest stays streamlined and flexible." },
                                    { title: "Wind insulation", text: "A wind-blocking shell cuts chill instantly, holding warmth close without trapping sweat." },
                                ].map((item, index) => (
                                    <li key={index} data-feature-pills-item="" data-active="false" className="feature-pills__info-item">
                                        <div className="feature-pills__item-bg"></div>
                                        <button data-feature-pills-button="" aria-expanded="false" className="feature-pills__item-button">
                                            <span className="feature-pills__item-label">{item.title}</span>
                                            <span className="feature-pills__item-icon">
                                                <span className="feature-pills__item-icon-bar"></span>
                                                <span className="feature-pills__item-icon-bar is--horizontal"></span>
                                            </span>
                                        </button>
                                        <div aria-hidden="true" data-feature-pills-content="" className="feature-pills__item-content">
                                            <div className="feature-pills__item-mask">
                                                <div data-feature-pills-inner="" className="feature-pills__item-inner">
                                                    <p className="feature-pills__item-body">{item.title}.<br /><br />
                                                        <span className="feature-pills__item-body-span">{item.text}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="feature-pills__col is--visual">
                        <div className="feature-pills__visual-collection">
                            <div className="feature-pills__visual-list">
                                {[
                                    "https://cdn.prod.website-files.com/69677270cfce23df8f7f806b/69678e23bef3821ddd09d61e_Motion%20Blur%20Portrait.avif",
                                    "https://cdn.prod.website-files.com/69677270cfce23df8f7f806b/69678e2399b8352d8164a769_Runner%20in%20Motion%20(1).avif",
                                    "https://cdn.prod.website-files.com/69677270cfce23df8f7f806b/69678e238b18bad979ad763c_Adventurer%20in%20Motion.avif",
                                    "https://cdn.prod.website-files.com/69677270cfce23df8f7f806b/69678e236094f2a6a51c5a6a_Dynamic%20Martial%20Arts%20Pose.avif",
                                    "https://cdn.prod.website-files.com/69677270cfce23df8f7f806b/69678e23e6da4f53478511b5_Snowboarding%20Adventure.avif",
                                    "https://cdn.prod.website-files.com/69677270cfce23df8f7f806b/69678e23434707a565abb0c7_Dynamic%20Skiing%20Action.avif",
                                ].map((src, index) => (
                                    <div key={index} aria-hidden="true" data-feature-pills-visual="" className="feature-pills__visual-item">
                                        <img src={src} className="feature-pills__visual-img" alt={`Visual feature ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div data-feature-pills-cover="" className="feature-pills__visual-cover">
                            <img src="https://cdn.prod.website-files.com/69677270cfce23df8f7f806b/6967c0e9c014f4dab1ed8fe9_expanding-features-placeholder-v3.avif" className="feature-pills__visual-cover-img" alt="Overview feature" />
                        </div>
                    </div>
                </div>
                <div className="feature-pills__close">
                    <button data-feature-pills-close="" aria-hidden="true" className="feature-pills__close-button">
                        <span className="feature-pills__item-icon-bar"></span>
                        <span className="feature-pills__item-icon-bar is--horizontal"></span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturePills;
