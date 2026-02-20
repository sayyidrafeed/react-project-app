import React from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Users, CheckSquare, TrendingUp, Clock, BarChart3, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_MENTEES } from '../../data/mockData';

const StatistikGrupPage: React.FC = () => {
    const filteredMentees = MOCK_MENTEES;

    const totalMentees = filteredMentees.length;
    const activeMentees = filteredMentees.filter(m => m.averageGrade > 0).length;
    const pendingMentees = filteredMentees.filter(m => m.averageGrade === 0).length;
    const averageGrade = totalMentees > 0
        ? Math.round(filteredMentees.reduce((acc, m) => acc + m.averageGrade, 0) / totalMentees)
        : 0;
    const totalTasksCompleted = filteredMentees.reduce((acc, m) => acc + m.tasksCompleted, 0);
    const totalTasksPending = filteredMentees.reduce((acc, m) => acc + m.tasksPending, 0);
    const averageAttendance = totalMentees > 0
        ? Math.round(filteredMentees.reduce((acc, m) => acc + m.attendanceRate, 0) / totalMentees)
        : 0;

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link 
                            to="/mentor/group" 
                            className="flex items-center gap-2 text-sm text-slate-500 dark:text-dark-text-muted hover:text-upn-green dark:hover:text-upn-gold transition-colors mb-2"
                        >
                            <ArrowLeft size={16} />
                            Kembali ke Daftar Mentee
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Statistik Grup</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Analisis dan progres mentee Anda
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <StatCard
                        title="Total Mentee"
                        value={totalMentees}
                        icon={Users}
                        description={`${activeMentees} Aktif, ${pendingMentees} Pending`}
                        color="blue"
                    />
                    <StatCard
                        title="Tugas Selesai"
                        value={totalTasksCompleted}
                        icon={CheckSquare}
                        description={`${totalTasksPending} Pending`}
                        color="green"
                    />
                    <StatCard
                        title="Rata-rata Grade"
                        value={`${averageGrade}`}
                        icon={TrendingUp}
                        description={averageGrade >= 80 ? 'Sangat Baik' : averageGrade >= 60 ? 'Baik' : 'Perlu Perhatian'}
                        color="gold"
                    />
                    <StatCard
                        title="Kehadiran Rata-rata"
                        value={`${averageAttendance}%`}
                        icon={Clock}
                        description={averageAttendance >= 90 ? 'Sangat Baik' : averageAttendance >= 80 ? 'Baik' : 'Perlu Perhatian'}
                        color="purple"
                    />
                </div>

                <div className="card p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-dark-text mb-6 flex items-center gap-2">
                        <BarChart3 size={20} className="text-upn-green dark:text-upn-gold" />
                        Analisis Detail
                    </h3>

                    <div className="space-y-6">
                        <div className="p-4 bg-slate-50 dark:bg-dark-surface rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-slate-700 dark:text-dark-text">Tingkat Aktivitas Mentee</span>
                                <span className="text-sm font-bold text-upn-green dark:text-upn-gold">
                                    {totalMentees > 0 ? Math.round((activeMentees / totalMentees) * 100) : 0}%
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-dark-border rounded-full h-3">
                                <div 
                                    className="bg-upn-green dark:bg-upn-gold h-3 rounded-full transition-all duration-500" 
                                    style={{ width: `${totalMentees > 0 ? (activeMentees / totalMentees) * 100 : 0}%` }}
                                />
                            </div>
                            <p className="text-xs text-slate-500 dark:text-dark-text-muted mt-2">
                                {activeMentees} dari {totalMentees} mentee aktif dalam grup
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-dark-surface rounded-xl">
                                <h4 className="text-sm font-semibold text-slate-700 dark:text-dark-text mb-4">Ringkasan Tugas</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-upn-green/10 flex items-center justify-center">
                                                <CheckSquare size={18} className="text-upn-green" />
                                            </div>
                                            <span className="text-sm text-slate-600 dark:text-dark-text-muted">Diselesaikan</span>
                                        </div>
                                        <span className="text-xl font-black text-upn-green dark:text-upn-gold">{totalTasksCompleted}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                                <Clock size={18} className="text-yellow-500" />
                                            </div>
                                            <span className="text-sm text-slate-600 dark:text-dark-text-muted">Pending</span>
                                        </div>
                                        <span className="text-xl font-black text-yellow-500">{totalTasksPending}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 dark:bg-dark-surface rounded-xl">
                                <h4 className="text-sm font-semibold text-slate-700 dark:text-dark-text mb-4">Distribusi Grade</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                            <span className="text-xs text-slate-600 dark:text-dark-text-muted">Sangat Baik (80-100)</span>
                                        </div>
                                        <span className="text-sm font-bold text-green-600">{filteredMentees.filter(m => m.averageGrade >= 80).length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                                            <span className="text-xs text-slate-600 dark:text-dark-text-muted">Baik (60-79)</span>
                                        </div>
                                        <span className="text-sm font-bold text-blue-600">{filteredMentees.filter(m => m.averageGrade >= 60 && m.averageGrade < 80).length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <span className="text-xs text-slate-600 dark:text-dark-text-muted">Perlu Perhatian (&lt;60)</span>
                                        </div>
                                        <span className="text-sm font-bold text-red-500">{filteredMentees.filter(m => m.averageGrade > 0 && m.averageGrade < 60).length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-slate-400" />
                                            <span className="text-xs text-slate-600 dark:text-dark-text-muted">Belum Ada Grade</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-500">{filteredMentees.filter(m => m.averageGrade === 0).length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-dark-surface rounded-xl">
                            <h4 className="text-sm font-semibold text-slate-700 dark:text-dark-text mb-4">Tren Kehadiran</h4>
                            <div className="flex items-end gap-2 h-24">
                                {[95, 88, 92, 78, 85, 90, 87].map((rate, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                                        <div 
                                            className="w-full bg-purple-500/60 dark:bg-purple-400/60 rounded-t"
                                            style={{ height: `${rate}%` }}
                                        />
                                        <span className="text-[10px] text-slate-400">M{idx + 1}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-dark-text-muted mt-3 text-center">
                                Rata-rata kehadiran bulanan: 87%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    description: string;
    color: 'blue' | 'green' | 'gold' | 'purple';
}> = ({ title: _title, value, icon: Icon, description, color }) => {
    const colorClasses = {
        blue: 'bg-primary-blue/10 text-primary-blue',
        green: 'bg-upn-green/10 text-upn-green dark:text-upn-gold',
        gold: 'bg-upn-gold/10 text-upn-gold',
        purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
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

export default StatistikGrupPage;
