import { useState, useEffect } from 'react';
import { calculateTimeLeft, type TimeLeft } from '../utils/time';

export function useCountdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return timeLeft;
}
