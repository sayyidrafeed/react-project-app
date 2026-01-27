import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Users, TrendingUp, AlertTriangle, BarChart3, Calendar, Activity, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { MOCK_USERS, MOCK_TASKS, MOCK_EVENTS } from '../../data/mockData';

const AnalyticsPage: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

    // Calculate analytics data
    const totalUsers = MOCK_USERS.length;
    const activeUsers = MOCK_USERS.filter(u => u.status === 'Active').length;
    const totalTasks = MOCK_TASKS.length;
    const completedTasks = MOCK_TASKS.filter(t => t.grade !== null).length;
    const totalEvents = MOCK_EVENTS.length;
    const upcomingEvents = MOCK_EVENTS.filter(e => new Date(e.date) >= new Date()).length;

    // Mock data for charts
    const taskCompletionData = [
        { label: 'Sen', value: 45 },
        { label: 'Sel', value: 62 },
        { label: 'Rab', value: 38 },
        { label: 'Kam', value: 71 },
        { label: 'Jum', value: 55 },
        { label: 'Sab', value: 48 },
    ];

    const userActivityData = [
        { label: 'Mentee', value: 4, change: 12, isUp: true },
        { label: 'Mentor', value: 2, change: 5, isUp: true },
        { label: 'Admin', value: 2, change: 0, isUp: false },
    ];

    const bottlenecks = [
        { id: 1, type: 'Tugas', description: '30% mentee belum submit tugas Day 1', severity: 'high', count: 12 },
        { id: 2, type: 'Presensi', description: '15% mentee belum presensi kegiatan kemarin', severity: 'medium', count: 6 },
        { id: 3, type: 'Grup', description: 'Grup 21 memiliki mentee dengan grade < 60', severity: 'high', count: 3 },
    ];

    const recentActivities = [
        { id: 1, action: 'User Baru', detail: 'Ahmad Fauzi mendaftar', time: '2 jam yang lalu', type: 'user' },
        { id: 2, action: 'Tugas Dikirim', detail: 'Siti Aminah submit Tugas Day 1', time: '3 jam yang lalu', type: 'task' },
        { id: 3, action: 'Presensi', detail: 'Budi Santoso hadir kegiatan', time: '4 jam yang lalu', type: 'presence' },
        { id: 4, action: 'Grade', detail: 'Dewi Lestari mendapat grade 85', time: '5 jam yang lalu', type: 'grade' },
        { id: 5, action: 'Event Baru', detail: 'Olahraga Bersama ditambahkan', time: '6 jam yang lalu', type: 'event' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Macro Analytics</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Pantau performa seluruh platform PKKMB-U
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <TimeRangeButton
                            active={timeRange === 'week'}
                            onClick={() => setTimeRange('week')}
                            label="Minggu Ini"
                        />
                        <TimeRangeButton
                            active={timeRange === 'month'}
                            onClick={() => setTimeRange('month')}
                            label="Bulan Ini"
                        />
                        <TimeRangeButton
                            active={timeRange === 'all'}
                            onClick={() => setTimeRange('all')}
                            label="Semua"
                        />
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <StatCard
                        title="Total Pengguna"
                        value={totalUsers}
                        icon={Users}
                        description={`${activeUsers} Aktif, ${totalUsers - activeUsers} Inaktif`}
                        trend={{ value: 12, isUp: true }}
                        color="blue"
                    />
                    <StatCard
                        title="Total Tugas"
                        value={totalTasks}
                        icon={BarChart3}
                        description={`${completedTasks} Selesai, ${totalTasks - completedTasks} Pending`}
                        trend={{ value: 8, isUp: true }}
                        color="green"
                    />
                    <StatCard
                        title="Event Terjadwal"
                        value={totalEvents}
                        icon={Calendar}
                        description={`${upcomingEvents} Mendatang`}
                        trend={{ value: 5, isUp: true }}
                        color="gold"
                    />
                    <StatCard
                        title="Rata-rata Grade"
                        value="78"
                        icon={TrendingUp}
                        description="Seluruh mentee"
                        trend={{ value: 3, isUp: true }}
                        color="purple"
                    />
                </div>

                {/* Bottleneck Alerts */}
                <div className="card p-4 sm:p-6 border-2 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
                        <h3 className="text-base sm:text-lg font-bold text-red-800 dark:text-red-400">
                            Peringatan Bottleneck
                        </h3>
                    </div>
                    <div className="space-y-3">
                        {bottlenecks.map(alert => (
                            <BottleneckAlert key={alert.id} alert={alert} />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Task Completion Chart */}
                    <div className="card p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text mb-4 flex items-center gap-2">
                            <BarChart3 size={18} className="text-upn-green dark:text-upn-gold" />
                            Penyelesaian Tugas (Minggu Ini)
                        </h3>
                        <div className="space-y-3">
                            {taskCompletionData.map((item, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs sm:text-sm text-slate-600 dark:text-dark-text-muted w-12">
                                            {item.label}
                                        </span>
                                        <div className="flex-grow h-8 sm:h-10 bg-slate-100 dark:bg-dark-border rounded-lg overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-upn-green to-upn-gold transition-all duration-1000"
                                                style={{ width: `${item.value}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-dark-text">
                                        {item.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Activity Chart */}
                    <div className="card p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text mb-4 flex items-center gap-2">
                            <Activity size={18} className="text-upn-green dark:text-upn-gold" />
                            Aktivitas Pengguna
                        </h3>
                        <div className="space-y-3">
                            {userActivityData.map((item: any, index: number) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-dark-bg rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-dark-text">
                                            {item.label}
                                        </span>
                                        <span className="text-base sm:text-lg font-black text-slate-800 dark:text-dark-text">
                                            {item.value}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {item.isUp ? (
                                            <ArrowUp size={16} className="text-green-600 dark:text-green-400" />
                                        ) : (
                                            <ArrowDown size={16} className="text-red-600 dark:text-red-400" />
                                        )}
                                        <span className={`text-xs sm:text-sm font-bold ${item.isUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                            {item.isUp ? '+' : ''}{item.change}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text flex items-center gap-2">
                            <Activity size={18} className="text-upn-green dark:text-upn-gold" />
                            Aktivitas Terbaru
                        </h3>
                        <button className="text-xs sm:text-sm font-bold text-upn-green dark:text-upn-gold hover:underline">
                            Lihat Semua
                        </button>
                    </div>
                    <div className="space-y-3">
                        {recentActivities.slice(0, 5).map((activity: any) => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <QuickActionCard
                        title="Kelola Pengguna"
                        description="Tambah, edit, atau hapus user"
                        icon={Users}
                        color="blue"
                    />
                    <QuickActionCard
                        title="Broadcast Pesan"
                        description="Kirim notifikasi ke semua user"
                        icon={Activity}
                        color="gold"
                    />
                    <QuickActionCard
                        title="Laporan Detail"
                        description="Unduh laporan lengkap"
                        icon={BarChart3}
                        color="green"
                    />
                </div>
            </div>
        </DashboardLayout >
    );
};

// Stat Card Component
const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    description: string;
    trend?: { value: number; isUp: boolean };
    color: 'blue' | 'green' | 'gold' | 'purple';
}> = ({ title, value, icon: Icon, description, trend, color }) => {
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
                {trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${trend.isUp ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        }`}>
                        {trend.isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        <span>{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">{value}</p>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-medium mt-1">{description}</p>
        </div>
    );
};

// Bottleneck Alert Component
const BottleneckAlert: React.FC<{ alert: any }> = ({ alert }) => {
    const severityClasses = {
        high: 'border-red-300 dark:border-red-700 bg-red-100 dark:bg-red-900/30',
        medium: 'border-yellow-300 dark:border-yellow-700 bg-yellow-100 dark:bg-yellow-900/30',
    };

    const iconClasses = {
        high: 'text-red-600 dark:text-red-400',
        medium: 'text-yellow-600 dark:text-yellow-400',
    };

    return (
        <div className={`flex items-start gap-3 p-3 rounded-xl border-2 ${severityClasses[alert.severity as keyof typeof severityClasses]}`}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-dark-surface shrink-0">
                <AlertTriangle size={18} className={iconClasses[alert.severity as keyof typeof iconClasses]} />
            </div>
            <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-800 dark:text-dark-text text-sm">{alert.type}</h4>
                    <span className="px-2 py-0.5 bg-slate-200 dark:bg-dark-border rounded-full text-[10px] font-bold text-slate-700 dark:text-dark-text-muted">
                        {alert.count} kasus
                    </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-dark-text-muted">{alert.description}</p>
            </div>
        </div>
    );
};

// Activity Item Component
const ActivityItem: React.FC<{ activity: any }> = ({ activity }) => {
    const typeColors = {
        user: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
        task: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
        presence: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
        grade: 'bg-upn-gold/10 text-upn-gold',
        event: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
    };

    return (
        <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-dark-bg rounded-xl">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${typeColors[activity.type as keyof typeof typeColors]}`}>
                <Activity size={18} />
            </div>
            <div className="flex-grow">
                <p className="font-bold text-slate-800 dark:text-dark-text text-sm">{activity.action}</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted">{activity.detail}</p>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-dark-text-muted mt-1">{activity.time}</p>
            </div>
        </div>
    );
};

// Time Range Button Component
const TimeRangeButton: React.FC<{
    active: boolean;
    onClick: () => void;
    label: string;
}> = ({ active, onClick, label }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${active
                ? 'bg-upn-green text-upn-gold'
                : 'bg-slate-100 dark:bg-dark-border text-slate-600 dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-dark-surface'
                }`}
        >
            {label}
        </button>
    );
};

// Quick Action Card Component
const QuickActionCard: React.FC<{
    title: string;
    description: string;
    icon: React.ElementType;
    color: 'blue' | 'gold' | 'green';
}> = ({ title, description, icon: Icon, color }) => {
    const colorClasses = {
        blue: 'bg-primary-blue/10 text-primary-blue',
        gold: 'bg-upn-gold/10 text-upn-gold',
        green: 'bg-upn-green/10 text-upn-green dark:text-upn-gold',
    };

    return (
        <button className="card p-4 sm:p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 ${colorClasses[color]}`}>
                <Icon size={24} />
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-dark-text mb-1 group-hover:text-upn-green dark:group-hover:text-upn-gold transition-colors">
                {title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted">
                {description}
            </p>
        </button>
    );
};

export default AnalyticsPage;
