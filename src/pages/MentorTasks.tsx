import React, { useMemo, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { MOCK_MENTEES, type Mentee } from '../data/mockData';
import { StatsCard } from '../components/StatsCard';
import { CheckCircle2, XCircle, Clock, Eye, Filter, Search, UserCheck, FileText, Star } from 'lucide-react';
import { clsx } from 'clsx';

const MentorTasks: React.FC = () => {
    const [mentees, setMentees] = useState(MOCK_MENTEES);
    const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
    const [grade, setGrade] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');

    const handleUpdateStatus = (id: string, gradeValue: number) => {
        setMentees(mentees.map((m) => (m.id === id ? { ...m, averageGrade: gradeValue } : m)));
        setSelectedMentee(null);
        setGrade(0);
    };

    const openValidationModal = (mentee: Mentee) => {
        setSelectedMentee(mentee);
        setGrade(mentee.averageGrade > 0 ? mentee.averageGrade : 0);
    };

    const getStatusInfo = (currentGrade: number) => {
        const isPending = currentGrade <= 0;

        return {
            label: isPending ? 'PENDING' : `GRADE: ${currentGrade}`,
            className: isPending
                ? 'bg-upn-gold/5 text-upn-gold border-upn-gold/20'
                : 'bg-upn-green/5 text-upn-green border-upn-green/20',
        };
    };

    const filteredMentees = useMemo(() => {
        return mentees.filter((mentee) => {
            const matchesSearch = mentee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                mentee.nim.includes(searchQuery);

            if (!matchesSearch) return false;

            if (filter === 'pending') return mentee.averageGrade <= 0;
            if (filter === 'graded') return mentee.averageGrade > 0;
            return true;
        });
    }, [mentees, searchQuery, filter]);

    const pendingCount = mentees.filter((m) => m.averageGrade <= 0).length;
    const gradedCount = mentees.filter((m) => m.averageGrade > 0).length;
    const avgGrade = mentees.length > 0
        ? Math.round(mentees.reduce((acc, m) => acc + m.averageGrade, 0) / mentees.length)
        : 0;

    return (
        <DashboardLayout>
            <div className="space-y-6 sm:space-y-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black">Validasi Tugas</h1>
                    <p className="text-slate-500 font-medium italic text-sm sm:text-base">
                        Review dan berikan penilaian untuk tugas Mahasiswa Baru.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <StatsCard title="Belum Dinilai" value={pendingCount} icon={Clock} variant="gold" />
                    <StatsCard title="Sudah Selesai" value={gradedCount} icon={CheckCircle2} />
                    <StatsCard title="Rata-rata Grade" value={`${avgGrade}%`} icon={Star} />
                </div>

                <div className="card bg-white p-0 overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full md:max-w-md">
                            <Search size={18} className="text-slate-400" />
                            <input
                                placeholder="Cari Nama / NIM Mentee..."
                                className="bg-transparent text-sm outline-none w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Cari mentee"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-slate-400" />
                            <div className="flex items-center gap-2">
                                <FilterChip
                                    label="Semua"
                                    active={filter === 'all'}
                                    onClick={() => setFilter('all')}
                                />
                                <FilterChip
                                    label="Pending"
                                    active={filter === 'pending'}
                                    onClick={() => setFilter('pending')}
                                />
                                <FilterChip
                                    label="Dinilai"
                                    active={filter === 'graded'}
                                    onClick={() => setFilter('graded')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <th className="px-8 py-4">Nama Mentee</th>
                                    <th className="px-4 py-4">Program Studi</th>
                                    <th className="px-4 py-4">Tugas Terakhir</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredMentees.map((mentee) => {
                                    const statusInfo = getStatusInfo(mentee.averageGrade);

                                    return (
                                        <tr key={mentee.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <p className="font-bold text-slate-800">{mentee.name}</p>
                                                <p className="text-[10px] font-medium text-slate-400">{mentee.nim}</p>
                                            </td>
                                            <td className="px-4 py-5 text-sm font-medium text-slate-600">{mentee.major}</td>
                                            <td className="px-4 py-5 font-bold text-xs text-upn-green">Resume PKKMB Day 1</td>
                                            <td className="px-4 py-5">
                                                <span
                                                    className={clsx(
                                                        'inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border',
                                                        statusInfo.className,
                                                    )}
                                                >
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button
                                                    onClick={() => openValidationModal(mentee)}
                                                    className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-transparent text-slate-400 hover:text-upn-green hover:border-slate-200 hover:bg-white transition-all"
                                                    aria-label={`Lihat detail ${mentee.name}`}
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="md:hidden divide-y divide-slate-50">
                        {filteredMentees.map((mentee) => {
                            const statusInfo = getStatusInfo(mentee.averageGrade);

                            return (
                                <div key={mentee.id} className="p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="font-bold text-slate-800 truncate">{mentee.name}</p>
                                            <p className="text-[11px] font-medium text-slate-400">{mentee.nim}</p>
                                        </div>
                                        <span
                                            className={clsx(
                                                'inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border',
                                                statusInfo.className,
                                            )}
                                        >
                                            {statusInfo.label}
                                        </span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-2">
                                        <div className="text-xs text-slate-600">
                                            <p className="font-medium">{mentee.major}</p>
                                            <p className="font-bold text-upn-green mt-1">Resume PKKMB Day 1</p>
                                        </div>
                                        <button
                                            onClick={() => openValidationModal(mentee)}
                                            className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:text-upn-green hover:border-upn-green/30 hover:bg-slate-50 transition-all"
                                            aria-label={`Lihat detail ${mentee.name}`}
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredMentees.length === 0 && (
                        <div className="px-4 py-10 text-center text-slate-400 text-sm font-medium">
                            Tidak ada mentee yang sesuai dengan filter.
                        </div>
                    )}
                </div>

                {/* Validation Modal */}
                {selectedMentee && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div 
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedMentee(null)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape' || e.key === 'Enter') {
                                    setSelectedMentee(null);
                                }
                            }}
                            aria-label="Tutup modal"
                        />
                        <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                            <div className="h-44 sm:h-48 bg-upn-green p-5 sm:p-8 flex items-end justify-between gap-3">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-upn-gold">{selectedMentee.name}</h2>
                                    <p className="text-green-50/70 font-bold uppercase text-[10px] tracking-widest mt-1">Reviewing: Resume PKKMB Day 1</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleUpdateStatus(selectedMentee.id, 0)} className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-red-500 transition-colors" aria-label="Tolak tugas"><XCircle size={20} /></button>
                                    <button onClick={() => handleUpdateStatus(selectedMentee.id, grade)} className="px-4 sm:px-6 h-11 bg-upn-gold text-upn-green font-black text-[11px] sm:text-xs rounded-xl hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 tracking-widest whitespace-nowrap">SET GRADE <UserCheck size={18} /></button>
                                </div>
                            </div>

                            <div className="p-5 sm:p-8 space-y-6">
                                <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
                                    <FileText size={48} className="mb-2" />
                                    <p className="font-bold text-sm">Pratinjau Dokumen (PDF)</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nilai Tugas (0-100)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={grade}
                                        onChange={(e) => {
                                            const val = Math.min(100, Math.max(0, Number(e.target.value)));
                                            setGrade(val);
                                        }}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-2xl font-black text-center focus:ring-2 focus:ring-upn-green outline-none"
                                        placeholder="0-100"
                                        aria-label="Nilai tugas"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

const FilterChip: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void;
}> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={clsx(
            'px-3 h-10 rounded-lg text-xs font-black transition-colors whitespace-nowrap',
            active
                ? 'bg-upn-green text-upn-gold'
                : 'bg-slate-100 text-slate-500 hover:text-upn-green hover:bg-slate-200',
        )}
    >
        {label}
    </button>
);

export default MentorTasks;
