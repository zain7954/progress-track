import { useEffect, useState, useCallback } from 'react';
import type { Planner, Task, PlannerType } from '../types';
import { useAuth } from '../context/AuthContext';
import { getOrCreatePlanner, addTask, updateTask, deleteTask } from '../services/planners';

export function usePlanner(type: PlannerType, date: string) {
    const { user } = useAuth();
    const [planner, setPlanner] = useState<Planner | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        const p = await getOrCreatePlanner(user.id, type, date);
        setPlanner(p);
        setTasks(p?.tasks ?? []);
        setLoading(false);
    }, [user, type, date]);

    useEffect(() => { load(); }, [load]);

    const handleAddTask = async (title: string) => {
        if (!planner) return;
        const task = await addTask(planner.id, title);
        if (task) setTasks(prev => [...prev, task]);
    };

    const handleToggle = async (id: string, completed: boolean) => {
        const ok = await updateTask(id, { completed });
        if (ok) setTasks(prev => prev.map(t => t.id === id ? { ...t, completed } : t));
    };

    const handleEdit = async (id: string, title: string) => {
        const ok = await updateTask(id, { title });
        if (ok) setTasks(prev => prev.map(t => t.id === id ? { ...t, title } : t));
    };

    const handleDelete = async (id: string) => {
        const ok = await deleteTask(id);
        if (ok) setTasks(prev => prev.filter(t => t.id !== id));
    };

    return { planner, tasks, loading, handleAddTask, handleToggle, handleEdit, handleDelete };
}
