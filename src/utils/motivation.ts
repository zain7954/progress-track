export interface MotivationResult {
    quote: string;
    tier: 'excellent' | 'good' | 'push';
}

const quotes = {
    excellent: [
        "Outstanding! You're crushing your goals. Keep the momentum going! 🚀",
        "Incredible work! You're in your peak zone. Nothing can stop you now! 🔥",
        "Exceptional performance! You're a productivity powerhouse! ⚡",
    ],
    good: [
        "Great progress! You're on the right track. Push a little more! 💪",
        "You're doing well! A little extra effort and you'll hit your peak! 🎯",
        "Solid work! Keep the energy up and finish strong! ✨",
    ],
    push: [
        "Every big journey starts with a single step. You've got this! 🌟",
        "Don't give up — today's effort is tomorrow's result. Keep going! 💡",
        "Progress, not perfection. Start small, finish strong! 🔑",
    ],
};

export function getMotivation(completionRate: number): MotivationResult {
    if (completionRate >= 80) {
        return {
            tier: 'excellent',
            quote: quotes.excellent[Math.floor(Math.random() * quotes.excellent.length)],
        };
    } else if (completionRate >= 50) {
        return {
            tier: 'good',
            quote: quotes.good[Math.floor(Math.random() * quotes.good.length)],
        };
    } else {
        return {
            tier: 'push',
            quote: quotes.push[Math.floor(Math.random() * quotes.push.length)],
        };
    }
}
