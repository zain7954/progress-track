import { AnimatePresence, motion } from 'framer-motion';
import type { Task } from '../../types';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center py-12 text-center text-gray-500"
            >
                <ClipboardList className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm">No tasks yet. Add one above!</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-2 group">
            <AnimatePresence initial={false}>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
