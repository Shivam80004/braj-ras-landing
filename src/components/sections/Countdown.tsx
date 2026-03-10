import React, { useEffect, useState } from 'react';

interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    done: boolean;
    error: boolean;
}

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

const padZero = (num: number) => num.toString().padStart(2, '0');

const Countdown = () => {
    const targetDateStr = "2026-03-21 11:36";
    const offsetHours = 2; // e.g. CEST time relative to UTC

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
            <div className="flex justify-center items-center py-4 w-full z-10 mb-8">
                <p className="text-destructive font-body">Invalid Date config</p>
            </div>
        );
    }

    if (timeLeft.done) {
        return null;
    }

    return (
        <div className="flex justify-center items-center w-full z-10 mb-4 sm:mb-8">
            <div className="flex items-center justify-center gap-1.5 sm:gap-3 font-heading">
                {/* Days */}
                <div className="flex flex-col items-center justify-center min-w-[3rem] sm:min-w-[4rem]">
                    <span className="text-2xl sm:text-4xl font-bold shimmer text-gold-gradient drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                        {padZero(timeLeft.days)}
                    </span>
                    <span className="text-[8px] sm:text-[10px] tracking-[0.15em] uppercase text-primary/80 sm:mt-0.5">
                        Days
                    </span>
                </div>
                
                <div className="text-xl sm:text-3xl text-primary/40 -mt-3 sm:-mt-5 shimmer">:</div>
                
                {/* Hours */}
                <div className="flex flex-col items-center justify-center min-w-[3rem] sm:min-w-[4rem]">
                    <span className="text-2xl sm:text-4xl font-bold shimmer text-gold-gradient drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                        {padZero(timeLeft.hours)}
                    </span>
                    <span className="text-[8px] sm:text-[10px] tracking-[0.15em] uppercase text-primary/80 sm:mt-0.5">
                        Hours
                    </span>
                </div>
                
                <div className="text-xl sm:text-3xl text-primary/40 -mt-3 sm:-mt-5 shimmer">:</div>
                
                {/* Minutes */}
                <div className="flex flex-col items-center justify-center min-w-[3rem] sm:min-w-[4rem]">
                    <span className="text-2xl sm:text-4xl font-bold shimmer text-gold-gradient drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                        {padZero(timeLeft.minutes)}
                    </span>
                    <span className="text-[8px] sm:text-[10px] tracking-[0.15em] uppercase text-primary/80 sm:mt-0.5">
                        Mins
                    </span>
                </div>
                
                <div className="text-xl sm:text-3xl text-primary/40 -mt-3 sm:-mt-5 shimmer">:</div>
                
                {/* Seconds */}
                <div className="flex flex-col items-center justify-center min-w-[3rem] sm:min-w-[4rem]">
                    <span className="text-2xl sm:text-4xl font-bold shimmer text-gold-gradient drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                        {padZero(timeLeft.seconds)}
                    </span>
                    <span className="text-[8px] sm:text-[10px] tracking-[0.15em] uppercase text-primary/80 sm:mt-0.5">
                        Secs
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
