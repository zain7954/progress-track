import type { Planner, Task, PlannerType } from '../types';
import { supabase } from './supabase';

// ─── Planners ────────────────────────────────────────────────────────────────

export async function getOrCreatePlanner(
    userId: string,
    type: PlannerType,
    date: string
): Promise<Planner | null> {
    const { data, error } = await supabase
        .from('planners')
        .select('*, tasks(*)')
        .eq('user_id', userId)
        .eq('type', type)
        .eq('date', date)
        .maybeSingle();

    if (error) { console.error(error); return null; }
    if (data) return data as Planner;

    const { data: newPlanner, error: createError } = await supabase
        .from('planners')
        .insert({ user_id: userId, type, title: `${type} planner`, date })
        .select('*, tasks(*)')
        .single();

    if (createError) { console.error(createError); return null; }
    return newPlanner as Planner;
}

export async function getPublicPlanner(plannerId: string): Promise<Planner | null> {
    const { data, error } = await supabase
        .from('planners')
        .select('*, tasks(*)')
        .eq('id', plannerId)
        .eq('is_public', true)
        .single();
    if (error) return null;
    return data as Planner;
}

export async function getUserPublicPlanners(userId: string): Promise<Planner[]> {
    const { data, error } = await supabase
        .from('planners')
        .select('*, tasks(*)')
        .eq('user_id', userId)
        .eq('is_public', true)
        .order('created_at', { ascending: false });
    if (error) return [];
    return data as Planner[];
}

export async function togglePlannerPublic(plannerId: string, isPublic: boolean): Promise<boolean> {
    const { error } = await supabase
        .from('planners')
        .update({ is_public: isPublic })
        .eq('id', plannerId);
    return !error;
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

export async function addTask(plannerId: string, title: string): Promise<Task | null> {
    const { data, error } = await supabase
        .from('tasks')
        .insert({ planner_id: plannerId, title })
        .select()
        .single();
    if (error) return null;
    return data as Task;
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<boolean> {
    const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId);
    return !error;
}

export async function deleteTask(taskId: string): Promise<boolean> {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    return !error;
}
