import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './MotionPathGallery.css';

// Import Deity Images
import madanMohan from '@/assets/madan-mohan.jpg';
import govindDevJi from '@/assets/radha-govindevji.jpg';
import gopinath from '@/assets/radha-gopinath.jpg';
import damodar from '@/assets/radha-damodar.jpg';
import shyamsundar from '@/assets/radha-shyamsundar.jpg';
import raman from '@/assets/radha-raman.jpg';
import gokulananda from '@/assets/radha-gokulananda.jpg';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const DEFAULT_ITEMS = [
    {
        image: madanMohan,
        label: 'Sambandha Tattva',
        title: 'Sri Madan Mohan',
        slug: 'madan-mohan',
        description: 'The first deity of Vrindavan, establishing our eternal relationship (sambandha) with the Supreme. He is the deity of beginners who helps us understand our spiritual identity.'
    },
    {
        image: govindDevJi,
        label: 'Abhidheya Tattva',
        title: 'Sri Govind Dev Ji',
        slug: 'govind-dev-ji',
        description: 'The deity of the active process of devotion (abhidheya). He lovingly accepts the devotional service of the practitioners and reciprocates with them.'
    },
    {
        image: gopinath,
        label: 'Prayojana Tattva',
        title: 'Sri Radha Gopinath',
        slug: 'radha-gopinath',
        description: 'The deity of the ultimate goal (prayojana). He is the master of the absolute divine love and grants the highest perfection of devotion.'
    },
    {
        image: damodar,
        label: 'The Theologians',
        title: 'Sri Radha Damodar',
        slug: 'radha-damodar',
        description: 'Established by Jiva Goswami, these deities were carved directly by Rupa Goswami. They encompass the profound theological teachings of all the Six Goswamis.'
    },
    {
        image: shyamsundar,
        label: 'The Mysterious manifestation',
        title: 'Sri Radha Shyamsundar',
        slug: 'radha-shyamsundar',
        description: 'Miraculously manifested from Radharani\'s own heart for Shyamananda Pandit. They represent the intimately sweet pastimes of the divine couple.'
    },
    {
        image: raman,
        label: 'Self-Manifested',
        title: 'Sri Radha Raman',
        slug: 'radha-raman',
        description: 'Self-manifested from a sacred Shaligram Shila for Gopala Bhatta Goswami. This exquisitely beautiful deity remarkably combines the features of all three primary deities.'
    },
    {
        image: gokulananda,
        label: 'Esoteric Heritage',
        title: 'Sri Radha Gokulananda',
        slug: 'radha-gokulananda',
        description: 'Worshiped initially by Lokanatha Goswami, these Deities serve as a profound focal point of esoteric Gaudiya Vaishnava devotion and heritage in Sri Vrindavan.'
    },
];

function debounce(fn, delay = 200) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(fn, delay);
    };
}

const MotionPathGallery = ({ items = DEFAULT_ITEMS, title = 'RETREATS' }) => {
    const wrapRef = useRef(null);
    const tlRef = useRef(null);
    const marqueeRef = useRef(null);
    const resizeHandlerRef = useRef(null);

    const initAnimation = useCallback(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        const path = wrap.querySelector('[data-motionpath="path"]');
        const itemEls = wrap.querySelectorAll('[data-motionpath="item"]');
        const itemDetails = wrap.querySelectorAll('[data-motionpath="item-details"]');

        if (!path || itemEls.length === 0) return;

        // Set z-index on items so 1st item is on top
        gsap.set(itemEls, {
            zIndex: (i, _target, all) => all.length - i,
        });

        // If there's an old timeline, grab its progress, reset it, then kill it
        let progress = 0;
        if (tlRef.current) {
            progress = tlRef.current.progress();
            tlRef.current.progress(0).kill();
        }

        // Create new timeline + ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrap,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            },
            defaults: {
                ease: 'none',
                stagger: 0.4,
            },
        });

        tl.to(itemEls, {
            duration: 1,
            motionPath: {
                path,
                align: path,
                curviness: 2,
                alignOrigin: [0.5, 0.5],
            },
        })
            .fromTo(
                itemEls,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.1 },
                0
            )
            .fromTo(
                itemEls,
                { filter: 'blur(1.5em)' },
                { filter: 'blur(0em)', duration: 0.5 },
                0
            )
            .fromTo(
                itemDetails,
                { autoAlpha: 0, yPercent: 25 },
                { autoAlpha: 1, yPercent: 0, duration: 0.1 },
                0.5
            )
            .fromTo(
                itemEls,
                { scale: 0.4 },
                { scale: 1, duration: 0.65 },
                0
            )
            .to(itemEls, { autoAlpha: 0, filter: 'blur(1em)', duration: 0.15 }, 0.85)
            .to(itemDetails, { autoAlpha: 0, duration: 0.05 }, 0.9);

        // Jump back to previous spot and refresh
        tl.progress(progress);
        
        // Add scroll animation for the background text to bounce/move back and forth during scroll
        if (marqueeRef.current) {
            gsap.fromTo(marqueeRef.current,
                { xPercent: 0 },
                {
                    xPercent: -10, // Move less distance so it feels slower
                    ease: "sine.inOut",
                    yoyo: true, // Bounce back
                    repeat: 1, // Repeat 1 time makes it go 0 -> -10 -> 0 exactly matching the scroll duration
                    scrollTrigger: {
                        trigger: wrap,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 2, // Smooth scrubbing
                    }
                }
            );
        }

        ScrollTrigger.refresh();

        tlRef.current = tl;
    }, []);

    useEffect(() => {
        // Small delay to ensure DOM is painted
        const timer = setTimeout(() => {
            initAnimation();
        }, 100);

        // Debounced resize handler
        resizeHandlerRef.current = debounce(() => {
            initAnimation();
        }, 200);
        window.addEventListener('resize', resizeHandlerRef.current);

        return () => {
            clearTimeout(timer);
            if (tlRef.current) {
                tlRef.current.progress(0).kill();
                tlRef.current = null;
            }
            if (resizeHandlerRef.current) {
                window.removeEventListener('resize', resizeHandlerRef.current);
            }
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === wrapRef.current) {
                    st.kill();
                }
            });
        };
    }, [initAnimation]);

    return (
        
        <div data-motionpath="wrap" className="motionpath-wrap z-10" ref={wrapRef}>

            <div className="motionpath-content">
                <div className="motionpath-bg-text-container">
                    <div className="motionpath-bg-static">7 DEITIES OF</div>
                    <div className="motionpath-bg-marquee">
                        <div className="motionpath-bg-marquee-inner" ref={marqueeRef}>
                            <span>VRINDAVAN</span>
                            <span>VRINDAVAN</span>
                            <span>VRINDAVAN</span>
                            <span>VRINDAVAN</span>
                        </div>
                    </div>
                </div>
                <div className="motionpath-content-inner">
                    <div className="motionpath-content-path">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1366 603"
                            fill="transparent"
                            preserveAspectRatio="none"
                            className="motionpath-svg"
                        >
                            <path
                                data-motionpath="path"
                                d="M1115.94 0C1297.33 38.9693 1626.89 444.65 993.816 562.057C407.372 670.816 89.0772 533.413 0 436.157"
                                stroke="transparent"
                            />
                        </svg>
                    </div>
                    <div className="motionpath-content-wrap">
                        <div className="motionpath-content-list">
                            {items.map((item, index) => (
                                <Link
                                    to={`/retreats/${item.slug}`}
                                    data-motionpath="item"
                                    className="motionpath-content-item"
                                    key={index}
                                >
                                    <div className="motionpath-content-item__visual">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="motionpath-content-item__img"
                                        />
                                    </div>
                                    <div
                                        data-motionpath="item-details"
                                        className="motionpath-content-item__details"
                                    >
                                        <span className="motionpath-content-item__label">
                                            {item.label}
                                        </span>
                                        <h3 className="motionpath-content-item__title">
                                            {item.title}
                                        </h3>
                                        <p className="motionpath-content-item__desc">
                                            {item.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default MotionPathGallery;
