import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Task } from '../../types';
import { Check, Pencil, Trash2, X, Save } from 'lucide-react';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, title: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);

    const handleSave = () => {
        if (editValue.trim()) {
            onEdit(task.id, editValue.trim());
            setEditing(false);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-colors ${task.completed
                    ? 'bg-neon-green/5 border-neon-green/20'
                    : 'bg-white/5 border-white/10'
                }`}
        >
            {/* Checkbox */}
            <button
                onClick={() => onToggle(task.id, !task.completed)}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${task.completed ? 'bg-neon-green border-neon-green' : 'border-gray-600 hover:border-neon-blue'
                    }`}
            >
                {task.completed && <Check className="w-4 h-4 text-background" strokeWidth={3} />}
            </button>

            {/* Content */}
            {editing ? (
                <input
                    autoFocus
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') setEditing(false); }}
                    className="flex-1 bg-transparent border-b border-neon-blue text-white text-sm focus:outline-none py-0.5"
                />
            ) : (
                <span className={`flex-1 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {task.title}
                </span>
            )}

            {/* Actions */}
            <div className="flex items-center gap-1">
                {editing ? (
                    <>
                        <button onClick={handleSave} className="p-1.5 rounded-lg text-neon-green hover:bg-neon-green/10 transition-colors">
                            <Save className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditing(false)} className="p-1.5 rounded-lg text-gray-500 hover:bg-white/10 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg text-gray-500 hover:text-neon-blue hover:bg-neon-blue/10 transition-colors opacity-0 group-hover:opacity-100">
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(task.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-neon-pink hover:bg-neon-pink/10 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
}
