import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Calendar, CheckSquare, Users, Star, Bell, AlertTriangle, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { MOCK_TASKS, MOCK_EVENTS } from '../../data/mockData';

const MenteeDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [events, setEvents] = useState(MOCK_EVENTS);
    const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);

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

    const completedTasks = tasks.filter(t => t.grade !== null);
    const pendingTasks = tasks.filter(t => t.grade === null);
    const averageGrade = completedTasks.length > 0
        ? Math.round(completedTasks.reduce((acc, t) => acc + (t.grade || 0), 0) / completedTasks.length)
        : 0;

    const urgentTasks = pendingTasks.filter(t => {
        const deadline = new Date(t.deadline);
        const today = new Date();
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 2;
    });

    const todayEvents = events.filter(e => {
        const eventDate = new Date(e.date);
        const today = new Date();
        return eventDate.toDateString() === today.toDateString();
    });

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Emergency Alert */}
                {showEmergencyAlert && (
                    <div className="bg-red-600 text-white p-4 rounded-xl shadow-lg flex items-start gap-3 animate-pulse">
                        <AlertTriangle size={24} className="shrink-0 mt-0.5" />
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg mb-1">Peringatan Darurat</h3>
                            <p className="text-sm opacity-90">Ada kegiatan mendesak yang membutuhkan perhatian Anda. Silakan cek jadwal segera.</p>
                        </div>
                        <button
                            onClick={() => setShowEmergencyAlert(false)}
                            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <span className="sr-only">Tutup</span>
                            <span className="text-xl">×</span>
                        </button>
                    </div>
                )}

                {/* Welcome Banner */}
                <div className="relative overflow-hidden bg-gradient-to-br from-upn-green to-upn-green/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl dark:shadow-green-900/40">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-upn-gold/20 text-upn-gold rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4 border border-upn-gold/30">
                            <Star size={12} /> Mahasiswa Bela Negara
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                            Selamat Berjuang, <span className="text-upn-gold">PATRIVER!</span>
                        </h1>
                        <p className="mt-2 sm:mt-4 text-green-50/70 text-sm sm:text-base">
                            Satu portal untuk memantau progres PKKMB-U kamu.
                        </p>
                    </div>
                    <div className="hidden md:block w-32 h-32 sm:w-48 sm:h-48 bg-upn-gold/10 rounded-full blur-3xl absolute -right-8 -top-8 sm:-right-12 sm:-top-12"></div>
                </div>

                {/* Progress Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    <StatCard
                        title="Tugas Selesai"
                        value={`${completedTasks.length}/${tasks.length}`}
                        icon={CheckSquare}
                        description="Update terakhir hari ini"
                        color="green"
                    />
                    <StatCard
                        title="Rata-rata Grade"
                        value={`${averageGrade}`}
                        icon={Star}
                        description={averageGrade >= 80 ? 'Peringkat #1' : averageGrade >= 60 ? 'Peringkat #2' : 'Peringkat #3'}
                        color="gold"
                    />
                    <StatCard
                        title="Notifikasi"
                        value="0"
                        icon={Bell}
                        description="Tidak ada pesan baru"
                        color="blue"
                    />
                </div>

                {/* Today's Priority */}
                {urgentTasks.length > 0 && (
                    <div className="card p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-dark-text">
                                <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />
                                Prioritas Hari Ini
                            </h3>
                            <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full">
                                {urgentTasks.length} Urgent
                            </span>
                        </div>
                        <div className="space-y-3">
                            {urgentTasks.slice(0, 3).map(task => (
                                <TaskItem key={task.id} task={task} onClick={() => navigate(`/mentee/tasks/${task.id}`)} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Upcoming Events */}
                <div className="card p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-dark-text">
                            <Calendar size={18} className="text-upn-green dark:text-upn-gold" />
                            Agenda Mendatang
                        </h3>
                        <button
                            onClick={() => navigate('/mentee/presence')}
                            className="text-xs font-bold text-upn-green dark:text-upn-gold hover:underline flex items-center gap-1"
                        >
                            Lihat Semua
                            <ArrowRight size={14} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {events.slice(0, 3).map(event => (
                            <EventItem key={event.id} event={event} />
                        ))}
                        {events.length === 0 && (
                            <div className="text-center py-8 sm:py-12 border-2 border-dashed border-slate-200 dark:border-dark-border rounded-xl bg-slate-50/50 dark:bg-dark-bg/50">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-dark-border rounded-full flex items-center justify-center text-slate-300 dark:text-dark-text-muted mx-auto mb-3 sm:mb-4">
                                    <Calendar size={24} />
                                </div>
                                <p className="text-xs sm:text-sm text-slate-400 dark:text-dark-text-muted font-bold">Belum ada agenda terjadwal hari ini.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mentor Info Card */}
                <div className="card p-4 sm:p-6 flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-upn-green/10 rounded-xl border border-upn-green/10 flex items-center justify-center text-upn-green dark:text-upn-gold shrink-0">
                        <Users size={24} />
                    </div>
                    <div className="flex-grow">
                        <h4 className="font-bold text-upn-green dark:text-upn-gold text-sm sm:text-base">Kak Mentor TBA</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-bold uppercase tracking-widest mt-0.5 sm:mt-1">
                            Grup 21 - PATRIBERA
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/mentee/social')}
                        className="px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-50 dark:bg-dark-bg border border-slate-200 dark:border-dark-border rounded-xl text-[10px] sm:text-xs font-bold text-slate-600 dark:text-dark-text-muted hover:bg-slate-100 dark:hover:bg-dark-border transition-all"
                    >
                        Profil
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

// Stat Card Component
const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    description: string;
    color: 'green' | 'gold' | 'blue';
}> = ({ title, value, icon: Icon, description, color }) => {
    const colorClasses = {
        green: 'bg-upn-green/10 text-upn-green dark:text-upn-gold',
        gold: 'bg-upn-gold/10 text-upn-gold',
        blue: 'bg-primary-blue/10 text-primary-blue',
    };

    return (
        <div className="card p-3 sm:p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
                    <Icon size={18} className="sm:size-20" />
                </div>
                <TrendingUp size={16} className="text-slate-300 dark:text-dark-text-muted" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">{value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-medium mt-1">{description}</p>
        </div>
    );
};

// Task Item Component
const TaskItem: React.FC<{
    task: any;
    onClick: () => void;
}> = ({ task, onClick }) => {
    const deadline = new Date(task.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const urgencyColor = diffDays <= 1 ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400';
    const urgencyBg = diffDays <= 1 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-orange-50 dark:bg-orange-900/20';

    return (
        <button
            onClick={onClick}
            className="w-full text-left p-3 sm:p-4 bg-slate-50 dark:bg-dark-bg rounded-xl hover:bg-slate-100 dark:hover:bg-dark-border transition-all group"
        >
            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${urgencyBg}`}>
                    <CheckSquare size={18} className={urgencyColor} />
                </div>
                <div className="flex-grow min-w-0">
                    <p className="font-bold text-slate-800 dark:text-dark-text text-sm sm:text-base truncate">{task.title}</p>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted mt-1 truncate">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <Clock size={12} className="text-slate-400 dark:text-dark-text-muted" />
                        <span className={`text-[10px] sm:text-xs font-bold ${urgencyColor}`}>
                            Deadline: {diffDays <= 0 ? 'Hari ini' : diffDays === 1 ? 'Besok' : `${diffDays} hari lagi`}
                        </span>
                    </div>
                </div>
                <ArrowRight size={16} className="text-slate-300 dark:text-dark-text-muted group-hover:text-upn-green dark:group-hover:text-upn-gold transition-colors shrink-0" />
            </div>
        </button>
    );
};

// Event Item Component
const EventItem: React.FC<{ event: any }> = ({ event }) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const isToday = eventDate.toDateString() === today.toDateString();

    return (
        <div className="flex items-start gap-3 p-3 sm:p-4 bg-slate-50 dark:bg-dark-bg rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-upn-green/10 rounded-lg flex items-center justify-center text-upn-green dark:text-upn-gold shrink-0">
                <Calendar size={18} className="sm:size-20" />
            </div>
            <div className="flex-grow min-w-0">
                <p className="font-bold text-slate-800 dark:text-dark-text text-sm sm:text-base truncate">{event.title}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-medium mt-1 truncate">{event.date} • {event.time}</p>
                <p className="text-[10px] sm:text-xs text-upn-green dark:text-upn-gold font-bold truncate">{event.location}</p>
                {isToday && (
                    <span className="inline-block mt-2 text-[10px] font-bold text-upn-green dark:text-upn-gold bg-upn-green/10 dark:bg-upn-gold/10 px-2 py-0.5 rounded-full">
                        Hari Ini
                    </span>
                )}
            </div>
        </div>
    );
};

export default MenteeDashboard;
