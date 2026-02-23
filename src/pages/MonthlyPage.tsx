import { motion } from 'framer-motion';
import { usePlanner } from '../hooks/usePlanner';
import { useAuth } from '../context/AuthContext';
import AddTaskForm from '../components/planners/AddTaskForm';
import TaskList from '../components/planners/TaskList';
import ProgressBar from '../components/progress/ProgressBar';
import SummaryCard from '../components/progress/SummaryCard';
import ShareButton from '../components/social/ShareButton';
import { calculateCompletionRate } from '../utils/progress';
import { CalendarRange } from 'lucide-react';

function getMonthKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
}

export default function MonthlyPage() {
    const monthKey = getMonthKey();
    const { planner, tasks, loading, handleAddTask, handleToggle, handleEdit, handleDelete } = usePlanner('monthly', monthKey);
    const { user } = useAuth();
    const { completed, total, rate } = calculateCompletionRate(tasks);
    const monthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-10 h-10 rounded-full border-4 border-neon-pink border-t-transparent" />
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <CalendarRange className="w-6 h-6 text-neon-green" />
                    <div>
                        <h1 className="text-2xl font-bold text-white">Monthly Planner</h1>
                        <p className="text-sm text-gray-400">{monthName}</p>
                    </div>
                </div>
                {planner && user && <ShareButton plannerId={planner.id} userId={user.id} isPublic={planner.is_public} />}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <ProgressBar rate={rate} label={`${completed} of ${total} tasks complete`} />
            </div>
            <AddTaskForm onAdd={handleAddTask} />
            <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
            {total > 0 && <SummaryCard completed={completed} total={total} rate={rate} periodLabel="This Month's" />}
        </motion.div>
    );
}
