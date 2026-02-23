import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface AddTaskFormProps {
    onAdd: (title: string) => void;
    disabled?: boolean;
}

export default function AddTaskForm({ onAdd, disabled }: AddTaskFormProps) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim());
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Add a new task..."
                disabled={disabled}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors disabled:opacity-50"
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={disabled || !title.trim()}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-pink text-background font-bold disabled:opacity-40 transition-opacity"
            >
                <Plus className="w-5 h-5" />
            </motion.button>
        </form>
    );
}
