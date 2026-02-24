import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { MOCK_TASKS, Task } from '../../data/mockData';
import { ArrowLeft, CheckCircle2, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

const OrientationJourneyDetail: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem('siera_tasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
                return;
            } catch (error) {
                console.error('Failed to parse saved tasks:', error);
            }
        }
        setTasks(MOCK_TASKS);
    }, []);

    const today = new Date();
    const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const { urgentTasks, pendingTasks, completedTasks } = useMemo(() => {
        const urgent: Task[] = [];
        const pending: Task[] = [];
        const completed: Task[] = [];

        tasks.forEach((task) => {
            const deadline = new Date(task.deadline);
            const normalizedDeadline = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());
            const isDueToday = normalizedDeadline.getTime() === normalizedToday.getTime();

            if (task.grade !== null) {
                completed.push(task);
            } else if (isDueToday) {
                urgent.push(task);
            } else {
                pending.push(task);
            }
        });

        return { urgentTasks: urgent, pendingTasks: pending, completedTasks: completed };
    }, [tasks, normalizedToday]);

    const completedCount = completedTasks.length;
    const totalCount = tasks.length || 1;
    const progress = Math.round((completedCount / totalCount) * 100);

    return (
        <DashboardLayout>
            <div className="space-y-5 sm:space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/mentee')}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-dark-border rounded-lg transition-colors"
                        aria-label="Kembali"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-dark-text">Tugas</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Perjalanan Orientasi 2025
                        </p>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="rounded-2xl p-5 sm:p-6 bg-upn-green text-white shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/70">Siera Orientasi 2025</p>
                            <h2 className="text-xl sm:text-2xl font-black mt-1">Progres Anda</h2>
                            <p className="text-xs sm:text-sm text-white/80 mt-2 font-medium">
                                {completedCount} dari {tasks.length} selesai
                            </p>
                            <p className="text-[10px] sm:text-xs text-white/70 font-medium mt-1">
                                {pendingTasks.length + urgentTasks.length} tugas tersisa minggu ini
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[6px] border-white/20 relative">
                            <div
                                className="absolute inset-0 rounded-full border-[6px] border-white"
                                style={{
                                    clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`
                                }}
                            />
                            <span className="text-base sm:text-lg font-black">{progress}%</span>
                        </div>
                    </div>
                </div>

                {/* Sections */}
                <TaskSection
                    title="Mendesak (Jatuh Tempo Hari Ini)"
                    count={urgentTasks.length}
                    emptyText="Tidak ada tugas mendesak"
                >
                    {urgentTasks.map((task) => (
                        <TaskRow key={task.id} task={task} variant="urgent" />
                    ))}
                </TaskSection>

                <TaskSection
                    title="Tertunda"
                    count={pendingTasks.length}
                    emptyText="Tidak ada tugas tertunda"
                >
                    {pendingTasks.map((task) => (
                        <TaskRow key={task.id} task={task} variant="pending" />
                    ))}
                </TaskSection>

                <TaskSection
                    title="Selesai"
                    count={completedTasks.length}
                    emptyText="Belum ada tugas selesai"
                    hideEmptyDivider
                >
                    {completedTasks.map((task) => (
                        <TaskRow key={task.id} task={task} variant="completed" />
                    ))}
                </TaskSection>
            </div>
        </DashboardLayout>
    );
};

const TaskSection: React.FC<{
    title: string;
    count: number;
    emptyText: string;
    hideEmptyDivider?: boolean;
    children: React.ReactNode;
}> = ({ title, count, emptyText, hideEmptyDivider, children }) => {
    const hasItems = count > 0;
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-black text-slate-800 dark:text-dark-text">{title}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-dark-text-muted">
                    {count} tugas
                </span>
            </div>
            <div className={clsx('space-y-2', !hasItems && !hideEmptyDivider && 'pb-2 border-b border-dashed border-slate-200 dark:border-dark-border')}>
                {hasItems ? children : (
                    <div className="card p-3 text-xs text-slate-400 dark:text-dark-text-muted font-medium">
                        {emptyText}
                    </div>
                )}
            </div>
        </div>
    );
};

const TaskRow: React.FC<{ task: Task; variant: 'urgent' | 'pending' | 'completed' }> = ({ task, variant }) => {
    const formattedDeadline = new Date(task.deadline).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    const variantStyles = {
        urgent: {
            icon: AlertTriangle,
            badge: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300',
            label: `Jatuh tempo hari ini, ${formattedDeadline}`
        },
        pending: {
            icon: Clock,
            badge: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
            label: `Jatuh tempo ${formattedDeadline}`
        },
        completed: {
            icon: CheckCircle2,
            badge: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300',
            label: 'Terverifikasi oleh Admin'
        }
    } as const;

    const Icon = variantStyles[variant].icon;

    return (
        <button
            type="button"
            className="w-full card p-3 sm:p-4 flex items-center justify-between gap-3 text-left hover:shadow-md transition-shadow"
        >
            <div className="flex items-start gap-3">
                <div className={clsx('w-10 h-10 rounded-full flex items-center justify-center shrink-0', variantStyles[variant].badge)}>
                    <Icon size={18} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-dark-text line-clamp-1">{task.title}</p>
                    <p className="text-[10px] sm:text-xs text-slate-400 dark:text-dark-text-muted font-medium mt-1">
                        {variantStyles[variant].label}
                    </p>
                </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 dark:text-dark-text-muted" />
        </button>
    );
};

export default OrientationJourneyDetail;
