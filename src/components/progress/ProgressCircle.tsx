import { motion } from 'framer-motion';

interface ProgressCircleProps {
    rate: number;
    size?: number;
}

export default function ProgressCircle({ rate, size = 120 }: ProgressCircleProps) {
    const radius = (size - 16) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (rate / 100) * circumference;
    const color = rate >= 80 ? '#00ff3f' : rate >= 50 ? '#00f3ff' : '#ff00ff';

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <motion.circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={color} strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">{rate}%</span>
                <span className="text-xs text-gray-400">done</span>
            </div>
        </div>
    );
}
