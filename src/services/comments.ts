import type { Comment } from '../types';
import { supabase } from './supabase';

export async function getComments(plannerId: string): Promise<Comment[]> {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('planner_id', plannerId)
        .order('created_at', { ascending: true });
    if (error) return [];
    return data as Comment[];
}

export async function addComment(plannerId: string, userId: string, message: string): Promise<Comment | null> {
    const { data, error } = await supabase
        .from('comments')
        .insert({ planner_id: plannerId, user_id: userId, message })
        .select()
        .single();
    if (error) return null;
    return data as Comment;
}
