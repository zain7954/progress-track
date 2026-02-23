export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export function calculateTimeLeft(): TimeLeft {
    const now = new Date();
    const currentYear = now.getFullYear();
    // Target is December 31st, 23:59:59 of current year
    const targetDate = new Date(currentYear, 11, 31, 23, 59, 59);

    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
}
