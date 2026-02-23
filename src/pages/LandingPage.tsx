import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '../components/CountdownTimer';
import { useCountdown } from '../hooks/useCountdown';

export default function LandingPage() {
    const navigate = useNavigate();
    const timeLeft = useCountdown();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Dynamic Background Elements for aesthetic flexibilty */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-neon-pink/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px]" />

            <main className="z-10 flex flex-col items-center justify-center max-w-4xl w-full text-center space-y-12">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                        Start Tracking <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink">
                            Your Progress
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide">
                        The clock is ticking
                    </p>
                </motion.div>

                {/* Countdown Section */}
                <div className="w-full">
                    <CountdownTimer {...timeLeft} />
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <button
                        onClick={() => navigate('/auth')}
                        className="group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-pink opacity-80 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-[2px] bg-background rounded-full z-0" />
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink group-hover:text-white transition-colors duration-300">
                            Get Started
                        </span>
                    </button>
                </motion.div>

            </main>
        </div>
    );
}
