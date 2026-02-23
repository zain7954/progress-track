import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

type Tab = 'login' | 'signup';

export default function AuthPage() {
    const [tab, setTab] = useState<Tab>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const { signIn, signUp, user } = useAuth();
    const navigate = useNavigate();

    if (user) return <Navigate to="/dashboard" replace />;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const fn = tab === 'login' ? signIn : signUp;
        const { error } = await fn(email, password);

        if (error) {
            setError(error.message);
        } else if (tab === 'signup') {
            setSuccess('Check your email to confirm your account!');
        } else {
            navigate('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background glows */}
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md z-10"
            >
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink">
                            Progress Tracker
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">Your year, your goals.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-white/5 rounded-xl p-1 mb-8">
                        {(['login', 'signup'] as Tab[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => { setTab(t); setError(null); setSuccess(null); }}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 capitalize ${tab === t
                                        ? 'bg-gradient-to-r from-neon-blue to-neon-pink text-background'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {t === 'login' ? 'Sign In' : 'Sign Up'}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <AnimatePresence mode="wait">
                        <motion.form
                            key={tab}
                            initial={{ opacity: 0, x: tab === 'login' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: tab === 'login' ? 20 : -20 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-blue w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-pink w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-neon-pink transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Error / Success */}
                            <AnimatePresence>
                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="text-sm text-red-400 bg-red-400/10 rounded-xl px-4 py-2.5 border border-red-400/20">
                                        {error}
                                    </motion.p>
                                )}
                                {success && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="text-sm text-neon-green bg-neon-green/10 rounded-xl px-4 py-2.5 border border-neon-green/20">
                                        {success}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            {/* Submit */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-neon-blue to-neon-pink text-background flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity"
                            >
                                {loading ? (
                                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-background border-t-transparent rounded-full" />
                                ) : tab === 'login' ? (
                                    <><LogIn className="w-5 h-5" /> Sign In</>
                                ) : (
                                    <><UserPlus className="w-5 h-5" /> Create Account</>
                                )}
                            </motion.button>
                        </motion.form>
                    </AnimatePresence>
                </div>

                {/* Back to landing */}
                <div className="text-center mt-6">
                    <button onClick={() => navigate('/')} className="text-gray-500 hover:text-neon-blue text-sm transition-colors">
                        ← Back to home
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
