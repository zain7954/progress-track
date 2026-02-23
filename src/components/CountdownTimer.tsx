import { motion } from 'framer-motion';

interface TimeUnitProps {
    value: number;
    label: string;
}

const TimeUnit = ({ value, label }: TimeUnitProps) => {
    return (
        <div className="flex flex-col items-center mx-2 sm:mx-4">
            <motion.div
                key={value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-mono font-bold text-white box-glow-neon bg-white/5 rounded-xl p-4 min-w-[3em] text-center"
            >
                {value.toString().padStart(2, '0')}
            </motion.div>
            <span className="text-neon-blue uppercase text-xs sm:text-sm md:text-base font-semibold mt-3 tracking-widest text-glow-neon">
                {label}
            </span>
        </div>
    );
};

interface CountdownTimerProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-row justify-center items-center backdrop-blur-sm bg-black/20 p-6 rounded-3xl border border-white/10 shadow-2xl"
        >
            <TimeUnit value={days} label="Days" />
            <div className="text-4xl sm:text-6xl text-neon-pink mt-[-2rem] font-bold animate-pulse">:</div>
            <TimeUnit value={hours} label="Hours" />
            <div className="text-4xl sm:text-6xl text-neon-pink mt-[-2rem] font-bold animate-pulse">:</div>
            <TimeUnit value={minutes} label="Minutes" />
            <div className="text-4xl sm:text-6xl text-neon-pink mt-[-2rem] font-bold animate-pulse">:</div>
            <TimeUnit value={seconds} label="Seconds" />
        </motion.div>
    );
}
