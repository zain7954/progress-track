import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Globe, Lock } from 'lucide-react';
import { togglePlannerPublic } from '../../services/planners';

interface ShareButtonProps {
    plannerId: string;
    userId: string;
    isPublic: boolean;
}

export default function ShareButton({ plannerId, userId, isPublic: initialPublic }: ShareButtonProps) {
    const [isPublic, setIsPublic] = useState(initialPublic);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const profileUrl = `${window.location.origin}/profile/${userId}`;

    const handleToggle = async () => {
        setLoading(true);
        const ok = await togglePlannerPublic(plannerId, !isPublic);
        if (ok) setIsPublic(prev => !prev);
        setLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${isPublic
                        ? 'text-neon-green border-neon-green/30 bg-neon-green/10'
                        : 'text-gray-400 border-white/10 bg-white/5 hover:border-white/30'
                    }`}
            >
                {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                {isPublic ? 'Public' : 'Make Public'}
            </motion.button>

            {isPublic && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-neon-blue/30 bg-neon-blue/10 text-neon-blue"
                >
                    <Link2 className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy Link'}
                </motion.button>
            )}
        </div>
    );
}
