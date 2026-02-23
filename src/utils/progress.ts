import type { Task, ProgressStats } from '../types';

export function calculateCompletionRate(tasks: Task[]): ProgressStats {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { completed, total, rate };
}

export function calculateWeeklyProgress(taskGroups: Task[][]): ProgressStats {
    const allTasks = taskGroups.flat();
    return calculateCompletionRate(allTasks);
}

export function calculateMonthlyProgress(taskGroups: Task[][]): ProgressStats {
    return calculateWeeklyProgress(taskGroups);
}

export function calculateYearlyProgress(taskGroups: Task[][]): ProgressStats {
    return calculateWeeklyProgress(taskGroups);
}
