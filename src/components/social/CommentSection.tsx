import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Comment } from '../../types';
import { getComments, addComment } from '../../services/comments';
import { useAuth } from '../../context/AuthContext';
import { Send, MessageCircle } from 'lucide-react';

interface CommentSectionProps {
    plannerId: string;
}

export default function CommentSection({ plannerId }: CommentSectionProps) {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getComments(plannerId).then(setComments);
    }, [plannerId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !message.trim()) return;
        setLoading(true);
        const c = await addComment(plannerId, user.id, message.trim());
        if (c) { setComments(prev => [...prev, c]); setMessage(''); }
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">Comments ({comments.length})</span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                <AnimatePresence>
                    {comments.map(c => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-4"
                        >
                            <p className="text-xs text-neon-blue mb-1">
                                {c.user_id.slice(0, 8)}... · {new Date(c.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-white">{c.message}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {comments.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">No comments yet. Be the first!</p>
                )}
            </div>

            {user && (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Leave an appreciation..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors"
                    />
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading || !message.trim()}
                        className="px-4 py-2.5 rounded-xl bg-neon-blue/20 border border-neon-blue/30 text-neon-blue disabled:opacity-40"
                    >
                        <Send className="w-4 h-4" />
                    </motion.button>
                </form>
            )}
        </div>
    );
}
