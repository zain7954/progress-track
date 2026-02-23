import { motion } from 'framer-motion';
import ProgressCircle from './ProgressCircle';
import MotivationCard from './MotivationCard';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SummaryCardProps {
    completed: number;
    total: number;
    rate: number;
    periodLabel: string;
}

export default function SummaryCard({ completed, total, rate, periodLabel }: SummaryCardProps) {
    const missed = total - completed;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-6"
        >
            <h3 className="text-lg font-bold text-white">{periodLabel} Summary</h3>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                <ProgressCircle rate={rate} size={140} />
                <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center gap-3 bg-neon-green/10 border border-neon-green/20 rounded-xl px-4 py-3">
                        <CheckCircle2 className="w-5 h-5 text-neon-green flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-400">Completed</p>
                            <p className="text-2xl font-bold text-neon-green">{completed}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-neon-pink/10 border border-neon-pink/20 rounded-xl px-4 py-3">
                        <XCircle className="w-5 h-5 text-neon-pink flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-400">Missed</p>
                            <p className="text-2xl font-bold text-neon-pink">{missed}</p>
                        </div>
                    </div>
                </div>
            </div>

            <MotivationCard rate={rate} />
        </motion.div>
    );
}
