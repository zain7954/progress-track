import { motion } from 'framer-motion';
import { getMotivation } from '../../utils/motivation';
import { Sparkles } from 'lucide-react';

interface MotivationCardProps {
    rate: number;
}

const tierColors = {
    excellent: { from: '#00ff3f', to: '#00f3ff', glow: '#00ff3f' },
    good: { from: '#00f3ff', to: '#7c3aed', glow: '#00f3ff' },
    push: { from: '#ff00ff', to: '#ff6b00', glow: '#ff00ff' },
};

export default function MotivationCard({ rate }: MotivationCardProps) {
    const { quote, tier } = getMotivation(rate);
    const colors = tierColors[tier];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm relative overflow-hidden"
        >
            <div
                className="absolute inset-0 opacity-10"
                style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
            />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5" style={{ color: colors.glow }} />
                    <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: colors.glow }}>
                        {tier === 'excellent' ? 'Outstanding' : tier === 'good' ? 'Great Work' : 'Keep Going'}
                    </span>
                </div>
                <p className="text-white text-base leading-relaxed">{quote}</p>
            </div>
        </motion.div>
    );
}
