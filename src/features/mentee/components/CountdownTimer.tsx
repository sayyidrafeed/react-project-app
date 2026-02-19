import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    eventName: string;
    targetDate: string; // ISO string
    subtitle: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventName, targetDate, subtitle }) => {
    const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = new Date(targetDate).getTime() - new Date().getTime();

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    hours: Math.floor(difference / (1000 * 60 * 60)),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="bg-upn-green rounded-2xl p-6 text-white text-center shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-upn-gold/50" />

            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 opacity-90">{eventName}</h3>

            <div className="grid grid-cols-3 gap-2 mb-6">
                <div>
                    <p className="text-4xl font-black tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</p>
                    <p className="text-[10px] uppercase font-bold opacity-60 mt-1">Hours</p>
                </div>
                <div>
                    <p className="text-4xl font-black tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</p>
                    <p className="text-[10px] uppercase font-bold opacity-60 mt-1">Minutes</p>
                </div>
                <div>
                    <p className="text-4xl font-black tabular-nums">{timeLeft.seconds.toString().padStart(2, '0')}</p>
                    <p className="text-[10px] uppercase font-bold opacity-60 mt-1">Seconds</p>
                </div>
            </div>

            <div className="py-3 px-4 bg-white/10 rounded-xl border border-white/10">
                <p className="text-xs font-black uppercase tracking-wider">{subtitle}</p>
            </div>
        </div>
    );
};

export default CountdownTimer;
