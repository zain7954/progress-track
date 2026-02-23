import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function PublicProfilesListPage() {
    const { user } = useAuth();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-6"
        >
            <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-neon-blue" />
                <div>
                    <h1 className="text-2xl font-bold text-white">Public Profiles</h1>
                    <p className="text-sm text-gray-400">Share your progress and inspire others</p>
                </div>
            </div>

            {/* Own Profile */}
            {user && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                    <h2 className="text-base font-semibold text-white">Your Public Profile</h2>
                    <p className="text-sm text-gray-400">
                        Make any of your planners public using the "Make Public" button on each planner page.
                        Then share your profile link with others.
                    </p>
                    <Link
                        to={`/profile/${user.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-sm font-medium hover:bg-neon-blue/20 transition-colors"
                    >
                        <Users className="w-4 h-4" />
                        View My Public Profile
                    </Link>
                </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Social discovery coming soon. Share your profile link directly for now!</p>
            </div>
        </motion.div>
    );
}
