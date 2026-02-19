import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { CheckSquare, Clock, FileText, CheckCircle, AlertTriangle, Search, Filter, ArrowRight } from 'lucide-react';
import { MOCK_TASKS, type Task } from '../../data/mockData';

type FilterType = 'all' | 'urgent' | 'pending' | 'completed';

interface TaskStatus {
    status: 'completed' | 'urgent' | 'warning' | 'pending';
    color: string;
    bg: string;
    label: string;
}

const TasksPage: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const savedTasks = localStorage.getItem('siera_tasks');
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (error) {
                console.error('Failed to parse saved tasks:', error);
            }
        }
    }, []);

    const today = new Date();

    const filteredTasks = tasks.filter(task => {
        // Search filter
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;

        // Status filter
        const isCompleted = task.grade !== null;
        const deadline = new Date(task.deadline);
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isUrgent = diffDays <= 2 && !isCompleted;

        switch (filter) {
            case 'urgent':
                return isUrgent;
            case 'pending':
                return !isCompleted;
            case 'completed':
                return isCompleted;
            default:
                return true;
        }
    });

    const getTaskStatus = (task: Task): TaskStatus => {
        if (task.grade !== null) {
            return { status: 'completed', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', label: 'Selesai' };
        }

        const deadline = new Date(task.deadline);
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            return { status: 'urgent', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Urgent' };
        } else if (diffDays <= 3) {
            return { status: 'warning', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', label: 'Segera' };
        } else {
            return { status: 'pending', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', label: 'Pending' };
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Katalog Tugas</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Kelola dan pantau semua tugas PKKMB-U Anda
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-dark-text-muted" size={18} />
                    <input
                        type="text"
                        placeholder="Cari tugas..."
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <FilterButton
                        active={filter === 'all'}
                        onClick={() => setFilter('all')}
                        count={tasks.length}
                        icon={Filter}
                        label="Semua"
                    />
                    <FilterButton
                        active={filter === 'urgent'}
                        onClick={() => setFilter('urgent')}
                        count={tasks.filter(t => {
                            const deadline = new Date(t.deadline);
                            const diffTime = deadline.getTime() - today.getTime();
                            return diffTime <= 2 * 24 * 60 * 60 * 1000 && t.grade === null;
                        }).length}
                        icon={AlertTriangle}
                        label="Urgent"
                        color="red"
                    />
                    <FilterButton
                        active={filter === 'pending'}
                        onClick={() => setFilter('pending')}
                        count={tasks.filter(t => t.grade === null).length}
                        icon={Clock}
                        label="Pending"
                        color="yellow"
                    />
                    <FilterButton
                        active={filter === 'completed'}
                        onClick={() => setFilter('completed')}
                        count={tasks.filter(t => t.grade !== null).length}
                        icon={CheckCircle}
                        label="Selesai"
                        color="green"
                    />
                </div>

                {/* Task List */}
                <div className="space-y-3">
                    {filteredTasks.length === 0 ? (
                        <div className="card p-8 sm:p-12 text-center border-2 border-dashed border-slate-200 dark:border-dark-border">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-dark-border rounded-full flex items-center justify-center text-slate-300 dark:text-dark-text-muted mx-auto mb-4">
                                <FileText size={32} />
                            </div>
                            <p className="text-base sm:text-lg text-slate-400 dark:text-dark-text-muted font-bold">
                                {searchQuery ? 'Tidak ada tugas yang cocok' : 'Tidak ada tugas'}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 dark:text-dark-text-muted mt-2">
                                {searchQuery ? 'Coba kata kunci lain' : 'Semua tugas Anda sudah ditampilkan'}
                            </p>
                        </div>
                    ) : (
                        filteredTasks.map(task => {
                            const status = getTaskStatus(task);
                            return (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    status={status}
                                    onClick={() => navigate(`/mentee/tasks/${task.id}`)}
                                />
                            );
                        })
                    )}
                </div>

                {/* Summary Stats */}
                <div className="card p-4 sm:p-6 bg-gradient-to-br from-upn-green/5 to-upn-gold/5 dark:from-upn-green/10 dark:to-upn-gold/10">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text mb-3">Ringkasan Tugas</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <StatItem
                            label="Total"
                            value={tasks.length}
                            color="blue"
                        />
                        <StatItem
                            label="Urgent"
                            value={tasks.filter(t => {
                                const deadline = new Date(t.deadline);
                                const diffTime = deadline.getTime() - today.getTime();
                                return diffTime <= 2 * 24 * 60 * 60 * 1000 && t.grade === null;
                            }).length}
                            color="red"
                        />
                        <StatItem
                            label="Pending"
                            value={tasks.filter(t => t.grade === null).length}
                            color="yellow"
                        />
                        <StatItem
                            label="Selesai"
                            value={tasks.filter(t => t.grade !== null).length}
                            color="green"
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

// Filter Button Component
const FilterButton: React.FC<{
    active: boolean;
    onClick: () => void;
    count: number;
    icon: React.ElementType;
    label: string;
    color?: 'red' | 'yellow' | 'green';
}> = ({ active, onClick, count, icon: Icon, label, color }) => {
    const getActiveClass = () => {
        if (color) {
            return {
                red: 'bg-red-600 text-white',
                yellow: 'bg-yellow-500 text-white',
                green: 'bg-green-600 text-white',
            }[color];
        }
        return 'bg-upn-green text-upn-gold';
    };

    const getInactiveClass = () => {
        if (color) {
            return {
                red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30',
                yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
                green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30',
            }[color];
        }
        return 'bg-slate-100 dark:bg-dark-border text-slate-600 dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-dark-surface';
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${active ? getActiveClass() : getInactiveClass()}`}
        >
            <Icon size={14} className="sm:size-16" />
            <span>{label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/20' : 'bg-slate-200 dark:bg-dark-surface'}`}>
                {count}
            </span>
        </button>
    );
};

// Task Card Component
const TaskCard: React.FC<{
    task: Task;
    status: TaskStatus;
    onClick: () => void;
}> = ({ task, status, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full text-left p-4 sm:p-5 bg-white dark:bg-dark-surface rounded-xl border-2 border-slate-200 dark:border-dark-border hover:border-upn-green dark:hover:border-upn-gold transition-all group"
        >
            <div className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 ${status.bg}`}>
                    <CheckSquare size={18} className={`sm:size-20 ${status.color}`} />
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-800 dark:text-dark-text text-sm sm:text-base truncate flex-grow">
                            {task.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase shrink-0 ${status.bg} ${status.color}`}>
                            {status.label}
                        </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted mb-2 line-clamp-2">
                        {task.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-slate-400 dark:text-dark-text-muted" />
                            <span className="text-[10px] sm:text-xs text-slate-600 dark:text-dark-text-muted font-medium">
                                Deadline: {task.deadline}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FileText size={12} className="text-slate-400 dark:text-dark-text-muted" />
                            <span className="text-[10px] sm:text-xs text-slate-600 dark:text-dark-text-muted font-medium">
                                {task.type === 'individual' ? 'Individu' : 'Kelompok'}
                            </span>
                        </div>
                        {task.grade !== null && (
                            <div className="flex items-center gap-1.5">
                                <CheckCircle size={12} className="text-green-600 dark:text-green-400" />
                                <span className="text-[10px] sm:text-xs text-green-600 dark:text-green-400 font-bold">
                                    Grade: {task.grade}/100
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <ArrowRight size={18} className="text-slate-300 dark:text-dark-text-muted group-hover:text-upn-green dark:group-hover:text-upn-gold transition-colors shrink-0" />
            </div>
        </button>
    );
};

// Stat Item Component
const StatItem: React.FC<{
    label: string;
    value: number;
    color: 'blue' | 'red' | 'yellow' | 'green';
}> = ({ label, value, color }) => {
    const colorClasses = {
        blue: 'text-primary-blue bg-primary-blue/10',
        red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
        yellow: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
        green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
    };

    return (
        <div className="bg-white dark:bg-dark-surface rounded-xl p-3 sm:p-4 text-center">
            <p className={`text-2xl sm:text-3xl font-black ${colorClasses[color]}`}>{value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-bold uppercase mt-1">{label}</p>
        </div>
    );
};

export default TasksPage;
