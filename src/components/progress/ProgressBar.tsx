import { motion } from 'framer-motion';

interface ProgressBarProps {
    rate: number;
    label?: string;
}

export default function ProgressBar({ rate, label }: ProgressBarProps) {
    const color = rate >= 80 ? '#00ff3f' : rate >= 50 ? '#00f3ff' : '#ff00ff';

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>{label}</span>
                    <span className="font-bold text-white">{rate}%</span>
                </div>
            )}
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rate}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 10px ${color}66` }}
                />
            </div>
        </div>
    );
}
