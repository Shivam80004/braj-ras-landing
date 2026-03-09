import React, { useEffect, useState } from 'react';
import './Countdown.css';

interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    done: boolean;
    error: boolean;
}

const formatLabel = (key: string, value: number, format: string) => {
    if (format === 'plain') return `${value}`;

    const sing: Record<string, string> = { days: 'day', hours: 'hour', minutes: 'minute', seconds: 'second' };
    const abbr: Record<string, string[]> = { days: ['day', 'days'], hours: ['hr.', 'hrs.'], minutes: ['min.', 'mins.'], seconds: ['sec.', 'secs.'] };

    if (format === 'short') return value + (key === 'months' ? 'mo' : key[0]);
    if (format === 'abbr') {
        const a = abbr[key];
        return value + ' ' + a[value === 1 ? 0 : 1];
    }
    return value + ' ' + (value === 1 ? sing[key] : key);
};

const parseIso = (dateStr: string, offsetHours: number) => {
    const m = dateStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    const y = +m[1], mo = +m[2] - 1, d = +m[3], h = +m[4], mi = +m[5];
    let t = Date.UTC(y, mo, d, h, mi, 0, 0);
    if (offsetHours) t -= offsetHours * 3600000;

    const dt = new Date(t);
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo || dt.getUTCDate() !== d) return null;
    return t;
};

const Countdown = () => {
    const targetDateStr = "2026-03-21 11:36";
    const offsetHours = 2; // e.g. CEST time relative to UTC
    const format = "long"; // plain, short, long, abbr

    const [timeLeft, setTimeLeft] = useState<CountdownState>({
        days: 0, hours: 0, minutes: 0, seconds: 0, done: false, error: false
    });

    useEffect(() => {
        const targetMs = parseIso(targetDateStr, offsetHours);

        if (targetMs === null) {
            setTimeLeft(prev => ({ ...prev, error: true }));
            return;
        }

        const calculateTime = () => {
            const nowMs = Date.now();
            let msRemaining = targetMs - nowMs;

            if (msRemaining <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true, error: false });
                return;
            }

            let secs = Math.floor(msRemaining / 1000);

            const days = Math.floor(secs / 86400);
            secs %= 86400;

            const hours = Math.floor(secs / 3600);
            secs %= 3600;

            const minutes = Math.floor(secs / 60);
            secs %= 60;

            const seconds = secs;

            setTimeLeft({ days, hours, minutes, seconds, done: false, error: false });
        };

        calculateTime();
        const intervalId = setInterval(calculateTime, 1000);

        return () => clearInterval(intervalId);
    }, [targetDateStr, offsetHours]);

    if (timeLeft.error) {
        return (
            <section className="countdown-section py-20">
                <div data-countdown-status="error">
                    <p>Invalid Date, use: YYYY-MM-DD HH:mm</p>
                </div>
            </section>
        );
    }

    return (
        <section className="countdown-section py-20">
            <div
                data-countdown-timezone-offset={offsetHours}
                data-countdown-date={targetDateStr}
                data-countdown-status={timeLeft.done ? "finished" : "active"}
                data-countdown-format={format}
            >
                <p data-countdown-update="days">{formatLabel('days', timeLeft.days, format)}</p>
                <p data-countdown-update="hours">{formatLabel('hours', timeLeft.hours, format)}</p>
                <p data-countdown-update="minutes">{formatLabel('minutes', timeLeft.minutes, format)}</p>
                <p data-countdown-update="seconds">{formatLabel('seconds', timeLeft.seconds, format)}</p>
            </div>
        </section>
    );
};

export default Countdown;
