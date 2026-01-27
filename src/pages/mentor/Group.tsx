import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Users, CheckSquare, TrendingUp, Clock, CheckCircle, AlertCircle, Search, Filter, MoreVertical, ArrowRight } from 'lucide-react';
import { MOCK_MENTEES } from '../../data/mockData';

const MentorGroupPage: React.FC = () => {
    const [selectedMentees, setSelectedMentees] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all');
    const [selectAll, setSelectAll] = useState(false);

    const filteredMentees = MOCK_MENTEES.filter(mentee => {
        const matchesSearch = mentee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentee.nim.includes(searchQuery) ||
            mentee.major.toLowerCase().includes(searchQuery.toLowerCase());
        if (!matchesSearch) return false;

        switch (filter) {
            case 'active':
                return mentee.averageGrade > 0;
            case 'pending':
                return mentee.averageGrade === 0;
            default:
                return true;
        }
    });

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

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedMentees(new Set());
        } else {
            setSelectedMentees(new Set(filteredMentees.map(m => m.id)));
        }
        setSelectAll(!selectAll);
    };

    const handleMenteeSelect = (id: string) => {
        const newSelected = new Set(selectedMentees);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedMentees(newSelected);
    };

    const getMenteeStatus = (mentee: any) => {
        if (mentee.averageGrade > 0) {
            return { label: 'Aktif', color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400', icon: CheckCircle };
        }
        return { label: 'Pending', color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400', icon: Clock };
    };

    return (
        <DashboardLayout>
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-dark-text">Manajemen Grup</h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted font-medium mt-1">
                            Kelola dan pantau progres mentee Anda
                        </p>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <KPICard
                        title="Total Mentee"
                        value={totalMentees}
                        icon={Users}
                        description={`${activeMentees} Aktif, ${pendingMentees} Pending`}
                        color="blue"
                    />
                    <KPICard
                        title="Tugas Selesai"
                        value={totalTasksCompleted}
                        icon={CheckSquare}
                        description={`${totalTasksPending} Pending`}
                        color="green"
                    />
                    <KPICard
                        title="Rata-rata Grade"
                        value={`${averageGrade}`}
                        icon={TrendingUp}
                        description={averageGrade >= 80 ? 'Sangat Baik' : averageGrade >= 60 ? 'Baik' : 'Perlu Perhatian'}
                        color="gold"
                    />
                    <KPICard
                        title="Kehadiran Rata-rata"
                        value={`${averageAttendance}%`}
                        icon={Clock}
                        description={averageAttendance >= 90 ? 'Sangat Baik' : averageAttendance >= 80 ? 'Baik' : 'Perlu Perhatian'}
                        color="purple"
                    />
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-dark-text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Cari nama, NIM, atau jurusan..."
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-upn-green focus:border-transparent outline-none transition-all bg-slate-50 dark:bg-dark-bg text-slate-800 dark:text-dark-text placeholder:text-slate-400 dark:placeholder:text-dark-text-muted"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <FilterButton
                            active={filter === 'all'}
                            onClick={() => setFilter('all')}
                            count={totalMentees}
                            label="Semua"
                        />
                        <FilterButton
                            active={filter === 'active'}
                            onClick={() => setFilter('active')}
                            count={activeMentees}
                            label="Aktif"
                            color="green"
                        />
                        <FilterButton
                            active={filter === 'pending'}
                            onClick={() => setFilter('pending')}
                            count={pendingMentees}
                            label="Pending"
                            color="yellow"
                        />
                    </div>
                </div>

                {/* Bulk Action Bar */}
                {selectedMentees.size > 0 && (
                    <div className="card p-3 sm:p-4 bg-upn-green/5 dark:bg-upn-green/10 border-2 border-upn-green/20 dark:border-upn-green/30">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={20} className="text-upn-green dark:text-upn-gold" />
                                <span className="text-sm sm:text-base font-semibold text-slate-800 dark:text-dark-text">
                                    {selectedMentees.size} mentee dipilih
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-2 bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-lg text-xs sm:text-sm font-semibold text-slate-700 dark:text-dark-text-muted hover:bg-slate-50 dark:hover:bg-dark-border transition-all">
                                    Kirim Pengingat
                                </button>
                                <button className="px-3 py-2 btn-primary rounded-lg text-xs sm:text-sm font-semibold">
                                    Validasi Tugas
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mentee List */}
                <div className="card p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text">Daftar Mentee</h3>
                        <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-dark-text-muted cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="accent-upn-green w-4 h-4"
                            />
                            <span>Pilih Semua</span>
                        </label>
                    </div>

                    <div className="space-y-3">
                        {filteredMentees.map(mentee => {
                            const status = getMenteeStatus(mentee);
                            const isSelected = selectedMentees.has(mentee.id);
                            const StatusIcon = status.icon;

                            return (
                                <div
                                    key={mentee.id}
                                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 dark:bg-dark-bg rounded-xl border-2 transition-all ${isSelected ? 'border-upn-green dark:border-upn-gold' : 'border-transparent hover:border-slate-200 dark:hover:border-dark-border'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleMenteeSelect(mentee.id)}
                                        className="accent-upn-green w-5 h-5 shrink-0"
                                    />
                                    <div className="flex-grow min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="text-sm sm:text-base font-bold text-slate-800 dark:text-dark-text truncate">
                                                        {mentee.name}
                                                    </h4>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted">
                                                    {mentee.nim} • {mentee.major}
                                                </p>
                                            </div>
                                            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-dark-border rounded-lg transition-colors">
                                                <MoreVertical size={16} className="text-slate-400 dark:text-dark-text-muted" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                            <StatBox
                                                label="Grade"
                                                value={mentee.averageGrade === 0 ? '-' : mentee.averageGrade}
                                                color="blue"
                                            />
                                            <StatBox
                                                label="Tugas"
                                                value={`${mentee.tasksCompleted}/${mentee.tasksCompleted + mentee.tasksPending}`}
                                                color="green"
                                            />
                                            <StatBox
                                                label="Kehadiran"
                                                value={`${mentee.attendanceRate}%`}
                                                color="purple"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredMentees.length === 0 && (
                        <div className="text-center py-8 sm:py-12 border-2 border-dashed border-slate-200 dark:border-dark-border rounded-xl bg-slate-50/50 dark:bg-dark-bg/50">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-dark-border rounded-full flex items-center justify-center text-slate-300 dark:text-dark-text-muted mx-auto mb-4">
                                <Users size={32} />
                            </div>
                            <p className="text-base sm:text-lg text-slate-400 dark:text-dark-text-muted font-bold">
                                {searchQuery ? 'Tidak ada mentee yang cocok' : 'Tidak ada mentee'}
                            </p>
                            <p className="text-xs sm:text-sm text-slate-400 dark:text-dark-text-muted mt-2">
                                {searchQuery ? 'Coba kata kunci lain' : 'Semua mentee sudah ditampilkan'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                {filteredMentees.length > 0 && (
                    <div className="text-center py-4">
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-dark-text-muted">
                            Menampilkan <span className="font-bold text-upn-green dark:text-upn-gold">{filteredMentees.length}</span> dari <span className="font-bold">{MOCK_MENTEES.length}</span> mentee
                        </p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

// KPI Card Component
const KPICard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ElementType;
    description: string;
    color: 'blue' | 'green' | 'gold' | 'purple';
}> = ({ title, value, icon: Icon, description, color }) => {
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

// Filter Button Component
const FilterButton: React.FC<{
    active: boolean;
    onClick: () => void;
    count: number;
    label: string;
    color?: 'green' | 'yellow';
}> = ({ active, onClick, count, label, color }) => {
    const getActiveClass = () => {
        if (color) {
            return {
                green: 'bg-green-600 text-white',
                yellow: 'bg-yellow-500 text-white',
            }[color];
        }
        return 'bg-upn-green text-upn-gold';
    };

    const getInactiveClass = () => {
        if (color) {
            return {
                green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30',
                yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
            }[color];
        }
        return 'bg-slate-100 dark:bg-dark-border text-slate-600 dark:text-dark-text-muted hover:bg-slate-200 dark:hover:bg-dark-surface';
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${active ? getActiveClass() : getInactiveClass()}`}
        >
            <Filter size={14} className="sm:size-16" />
            <span>{label}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${active ? 'bg-white/20' : 'bg-slate-200 dark:bg-dark-surface'}`}>
                {count}
            </span>
        </button>
    );
};

// Stat Box Component
const StatBox: React.FC<{
    label: string;
    value: string | number;
    color: 'blue' | 'green' | 'purple';
}> = ({ label, value, color }) => {
    const colorClasses = {
        blue: 'text-primary-blue bg-primary-blue/10',
        green: 'text-upn-green dark:text-upn-gold bg-upn-green/10 dark:bg-upn-gold/10',
        purple: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-900/20',
    };

    return (
        <div className={`bg-white dark:bg-dark-surface rounded-lg p-2 sm:p-3 text-center ${colorClasses[color]}`}>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-dark-text-muted font-bold uppercase">{label}</p>
            <p className="text-lg sm:text-xl font-black">{value}</p>
        </div>
    );
};

export default MentorGroupPage;
