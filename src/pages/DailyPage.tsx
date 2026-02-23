import { motion } from 'framer-motion';
import { usePlanner } from '../hooks/usePlanner';
import { useAuth } from '../context/AuthContext';
import AddTaskForm from '../components/planners/AddTaskForm';
import TaskList from '../components/planners/TaskList';
import ProgressBar from '../components/progress/ProgressBar';
import SummaryCard from '../components/progress/SummaryCard';
import ShareButton from '../components/social/ShareButton';
import { calculateCompletionRate } from '../utils/progress';
import { Calendar } from 'lucide-react';

export default function DailyPage() {
    const today = new Date().toISOString().split('T')[0];
    const { planner, tasks, loading, handleAddTask, handleToggle, handleEdit, handleDelete } = usePlanner('daily', today);
    const { user } = useAuth();
    const { completed, total, rate } = calculateCompletionRate(tasks);

    if (loading) return <PageLoader />;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-neon-blue" />
                    <div>
                        <h1 className="text-2xl font-bold text-white">Daily Planner</h1>
                        <p className="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
                {planner && user && (
                    <ShareButton plannerId={planner.id} userId={user.id} isPublic={planner.is_public} />
                )}
            </div>

            {/* Progress */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
                <ProgressBar rate={rate} label={`${completed} of ${total} tasks complete`} />
            </div>

            {/* Task Input */}
            <AddTaskForm onAdd={handleAddTask} />

            {/* Task List */}
            <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />

            {/* Summary (show when tasks exist) */}
            {total > 0 && (
                <SummaryCard completed={completed} total={total} rate={rate} periodLabel="Today's" />
            )}
        </motion.div>
    );
}

export function PageLoader() {
    return (
        <div className="flex items-center justify-center py-20">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full border-4 border-neon-blue border-t-transparent"
            />
        </div>
    );
}
