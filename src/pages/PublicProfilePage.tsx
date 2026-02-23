import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Planner } from '../types';
import { getUserPublicPlanners } from '../services/planners';
import { calculateCompletionRate } from '../utils/progress';
import ProgressBar from '../components/progress/ProgressBar';
import CommentSection from '../components/social/CommentSection';
import { Users, ArrowLeft } from 'lucide-react';

export default function PublicProfilePage() {
    const { userId } = useParams<{ userId: string }>();
    const [planners, setPlanners] = useState<Planner[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<Planner | null>(null);

    useEffect(() => {
        if (!userId) return;
        getUserPublicPlanners(userId).then(data => {
            setPlanners(data);
            if (data.length > 0) setSelected(data[0]);
            setLoading(false);
        });
    }, [userId]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full border-4 border-neon-blue border-t-transparent" />
        </div>
    );

    return (
        <div className="min-h-screen p-4 md:p-8 relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-neon-blue/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-neon-pink/10 rounded-full blur-[100px]" />

            <div className="max-w-3xl mx-auto relative z-10 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-pink flex items-center justify-center">
                            <Users className="w-5 h-5 text-background" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Public Profile</h1>
                            <p className="text-xs text-gray-500 font-mono">{userId?.slice(0, 16)}...</p>
                        </div>
                    </div>
                </div>

                {planners.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No public planners yet.</p>
                    </div>
                ) : (
                    <>
                        {/* Planner Tabs */}
                        <div className="flex gap-2 flex-wrap">
                            {planners.map(p => (
                                <button key={p.id} onClick={() => setSelected(p)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${selected?.id === p.id
                                            ? 'bg-neon-blue/20 border-neon-blue/40 text-neon-blue'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                                        }`}>
                                    {p.type} · {p.date}
                                </button>
                            ))}
                        </div>

                        {/* Selected Planner */}
                        {selected && (() => {
                            const tasks = selected.tasks ?? [];
                            const { completed, total, rate } = calculateCompletionRate(tasks);
                            return (
                                <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                        <h2 className="text-lg font-bold capitalize text-white">{selected.type} Planner</h2>
                                        <ProgressBar rate={rate} label={`${completed} / ${total} tasks`} />
                                        <div className="space-y-2 pt-2">
                                            {tasks.map(t => (
                                                <div key={t.id} className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl ${t.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                                                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${t.completed ? 'bg-neon-green' : 'bg-gray-600'}`} />
                                                    {t.title}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <CommentSection plannerId={selected.id} />
                                    </div>
                                </motion.div>
                            );
                        })()}
                    </>
                )}
            </div>
        </div>
    );
}
