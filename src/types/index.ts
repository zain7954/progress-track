export type PlannerType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Task {
    id: string;
    planner_id: string;
    title: string;
    completed: boolean;
    created_at: string;
}

export interface Planner {
    id: string;
    user_id: string;
    type: PlannerType;
    title: string;
    date: string;
    is_public: boolean;
    created_at: string;
    tasks?: Task[];
}

export interface Comment {
    id: string;
    planner_id: string;
    user_id: string;
    message: string;
    created_at: string;
}

export interface UserProfile {
    id: string;
    email: string;
    created_at: string;
}

export interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface ProgressStats {
    completed: number;
    total: number;
    rate: number;
}
